const PUBLIC_CONTACT_EMAIL = "kyle@cedarandsignal.com";
const OPERATIONAL_ALERT_EMAIL =
  process.env.CEDAR_CONSULTATION_ALERT_EMAIL || "KyleDChristopher@gmail.com";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${PUBLIC_CONTACT_EMAIL}`;
const SITE_ORIGIN = "https://www.cedarandsignal.com";
const HUBSPOT_ACCESS_TOKEN =
  process.env.HUBSPOT_PRIVATE_APP_TOKEN || process.env.HUBSPOT_ACCESS_TOKEN;
const HUBSPOT_NOTES_PROPERTY =
  process.env.HUBSPOT_CEDAR_NOTES_PROPERTY ||
  process.env.HUBSPOT_NOTES_PROPERTY ||
  "";
const HUBSPOT_SOURCE_PROPERTY =
  process.env.HUBSPOT_CEDAR_SOURCE_PROPERTY ||
  process.env.HUBSPOT_SOURCE_PROPERTY ||
  "";
const HUBSPOT_SOURCE_VALUE = "cedar_consultation_form";

function getTrimmedString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function buildConsultationSummary(payload) {
  return `
    <h2>New Cedar &amp; Signal consultation request</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone}</p>
    <p><strong>Company:</strong> ${payload.company}</p>
    <p><strong>Website:</strong> ${payload.website}</p>
    <p><strong>Project Type:</strong> ${payload.projectType}</p>
    <p><strong>Details:</strong><br/>${payload.details.replace(/\n/g, "<br/>")}</p>
  `;
}

async function sendResendAlert(payload) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CEDAR_CONSULTATION_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    return { configured: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Kyle <${fromEmail}>`,
      to: [OPERATIONAL_ALERT_EMAIL],
      reply_to: payload.email,
      subject: `New Cedar consultation request - ${payload.company || payload.name}`,
      html: buildConsultationSummary(payload),
    }),
  });

  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      responseBody?.message ||
        responseBody?.error?.message ||
        `Resend request failed with status ${response.status}.`
    );
  }

  return { configured: true };
}

async function sendFormSubmitAlert(payload) {
  const formData = new FormData();
  formData.set("name", payload.name);
  formData.set("email", payload.email);
  formData.set("phone", payload.phone);
  formData.set("company", payload.company);
  formData.set("website", payload.website);
  formData.set("projectType", payload.projectType);
  formData.set("details", payload.details);
  formData.set(
    "_subject",
    `Cedar & Signal Consultation Request - ${payload.company || payload.name}`
  );
  formData.set("_template", "table");
  formData.set("_replyto", payload.email);
  formData.set("_honey", "");

  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Origin: SITE_ORIGIN,
      Referer: `${SITE_ORIGIN}/`,
    },
    body: formData,
  });

  const responseBody = await response.json().catch(() => null);

  if (!response.ok || responseBody?.success === "false") {
    throw new Error(
      responseBody?.message || "Unable to relay consultation request."
    );
  }
}

async function upsertHubSpotContact(payload) {
  if (!HUBSPOT_ACCESS_TOKEN) {
    return { configured: false };
  }

  const [firstName = "", ...rest] = payload.name.split(/\s+/);
  const lastName = rest.join(" ");
  const properties = {
    email: payload.email,
    firstname: firstName,
    lastname: lastName,
    company: payload.company,
    phone: payload.phone,
    website: payload.website,
  };

  if (HUBSPOT_NOTES_PROPERTY) {
    properties[HUBSPOT_NOTES_PROPERTY] = [
      `Project Type: ${payload.projectType}`,
      `Details: ${payload.details}`,
    ].join("\n");
  }

  if (HUBSPOT_SOURCE_PROPERTY) {
    properties[HUBSPOT_SOURCE_PROPERTY] = HUBSPOT_SOURCE_VALUE;
  }

  const searchResponse = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts/search",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: payload.email,
              },
            ],
          },
        ],
        properties: ["email"],
        limit: 1,
      }),
    }
  );

  const searchPayload = await searchResponse.json().catch(() => null);

  if (!searchResponse.ok) {
    throw new Error(
      searchPayload?.message ||
        `HubSpot search failed with status ${searchResponse.status}.`
    );
  }

  const existingId = searchPayload?.results?.[0]?.id;
  const endpoint = existingId
    ? `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`
    : "https://api.hubapi.com/crm/v3/objects/contacts";
  const method = existingId ? "PATCH" : "POST";

  const upsertResponse = await fetch(endpoint, {
    method,
    headers: {
      Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });

  const upsertPayload = await upsertResponse.json().catch(() => null);

  if (!upsertResponse.ok) {
    throw new Error(
      upsertPayload?.message ||
        `HubSpot upsert failed with status ${upsertResponse.status}.`
    );
  }

  return {
    configured: true,
    id: upsertPayload?.id || existingId || null,
  };
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      route: "/api/consultation",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const payload = req.body || {};
    const body = {
      name: getTrimmedString(payload.name),
      email: getTrimmedString(payload.email),
      phone: getTrimmedString(payload.phone),
      company: getTrimmedString(payload.company),
      website: getTrimmedString(payload.website),
      projectType: getTrimmedString(payload.projectType),
      details: getTrimmedString(payload.details),
      honey: getTrimmedString(payload.honey),
    };

    if (body.honey) {
      return res.status(200).json({ ok: true, spamBlocked: true });
    }

    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.company ||
      !body.website ||
      !body.projectType ||
      !body.details
    ) {
      return res.status(400).json({
        ok: false,
        message: "Missing required consultation fields.",
      });
    }

    try {
      const resendResult = await sendResendAlert(body);
      if (resendResult.configured) {
        console.log("Cedar consultation alert sent with Resend.", {
          email: body.email,
        });
      } else {
        await sendFormSubmitAlert(body);
      }
    } catch (alertError) {
      console.error("Cedar consultation alert failed.", alertError);
      throw alertError;
    }

    try {
      const hubspotResult = await upsertHubSpotContact(body);
      if (hubspotResult.configured) {
        console.log("Cedar HubSpot contact synced.", {
          email: body.email,
          id: hubspotResult.id,
        });
      }
    } catch (hubspotError) {
      console.error("Cedar HubSpot sync failed.", hubspotError);
    }

    return res.status(200).json({
      ok: true,
      message:
        "Consultation request received. We’ll review it and reach out with next steps.",
    });
  } catch (error) {
    console.error("Consultation submission failed", error);

    return res.status(500).json({
      ok: false,
      message:
        "We couldn’t send your request just now. Please try again or email kyle@cedarandsignal.com.",
    });
  }
}
