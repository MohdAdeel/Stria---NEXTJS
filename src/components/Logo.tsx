type LogoProps = {
  tone?: "ink" | "cream";
  className?: string;
  markOnly?: boolean;
};

export default function Logo({
  tone = "ink",
  className = "",
  markOnly = false,
}: LogoProps) {
  const plate = tone === "cream" ? "#F3EEE4" : "#14261C";
  const stripe = tone === "cream" ? "#14261C" : "#F6F1E8";
  const word = tone === "cream" ? "text-cream" : "text-ink";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden
        className="h-9 w-9 shrink-0"
      >
        <rect width="32" height="32" rx="9" fill={plate} />
        <path d="M6.2 26.6 13.8 5.2h4.1L10.3 26.6H6.2Z" fill="#C4371F" />
        <path d="M15.4 26.6 23 5.2h3.6l-7.6 21.4h-3.6Z" fill={stripe} />
      </svg>
      {markOnly ? null : (
        <span
          className={`font-display text-[1.65rem] leading-none tracking-[-0.04em] ${word}`}
        >
          Stria
        </span>
      )}
    </span>
  );
}
