"use client"

import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { XCircle } from "@medusajs/icons"
import * as Dialog from "@radix-ui/react-dialog"

export const RequestQuotePrompt = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[75]" />
      <Dialog.Content className="z-[100] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-white border border-black p-6 focus:outline-none">
        <Dialog.Title className="flex justify-between font-display text-xl font-bold mb-4">
          Request a Quote
          <Dialog.Close asChild>
            <button className="hover:bg-black hover:text-white p-1 transition-colors">
              <XCircle className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Title>

        <div className="font-body">
          <ol className="list-decimal ml-5 space-y-3 my-5">
            <li>
              <Dialog.Close asChild>
                <LocalizedClientLink
                  className="underline hover:opacity-60"
                  href="/account"
                >
                  Log in
                </LocalizedClientLink>
              </Dialog.Close>
              {" or "}
              <Dialog.Close>
                <LocalizedClientLink
                  className="underline hover:opacity-60"
                  href="/account"
                >
                  create an account
                </LocalizedClientLink>
              </Dialog.Close>
            </li>
            <li>Add products to your cart</li>
            <li>
              Open cart & click {'"'}Request a quote{'"'}
            </li>
          </ol>

          <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
            We will get back to you via email
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)