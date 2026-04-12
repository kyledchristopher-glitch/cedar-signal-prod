import { processDueOnboardingEmails } from "./_lib/onboarding";

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  try {
    const result = await processDueOnboardingEmails();
    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error("Cedar onboarding cron failed.", error);
    return res
      .status(500)
      .json({ ok: false, message: "Onboarding cron failed." });
  }
}
