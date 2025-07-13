'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutList, Users, UserCircle, LogOut } from 'lucide-react';
import React from 'react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Blog List',
      icon: <LayoutList size={18} />,
      path: '/account/blog-list',
    },
    {
      name: 'User List',
      icon: <Users size={18} />,
      path: '/account/user-list',
    },
  ];

  return (
    <aside className="w-54 h-screen bg-blue-800 shadow-2xl flex flex-col justify-between">
      {/* Top - Menu */}
      <div>
        <div className="p-9 text-xl font-bold text-white">Dashboard</div>
        <nav className="flex flex-col space-y-1 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition ${
                  isActive ? 'bg-blue-500 text-white' : 'text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom - Profile & Logout */}
      <div className="px-4 py-6 border-t border-blue-700 flex flex-col gap-2">
        <Link
          href="/account/profile"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-500 transition"
        >
          <UserCircle size={18} />
          My Profile
        </Link>
        <button
          onClick={() => {
            // Call your logout logic here
            console.log('Logging out...');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-500 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
