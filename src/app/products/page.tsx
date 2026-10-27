"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { FilterOptions, Product } from "@/types";
import { Search, LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    priceRange: [0, 1000],
    size: "",
    brand: "All",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categoryParam = searchParams.get("category");
  const focusParam = searchParams.get("focus");

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  useEffect(() => {
    if (focusParam === "1") {
      setTimeout(() => {
        const el = document.getElementById(
          "shop-search"
        ) as HTMLInputElement | null;
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0);
    }
  }, [focusParam]);

  useEffect(() => {
    let filtered = products;

    if (filters.category !== "All") {
      filtered = filtered.filter(
        (product) =>
          product.category === filters.category ||
          product.league === filters.category ||
          product.club === filters.category
      );
    }

    if (filters.brand !== "All") {
      filtered = filtered.filter((product) => product.brand === filters.brand);
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.league?.toLowerCase().includes(query) ||
          product.club?.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [filters, searchTerm]);

  return (
    <div>
      <div className="border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay-deep">
            Shop
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-6xl">
            {categoryParam ? categoryParam : "The full rail"}
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            {categoryParam
              ? `Shirts filed under ${categoryParam}.`
              : "Every shirt currently in the catalog. Search, or narrow by kit, league, brand, and price."}
          </p>
          <div className="relative mt-8 max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="shop-search"
              type="text"
              placeholder="Club, league, brand, or shirt"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-ink/15 bg-cream py-3.5 pl-11 pr-4 text-ink outline-none transition placeholder:text-muted focus:border-clay"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-28 h-[calc(100vh-8.5rem)] rounded-[1.75rem] border border-ink/10 bg-cream p-5">
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm text-muted">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "shirt" : "shirts"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-sm lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Refine
                </button>
                <div className="flex rounded-full border border-ink/15 p-1">
                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-full p-2 ${
                      viewMode === "grid" ? "bg-ink text-cream" : "text-ink"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    onClick={() => setViewMode("list")}
                    className={`rounded-full p-2 ${
                      viewMode === "list" ? "bg-ink text-cream" : "text-ink"
                    }`}
                  >
                    <Rows3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-ink/20 px-6 py-20 text-center">
                <h2 className="font-display text-3xl tracking-tight">
                  Nothing matches
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                  Try another club name, or clear the filters and start again.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      category: "All",
                      priceRange: [0, 1000],
                      size: "",
                      brand: "All",
                    });
                  }}
                  className="mt-6 rounded-full bg-clay px-5 py-3 text-sm font-medium text-paper"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid grid-cols-1 gap-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    layout={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-paper p-5 shadow-2xl">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-sand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/15 border-t-clay" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
