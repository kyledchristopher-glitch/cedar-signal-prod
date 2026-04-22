export const config = {
  api: {
    bodyParser: false,
  },
};

type ApiRequest = {
  method?: string;
};

type ApiResponse = {
  status: (code: number) => {
    json: (body: Record<string, unknown>) => void;
  };
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Intake integration point:
  // Connect this endpoint to your CRM, email provider, database, or file storage.
  // Useful env vars to add later:
  // INTAKE_WEBHOOK_URL, INTAKE_NOTIFICATION_EMAIL, INTAKE_UPLOAD_BUCKET.
  return res.status(200).json({
    ok: true,
    mode: "scaffold",
    next: "Connect INTAKE_WEBHOOK_URL or your preferred CRM/storage API.",
  });
}
