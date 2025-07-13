"use client";
import React from "react";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const InnerLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto max-h-[620px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InnerLayout;