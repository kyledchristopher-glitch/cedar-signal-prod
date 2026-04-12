const CONSULTATION_EMAIL = "kyle@cedarandsignal.com";
const CONSULTATION_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONSULTATION_EMAIL}`;

function getTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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
    const name = getTrimmedString(payload.name);
    const email = getTrimmedString(payload.email);
    const phone = getTrimmedString(payload.phone);
    const company = getTrimmedString(payload.company);
    const website = getTrimmedString(payload.website);
    const projectType = getTrimmedString(payload.projectType);
    const details = getTrimmedString(payload.details);
    const honey = getTrimmedString(payload.honey);

    if (honey) {
      return res.status(200).json({
        ok: true,
        spamBlocked: true,
      });
    }

    if (!name || !email || !phone || !company || !website || !projectType || !details) {
      return res.status(400).json({
        ok: false,
        message: "Missing required consultation fields.",
      });
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("company", company);
    formData.set("website", website);
    formData.set("projectType", projectType);
    formData.set("details", details);
    formData.set(
      "_subject",
      `Cedar & Signal Consultation Request${company ? ` - ${company}` : name ? ` - ${name}` : ""}`
    );
    formData.set("_template", "table");
    formData.set("_replyto", email);
    formData.set("_honey", "");

    const response = await fetch(CONSULTATION_SUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const responseBody = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(responseBody?.message || "Unable to submit consultation request.");
    }

    return res.status(200).json({
      ok: true,
      message: "Consultation request received. We’ll review it and reach out with next steps.",
    });
  } catch (error) {
    console.error("Consultation submission failed", error);

    return res.status(500).json({
      ok: false,
      message: "We couldn’t send your request just now. Please try again or email kyle@cedarandsignal.com.",
    });
  }
}
