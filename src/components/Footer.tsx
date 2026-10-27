import Link from "next/link";
import Logo from "./Logo";

const columns = [
  {
    title: "Index",
    links: [
      { label: "Shop", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Cart", href: "/cart" },
    ],
  },
  {
    title: "House",
    links: [{ label: "About", href: "/about" }],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-pitch text-cream">
      <div className="h-2 stria-hatch" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Logo tone="cream" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
            A catalog of football shirts. Browse by club, league, or kit,
            then check out with Stripe.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title} className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cream/50">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="lg:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream/50">
            Desk
          </p>
          <p className="mt-4 text-sm text-cream/90">hello@stria.shop</p>
          <p className="mt-1 text-sm text-cream/60">Mon–Fri, 9am–5pm</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Stria</p>
          <p>Payments processed by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
