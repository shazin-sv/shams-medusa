"use client"

import { ArrowLeftMini, ArrowRightMini } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { clx, IconButton } from "@medusajs/ui"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"

type ImageGalleryProps = {
  product: HttpTypes.StoreProduct
}

const ImageGallery = ({ product }: ImageGalleryProps) => {
  const thumbnail = product?.thumbnail
  const images = useMemo(() => product?.images || [], [product])

  const [selectedImage, setSelectedImage] = useState(
    images[0] || {
      url: thumbnail,
      id: "thumbnail",
    }
  )
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleArrowClick = useCallback(
    (direction: "left" | "right") => {
      if (
        images.length === 0 ||
        (selectedImageIndex === 0 && direction === "left") ||
        (selectedImageIndex === images.length - 1 && direction === "right")
      ) {
        return
      }

      if (direction === "left") {
        setSelectedImageIndex((prev) => prev - 1)
        setSelectedImage(images[selectedImageIndex - 1])
      } else {
        setSelectedImageIndex((prev) => prev + 1)
        setSelectedImage(images[selectedImageIndex + 1])
      }
    },
    [images, selectedImageIndex]
  )

  const handleImageClick = useCallback(
    (image: HttpTypes.StoreProductImage) => {
      setSelectedImage(image)
      setSelectedImageIndex(images.findIndex((img) => img.id === image.id))
    },
    [images]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement instanceof HTMLInputElement) {
        return
      }

      if (e.key === "ArrowLeft") {
        handleArrowClick("left")
      } else if (e.key === "ArrowRight") {
        handleArrowClick("right")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleArrowClick])

  return (
    <div className="surface-card flex flex-col gap-5 overflow-hidden p-5 small:p-6">
      <div className="relative aspect-square overflow-hidden rounded-[24px] bg-slate-100" id={selectedImage.id}>
        {!!selectedImage.url && (
          <Image
            src={selectedImage.url}
            priority
            className="absolute inset-0 h-full w-full object-contain p-8"
            alt={(selectedImage.metadata?.alt as string) || product.title || ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>

      <div className="flex flex-col gap-4 small:flex-row small:items-center small:justify-between">
        <ul className="no-scrollbar flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <li key={image.id}>
              <button
                type="button"
                className={clx(
                  "relative h-20 w-20 overflow-hidden rounded-2xl border bg-slate-100",
                  index === selectedImageIndex
                    ? "border-slate-900"
                    : "border-slate-200"
                )}
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image.url}
                  alt={(image.metadata?.alt as string) || ""}
                  fill
                  className="object-contain p-2"
                />
              </button>
            </li>
          ))}
        </ul>

        {images.length > 1 && (
          <div className="flex gap-2 self-end small:self-auto">
            <IconButton
              disabled={selectedImageIndex === 0}
              className="rounded-full border border-slate-200 bg-white"
              onClick={() => handleArrowClick("left")}
            >
              <ArrowLeftMini />
            </IconButton>
            <IconButton
              disabled={selectedImageIndex === images.length - 1}
              className="rounded-full border border-slate-200 bg-white"
              onClick={() => handleArrowClick("right")}
            >
              <ArrowRightMini />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
