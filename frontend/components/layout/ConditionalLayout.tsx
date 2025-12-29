"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if we're on a dashboard page (user or club)
  const isDashboardPage =
    pathname?.startsWith("/user/") || pathname?.startsWith("/club/");

  return (
    <>
      {!isDashboardPage && <Header />}
      {children}
      {!isDashboardPage && <Footer />}
    </>
  );
}
