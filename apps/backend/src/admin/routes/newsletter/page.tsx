import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Envelope } from "@medusajs/icons";
import {
  Button,
  Container,
  Heading,
  Input,
  Label,
  Table,
  Text,
  Textarea,
  Toaster,
  toast,
} from "@medusajs/ui";
import { useState } from "react";
import {
  useCreateNewsletterCampaign,
  useNewsletterCampaigns,
  useNewsletterSubscribers,
  useSendNewsletterCampaign,
  useUpdateNewsletterCampaign,
} from "../../hooks/api";

const NewsletterPage = () => {
  const { data: subscribersData, isPending: loadingSubscribers } =
    useNewsletterSubscribers();
  const { data: campaignsData, isPending: loadingCampaigns } =
    useNewsletterCampaigns();

  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [html, setHtml] = useState("<h1>Shamstools Newsletter</h1><p>Add your campaign content here.</p>");
  const [testEmail, setTestEmail] = useState("");
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(null);
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [editSubject, setEditSubject] = useState("");
  const [editPreviewText, setEditPreviewText] = useState("");
  const [editHtml, setEditHtml] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  const createCampaign = useCreateNewsletterCampaign({
    onSuccess: () => {
      toast.success("Campaign created");
      setSubject("");
      setPreviewText("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create campaign");
    },
  });

  const updateCampaign = useUpdateNewsletterCampaign({
    onSuccess: () => {
      toast.success("Campaign updated");
      setEditingCampaignId(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update campaign");
    },
  });

  const sendCampaign = useSendNewsletterCampaign(activeCampaignId || "", {
    onSuccess: (data) => {
      toast.success(
        data?.recipients
          ? `Campaign sent to ${data.recipients} recipients`
          : "Campaign sent"
      );
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send campaign");
    },
  });

  const campaigns = campaignsData?.campaigns || [];
  const subscribers = subscribersData?.subscribers || [];

  return (
    <>
      <div className="flex flex-col gap-6">
        <Container className="flex flex-col gap-6 p-6">
          <div>
            <Heading level="h1">Newsletter</Heading>
            <Text className="text-ui-fg-subtle mt-2">
              Manage subscribers and send bulk newsletter campaigns from the admin panel.
            </Text>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <Text className="text-ui-fg-subtle">Subscribers</Text>
              <Heading level="h2" className="mt-2">
                {loadingSubscribers ? "..." : subscribers.length}
              </Heading>
            </div>
            <div className="rounded-lg border p-4">
              <Text className="text-ui-fg-subtle">Campaigns</Text>
              <Heading level="h2" className="mt-2">
                {loadingCampaigns ? "..." : campaigns.length}
              </Heading>
            </div>
          </div>
        </Container>

        <Container className="p-6">
          <Heading level="h2">Create campaign</Heading>
          <div className="mt-4 grid gap-4">
            <div>
              <Label>Subject</Label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <Label>Preview text</Label>
              <Input value={previewText} onChange={(e) => setPreviewText(e.target.value)} />
            </div>
            <div>
              <Label>HTML content</Label>
              <Textarea
                rows={10}
                value={html}
                onChange={(e) => setHtml(e.target.value)}
              />
            </div>
            <div>
              <Button
                onClick={() =>
                  createCampaign.mutate({
                    subject,
                    preview_text: previewText,
                    html,
                  })
                }
                disabled={!subject || !html || createCampaign.isPending}
              >
                Create campaign
              </Button>
            </div>
          </div>
        </Container>

        <Container className="p-0 overflow-hidden">
          <div className="p-6 border-b">
            <Heading level="h2">Subscribers</Heading>
          </div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Source</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {subscribers.map((subscriber) => (
                <Table.Row key={subscriber.id}>
                  <Table.Cell>{subscriber.email}</Table.Cell>
                  <Table.Cell>
                    {[subscriber.first_name, subscriber.last_name].filter(Boolean).join(" ") || "-"}
                  </Table.Cell>
                  <Table.Cell>{subscriber.status}</Table.Cell>
                  <Table.Cell>{subscriber.source || "-"}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>

        <Container className="p-0 overflow-hidden">
          <div className="p-6 border-b">
            <Heading level="h2">Campaigns</Heading>
          </div>
          <div className="p-6 border-b flex gap-3 items-end">
            <div className="flex-1">
              <Label>Test email (optional)</Label>
              <Input value={testEmail} onChange={(e) => setTestEmail(e.target.value)} />
            </div>
          </div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Subject</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Sent at</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {campaigns.map((campaign) => (
                <Table.Row key={campaign.id}>
                  <Table.Cell>{campaign.subject}</Table.Cell>
                  <Table.Cell>{campaign.status}</Table.Cell>
                  <Table.Cell>{campaign.sent_at || "-"}</Table.Cell>
                  <Table.Cell>
                    <Button
                      size="small"
                      onClick={() => {
                        setActiveCampaignId(campaign.id)
                        sendCampaign.mutate({
                          test_email: testEmail || undefined,
                          recipients: selectedRecipients.length ? selectedRecipients : undefined,
                        })
                      }}
                      disabled={sendCampaign.isPending}
                    >
                      Send
                    </Button>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => {
                        setEditingCampaignId(campaign.id)
                        setEditSubject(campaign.subject)
                        setEditPreviewText(campaign.preview_text || "")
                        setEditHtml(campaign.html)
                      }}
                    >
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>

        <Container className="p-6">
          <Heading level="h2">Select recipients</Heading>
          <Text className="text-ui-fg-subtle mt-2">
            Leave empty to send to all subscribed newsletter recipients.
          </Text>
          <div className="mt-4 grid gap-2 max-h-[280px] overflow-auto">
            {subscribers.map((subscriber) => {
              const checked = selectedRecipients.includes(subscriber.email)

              return (
                <label key={subscriber.id} className="flex items-center gap-3 rounded border p-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      setSelectedRecipients((current) =>
                        e.target.checked
                          ? [...current, subscriber.email]
                          : current.filter((email) => email !== subscriber.email)
                      )
                    }}
                  />
                  <div>
                    <Text>{subscriber.email}</Text>
                    <Text className="text-ui-fg-subtle text-sm">
                      {[subscriber.first_name, subscriber.last_name].filter(Boolean).join(" ") || "No name"}
                    </Text>
                  </div>
                </label>
              )
            })}
          </div>
        </Container>

        {editingCampaignId && (
          <Container className="p-6">
            <Heading level="h2">Edit campaign</Heading>
            <div className="mt-4 grid gap-4">
              <div>
                <Label>Subject</Label>
                <Input value={editSubject} onChange={(e) => setEditSubject(e.target.value)} />
              </div>
              <div>
                <Label>Preview text</Label>
                <Input value={editPreviewText} onChange={(e) => setEditPreviewText(e.target.value)} />
              </div>
              <div>
                <Label>HTML content</Label>
                <Textarea rows={10} value={editHtml} onChange={(e) => setEditHtml(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    updateCampaign.mutate({
                      id: editingCampaignId,
                      subject: editSubject,
                      preview_text: editPreviewText,
                      html: editHtml,
                    })
                  }
                  disabled={!editSubject || !editHtml || updateCampaign.isPending}
                >
                  Save changes
                </Button>
                <Button variant="secondary" onClick={() => setEditingCampaignId(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Container>
        )}
      </div>
      <Toaster />
    </>
  );
};

export const config = defineRouteConfig({
  label: "Newsletter",
  icon: Envelope,
});

export default NewsletterPage;
