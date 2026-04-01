import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bestemailtemplate.com'),
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
  },
  twitter: {
    card: "summary_large_image",
    title: "575 Free HTML Email Templates | Best Email Template",
    description: "Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries.",
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
      </body>
    </html>
  );
}
