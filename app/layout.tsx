import type { Metadata } from "next";
import { DM_Sans, Inter, Lexend_Deca } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iShkel",
  description: "iShkel Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable} ${lexendDeca.variable}`}>
      <body className="font-neue antialiased bg-[#070707] text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}