import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./components/utils";
import { Footer } from "./components/layout";

// Load Montserrat for headings
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

// Load Poppins for body text
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Solistic Healing",
  description: "Your path to holistic wellness and natural healing",
  icons: {
    icon: '/favicon.svg',
  }
};

export const viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        {children}
        <Footer />
      </body>
    </html>
  );
}
