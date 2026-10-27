"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, calculateDiscount, getDisplayPrice } from "@/lib/utils";
import { useState } from "react";
import YupooImage from "./YupooImage";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

export default function ProductCard({
  product,
  layout = "grid",
}: ProductCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleViewDetails = () => {
    if (!product.inStock) return;
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false);
      router.push(`/products/${product.id}`);
    }, 500);
  };

  const price = (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-2xl tracking-tight text-ink">
        {formatPrice(getDisplayPrice(product))}
      </span>
      {product.originalPrice && (
        <span className="text-sm text-muted line-through">
          {formatPrice(product.originalPrice)}
        </span>
      )}
    </div>
  );

  const badges = (
    <div className="flex flex-wrap gap-2">
      {product.isNew && (
        <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream">
          New
        </span>
      )}
      {product.isOnSale && product.originalPrice && (
        <span className="rounded-full bg-clay px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper">
          −{calculateDiscount(product.originalPrice, product.price)}%
        </span>
      )}
      {!product.inStock && (
        <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Sold out
        </span>
      )}
    </div>
  );

  if (layout === "list") {
    return (
      <article className="group grid grid-cols-1 gap-4 rounded-[1.75rem] border border-ink/10 bg-cream p-3 transition-colors hover:border-ink/25 sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-6 sm:p-4">
        <Link
          href={`/products/${product.id}`}
          className="relative aspect-square overflow-hidden rounded-2xl bg-sand sm:aspect-[4/5]"
        >
          <YupooImage
            src={product.images[0]}
            alt={product.title}
            width={360}
            height={450}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-clay-deep">
            {product.category}
            {product.league ? ` · ${product.league}` : ""}
          </p>
          <Link href={`/products/${product.id}`}>
            <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-ink">
              {product.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-muted">{product.brand}</p>
          <div className="mt-3">{price}</div>
        </div>
        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
          {badges}
          <button
            type="button"
            onClick={handleViewDetails}
            disabled={!product.inStock || isNavigating}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-cream transition-colors hover:bg-pitch disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted"
          >
            {isNavigating ? "Opening" : product.inStock ? "View" : "Sold out"}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-ink/25">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link href={`/products/${product.id}`} className="block h-full">
          <YupooImage
            src={product.images[0]}
            alt={product.title}
            width={480}
            height={600}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3">{badges}</div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-clay-deep">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-2 line-clamp-2 font-display text-[1.35rem] leading-tight tracking-tight text-ink">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted">{product.brand}</p>
        <div className="mt-4">{price}</div>
        <button
          type="button"
          onClick={handleViewDetails}
          disabled={!product.inStock || isNavigating}
          className="mt-5 inline-flex items-center justify-between rounded-full bg-ink px-4 py-3 text-sm text-cream transition-colors hover:bg-pitch disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted"
        >
          <span>
            {isNavigating
              ? "Opening"
              : product.inStock
                ? "View shirt"
                : "Sold out"}
          </span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
