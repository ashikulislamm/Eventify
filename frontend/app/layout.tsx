import type { Metadata } from "next";
import { Inter, Montserrat, Saira } from "next/font/google";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
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
        className={ `${montserrat.className} bg-white min-h-screen` }
        suppressHydrationWarning
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
