import { useMemo } from "react";
import { DataTable } from "../../../../admin/components";
import { useDataTable } from "../../../../admin/hooks";
import { useQuoteRequests, useQuotes } from "../../../../admin/hooks/api";
import { useQuotesTableColumns } from "./table/columns";
import { useQuotesTableFilters } from "./table/filters";
import { useQuotesTableQuery } from "./table/query";

const PAGE_SIZE = 50;
const PREFIX = "quo";

export const QuotesTable = () => {
  const { searchParams, raw } = useQuotesTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX,
  });

  const {
    quotes = [],
    count: quotesCount = 0,
    isPending: quotesLoading,
  } = useQuotes({
    ...searchParams,
    fields:
      "+draft_order.total,+draft_order.customer.email,*draft_order.customer.employee.company",
    order: "-created_at",
  });

  const {
    quote_requests: quoteRequests = [],
    count: requestsCount = 0,
    isPending: requestsLoading,
  } = useQuoteRequests({
    limit: PAGE_SIZE,
    offset: 0,
  });

  const tableRows = useMemo(() => {
    const guestRows = quoteRequests.map((request) => ({
      id: request.id,
      _isGuestRequest: true,
      status: request.status,
      created_at: request.created_at,
      draft_order: {
        display_id: request.display_id,
        total: null,
        currency_code: "",
        customer: {
          email: request.email,
          employee: {
            company: {
              name: request.company || "—",
            },
          },
        },
      },
    }));

    const cartQuoteRows = quotes.map((quote) => ({
      ...quote,
      _isGuestRequest: false,
    }));

    return [...guestRows, ...cartQuoteRows].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [quoteRequests, quotes]);

  const columns = useQuotesTableColumns();
  const filters = useQuotesTableFilters();

  const { table } = useDataTable({
    data: tableRows,
    columns,
    enablePagination: true,
    count: quotesCount + requestsCount,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className="flex size-full flex-col overflow-hidden">
      <DataTable
        columns={columns}
        table={table}
        pagination
        navigateTo={(row) =>
          row.original._isGuestRequest
            ? `/quotes/request/${row.original.id}`
            : `/quotes/${row.original.id}`
        }
        filters={filters}
        count={quotesCount + requestsCount}
        search
        isLoading={quotesLoading || requestsLoading}
        pageSize={PAGE_SIZE}
        orderBy={["id", "created_at"]}
        queryObject={raw}
        noRecords={{
          title: "No quotes found",
          message:
            "Quote requests from the storefront form and cart-based quotes will appear here.",
        }}
      />
    </div>
  );
};
