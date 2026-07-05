import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://visitryde.uk"),
  title: "IsleConnect — Coastal Creative Gateway | Ryde, Isle of Wight",
  description:
    "IsleConnect presents Ryde as the Coastal Creative Gateway: the 1862 Mystery Trail, local independent partners, and the Pride in Place programme for the Ryde Neighbourhood Board.",
  icons: { icon: "/brand/logo-mark.png" },
  openGraph: {
    title: "IsleConnect — Coastal Creative Gateway",
    description:
      "An interactive heritage trail connecting Ryde's landmarks with its independent businesses.",
    images: ["/brand/logo-full.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
