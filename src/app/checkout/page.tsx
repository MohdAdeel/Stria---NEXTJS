"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, getDisplayPrice } from "@/lib/utils";
import { CheckoutFormData } from "@/types";
import YupooImage from "@/components/YupooImage";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-clay";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, isReady } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });

  useEffect(() => {
    if (isReady && items.length === 0) {
      router.replace("/cart");
    }
  }, [isReady, items.length, router]);

  if (!isReady || items.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/15 border-t-clay" />
      </div>
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + getDisplayPrice(item.product) * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerEmail: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (checkoutError) {
      console.error("Checkout error:", checkoutError);
      setError("Checkout could not start. Check the form and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>
      <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
        Delivery, then Stripe.
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        These details stay with the order. Card payment happens on Stripe’s
        page after you continue.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8 lg:col-span-7">
          <section className="rounded-[1.75rem] border border-ink/10 bg-cream p-6 sm:p-8">
            <h2 className="font-display text-2xl tracking-tight">Contact</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              <Field label="Last name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              <Field label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} autoComplete="tel" />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-ink/10 bg-cream p-6 sm:p-8">
            <h2 className="font-display text-2xl tracking-tight">Address</h2>
            <div className="mt-5 grid gap-4">
              <Field label="Street" name="address" value={formData.address} onChange={handleInputChange} autoComplete="street-address" />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City" name="city" value={formData.city} onChange={handleInputChange} />
                <Field label="State" name="state" value={formData.state} onChange={handleInputChange} />
                <Field label="ZIP" name="zipCode" value={formData.zipCode} onChange={handleInputChange} autoComplete="postal-code" />
              </div>
              <label className="text-sm">
                Country
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className={fieldClass}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                </select>
              </label>
            </div>
          </section>
        </form>

        <aside className="h-fit rounded-[1.75rem] bg-ink p-6 text-cream lg:sticky lg:top-28 lg:col-span-5">
          <h2 className="font-display text-2xl tracking-tight">This order</h2>
          <ul className="mt-5 space-y-3">
            {items.map((item) => (
              <li
                key={`${item.id}-${item.size}`}
                className="flex gap-3 rounded-2xl bg-white/5 p-3"
              >
                <div className="h-16 w-14 overflow-hidden rounded-xl bg-sand">
                  <YupooImage
                    src={item.product.images[0]}
                    alt=""
                    width={80}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{item.product.title}</p>
                  <p className="text-xs text-cream/60">
                    Size {item.size} · Qty {item.quantity}
                  </p>
                  <p className="mt-1 text-sm">
                    {formatPrice(getDisplayPrice(item.product) * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-cream/70">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-cream/70">
              <dt>Shipping</dt>
              <dd>Free</dd>
            </div>
            <div className="flex justify-between pt-2 font-display text-3xl text-cream">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          {error && <p className="mt-4 text-sm text-red-200">{error}</p>}
          <button
            type="submit"
            form="checkout-form"
            disabled={isProcessing}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-clay px-5 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing ? "Opening Stripe…" : "Continue to payment"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-cream/55">
            Stripe processes the card. The return window noted here is 30 days.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="text-sm">
      {label}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </label>
  );
}
