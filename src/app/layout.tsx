import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonder Studio — Premium Web Design for Real Estate",
  description:
    "We design and build premium websites and digital experiences for real estate agents, brokerages, and property companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
