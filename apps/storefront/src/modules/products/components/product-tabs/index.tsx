"use client"

import { HttpTypes } from "@medusajs/types"
import { Table, Text } from "@medusajs/ui"
import Markdown from "react-markdown"
import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Description",
      component: <ProductSpecsTab product={product} />,
    },
    {
      label: "Specifications",
      component: <ProductSpecificationsTab product={product} />,
    },
  ]

  return (
    <div className="surface-card overflow-hidden">
      <Accordion type="multiple" className="flex flex-col gap-y-3 p-3 small:p-4">
        {tabs.map((tab, i) => (
          <Accordion.Item
            className="rounded-3xl border border-slate-200 bg-white px-4 small:px-6"
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductSpecsTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="py-6 small:w-2/3">
      <Markdown
        components={{
          p: ({ children }) => (
            <Text className="mb-3 text-sm leading-7 text-slate-600">{children}</Text>
          ),
          h2: ({ children }) => (
            <Text className="my-4 text-xl font-semibold text-slate-950">{children}</Text>
          ),
          h3: ({ children }) => (
            <Text className="mb-2 text-lg font-semibold text-slate-950">{children}</Text>
          ),
        }}
      >
        {product.description ? product.description : "No description available yet."}
      </Markdown>
    </div>
  )
}

const ProductSpecificationsTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="py-6">
      <Table className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <Table.Body>
          {product.weight && (
            <Table.Row>
              <Table.Cell className="border-r border-slate-200 font-semibold text-slate-950">
                Weight
              </Table.Cell>
              <Table.Cell className="px-4 text-slate-600">{product.weight} grams</Table.Cell>
            </Table.Row>
          )}
          {(product.height || product.width || product.length) && (
            <Table.Row>
              <Table.Cell className="border-r border-slate-200 font-semibold text-slate-950">
                Dimensions (H x W x L)
              </Table.Cell>
              <Table.Cell className="px-4 text-slate-600">
                {product.height}mm x {product.width}mm x {product.length}mm
              </Table.Cell>
            </Table.Row>
          )}

          {product.metadata &&
            Object.entries(product.metadata).map(([key, value]) => (
              <Table.Row key={key}>
                <Table.Cell className="border-r border-slate-200 font-semibold capitalize text-slate-950">
                  {key.replace(/_/g, " ")}
                </Table.Cell>
                <Table.Cell className="px-4 text-slate-600">
                  <p>{value as string}</p>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ProductTabs
