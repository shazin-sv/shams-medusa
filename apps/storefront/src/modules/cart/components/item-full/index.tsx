"use client"

import { useCart } from "@/lib/context/cart-context"
import AddNoteButton from "@/modules/cart/components/add-note-button"
import DeleteButton from "@/modules/common/components/delete-button"
import LineItemPrice from "@/modules/common/components/line-item-price"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Spinner from "@/modules/common/icons/spinner"
import Thumbnail from "@/modules/products/components/thumbnail"
import { HttpTypes } from "@medusajs/types"
import { Input, clx } from "@medusajs/ui"
import { startTransition, useEffect, useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  showBorders?: boolean
  currencyCode: string
  disabled?: boolean
}

const ItemFull = ({
  item,
  showBorders = true,
  currencyCode,
  disabled,
}: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [quantity, setQuantity] = useState(item.quantity.toString())

  const { handleDeleteItem, handleUpdateCartQuantity } = useCart()

  const changeQuantity = async (newQuantity: number) => {
    startTransition(() => {
      setQuantity(newQuantity.toString())
    })

    await handleUpdateCartQuantity(item.id, Number(newQuantity))
  }

  useEffect(() => {
    setQuantity(item.quantity.toString())
  }, [item.quantity])

  const maxQuantity = item.variant?.inventory_quantity ?? 100

  const handleBlur = (value: number) => {
    if (value === item.quantity) {
      return
    }

    if (value > maxQuantity) {
      changeQuantity(maxQuantity)
      return
    }

    if (value < 1) {
      setUpdating(true)
      handleDeleteItem(item.id)
      setUpdating(false)
      return
    }

    changeQuantity(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }

    if (e.key === "Enter") {
      changeQuantity(Number(quantity))
    }

    if (e.key === "ArrowUp" && e.shiftKey) {
      e.preventDefault()
      setQuantity((Number(quantity) + 10).toString())
    }

    if (e.key === "ArrowDown" && e.shiftKey) {
      e.preventDefault()
      setQuantity((Number(quantity) - 10).toString())
    }
  }

  return (
    <div
      className={clx(
        "rounded-3xl border border-slate-200 bg-white p-4 small:p-5",
        !showBorders && "border-none shadow-none"
      )}
    >
      <div className="flex flex-col gap-4 small:flex-row small:items-start small:justify-between">
        <div className="flex gap-4">
          <LocalizedClientLink href={`/products/${item.product_handle}`}>
            <Thumbnail
              thumbnail={item.thumbnail}
              size="square"
              type="full"
              className="h-24 w-24 rounded-2xl bg-slate-100"
            />
          </LocalizedClientLink>
          <div className="flex flex-col gap-y-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Product
              </span>
              <div className="mt-1 text-base font-bold text-slate-950">
                {item.product?.title}
              </div>
              <div className="mt-1 text-sm text-slate-500">{item.variant?.title}</div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                <button
                  className={clx(
                    "h-7 w-7 rounded-full text-base text-slate-600 hover:bg-white",
                    disabled ? "pointer-events-none opacity-50" : "opacity-100"
                  )}
                  onClick={() => changeQuantity(item.quantity - 1)}
                  disabled={item.quantity <= 1 || disabled}
                >
                  -
                </button>
                <span className="flex h-7 w-12 items-center justify-center text-sm text-slate-950">
                  {updating ? (
                    <Spinner size="12" />
                  ) : (
                    <Input
                      className={clx(
                        "h-7 w-12 border-0 bg-transparent p-0 text-center text-sm text-slate-950 shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                        disabled ? "pointer-events-none opacity-50" : "opacity-100"
                      )}
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      onBlur={(e) => handleBlur(Number(e.target.value))}
                      onKeyDown={(e) => handleKeyDown(e)}
                      disabled={disabled}
                    />
                  )}
                </span>
                <button
                  className={clx(
                    "h-7 w-7 rounded-full text-base text-slate-600 hover:bg-white",
                    disabled ? "pointer-events-none opacity-50" : "opacity-100"
                  )}
                  onClick={() => changeQuantity(item.quantity + 1)}
                  disabled={item.quantity >= maxQuantity || disabled}
                >
                  +
                </button>
              </div>

              <DeleteButton id={item.id} disabled={disabled} />
              <AddNoteButton item={item as HttpTypes.StoreCartLineItem} disabled={disabled} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 small:items-end">
          <LineItemPrice
            className="flex"
            item={item}
            currencyCode={currencyCode}
            style="default"
          />
        </div>
      </div>
    </div>
  )
}

export default ItemFull
