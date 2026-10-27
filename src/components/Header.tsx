"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Logo from "./Logo";

const navigation = [
  { name: "Shop", href: "/products" },
  { name: "Index", href: "/categories" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const { getTotalItems } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const count = getTotalItems();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-ink text-center text-[11px] uppercase tracking-[0.16em] text-cream sm:tracking-[0.22em]">
        <p className="px-4 py-2 sm:hidden">Free shipping · 30 day returns</p>
        <p className="hidden px-4 py-2 sm:block">
          Free shipping · Stripe checkout · 30 day returns
        </p>
      </div>
      <header className="border-b border-ink/10 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Stria home" className="relative z-10">
            <Logo />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-ink text-cream"
                    : "text-ink/80 hover:bg-sand/80 hover:text-ink"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/products?focus=1"
              aria-label="Search the shop"
              className="rounded-full p-2 text-ink transition-colors hover:bg-sand"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
              className="relative rounded-full p-2 text-ink transition-colors hover:bg-sand"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold text-paper">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="rounded-full p-2 text-ink transition-colors hover:bg-sand md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-ink/10 bg-paper px-4 py-3 md:hidden">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-3 py-3 text-base ${
                  isActive(item.href) ? "bg-ink text-cream" : "text-ink"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
