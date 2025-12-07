"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  //AlertCircle,
  MessageCircle,
  FileBarChart,
  CheckCircle,
  LogOut,
  BadgeInfo,
  Search,
  User2
} from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "clientToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.replace("/");
  };

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/client/dashboard" },
    { label: "Locations", icon: MapPin, href: "/client/locations" },
    //{ label: "Issues", icon: AlertCircle, href: "/client/issues" },
    { label: "Feedback", icon: MessageCircle, href: "/client/feedback" },
    { label: "Attendance", icon: CheckCircle, href: "/client/attendance" },
    { label: "Reports", icon: FileBarChart, href: "/client/reports" },
    { label: "Profile", icon: User2, href: "/client/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">

        {/* Branding */}
        <div className="px-6 py-6 border-b border-gray-200 flex items-center gap-3">
          <BadgeInfo size={26} className="text-gray-700" />
          <h1 className="text-lg font-semibold tracking-wide text-gray-800">
            Client Portal
          </h1>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 bg-transparent outline-none text-sm text-gray-700 w-full"
            />
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col mt-2 flex-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 mx-3 mb-2 text-sm font-medium rounded-md transition-all 
                  ${
                    active
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 mb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium 
              rounded-md transition-all text-red-500 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
