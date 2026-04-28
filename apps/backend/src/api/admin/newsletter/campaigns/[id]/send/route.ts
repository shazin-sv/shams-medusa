import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import nodemailer from "nodemailer";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { NEWSLETTER_MODULE } from "../../../../../../modules/newsletter";
import { AdminSendNewsletterCampaignType } from "../../../validators";

function readEnvValue(key: string) {
  const direct = process.env[key];

  if (direct) {
    return direct;
  }

  const envPath = join(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return undefined;
  }

  const line = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${key}=`));

  if (!line) {
    return undefined;
  }

  return line.slice(key.length + 1).trim();
}

function getTransporter() {
  const host = readEnvValue("EMAIL_HOST");
  const port = Number(readEnvValue("EMAIL_PORT") || 587);
  const user = readEnvValue("EMAIL_USER");
  const pass = readEnvValue("EMAIL_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user
      ? {
          user,
          pass,
        }
      : undefined,
  });
}

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminSendNewsletterCampaignType>,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const campaignId = req.params.id;

  const [campaign] = await newsletterService.listCampaigns({ id: campaignId });

  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  const recipients = req.validatedBody.test_email
    ? [{ email: req.validatedBody.test_email }]
    : req.validatedBody.recipients?.length
      ? req.validatedBody.recipients.map((email) => ({ email }))
      : await newsletterService.listSubscribers({ status: "subscribed" }, { take: 1000 });

  const transporter = getTransporter();
  const emailFrom = readEnvValue("EMAIL_FROM");
  const emailUser = readEnvValue("EMAIL_USER");
  const from = emailFrom || (emailUser ? `Shamstools <${emailUser}>` : undefined);

  if (!from) {
    return res.status(400).json({ message: "SMTP sender is not configured" });
  }

  const sendingResult = await newsletterService.updateCampaigns({
    id: campaign.id,
    status: "sending",
  });
  const sendingCampaign = Array.isArray(sendingResult)
    ? sendingResult[0]
    : sendingResult;

  try {
    for (const recipient of recipients) {
      await transporter.sendMail({
        from,
        to: recipient.email,
        subject: campaign.subject,
        html: campaign.html,
      });
    }

    const updatedResult = await newsletterService.updateCampaigns({
      id: campaign.id,
      status: "sent",
      sent_at: new Date(),
    });
    const updated = Array.isArray(updatedResult)
      ? updatedResult[0]
      : updatedResult;

    return res.json({
      campaign: updated,
      recipients: recipients.length,
    });
  } catch (error: any) {
    const failedResult = await newsletterService.updateCampaigns({
      id: campaign.id,
      status: "failed",
    });
    const updated = Array.isArray(failedResult)
      ? failedResult[0]
      : failedResult;

    return res.status(500).json({
      campaign: updated ?? sendingCampaign ?? campaign,
      message: error?.message || "Failed to send newsletter campaign",
    });
  }
};
