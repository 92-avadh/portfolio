import "./globals.css";
import { Barlow_Condensed, Inter } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CursorProvider } from "@/components/providers/CursorProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageLoader } from "@/components/ui/PageLoader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site, socials } from "@/data/site";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Full-Stack Developer Portfolio`,
    template: `%s — ${site.name}`,
  },
  description: `${site.name} is a Full-Stack Developer based in Surat, Gujarat. Specializing in MERN Stack, Next.js, React, Node.js, and modern web application development.`,
  keywords: [
    "Avadh Dhameliya",
    "Avadh Dhameliya Portfolio",
    "Avadh Dhameliya Developer",
    "Avadh Dhameliya Surat",
    "Avadh Dhameliya Full Stack",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Software Engineer",
    "Web Developer Portfolio",
    "Surat Developer",
    "Gujarat Developer"
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: site.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} Portfolio`,
    title: `${site.name} | Full-Stack Developer Portfolio`,
    description: `Portfolio of ${site.name}, a Full-Stack Developer specializing in MERN Stack, Next.js, React, and Node.js.`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} - Full-Stack Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Full-Stack Developer Portfolio`,
    description: `Portfolio of ${site.name}, a Full-Stack Developer specializing in MERN Stack, Next.js, React, and Node.js.`,
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: ["Avadh", "AD"],
      url: site.url,
      image: `${site.url}/profile.jpg`,
      jobTitle: site.role,
      worksFor: {
        "@type": "Organization",
        name: "Freelance / Independent",
      },
      sameAs: socials
        .map((s) => s.href)
        .filter((h) => !h.startsWith("mailto:")),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        addressCountry: "India",
      },
      description: `${site.name} is a ${site.role} based in Surat, Gujarat, specializing in MERN Stack, Next.js, React, and Node.js.`,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} Portfolio`,
      description: site.tagline,
      publisher: {
        "@id": `${site.url}/#person`,
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${barlow.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <PageLoader />
          <CursorProvider>
            <CustomCursor />
            <MotionProvider>
              <LenisProvider>{children}</LenisProvider>
            </MotionProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
