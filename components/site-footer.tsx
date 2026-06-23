import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <p>© 2026 Michael Tampus. Built with Next.js and a focus on clarity.</p>
      <div>
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}
