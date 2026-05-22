import { Container, Heading, Text } from "@medusajs/ui";
import { useParams } from "react-router-dom";
import QuoteStatusBadge from "../../components/quote-status-badge";
import { useQuoteRequest } from "../../../../hooks/api/quote-requests";
import type { QuoteRequestProductLine } from "../../../../../types/quote-request";

const QuoteRequestDetailsPage = () => {
  const { id } = useParams();
  const { quote_request: quoteRequest, isLoading } = useQuoteRequest(id!);

  if (isLoading || !quoteRequest) {
    return (
      <Container>
        <Text>Loading quote request...</Text>
      </Container>
    );
  }

  let products: QuoteRequestProductLine[] = [];

  try {
    products = JSON.parse(quoteRequest.products);
  } catch {
    products = [];
  }

  return (
    <Container className="flex flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <Heading level="h1">Quote request #{quoteRequest.display_id}</Heading>
        <QuoteStatusBadge status={quoteRequest.status} />
      </div>

      <div className="grid grid-cols-1 gap-4 small:grid-cols-2">
        <div>
          <Text size="small" weight="plus" leading="compact">
            Contact
          </Text>
          <Text size="small" leading="compact">
            {quoteRequest.first_name} {quoteRequest.last_name}
          </Text>
          <Text size="small" leading="compact">
            {quoteRequest.email}
          </Text>
          <Text size="small" leading="compact">
            {quoteRequest.phone}
          </Text>
        </div>

        <div>
          <Text size="small" weight="plus" leading="compact">
            Company
          </Text>
          <Text size="small" leading="compact">
            {quoteRequest.company || "—"}
          </Text>
        </div>

        <div className="small:col-span-2">
          <Text size="small" weight="plus" leading="compact">
            Address
          </Text>
          <Text size="small" leading="compact">
            {quoteRequest.street_address}
          </Text>
          <Text size="small" leading="compact">
            {quoteRequest.city}, {quoteRequest.state} {quoteRequest.zip}
          </Text>
        </div>

        <div>
          <Text size="small" weight="plus" leading="compact">
            Newsletter
          </Text>
          <Text size="small" leading="compact">
            {quoteRequest.newsletter_opt_in ? "Opted in" : "No"}
          </Text>
        </div>

        <div>
          <Text size="small" weight="plus" leading="compact">
            Submitted
          </Text>
          <Text size="small" leading="compact">
            {new Date(quoteRequest.created_at).toLocaleString()}
          </Text>
        </div>
      </div>

      <div>
        <Heading level="h2" className="mb-3">
          Products
        </Heading>
        <div className="flex flex-col gap-y-2">
          {products.map((line, index) => (
            <div
              key={`${line.link}-${index}`}
              className="rounded-md border border-ui-border-base p-3"
            >
              <Text size="small" weight="plus">
                Product link
              </Text>
              <Text size="small" className="break-all">
                {line.link}
              </Text>
              <Text size="small" weight="plus" className="mt-2">
                Quantity
              </Text>
              <Text size="small">{line.quantity}</Text>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default QuoteRequestDetailsPage;
