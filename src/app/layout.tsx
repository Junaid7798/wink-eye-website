import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

import { LocalBusinessSchema } from "@/components/Schema";
import { MotionProvider } from "@/components/MotionProvider";
import { EyeCursor } from "@/components/EyeCursor";

export const metadata: Metadata = {
  title: "Wink Eye Care & Optical | Comprehensive Eye Care in Abington, PA",
  description: "Providing patients with high quality eye exams, designer eyeglasses, and contact lenses in Abington, PA. Award-winning optometrist Dr. Minal Patel.",
  metadataBase: new URL("https://www.winkeyecareoptical.com"),
  openGraph: {
    title: "Wink Eye Care & Optical | Comprehensive Eye Care in Abington, PA",
    description: "Providing patients with high quality eye exams, designer eyeglasses, and contact lenses in Abington, PA.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <LocalBusinessSchema />
        <meta name="theme-color" content="#0a7e9a" />
      </head>
      <body className={`${jakarta.variable} ${playfair.variable} antialiased bg-background text-foreground`}>
        <MotionProvider>
          <EyeCursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
