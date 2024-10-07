import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from 'sonner'
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "evolix",
  description: "watch on",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster position="top-center" />
      <body className={`${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
