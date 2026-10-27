"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import YupooImage from "@/components/YupooImage";
import { products } from "@/data/products";
import { formatPrice, getDisplayPrice } from "@/lib/utils";

export default function HomePage() {
  const featured = products.slice(0, 4);
  const lead = featured[0];
  const rest = featured.slice(1);

  const clubs = new Set(
    products
      .map((product) => product.club?.trim())
      .filter((club) => club && club !== "Unknown Club")
  );
  const leagues = new Map<string, number>();
  for (const product of products) {
    const league = product.league?.trim();
    if (!league) continue;
    leagues.set(league, (leagues.get(league) || 0) + 1);
  }
  const leagueList = Array.from(leagues.entries()).sort((a, b) => b[1] - a[1]);
  const marquee = [...leagueList, ...leagueList];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-20 lg:pt-14">
          <div className="relative lg:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-clay-deep">
              Shirt index · {products.length} listed
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
              Football shirts,
              <span className="block italic text-clay">cut for the catalog.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Stria lines shirts up by club, league, and kit. Photographs,
              sizes, and a price — then Stripe when you are ready to pay.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-clay px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-clay-deep"
              >
                Open the shop
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-cream"
              >
                Browse the index
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-6">
              {[
                ["Shirts", products.length],
                ["Clubs", clubs.size],
                ["Leagues", leagues.size],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 font-display text-3xl tracking-tight">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-6">
            <div className="absolute -left-3 top-8 bottom-8 hidden w-3 stria-hatch sm:block" />
            <div className="relative ml-0 h-[min(72vh,640px)] min-h-[420px] overflow-hidden rounded-[2rem] bg-pitch sm:ml-4">
              <Image
                src="/hero.jpg"
                alt="Football shirts arranged for the Stria catalog"
                fill
                priority
                className="object-cover object-[center_70%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pitch/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 font-display text-3xl leading-none tracking-tight text-cream">
                Match cloth.
                <span className="mt-1 block text-lg italic text-cream/80">
                  Filed by club, not by noise.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {leagueList.length > 0 && (
        <div className="overflow-hidden border-y border-ink/10 bg-cream py-4">
          <div className="animate-marquee flex w-max gap-10 pr-10">
            {marquee.map(([name], index) => (
              <span
                key={`${name}-${index}`}
                className="text-[11px] uppercase tracking-[0.28em] text-ink/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-clay-deep">
              On the rail
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
              Four from the front of the catalog
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-ink underline decoration-clay decoration-2 underline-offset-4"
          >
            All shirts
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {lead && (
            <Link
              href={`/products/${lead.id}`}
              className="group grid overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream lg:col-span-7 lg:grid-cols-2"
            >
              <div className="relative min-h-72 bg-sand">
                <YupooImage
                  src={lead.images[0]}
                  alt={lead.title}
                  width={700}
                  height={840}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-clay-deep">
                    {lead.league || lead.category}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                    {lead.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {lead.club ? `${lead.club}. ` : ""}
                    {lead.season ? `Season ${lead.season}. ` : ""}
                    Sizes {lead.sizes.join(", ")}.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="font-display text-3xl">
                    {formatPrice(getDisplayPrice(lead))}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm">
                    View
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((product) => (
              <ProductCard key={product.id} product={product} layout="list" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pitch text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cream/50">
              Leagues
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
              Start from the competition.
            </h2>
            <Link
              href="/categories"
              className="mt-6 inline-flex items-center gap-2 text-sm text-cream underline decoration-clay decoration-2 underline-offset-4"
            >
              Full index
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <ol className="lg:col-span-8">
            {leagueList.slice(0, 8).map(([name, count], index) => (
              <li key={name} className="border-t border-white/10">
                <Link
                  href={`/products?category=${encodeURIComponent(name)}`}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="w-8 font-display text-clay">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl tracking-tight transition-colors group-hover:text-white sm:text-3xl">
                      {name}
                    </span>
                  </span>
                  <span className="text-sm text-cream/60">{count} shirts</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-clay-deep">
          How a shirt leaves
        </p>
        <h2 className="mt-3 max-w-xl font-display text-4xl tracking-tight sm:text-5xl">
          Three steps. No account required.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Find it",
              body: "Search the shop or open a league, club, or kit type from the index.",
            },
            {
              n: "02",
              title: "Size it",
              body: "Each shirt page lists the sizes in stock, a quantity, and the photographs we have.",
            },
            {
              n: "03",
              title: "Pay with Stripe",
              body: "Checkout asks for a delivery address, then hands payment to Stripe.",
            },
          ].map((step) => (
            <article
              key={step.n}
              className="rounded-[1.75rem] border border-ink/10 bg-cream p-6"
            >
              <p className="font-display text-4xl text-clay">{step.n}</p>
              <h3 className="mt-6 font-display text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-cream sm:px-12">
          <div className="absolute right-0 top-0 h-full w-16 stria-hatch opacity-80" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream/50">
            The rail is open
          </p>
          <h2 className="mt-3 max-w-lg font-display text-4xl tracking-tight sm:text-6xl">
            Pick a shirt. We’ll hold the size in your cart.
          </h2>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            Shop the catalog
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
