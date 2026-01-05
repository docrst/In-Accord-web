"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed, setSidebarWidth } from '@/state';
import { Archive, BotIcon, CircleDollarSignIcon, Clipboard, DrumstickIcon, FileQuestionIcon, Layout, LucideIcon, Menu, PcCaseIcon, PlugIcon, ServerCogIcon, Settings, User, WebhookIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = 
    pathname === href || (pathname == "/" && href === "dashboard");
    pathname === href || (pathname == "/" && href === "/plugins");
    pathname === href || (pathname == "/" && href === "/themes");
    pathname === href || (pathname == "/" && href === "/upload");
    pathname === href || (pathname == "/" && href === "/inventory");
    pathname === href || (pathname == "/" && href === "/products");   
    pathname === href || (pathname == "/" && href === "/settings");
    pathname === href || (pathname == "/" && href === "/expenses");
    pathname === href || (pathname == "/" && href === "/bots");
    pathname === href || (pathname == "/" && href === "/servers");
    pathname === href || (pathname == "/" && href === "/hosting");
    pathname === href || (pathname == "/" && href === "/users"); 
    pathname === href || (pathname == "/" && href === "/support");

  return (
    <Link href={href}>
      <div className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-md ${
        isCollapsed ? "justify-center py-3" : 'justify-start px-4 py-3'
      }
        hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white dark:bg-blue-600" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />

        <span className={`${
          isCollapsed ? "hidden" : "block"
          } font-medium text-base text-gray-700 dark:text-gray-300`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const sidebarWidth = useAppSelector((state) => state.global.sidebarWidth);

  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const isResizingRef = useRef(false);

  const collapsedWidth = 64;
  // Allow an even thinner minimum while keeping icons usable
  const minWidth = 70;
  const maxWidth = 320;
  // Default open width trimmed further for a slimmer sidebar
  const defaultOpenWidth = 80;

  const toggleSidebar = () => {
    if (isSidebarCollapsed) {
      // Reopen to a sensible default, ignoring the previous shrunken width
      dispatch(setSidebarWidth(Math.min(Math.max(defaultOpenWidth, minWidth), maxWidth)));
      dispatch(setIsSidebarCollapsed(false));
    } else {
      dispatch(setIsSidebarCollapsed(true));
    }
  }; 

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isResizingRef.current) return;
      const delta = event.clientX - startXRef.current;
      const nextWidth = Math.min(Math.max(startWidthRef.current + delta, minWidth), maxWidth);
      dispatch(setSidebarWidth(nextWidth));
    },
    [dispatch]
  );

  const handleMouseUp = useCallback(() => {
    if (!isResizingRef.current) return;
    isResizingRef.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isSidebarCollapsed) return;
    isResizingRef.current = true;
    startXRef.current = event.clientX;
    startWidthRef.current = sidebarWidth;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const normalized = Math.min(Math.max(sidebarWidth, minWidth), maxWidth);
    if (normalized !== sidebarWidth) {
      dispatch(setSidebarWidth(normalized));
    }
  }, [sidebarWidth, dispatch]);

  const clampedWidth = Math.min(Math.max(sidebarWidth, minWidth), maxWidth);
  const appliedWidth = isSidebarCollapsed ? collapsedWidth : clampedWidth;

  // Keep the sidebar as a full-height column so the footer can sit at the bottom on tall viewports
  // Make sidebar relative so the resize handle is positioned correctly
  const sidebarClassNames = `relative flex flex-col min-h-screen bg-white dark:bg-gray-800 transition-all duration-300 overflow-hidden shadow-md z-40`;

  return (
    <div 
      className={sidebarClassNames}
      style={{
        width: `${appliedWidth}px`,
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        color: isDarkMode ? '#f3f4f6' : '#111827'
      }}
    >

    {/* TOP LOGO */}
    <div className={`flex gap-3 justify-between md:justify-normal items-center pt-4 ${
      isSidebarCollapsed ? 'px-2' : 'px-4'
    }`}
    >
      <div>
        <img 
          src="https://pub-7d4119dd86a04c7bbdbcc230a9d161e7.r2.dev/Images/splash.jpg" 
          alt="In-Accord" 
          className={`${isSidebarCollapsed ? 'w-10 h-10' : 'w-full'} object-contain`}
        />
      </div>
    </div>

     {/* LINKS */}
      <hr></hr>
      <p></p>
      <p></p>
    <div className='flex-1 mt-6 flex flex-col gap-1 overflow-y-auto'>

        <SidebarLink 
        href="/dashboard"
        icon={Layout}
        label="Dashboard" 
        isCollapsed={isSidebarCollapsed} 
      />
      <p>- Download:</p>
        <SidebarLink 
        href="/plugins" 
        icon={PlugIcon}
        label="Plugins" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/themes" 
        icon={FileQuestionIcon}
        label="Themes" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/uploads" 
        icon={DrumstickIcon}
        label="Uploads" 
        isCollapsed={isSidebarCollapsed} 
      />
      <p>- My Stuff:</p>
        <SidebarLink 
        href="/inventory" 
        icon={Archive}
        label="My Downloads" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/products" 
        icon={Clipboard}
        label="My Products" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/settings" 
        icon={Settings}
        label="My Settings" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/expenses" 
        icon={CircleDollarSignIcon}
        label="My Contracts" 
        isCollapsed={isSidebarCollapsed} 
      />
      <div
        className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-blue-200 dark:hover:bg-gray-600"
        onMouseDown={handleMouseDown}
      />
    <p>- Adverts:</p>
        <SidebarLink 
        href="/bots" 
        icon={BotIcon}
        label="Bots/Apps" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/servers" 
        icon={ServerCogIcon}
        label="Servers" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/hosting" 
        icon={PcCaseIcon}
        label="Hosting" 
        isCollapsed={isSidebarCollapsed}
      />
      <p>- Contacts:</p>
        <SidebarLink 
        href="/users" 
        icon={User}
        label="Ask a Dev" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/support" 
        icon={WebhookIcon}
        label="All Support" 
        isCollapsed={isSidebarCollapsed} 
      />
    </div>

     {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mt-auto mb-6`}>
    <hr className="dark:border-gray-700"></hr>
      <p> </p>
      <p className="text-center text-xs text-red-500 dark:text-red-400">&copy; 2026 In-Accord | GARD Realms LLC</p>
    </div>
   </div>
  );
};

export default Sidebar;
