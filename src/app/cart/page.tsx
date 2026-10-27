"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, getDisplayPrice } from "@/lib/utils";
import YupooImage from "@/components/YupooImage";
import { Minus, Plus, Trash2, ArrowUpRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + getDisplayPrice(item.product) * item.quantity,
    0
  );

  const handleQuantityChange = (
    id: string,
    size: string,
    newQuantity: number
  ) => {
    setIsUpdating(`${id}-${size}`);
    updateQuantity(id, size, newQuantity);
    setTimeout(() => setIsUpdating(null), 500);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-4 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-display text-4xl tracking-tight">
          The cart is empty.
        </h1>
        <p className="mt-3 text-muted">
          Shirts you add stay in this browser until you check out or clear them.
        </p>
        <Link
          href="/products"
          className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-5 py-3 text-sm font-medium text-paper"
        >
          Shop the catalog
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay-deep">
            Cart
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
            {items.length} {items.length === 1 ? "shirt" : "shirts"} waiting
          </h1>
        </div>
        <Link
          href="/products"
          className="text-sm underline decoration-clay decoration-2 underline-offset-4"
        >
          Continue shopping
        </Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((item) => {
              const key = `${item.id}-${item.size}`;
              return (
                <li key={key} className="flex gap-4 py-6 sm:gap-6">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-sand sm:h-36 sm:w-28"
                  >
                    <YupooImage
                      src={item.product.images[0]}
                      alt={item.product.title}
                      width={200}
                      height={260}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-display text-xl leading-tight tracking-tight hover:text-clay-deep"
                        >
                          {item.product.title}
                        </Link>
                        <p className="mt-1 text-sm text-muted">
                          Size {item.size}
                          {item.product.brand ? ` · ${item.product.brand}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label="Remove shirt"
                        className="rounded-full p-2 text-muted hover:bg-sand hover:text-clay"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="inline-flex items-center rounded-full border border-ink/15">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={
                            item.quantity <= 1 || isUpdating === key
                          }
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="p-2 disabled:opacity-40"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={isUpdating === key}
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="p-2 disabled:opacity-40"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-2xl tracking-tight">
                        {formatPrice(
                          getDisplayPrice(item.product) * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 text-sm text-clay-deep"
          >
            Clear cart
          </button>
        </div>

        <aside className="h-fit rounded-[1.75rem] bg-pitch p-6 text-cream lg:sticky lg:top-28 lg:col-span-4">
          <h2 className="font-display text-2xl tracking-tight">Summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-cream/70">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cream/70">Shipping</dt>
              <dd>Free</dd>
            </div>
            <div className="flex justify-between border-t border-white/15 pt-3 font-display text-3xl">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 flex items-center justify-center rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            Checkout
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-cream/60">
            Payment is completed on Stripe. Checkout notes a 30-day return
            window.
          </p>
        </aside>
      </div>
    </div>
  );
}
