import InteractiveLink from "@/modules/common/components/interactive-link"
import { Heading, Text } from "@medusajs/ui"

const EmptyCartMessage = () => {
  return (
    <div
      className="surface-card flex flex-col items-start px-6 py-14 small:px-8"
      data-testid="empty-cart-message"
    >
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d59a00]">
        Your cart
      </div>
      <Heading level="h1" className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-slate-950">
        Your cart is empty
      </Heading>
      <Text className="mb-6 mt-4 max-w-[32rem] text-sm leading-7 text-slate-500">
        You don&apos;t have anything in your cart yet. Start browsing products and add the items you need.
      </Text>
      <div>
        <InteractiveLink href="/store">Explore products</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
