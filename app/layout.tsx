import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Tampus | Cinematic Scrollytelling Portfolio",
  description:
    "A modern one-page portfolio with sticky cinematic panels, layered depth, and scroll-driven transitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
