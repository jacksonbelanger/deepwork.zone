import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'deep work tracker | lock in',
  description: 'A clean, effective deep work timer. Keep track of your heatmap',

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
