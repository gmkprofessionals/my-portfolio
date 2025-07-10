import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import WhatsAppWidget from "@/app/components/WhatsAppWidget";
import { Analytics } from "@vercel/analytics/next";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


export const metadata: Metadata = {
  title: "Gourav Saraf | Practicing Company Secratory in Kolkata, India",
  description:"Freelance web developer Deepak Singh offers custom, responsive, and SEO-friendly web design and development services in Greater Noida, India, and worldwide.",
  keywords: [
    "web developer deepak",
    "website development services in noida",
    "website developer in greater noida",
    "web development in noida",
    "freelance web development and designing services in india",
    "website development in noida",
    "freelance web developer in india.",
    "freelance web designer in india.",
    "professiona UI/UX Designer in india.",
    "professiona website Designer in greater noida.",
    "professiona web devlopment services in india.",
    "professiona web designing services in india.",
    "professiona web devlopment services in greater noida.",
    "professiona web designing services in greater noida.",
    "Responsive web designing services in india.",
    "best digital marketing services in India.",
    "freelance MERN-Stack Developer in India.",
    "seo services in greater noida open now.",
    "online appointments seo services in greater noida.",
    "top rated seo services in greater noida."
  ],
  authors: [
    {
      name: "Deepak Singh",
      url: "https://www.webdeveloperdeepak.com",
    },
  ],
  publisher: "Deepak Singh",
  creator: "Deepak Singh",
  metadataBase: new URL("https://www.webdeveloperdeepak.com"),
  alternates: {
    canonical: "https://www.webdeveloperdeepak.com",
  },
  themeColor: "#ffffff",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Deepak Singh | Web Developer & Designer",
    description:"Freelance web developer Deepak Singh offers custom, responsive, and SEO-friendly web design and development services in Greater Noida, India, and worldwide.",
    url: "https://www.webdeveloperdeepak.com",
    siteName: "Deepak Singh | Web Developer & Designer",
    images: [
      {
        url: "https://www.webdeveloperdeepak.com/deepaksingh-webdeveloper.png",
        width: 1200,
        height: 630,
        alt: "Deepak Singh Web Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Singh | Freelance Web Developer & Designer in India",
    description:"Freelance web developer Deepak Singh offers custom, responsive, and SEO-friendly web design and development services in Greater Noida, India, and worldwide.",
    images: [
      {
        url: "https://www.webdeveloperdeepak.com/deepaksingh-webdeveloper.png",
        alt: "Deepak Singh Web Developer Twitter Preview",
      },
    ],
    creator: "@deepak_singh_",
    site: "@deepak_singh_",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    notranslate: false,
  },
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body >
        <NavBar />
        {children} 
        <Analytics /> 
        <GoogleAnalytics />
        <WhatsAppWidget />
        <div className="bg-white text-gray-600 font-bold text-sm text-center py-3"> 
            © {new Date().getFullYear()} Gourav Saraf | Practicing Company Secratory
            . All rights reserved.
        </div>
      </body>
    </html>
  );
}
