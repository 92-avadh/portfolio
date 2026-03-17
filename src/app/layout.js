import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/ThemeProvider";

// Upgraded to a highly premium, modern tech font
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Avadh | Portfolio",
  description: "Modern Full-Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      {/* Increased the duration to 500ms for a more luxurious background fade */}
      <body className={`${jakarta.className} bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50 transition-colors duration-500 overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="pt-20">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}