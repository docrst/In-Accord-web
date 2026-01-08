"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const sidebarWidth = useAppSelector((state) => state.global.sidebarWidth);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    console.log('Dark mode changed to:', isDarkMode, 'HTML classes:', html.classList.value);
  }, [isDarkMode]);

  const minWidth = 120;
  const maxWidth = 320;
  const clampedSidebarWidth = Math.min(Math.max(sidebarWidth, minWidth), maxWidth);
  const appliedSidebarOffset = isSidebarCollapsed ? 64 : clampedSidebarWidth;

  return (
    <div
      className="flex bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 w-full min-h-screen"
      style={{
        backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
        color: isDarkMode ? '#f3f4f6' : '#111827'
      }}
    >
      <Sidebar />
      <main
        className={`flex flex-col flex-1 h-full py-7 px-6 bg-gray-50 dark:bg-gray-900`}
        style={{
          backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
          marginLeft: 0,
          width: '100%'
        }}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;