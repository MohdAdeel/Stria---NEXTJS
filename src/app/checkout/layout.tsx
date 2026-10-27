import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Delivery details for your Stria order. Payment is completed on Stripe.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
