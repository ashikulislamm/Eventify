import type { Metadata } from "next";
import { Inter, Montserrat, Saira } from "next/font/google";
import Header from "../components/layout/Header";
import "./globals.css";


const montserrat = Montserrat({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Eventify",
  description: "Your Ultimate Event Management Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={ `${montserrat.className} bg-lightBG min-h-screen` }
        suppressHydrationWarning
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
