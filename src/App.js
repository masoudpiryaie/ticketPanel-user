// src/App.jsx
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Departments from "./pages/Departments";
import Tickets from "./pages/Tickets";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
// import Sidebar from "./Sidebar";
// import Tickets from "./Tickets";
// import Departments from "./Departments";
const queryClient = new QueryClient();

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex" dir="rtl">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className="flex-1 bg-gray-100">
            <Header
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="flex-grow p-4">
              <Routes>
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/departments" element={<Departments />} />
                {/* Add more routes here as needed */}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
