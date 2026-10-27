import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse football shirts by club, league, kit type, brand, and price.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
