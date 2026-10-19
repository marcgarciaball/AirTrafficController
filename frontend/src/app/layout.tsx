import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Atkinson_Hyperlegible_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RegisterSw } from "@/components/register-sw";
import "./globals.css";

// Atkinson Hyperlegible: diseñada por el Braille Institute para distinguir bien cada letra.
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Solo para relojes y códigos.
const atkinsonMono = Atkinson_Hyperlegible_Mono({
  variable: "--font-atkinson-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Torre",
  description: "Preparación de oposiciones de controlador aéreo",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1f24" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${atkinson.variable} ${atkinsonMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <RegisterSw />
        </ThemeProvider>
      </body>
    </html>
  );
}
