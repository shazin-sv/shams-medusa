import { clx } from "@medusajs/ui"

const Divider = ({ className }: { className?: string }) => (
  <div className={clx("my-4 h-px w-full bg-slate-200", className)} />
)

export default Divider
