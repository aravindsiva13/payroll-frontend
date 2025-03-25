// import { useState } from "react";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import {
//   FiUsers,
//   FiDollarSign,
//   FiCalendar,
//   FiFileText,
//   FiBarChart2,
//   FiSettings,
//   FiMenu,
//   FiX,
// } from "react-icons/fi";

// // Import all pages
// import Dashboard from "./pages/Dashboard";
// import Employees from "./pages/Employees";
// import Payroll from "./pages/Payroll";
// import Attendance from "./pages/Attendance";
// import Compliance from "./pages/Compliance";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   const navItems = [
//     { path: "/", name: "Dashboard", icon: <FiBarChart2 /> },
//     { path: "/employees", name: "Employees", icon: <FiUsers /> },
//     { path: "/payroll", name: "Payroll", icon: <FiDollarSign /> },
//     { path: "/attendance", name: "Attendance", icon: <FiCalendar /> },
//     { path: "/compliance", name: "Compliance", icon: <FiFileText /> },
//     { path: "/reports", name: "Reports", icon: <FiBarChart2 /> },
//     { path: "/settings", name: "Settings", icon: <FiSettings /> },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
//       >
//         <div className="flex items-center justify-between h-16 px-6 border-b">
//           <span className="text-xl font-semibold text-gray-800">
//             PayrollPro
//           </span>
//           <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
//             <FiX className="w-6 h-6" />
//           </button>
//         </div>
//         <nav className="px-4 py-4">
//           <ul>
//             {navItems.map((item) => (
//               <li key={item.path} className="mb-2">
//                 <Link
//                   to={item.path}
//                   className={`flex items-center px-4 py-2 rounded-md ${
//                     location.pathname === item.path
//                       ? "bg-primary text-white"
//                       : "text-gray-700 hover:bg-gray-100"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col lg:ml-64">
//         {/* Header */}
//         <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
//           <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
//             <FiMenu className="w-6 h-6" />
//           </button>
//           <div className="flex items-center">
//             <div className="relative">
//               <img
//                 src="https://via.placeholder.com/40"
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full"
//               />
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/employees" element={<Employees />} />
//             <Route path="/payroll" element={<Payroll />} />
//             <Route path="/attendance" element={<Attendance />} />
//             <Route path="/compliance" element={<Compliance />} />
//             <Route path="/reports" element={<Reports />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

//2

import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX,
  FiPackage,
  FiLayers,
} from "react-icons/fi";

// Import all pages
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import Attendance from "./pages/Attendance";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import SalaryComponents from "./pages/salary/SalaryComponents";
import SalaryStructures from "./pages/salary/SalaryStructures";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", name: "Dashboard", icon: <FiBarChart2 /> },
    { path: "/employees", name: "Employees", icon: <FiUsers /> },
    { path: "/payroll", name: "Payroll", icon: <FiDollarSign /> },
    { path: "/attendance", name: "Attendance", icon: <FiCalendar /> },
    { path: "/compliance", name: "Compliance", icon: <FiFileText /> },
    {
      path: "/salary-management",
      name: "Salary Management",
      icon: <FiLayers />,
      subItems: [
        { path: "/salary-components", name: "Components" },
        { path: "/salary-structures", name: "Structures" },
      ],
    },
    { path: "/reports", name: "Reports", icon: <FiBarChart2 /> },
    { path: "/settings", name: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <span className="text-xl font-semibold text-gray-800">
            PayrollPro
          </span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-4 py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-2">
                {item.subItems ? (
                  <div>
                    <div className="flex items-center px-4 py-2 text-gray-700">
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </div>
                    <ul className="pl-10 mt-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path} className="mb-1">
                          <Link
                            to={subItem.path}
                            className={`block px-2 py-1 rounded-md ${
                              location.pathname === subItem.path
                                ? "bg-primary text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      location.pathname === item.path
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <div className="relative">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/salary-components" element={<SalaryComponents />} />
            <Route path="/salary-structures" element={<SalaryStructures />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
