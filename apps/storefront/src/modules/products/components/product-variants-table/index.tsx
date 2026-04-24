import { addToCartEventBus } from "@/lib/data/cart-event-bus"
import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes, StoreProduct, StoreProductVariant } from "@medusajs/types"
import { Table, clx } from "@medusajs/ui"
import Button from "@/modules/common/components/button"
import BulkTableQuantity from "../bulk-table-quantity"
import { useState } from "react"

const ProductVariantsTable = ({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [lineItemsMap, setLineItemsMap] = useState<
    Map<
      string,
      StoreProductVariant & {
        product: StoreProduct
        quantity: number
      }
    >
  >(new Map())

  const totalQuantity = Array.from(lineItemsMap.values()).reduce(
    (acc, curr) => acc + curr.quantity,
    0
  )

  const handleQuantityChange = (variantId: string, quantity: number) => {
    setLineItemsMap((prev) => {
      const newLineItems = new Map(prev)

      if (!prev.get(variantId)) {
        newLineItems.set(variantId, {
          ...product.variants?.find((v) => v.id === variantId)!,
          product,
          quantity,
        })
      } else {
        newLineItems.set(variantId, {
          ...prev.get(variantId)!,
          quantity,
        })
      }

      return newLineItems
    })
  }

  const handleAddToCart = async () => {
    setIsAdding(true)

    const lineItems = Array.from(lineItemsMap.entries()).map(
      ([variantId, { quantity, ...variant }]) => ({
        productVariant: {
          ...variant,
        },
        quantity,
      })
    )

    addToCartEventBus.emitCartAdd({
      lineItems,
      regionId: region.id,
    })

    setIsAdding(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-2">
        <Table className="w-full overflow-hidden rounded-2xl border-none">
          <Table.Header className="border-t-0">
            <Table.Row className="border-none bg-slate-50 hover:!bg-slate-50">
              <Table.HeaderCell className="px-4">SKU</Table.HeaderCell>
              {product.options?.map((option) => {
                if (option.title === "Default option") {
                  return null
                }
                return (
                  <Table.HeaderCell key={option.id} className="border-x border-slate-200 px-4">
                    {option.title}
                  </Table.HeaderCell>
                )
              })}
              <Table.HeaderCell className="border-x border-slate-200 px-4">
                Price
              </Table.HeaderCell>
              <Table.HeaderCell className="px-4">Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="border-none">
            {product.variants?.map((variant, index) => {
              const { variantPrice } = getProductPrice({
                product,
                variantId: variant.id,
              })

              return (
                <Table.Row
                  key={variant.id}
                  className={clx({
                    "border-b-0": index === product.variants?.length! - 1,
                  })}
                >
                  <Table.Cell className="px-4 text-sm text-slate-700">{variant.sku}</Table.Cell>
                  {variant.options?.map((option) => {
                    if (option.value === "Default option value") {
                      return null
                    }
                    return (
                      <Table.Cell key={option.id} className="border-x border-slate-200 px-4 text-sm text-slate-700">
                        {option.value}
                      </Table.Cell>
                    )
                  })}
                  <Table.Cell className="border-x border-slate-200 px-4 text-sm font-semibold text-slate-950">
                    {variantPrice?.calculated_price}
                  </Table.Cell>
                  <Table.Cell className="!pr-1 pl-1">
                    <BulkTableQuantity
                      variantId={variant.id}
                      onChange={handleQuantityChange}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="grid gap-3 small:grid-cols-2">
        <Button
          onClick={handleAddToCart}
          variant="primary"
          className="w-full"
          isLoading={isAdding}
          disabled={totalQuantity === 0}
          data-testid="add-product-button"
        >
          {totalQuantity === 0 ? "Choose quantity" : "Add to cart"}
        </Button>
        <Button variant="secondary" className="w-full">
          Request quote
        </Button>
      </div>
    </div>
  )
}

export default ProductVariantsTable
