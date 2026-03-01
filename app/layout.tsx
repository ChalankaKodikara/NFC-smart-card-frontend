import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🔥 Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://profile.casknet.dev"),

  title: {
    default: "Casknet Digital Portfolio & NFC Business Cards",
    template: "%s | Casknet",
  },

  description:
    "Casknet NFC Digital Business Cards and Portfolio System. Create, manage and share your smart business profile instantly.",

  keywords: [
    "NFC business card Sri Lanka",
    "Digital business card",
    "Casknet",
    "Smart business card",
    "NFC card portfolio",
    "Digital visiting card Sri Lanka",
  ],

  authors: [{ name: "Casknet Solutions" }],

  openGraph: {
    title: "Casknet NFC Digital Business Cards",
    description:
      "Create and manage your NFC-powered digital business card with Casknet.",
    url: "https://profile.casknet.dev",
    siteName: "Casknet",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Casknet NFC Digital Business Cards",
    description:
      "Smart NFC digital business cards for professionals.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* 🔥 Toast Container (Global) */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
