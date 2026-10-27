"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <p className="text-[11px] uppercase tracking-[0.22em] text-moss">
        Payment received
      </p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">
        The order is in.
      </h1>
      <p className="mt-4 text-muted">
        Stripe confirmed the payment. A confirmation email should follow, and
        the order is processed and shipped within 2–3 business days. You can
        track it from that email.
      </p>
      {sessionId && (
        <p className="mt-4 break-all rounded-2xl bg-cream px-4 py-3 text-xs text-muted">
          Session {sessionId}
        </p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full border border-ink/15 px-5 py-3 text-sm"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="rounded-full bg-clay px-5 py-3 text-sm font-medium text-paper"
        >
          Keep browsing
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted">
          Confirming payment…
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
