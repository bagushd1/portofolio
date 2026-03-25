import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portofolio Tim | Web Development",
  description: "Website portofolio tim kami. Lihat proyek-proyek yang telah kami kerjakan dan hubungi kami untuk kolaborasi.",
  keywords: ["portofolio", "web development", "tim", "proyek"],
};

import SmoothScroll from "@/components/SmoothScroll";
import MotionProvider from "@/components/MotionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${playfair.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <MotionProvider>
          <SmoothScroll>
            {children}
            <Toaster theme="light" position="top-right" />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
