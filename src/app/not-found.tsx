import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-24">
      <p className="text-[11px] uppercase tracking-[0.22em] text-clay-deep">
        404
      </p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">
        That page is not in the index.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The link may be old, or the shirt may have left the catalog.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex w-fit rounded-full bg-clay px-5 py-3 text-sm font-medium text-paper"
      >
        Return to the shop
      </Link>
    </div>
  );
}
