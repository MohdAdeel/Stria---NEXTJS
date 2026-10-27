import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "About",
  description:
    "Stria is a catalog of football shirts. Here is what the shop is for, how an order moves, and how to reach the desk.",
};

export default function AboutPage() {
  const clubs = new Set(
    products
      .map((product) => product.club?.trim())
      .filter((club) => club && club !== "Unknown Club")
  );
  const leagues = new Set(
    products.map((product) => product.league?.trim()).filter(Boolean)
  );

  return (
    <div>
      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.28em] text-clay-deep">
              About Stria
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              A shop that behaves like a shirt index.
            </h1>
          </div>
          <p className="self-end text-base leading-relaxed text-muted lg:col-span-5">
            Stria lists football shirts with the facts that matter before you
            buy: the club, the competition, the season, the sizes, the
            photographs, and the price. The rest of the site stays out of the
            way.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <article className="rounded-[1.75rem] bg-pitch p-8 text-cream lg:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream/50">
            Purpose
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight">
            Make the shirt easy to find, then easy to order.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/75">
            The catalog is organized so you can enter from a league, a club, or
            a kit type and land on a single shirt. Product pages keep size,
            quantity, and images together. When you check out, delivery details
            stay on Stria and payment is handed to Stripe.
          </p>
        </article>
        <aside className="rounded-[1.75rem] border border-ink/10 bg-cream p-8 lg:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
            In the catalog now
          </p>
          <dl className="mt-6 space-y-4">
            {[
              ["Shirts listed", products.length],
              ["Clubs named", clubs.size],
              ["Leagues named", leagues.size],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="flex items-baseline justify-between border-b border-ink/10 pb-3"
              >
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="font-display text-3xl tracking-tight">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            These counts are read from the current catalog. They change when
            the catalog changes.
          </p>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl tracking-tight">What we value</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "A readable listing",
              body: "Title, club, season, size run, and price sit where you can compare shirts without opening five menus.",
            },
            {
              title: "Photographs of the shirt",
              body: "Each listing uses the images we have for that shirt, including extra angles when they exist.",
            },
            {
              title: "A short path to payment",
              body: "The cart keeps your sizes. Checkout collects a name, contact, and address, then Stripe takes the card.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-ink/10 p-6"
            >
              <h3 className="font-display text-2xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-[1.75rem] border border-ink/10 bg-cream p-8">
          <h2 className="font-display text-3xl tracking-tight">
            Shipping and returns
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The cart shows shipping as free. After Stripe confirms payment, the
            confirmation page says the order is processed and shipped within
            2–3 business days, and that a confirmation email follows. Checkout
            notes a 30-day return window.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-ink">
            <li>Shipping line in the cart: free</li>
            <li>Stated handling after payment: 2–3 business days</li>
            <li>Return window noted at checkout: 30 days</li>
          </ul>
        </article>
        <article className="rounded-[1.75rem] border border-ink/10 bg-cream p-8">
          <h2 className="font-display text-3xl tracking-tight">
            Care and sizing
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Wash the shirt inside out on cold and hang it to dry so color and
            lettering hold. Sizes on each product are the sizes stored for that
            shirt. If a size run looks unusual, the letters on the page are the
            ones you can add to the cart.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl tracking-tight">Questions</h2>
        <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {[
            {
              q: "Do I need an account?",
              a: "No. The cart stays in this browser. Checkout asks for the details Stripe and delivery need.",
            },
            {
              q: "Where does payment happen?",
              a: "On Stripe. Stria sends the shirts in your cart and your email, then redirects you to Stripe’s checkout.",
            },
            {
              q: "How do I find one club?",
              a: "Open the index and choose a league or club, or search the shop by shirt name, brand, club, or league.",
            },
            {
              q: "How long is the return window?",
              a: "Checkout states 30 days. The success page is where shipping timing is spelled out after payment.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {item.q}
                <span className="text-clay transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 rounded-[2rem] bg-ink px-6 py-10 text-cream sm:flex-row sm:items-end sm:px-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-cream/50">
              Desk
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-tight">
              Write if an order needs a person.
            </h2>
            <p className="mt-3 text-sm text-cream/70">
              hello@stria.shop · Mon–Fri, 9am–5pm
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink"
          >
            Back to the shop
          </Link>
        </div>
      </section>
    </div>
  );
}
