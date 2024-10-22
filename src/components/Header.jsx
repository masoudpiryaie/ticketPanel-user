import React from 'react';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center rtl">
            <h2 className="text-xl font-semibold">داشبورد</h2>
            <button
                className="text-gray-800"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? 'بستن منو' : 'باز کردن منو'}
            </button>
        </header>
    );
};

export default Header;
