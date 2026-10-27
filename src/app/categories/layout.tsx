import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index",
  description: "Browse the Stria catalog by kit type, league, and club.",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
