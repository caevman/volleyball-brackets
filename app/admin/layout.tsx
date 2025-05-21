import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tournaments", label: "Tournaments" },
  { href: "/admin/players", label: "Players" },
  { href: "/admin/games", label: "Games" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r p-4 space-y-2">
        <div className="text-xl font-bold">🏐 VB Admin</div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-black text-black dark:text-white">
        {/* Topbar */}
        <div className="border-b p-4 flex justify-between items-center">
          <div className="text-lg font-semibold">Admin Panel</div>
          {/* Add logout, user avatar, or theme toggle here */}
        </div>

        <div className="flex justify-center p-6">{children}</div>
      </main>
    </div>
  );
}
