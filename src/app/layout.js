import "./globals.css";
import { Barlow_Condensed, Inter } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CursorProvider } from "@/components/providers/CursorProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageLoader } from "@/components/ui/PageLoader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site } from "@/data/site";

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
  metadataBase: new URL("https://avadh.dev"),
  title: {
    default: `${site.name} | Full-Stack Developer Portfolio`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: ["Full Stack Developer", "MERN", "Next.js", "React", "Node.js", "Portfolio"],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    title: `${site.name} | Full-Stack Developer Portfolio`,
    description: site.tagline,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Full-Stack Developer`,
    description: site.tagline,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${barlow.variable} ${inter.variable}`}>
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
