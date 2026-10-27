"use client";

import { useState } from "react";
import { Product } from "@/types";
import ImageGallery from "@/components/ImageGallery";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, calculateDiscount, getDisplayPrice } from "@/lib/utils";
import {
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Share2,
  ArrowLeft,
  Check,
} from "lucide-react";
import Link from "next/link";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    setIsAddingToCart(true);
    addItem(product, selectedSize, quantity);

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Shop
        </Link>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleShare}
            className="rounded-full p-2 text-ink transition-colors hover:bg-sand"
            aria-label="Share this shirt"
          >
            {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setIsWishlisted((value) => !value)}
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? "Remove from saved" : "Save this shirt"}
            className={`rounded-full p-2 transition-colors ${
              isWishlisted ? "bg-clay text-paper" : "text-ink hover:bg-sand"
            }`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ImageGallery images={product.images} title={product.title} />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="flex flex-wrap gap-2">
            {product.isNew && (
              <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream">
                New
              </span>
            )}
            {product.isOnSale && product.originalPrice && (
              <span className="rounded-full bg-clay px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper">
                −{calculateDiscount(product.originalPrice, product.price)}%
              </span>
            )}
            {!product.inStock && (
              <span className="rounded-full bg-sand px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Sold out
              </span>
            )}
          </div>

          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-clay-deep">
            {[product.league, product.club, product.category]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight">
            {product.title}
          </h1>
          <p className="mt-2 text-sm text-muted">{product.brand}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl tracking-tight">
              {formatPrice(getDisplayPrice(product))}
            </span>
            {product.originalPrice && (
              <span className="mb-1 text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10 text-sm">
            {product.season && (
              <div className="flex justify-between py-3">
                <dt className="text-muted">Season</dt>
                <dd>{product.season}</dd>
              </div>
            )}
            {product.material && (
              <div className="flex justify-between py-3">
                <dt className="text-muted">Material</dt>
                <dd>{product.material}</dd>
              </div>
            )}
            <div className="flex justify-between py-3">
              <dt className="text-muted">Availability</dt>
              <dd className={product.inStock ? "text-moss" : "text-clay"}>
                {product.inStock ? "In stock" : "Out of stock"}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Size</h2>
              {sizeError && (
                <p className="text-sm text-clay">Choose a size to continue.</p>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`min-w-12 rounded-full border px-3 py-2 text-sm transition-colors ${
                    selectedSize === size
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-medium">Quantity</h2>
            <div className="mt-3 inline-flex items-center rounded-full border border-ink/15">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
                className="p-3"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Increase quantity"
                className="p-3"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-sm font-medium text-paper transition-colors hover:bg-clay-deep disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted"
          >
            <ShoppingBag className="h-4 w-4" />
            {isAddingToCart
              ? "Added to cart"
              : product.inStock
                ? "Add to cart"
                : "Out of stock"}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            {copied ? "Link copied." : "Shipping shows as free in the cart."}
          </p>
        </div>
      </div>
    </div>
  );
}
