import { Toaster as MedusaToaster } from "@medusajs/ui"
import { Analytics } from "@vercel/analytics/next"
import { ToastContainer } from "@/modules/common/components/toast"
import "../styles/globals.css"

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative min-h-screen">{props.children}</main>
        <MedusaToaster className="z-[99999]" position="bottom-left" />
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  )
}
