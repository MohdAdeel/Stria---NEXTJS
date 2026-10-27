"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useMemo, useState } from "react";
import { ArrowUpRight, Home, MapPin, Shield, Shirt, Tag } from "lucide-react";

function aggregateData() {
  const categoryToCount = new Map<string, number>();
  const leagueToCount = new Map<string, number>();
  const clubToCount = new Map<string, number>();

  for (const product of products) {
    const category = product.category?.trim();
    if (category)
      categoryToCount.set(category, (categoryToCount.get(category) || 0) + 1);

    const league = product.league?.trim();
    if (league) leagueToCount.set(league, (leagueToCount.get(league) || 0) + 1);

    const club = product.club?.trim();
    if (club && club !== "Unknown Club" && club.length > 0) {
      clubToCount.set(club, (clubToCount.get(club) || 0) + 1);
    }
  }

  const categories = Array.from(categoryToCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const leagues = Array.from(leagueToCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const clubs = Array.from(clubToCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return { categories, leagues, clubs };
}

function CategoryIcon({ name }: { name: string }) {
  const className = "h-4 w-4";
  switch (name.toLowerCase()) {
    case "home":
      return <Home className={className} />;
    case "away":
      return <MapPin className={className} />;
    case "training":
      return <Shirt className={className} />;
    case "goalkeeper":
      return <Shield className={className} />;
    default:
      return <Tag className={className} />;
  }
}

const tabs = [
  { key: "categories", label: "Kits" },
  { key: "leagues", label: "Leagues" },
  { key: "clubs", label: "Clubs" },
] as const;

export default function CategoriesPage() {
  const { categories, leagues, clubs } = aggregateData();
  const [activeTab, setActiveTab] = useState<
    "categories" | "leagues" | "clubs"
  >("categories");
  const [query, setQuery] = useState("");
  const [alphabeticalClubs, setAlphabeticalClubs] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!query) return categories;
    return categories.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [categories, query]);

  const filteredLeagues = useMemo(() => {
    if (!query) return leagues;
    return leagues.filter((l) =>
      l.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [leagues, query]);

  const filteredClubs = useMemo(() => {
    const base = alphabeticalClubs
      ? [...clubs].sort((a, b) => a.name.localeCompare(b.name))
      : clubs;
    if (!query) return base;
    return base.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [clubs, query, alphabeticalClubs]);

  return (
    <div>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay-deep">
            Index
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            Enter by kit, league, or club.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Each row opens the shop already filtered. Club names use the club
            field on the shirt.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit rounded-full border border-ink/10 bg-cream p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  activeTab === tab.key
                    ? "bg-ink text-cream"
                    : "text-ink hover:bg-sand"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-center gap-3 sm:max-w-sm sm:justify-end">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Find a ${activeTab === "categories" ? "kit" : activeTab.slice(0, -1)}`}
              className="w-full rounded-full border border-ink/15 bg-cream px-4 py-2.5 text-sm outline-none focus:border-clay"
            />
          </div>
        </div>

        {activeTab === "clubs" && (
          <label className="inline-flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={alphabeticalClubs}
              onChange={(e) => setAlphabeticalClubs(e.target.checked)}
              className="accent-clay"
            />
            Sort A–Z
          </label>
        )}

        {activeTab === "categories" && (
          <IndexGrid
            items={filteredCategories}
            empty="No kit types match that search."
            icon
          />
        )}
        {activeTab === "leagues" && (
          <IndexGrid
            items={filteredLeagues.slice(0, 9)}
            empty="No leagues match that search."
          />
        )}
        {activeTab === "clubs" && (
          <IndexGrid items={filteredClubs} empty="No clubs match that search." />
        )}
      </div>
    </div>
  );
}

function IndexGrid({
  items,
  empty,
  icon = false,
}: {
  items: { name: string; count: number }[];
  empty: string;
  icon?: boolean;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-muted">{empty}</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.name}>
          <Link
            href={`/products?category=${encodeURIComponent(item.name)}`}
            className="group flex items-center gap-4 rounded-[1.4rem] border border-ink/10 bg-cream px-4 py-4 transition-colors hover:border-ink/30"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-cream">
              {icon ? (
                <CategoryIcon name={item.name} />
              ) : (
                <span className="font-display text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{item.name}</span>
              <span className="text-sm text-muted">
                {item.count} {item.count === 1 ? "shirt" : "shirts"}
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
