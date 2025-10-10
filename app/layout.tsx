import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Parsh Jain",
  description: "Portfolio of Parsh Jain, a Web Developer based in Mumbai, India",
  generator: "Parsh Jain",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Favicon Links for Better Visibility */}
        <link rel="icon" href="/ParshJain1.svg" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/ParshJain1.svg" type="image/svg+xml" />
        <link rel="mask-icon" href="/ParshJain1.svg" color="#000000" />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}