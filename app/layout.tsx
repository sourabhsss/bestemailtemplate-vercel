import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/structured-data";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bestemailtemplate.com'),
  other: {
    'theme-color': '#6B4C3B',
  },
  icons: {
    icon: '/bestemailtemplate.jpg',
    shortcut: '/bestemailtemplate.jpg',
    apple: '/bestemailtemplate.jpg',
  },
  title: {
    default: "575 Free HTML Email Templates | Best Email Template",
    template: "%s | Best Email Template"
  },
  description: "Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries. 575+ free templates for marketing, transactional, and newsletter emails.",
  keywords: ["HTML email templates", "email templates", "responsive email templates", "free email templates", "Figma email templates"],
  authors: [{ name: "Best Email Template" }],
  creator: "Best Email Template",
  publisher: "Best Email Template",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bestemailtemplate.com",
    siteName: "Best Email Template",
    title: "575 Free HTML Email Templates | Best Email Template",
    description: "Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries.",
    images: [
      {
        url: '/bestemailtemplate.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Email Template - Free HTML Email Templates',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "575 Free HTML Email Templates | Best Email Template",
    description: "Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries.",
    images: ['/bestemailtemplate.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              getOrganizationSchema(),
              getWebSiteSchema(),
            ]),
          }}
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8630405999832993"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GJWCKHLJQ9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GJWCKHLJQ9');
          `}
        </Script>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
