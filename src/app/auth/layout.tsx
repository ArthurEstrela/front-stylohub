import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stylo-dark flex flex-col">
      {/* Top bar */}
      <header className="px-8 py-5 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Stylohub" width={32} height={32} />
          <span
            className="text-white font-semibold text-lg tracking-wide"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Stylohub
          </span>
        </Link>
      </header>

      {/* Ambient light */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>

      <footer className="py-4 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Stylohub. Todos os direitos reservados.
      </footer>
    </div>
  );
}
