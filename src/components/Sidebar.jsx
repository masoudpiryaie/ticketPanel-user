import React from 'react';
import { FaHome, FaUsers, FaCog, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom'; // Importing Link from React Router

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <nav
            className={`bg-gray-800 text-white transition-all duration-500 ${isSidebarOpen ? 'w-64' : 'w-16'} h-screen flex flex-col justify-between items-start rtl`}
        >
            <div>
                <div className="p-4 min-h-[56px]"> {/* Set min-height to match expected height */}
                    <h1 className={`text-2xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                        تیکت
                    </h1>
                </div>
                <ul className="mt-6 space-y-4 flex flex-col items-start w-full">
                    <li className="flex items-start w-full justify-start hover:bg-gray-700 p-2 transition-all duration-300">
                        <Link to='' className="flex items-start w-full">
                            <FaHome className="text-xl" />
                            <span
                                aria-hidden={!isSidebarOpen}
                                className={`mr-4 transition-opacity duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}
                            >
                                تیکت‌ها
                            </span>
                        </Link>
                    </li>
                    <li className="flex items-start w-full justify-start hover:bg-gray-700 p-2 transition-all duration-300">
                        <Link to="/departments" className="flex items-start w-full">
                            <FaUsers className="text-xl" />
                            <span
                                aria-hidden={!isSidebarOpen}
                                className={`mr-4 transition-opacity duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}
                            >
                                بخش‌ها
                            </span>
                        </Link>
                    </li>
                    <li className="flex items-start w-full justify-start hover:bg-gray-700 p-2 transition-all duration-300">
                        <FaCog className="text-xl" />
                        <span
                            className={`mr-4 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
                        >
                            تنظیمات
                        </span>
                    </li>
                </ul>
            </div>

            {/* Toggle Button */}
            <div className="w-full flex justify-start p-4">
                <button
                    aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                    className="flex items-start justify-start hover:bg-gray-700 p-2 rounded-md"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? (
                        <>
                            <FaChevronRight className="text-xl" />
                            <span className={`mr-2 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                                بستن منو
                            </span>
                        </>
                    ) : (
                        <FaChevronLeft className="text-xl" />
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
