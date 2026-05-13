import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/app/context/ShopContext";

export const metadata: Metadata = {
  title: "Prototype | Mode Féminine — Nouvelle Collection Printemps-Été 2025",
  description:
    "Découvrez la nouvelle collection Prototype Printemps-Été 2025. Mode féminine élégante et contemporaine. Robes, vestes, manteaux et accessoires. Livraison gratuite dès 50 000 FCFA.",
  keywords: "prototype, mode féminine, vêtements, robes, vestes, collection 2025, FCFA",
  openGraph: {
    title: "Prototype | Nouvelle Collection",
    description: "Mode féminine élégante — Printemps-Été 2025",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-black">
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
