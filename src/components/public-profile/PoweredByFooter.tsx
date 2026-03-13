import Link from "next/link";

interface PoweredByFooterProps {
  /** When true, the footer is hidden (for PRO users who opted to remove branding). */
  removable?: boolean;
}

/**
 * Small "Powered by Stylohub" footer shown at the bottom of public profile pages.
 * Hidden when removable=true (PRO feature).
 */
export function PoweredByFooter({ removable = false }: PoweredByFooterProps) {
  if (removable) return null;

  return (
    <footer className="mt-10 pb-6 flex justify-center">
      <Link
        href="/"
        className="flex items-center gap-1.5 opacity-50 hover:opacity-80 transition-opacity"
        style={{ color: "var(--profile-text, #fff)" }}
      >
        <span className="text-xs">Powered by</span>
        <span
          className="text-xs font-bold tracking-wide"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Stylohub
        </span>
      </Link>
    </footer>
  );
}
