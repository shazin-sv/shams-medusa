import ShoppingBag from "@/modules/common/icons/shopping-bag"

export default function SkeletonCartButton() {
  return (
    <button className="flex items-center gap-2 border border-black px-3 py-1">
      <ShoppingBag className="w-4 h-4" />
      <span className="font-mono text-xs uppercase tracking-widest hidden small:inline-block">
        Cart
      </span>
      <span className="bg-black text-white font-mono text-[10px] px-1.5">
        0
      </span>
    </button>
  )
}
