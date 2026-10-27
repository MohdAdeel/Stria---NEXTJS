"use client";

import { useMemo } from "react";
import { FilterOptions } from "@/types";
import { products } from "@/data/products";
import { X } from "lucide-react";

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const fieldClass =
  "w-full rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none transition focus:border-clay";

export default function ProductFilters({
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const handleFilterChange = (
    key: keyof FilterOptions,
    value: string | number | [number, number]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: "All",
      priceRange: [0, 1000],
      size: "",
      brand: "All",
    });
  };

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.brand !== "All" ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 1000;

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    for (const p of products) {
      if (p.category) set.add(p.category);
      if (p.league) set.add(p.league);
    }
    return Array.from(set);
  }, []);

  const brandOptions = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    for (const p of products) {
      if (p.brand) set.add(p.brand);
    }
    return Array.from(set);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl tracking-tight text-ink">
          Refine
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-sm text-clay-deep"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      <div className="scrollbar-hide flex-1 space-y-8 overflow-y-auto pr-1">
        <fieldset>
          <legend className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted">
            Category
          </legend>
          <div className="space-y-2">
            {categoryOptions.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-3 text-sm text-ink"
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="accent-clay"
                />
                {category}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted">
            Price
          </p>
          <div className="flex items-end gap-2">
            <label className="flex-1 text-xs text-muted">
              Min
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    Number(e.target.value),
                    filters.priceRange[1],
                  ])
                }
                className={`${fieldClass} mt-1`}
              />
            </label>
            <label className="flex-1 text-xs text-muted">
              Max
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    filters.priceRange[0],
                    Number(e.target.value),
                  ])
                }
                className={`${fieldClass} mt-1`}
              />
            </label>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { label: "Under $50", range: [0, 50] },
              { label: "$50–$100", range: [50, 100] },
              { label: "$100–$200", range: [100, 200] },
              { label: "$200+", range: [200, 1000] },
            ].map(({ label, range }) => {
              const active =
                filters.priceRange[0] === range[0] &&
                filters.priceRange[1] === range[1];
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    handleFilterChange("priceRange", range as [number, number])
                  }
                  className={`rounded-full border px-3 py-2 text-left text-xs transition-colors ${
                    active
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/15 bg-paper text-ink hover:border-ink/40"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <fieldset>
          <legend className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted">
            Brand
          </legend>
          <div className="space-y-2">
            {brandOptions.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-3 text-sm text-ink"
              >
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                  className="accent-clay"
                />
                {brand}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {hasActiveFilters && (
        <div className="mt-6 space-y-2 border-t border-ink/10 pt-4">
          {filters.category !== "All" && (
            <FilterChip
              label={filters.category}
              onClear={() => handleFilterChange("category", "All")}
            />
          )}
          {filters.brand !== "All" && (
            <FilterChip
              label={filters.brand}
              onClear={() => handleFilterChange("brand", "All")}
            />
          )}
          {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) && (
            <FilterChip
              label={`$${filters.priceRange[0]}–$${filters.priceRange[1]}`}
              onClear={() => handleFilterChange("priceRange", [0, 1000])}
            />
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-full bg-sand px-3 py-1.5 text-sm text-ink">
      <span className="truncate">{label}</span>
      <button type="button" onClick={onClear} aria-label={`Remove ${label}`}>
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
