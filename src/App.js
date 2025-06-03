import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Tickets from "./pages/Tickets";
import Departments from "./pages/Departments";

import Tickets from "./pages/Tickets";
import Departments from "./pages/Departments";

const queryClient = new QueryClient();
const nonce = window.wpData?.nonce;
console.log("nonce", nonce);
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex" dir="rtl">
          {/* <Sidebar
          {/* <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          /> */}

          <div className="flex-1 bg-gray-100">
            <Header
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="flex-grow p-4">
              <Tickets />
              {/* <Routes>
                <Route path="/" element={<Tickets />} />
              <Tickets />
              {/* <Routes>
                <Route path="/" element={<Tickets />} />
                <Route path="/departments" element={<Departments />} />
              </Routes> */}
            </div>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
