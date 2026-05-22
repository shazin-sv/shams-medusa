import ComingSoonPage from "@/modules/coming-soon"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coming Soon | Shams Tools",
  description: "We are building something new. Subscribe or request a quote while we launch.",
}

export default function Page() {
  return <ComingSoonPage />
}
