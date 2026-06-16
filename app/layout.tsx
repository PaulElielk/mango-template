/* eslint-disable @next/next/no-page-custom-font -- next/font/google needs build-time Google access, which is unavailable in this local workspace; keep the validated typography stable. */
import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/app/context/ShopContext";
import { brandConfig } from "@/app/data/brand";

const siteDescription =
  "Mode premium masculine à Abidjan. SB LUXURY CASUAL crée depuis 2018 des pièces raffinées pour les hommes qui cultivent la distinction.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: brandConfig.brand.name,
    template: `%s | ${brandConfig.brand.name}`,
  },
  description: siteDescription,
  keywords: [
    "SB LUXURY CASUAL",
    "mode premium masculine",
    "mode homme Abidjan",
    "vêtements homme",
    "élégance africaine",
    "boutique",
    "FCFA",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: brandConfig.brand.name,
    description: siteDescription,
    type: "website",
    siteName: brandConfig.brand.name,
    locale: "fr_FR",
    images: [
      {
        url: brandConfig.assets.hero.src,
        alt: brandConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brandConfig.brand.name,
    description: siteDescription,
    images: [brandConfig.assets.hero.src],
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
