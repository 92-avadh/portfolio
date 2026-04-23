import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Avadh Dhameliya | Full-Stack Developer Portfolio",
  description:
    "Full-Stack Developer specializing in MERN stack and Next.js. Building scalable, performant, and user-centric digital experiences.",
  keywords: ["Full Stack Developer", "MERN", "Next.js", "React", "Node.js", "Portfolio"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 transition-colors duration-500 overflow-x-hidden antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="pt-20">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}