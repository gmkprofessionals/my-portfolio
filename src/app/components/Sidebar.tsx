'use client';
import { RiLockPasswordFill } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutList,  UserCircle, LogOut } from 'lucide-react';
import React from 'react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Blog List',
      icon: <LayoutList size={18} />,
      path: '/account/blog-list',
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
      <div className="px-4 py-2 border-t border-blue-700 flex flex-col">
        <Link
          href={`/account/profile/68b9bbca9e1e1abc09f2376f`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-500 transition"
        >
          <UserCircle size={18} />
          My Profile
        </Link>
        <Link
          href={`/account/change-password/68b9bbca9e1e1abc09f2376f`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-500 transition"
        >
          <RiLockPasswordFill size={18} />
          Change Password
        </Link>
        <button
          type="button"
          onClick={() => {
            // Call your logout logic here
            console.log('Logging out...');
          }}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-500 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
