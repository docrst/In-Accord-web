"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
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
    pathname === href || (pathname == "/" && href === "./dashboard");
    pathname === href || (pathname == "/" && href === "/plugins");
    pathname === href || (pathname == "/" && href === "/themes");
    pathname === href || (pathname == "/" && href === "/inventory");
    pathname === href || (pathname == "/" && href === "/products");   
    pathname === href || (pathname == "/" && href === "/settings");
    pathname === href || (pathname == "/" && href === "/expenses");
    pathname === href || (pathname == "/" && href === "/bots");
    pathname === href || (pathname == "/" && href === "/servers");
    pathname === href || (pathname == "/" && href === "/hosting");
    pathname === href || (pathname == "/" && href === "/upload");
    pathname === href || (pathname == "/" && href === "/users"); 
    pathname === href || (pathname == "/" && href === "/support");

  return (
    <Link href={href}>
      <div className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-md ${
        isCollapsed ? "justify-center py-4" : 'justify-start px-8 py-4'
      }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 text-gray-700!" />

        <span className={`${
          isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
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

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }; 

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 : md:w-16" : "w-66 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>

    {/* TOP LOGO */}

    <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
      isSidebarCollapsed ? 'px-5' : 'px-8'
    }`}
    >
      <div>logo</div>
      <h1 
      className={`${
        isSidebarCollapsed ? "hidden" : "block"
        } font-extrabold text-2xl`}
      >            
        In-Accord
      </h1>

    <button className="md-hidden px-6 py-6 bg-gray-100 rounded-full hover:bg-blue-100" 
      onClick={toggleSidebar} 
      >
      <Menu className="w-4 h-4" />
    </button>
    </div>

     {/* LINKS */}

     <div className='grow mt-11'>
        <SidebarLink 
        href="/dashboard" 
        icon={Layout}
        label="Dashboard" 
        isCollapsed={isSidebarCollapsed} 
      />
      <hr></hr>
      <p>Download</p>
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
      <hr></hr>
      <p>My Stuff</p>
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
        label="Expenses" 
        isCollapsed={isSidebarCollapsed} 
      />
    <hr></hr>
    <p>Adverts</p>
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
        <SidebarLink 
        href="/uploads" 
        icon={DrumstickIcon}
        label="Uploads" 
        isCollapsed={isSidebarCollapsed} 
      />
      <hr></hr>
      <p>Contacts</p>
        <SidebarLink 
        href="/users" 
        icon={User}
        label="All Users" 
        isCollapsed={isSidebarCollapsed} 
      />
        <SidebarLink 
        href="/support" 
        icon={WebhookIcon}
        label="Support" 
        isCollapsed={isSidebarCollapsed} 
      />
    </div>

     {/* FOOTER */}

       <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-6`}>
      <p className="text-center text-xs text-red-500">&copy; 2026 In-Accord | GARD Realms LLC</p>    
    </div>
   </div>
  );
};

export default Sidebar;
