import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maya Forge | AI Creative Studio",
  description: "Premium AI image design, AI videos, AI shorts, content monetization, video editing and web design services.",
  openGraph: {
    title: "Maya Forge | AI Creative Studio",
    description: "We forge the future of digital content with AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
