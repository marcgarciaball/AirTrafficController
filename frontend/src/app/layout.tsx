import type { Metadata, Viewport } from "next";
import { B612, B612_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RegisterSw } from "@/components/register-sw";
import "./globals.css";

// B612: tipografía que Airbus diseñó para las pantallas de cabina.
const b612 = B612({
  variable: "--font-b612",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const b612Mono = B612_Mono({
  variable: "--font-b612-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Torre",
  description: "Preparación de oposiciones de controlador aéreo",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`dark ${b612.variable} ${b612Mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Solo modo oscuro: las cabinas no tienen modo claro. */}
        <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark" enableSystem={false}>
          {children}
          <RegisterSw />
        </ThemeProvider>
      </body>
    </html>
  );
}
