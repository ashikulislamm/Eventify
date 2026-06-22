"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import Header from "./Header";
import Footer from "./Footer";
import { ToastProvider } from "@/components/shared/Toast";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { initialize, initialized } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  // Check if we're on a dashboard page (user or club)
  // But wait, user/club dashboards start with /user/ or /club/ and are not login/signup
  const isDashboardPage =
    pathname?.startsWith("/user/") || 
    (pathname?.startsWith("/club/") && !pathname?.includes("/login") && !pathname?.includes("/signup"));

  return (
    <ToastProvider>
      {!isDashboardPage && <Header />}
      {children}
      {!isDashboardPage && <Footer />}
    </ToastProvider>
  );
}
