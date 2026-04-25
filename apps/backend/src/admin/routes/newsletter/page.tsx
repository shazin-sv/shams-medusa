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
  exportNewsletterSubscribersCsv,
  useDeleteNewsletterSubscriber,
  useImportNewsletterSubscribers,
  useNewsletterSubscribers,
} from "../../hooks/api";

const NewsletterPage = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [importText, setImportText] = useState("");
  const { data: subscribersData, isPending: loadingSubscribers } =
    useNewsletterSubscribers(
      {
        from: fromDate ? new Date(`${fromDate}T00:00:00.000Z`).toISOString() : undefined,
        to: toDate ? new Date(`${toDate}T23:59:59.999Z`).toISOString() : undefined,
      }
    );

  const deleteSubscriber = useDeleteNewsletterSubscriber({
    onSuccess: () => {
      toast.success("Subscriber deleted");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete subscriber");
    },
  });

  const importSubscribers = useImportNewsletterSubscribers({
    onSuccess: (data) => {
      toast.success(`Imported ${data?.count || 0} subscribers`);
      setImportText("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to import subscribers");
    },
  });

  const subscribers = subscribersData?.subscribers || [];

  return (
    <>
      <div className="flex flex-col gap-6">
        <Container className="flex flex-col gap-6 p-6">
          <div>
            <Heading level="h1">Newsletter</Heading>
            <Text className="text-ui-fg-subtle mt-2">
              View newsletter subscribers, import CSV data, and export subscribers by date range.
            </Text>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            <div className="rounded-lg border p-4">
              <Text className="text-ui-fg-subtle">Subscribers</Text>
              <Heading level="h2" className="mt-2">
                {loadingSubscribers ? "..." : subscribers.length}
              </Heading>
            </div>
          </div>
        </Container>

        <Container className="p-6">
          <Heading level="h2">Export subscribers</Heading>
          <div className="mt-4 grid gap-4 md:grid-cols-3 md:items-end">
            <div>
              <Label>From date</Label>
              <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div>
              <Label>To date</Label>
              <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div>
              <Button
                onClick={async () => {
                  try {
                    const csv = await exportNewsletterSubscribersCsv({
                      from: fromDate ? new Date(`${fromDate}T00:00:00.000Z`).toISOString() : undefined,
                      to: toDate ? new Date(`${toDate}T23:59:59.999Z`).toISOString() : undefined,
                    })
                    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement("a")
                    link.href = url
                    link.download = "newsletter-subscribers.csv"
                    link.click()
                    URL.revokeObjectURL(url)
                  } catch (error: any) {
                    toast.error(error.message || "Failed to export subscribers")
                  }
                }}
              >
                Export CSV
              </Button>
            </div>
          </div>
        </Container>

        <Container className="p-6">
          <Heading level="h2">Import subscribers</Heading>
          <Text className="text-ui-fg-subtle mt-2">
            Paste CSV lines as: email,first_name,last_name. The date range above also filters the list below.
          </Text>
          <div className="mt-4 grid gap-4">
            <Textarea
              rows={8}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={"jane@example.com,Jane,Doe\njohn@example.com,John,Smith"}
            />
            <div>
              <Button
                onClick={() => {
                  const subscribers = importText
                    .split(/\r?\n/)
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((line) => {
                      const [email, first_name, last_name] = line.split(",").map((part) => part?.trim())

                      return {
                        email,
                        first_name: first_name || null,
                        last_name: last_name || null,
                        source: "admin-import",
                        status: "subscribed" as const,
                      }
                    })

                  importSubscribers.mutate({ subscribers })
                }}
                disabled={!importText.trim() || importSubscribers.isPending}
              >
                Import subscribers
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
                <Table.HeaderCell>Actions</Table.HeaderCell>
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
                  <Table.Cell>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => deleteSubscriber.mutate({ id: subscriber.id })}
                      disabled={deleteSubscriber.isPending}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>

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
