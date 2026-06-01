/* eslint-disable @next/next/no-page-custom-font -- next/font/google needs build-time Google access, which is unavailable in this local workspace; keep the validated typography stable. */
import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/app/context/ShopContext";

const siteDescription =
  "Prototype présente une sélection de mode féminine contemporaine, avec robes, vestes, manteaux, accessoires et nouveautés dans une expérience boutique élégante.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Prototype | Mode féminine",
    template: "%s | Prototype",
  },
  description: siteDescription,
  keywords: [
    "prototype",
    "mode féminine",
    "vêtements",
    "robes",
    "vestes",
    "boutique",
    "FCFA",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Prototype | Mode féminine",
    description: siteDescription,
    type: "website",
    siteName: "Prototype",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prototype | Mode féminine",
    description: siteDescription,
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
