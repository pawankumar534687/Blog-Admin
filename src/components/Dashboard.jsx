import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MdDiscount } from "react-icons/md";

import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen   flex flex-col bg-gray-100">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden bg-gray-800 text-white px-3 py-2 rounded-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Menu
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Blog Website Admin Panel
          </h1>
        </div>

        <div className="flex max-md:hidden items-center space-x-4">
          <Link
            to="https://blog-frontend-388e.onrender.com"
            className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700"
          >
            Go To Website
          </Link>
        </div>
      </header>

      <div className="flex flex-1 min-h-screen  pt-16">
        {sidebarOpen && (
          <aside
            className="bg-pink-500

 text-white p-2 w-64 space-y-4 z-30 fixed top-16 left-0 md:hidden overflow-y-auto h-[calc(100vh-4rem)]"
          >
            <div className="flex flex-col mb-4 ">
              <nav className="ml-8 ">
                <ul className="space-y-2 ">
                  <li>
                    <Link
                      to="/manage-blog"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <MdDiscount className="w-5 h-5" />
                      Manage Coupons
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        )}

        {/* Desktop Sidebar */}
        <aside
          className="hidden md:flex flex-col bg-pink-500
 text-white p-6 w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] z-30"
        >
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/manage-blog"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <MdDiscount className="w-5 h-5" />
                  Manage Coupons
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1  p-8 md:ml-64 w-full max-md:mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
