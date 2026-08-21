import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YourHome - Immobilier d'exception",
  description:
    "YourHome accompagne l'acquisition et la vente de biens immobiliers de prestige. Visites privées, expertise locale, biens sélectionnés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full bg-ink text-ivory font-sans">{children}</body>
    </html>
  );
}
