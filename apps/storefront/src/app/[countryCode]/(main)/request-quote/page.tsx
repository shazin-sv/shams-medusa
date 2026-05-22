import GuestRequestQuoteForm from "@/modules/quotes/components/guest-request-quote-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request a Quote | Shams Tools",
  description:
    "Request a volume or freight quote. No account required — submit your product links and quantities.",
}

export default function RequestQuotePage() {
  return (
    <div className="request-quote-zoom min-h-[70vh] bg-[#f3f3f3] py-12 small:py-16">
      <style>{`
        .request-quote-zoom {
          zoom: 0.8;
        }
        @supports not (zoom: 0.8) {
          .request-quote-zoom {
            transform: scale(0.8);
            transform-origin: top center;
            width: 125%;
            margin-left: -12.5%;
          }
        }
      `}</style>
      <div className="content-container">
        <GuestRequestQuoteForm />
      </div>
    </div>
  )
}
