import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PIBBLE - Movies & TV Shows",
  description: "Discover your next favorite movie or TV show",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
