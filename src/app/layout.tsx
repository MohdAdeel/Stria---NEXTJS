import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Stria — Football shirts",
    template: "%s · Stria",
  },
  description:
    "Stria is a catalog of football shirts. Browse by club, league, and kit type, then check out with Stripe.",
  keywords: [
    "football shirts",
    "soccer jerseys",
    "Stria",
    "club kits",
    "Premier League",
    "La Liga",
  ],
  openGraph: {
    title: "Stria — Football shirts",
    description:
      "A catalog of football shirts, arranged by club, league, and kit.",
    siteName: "Stria",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
