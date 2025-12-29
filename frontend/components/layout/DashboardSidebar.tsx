"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  HiOutlineHome,
  HiOutlinePlusCircle,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineLogout,
  HiOutlineStar,
  HiOutlineTicket,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiMenu,
  HiX,
  HiHome,
} from "react-icons/hi";

interface DashboardSidebarProps {
  type: "user" | "club";
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function DashboardSidebar({
  type,
  activeTab,
  onTabChange,
  onLogout,
}: DashboardSidebarProps) {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (type === "user") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setProfileData(JSON.parse(userData));
      }
    } else if (type === "club") {
      const clubData = localStorage.getItem("club");
      if (clubData) {
        setProfileData(JSON.parse(clubData));
      }
    }
  }, [type]);

  const getDisplayName = () => {
    if (type === "user" && profileData) {
      return profileData.name;
    } else if (type === "club" && profileData) {
      return profileData.club_name;
    }
    return "";
  };

  const getEmail = () => {
    if (profileData) {
      return profileData.email;
    }
    return "";
  };

  const userMenuItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: HiOutlineHome,
    },
    {
      id: "events",
      label: "My Events",
      icon: HiOutlineCalendar,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: HiOutlineStar,
    },
    {
      id: "tickets",
      label: "My Tickets",
      icon: HiOutlineTicket,
    },
    {
      id: "homepage",
      label: "Back to Homepage",
      icon: HiHome,
    },
  ];

  const clubMenuItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: HiOutlineHome,
    },
    {
      id: "events",
      label: "Create Event",
      icon: HiOutlinePlusCircle,
    },
    {
      id: "members",
      label: "My Events",
      icon: HiOutlineCalendar,
    },
    {
      id: "analytics",
      label: "Attendees",
      icon: HiOutlineUserGroup,
    },
    {
      id: "homepage",
      label: "Back to Homepage",
      icon: HiHome,
    },
  ];

  const menuItems = type === "user" ? userMenuItems : clubMenuItems;

  if (!profileData) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-[60] bg-primary text-white rounded-lg p-2.5 shadow-lg hover:bg-accent transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <HiX className="w-6 h-6" />
        ) : (
          <HiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#f8f9ff] border-r border-gray-200 flex flex-col z-50 transition-all duration-300
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header with Toggle */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">E</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Eventify</h2>
                <p className="text-xs text-gray-500">Admin Console</p>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/" className="flex items-center justify-center w-full">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">E</span>
              </div>
            </Link>
          )}
        </div>

        {/* Toggle Button (Desktop only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block absolute -right-3 top-20 bg-primary text-white rounded-full p-1.5 shadow-lg hover:bg-accent transition-colors z-10"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <HiMenu className="w-4 h-4" />
          ) : (
            <HiX className="w-4 h-4" />
          )}
        </button>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            // Special handling for homepage link
            if (item.id === "homepage") {
              return (
                <Link
                  key={item.id}
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-gray-700 hover:bg-gray-100 ${
                    isCollapsed ? "justify-center" : "text-left"
                  }`}
                  title={isCollapsed ? item.label : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full ${
                  activeTab === item.id
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                } ${isCollapsed ? "justify-center" : "text-left"}`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile & Logout */}
        <div className="p-4 border-t border-gray-200">
          {/* Profile Info */}
          {!isCollapsed && (
            <div className="mb-4 px-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 text-sm font-semibold">
                    {getDisplayName().charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">
                    {getDisplayName()}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-gray-500 truncate pl-[46px]">
                {getEmail()}
              </p>
            </div>
          )}

          {isCollapsed && (
            <div className="mb-4 flex justify-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-semibold">
                  {getDisplayName().charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <HiOutlineLogout className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
