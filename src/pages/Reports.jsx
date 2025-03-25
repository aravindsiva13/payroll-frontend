// import { useState, useEffect } from "react";
// import {
//   FiDownload,
//   FiFilter,
//   FiBarChart2,
//   FiPieChart,
//   FiUsers,
//   FiDollarSign,
// } from "react-icons/fi";
// import { Card, Button, Select, Table, Modal } from "../components/ui";
// import { api } from "../services/mockApi";
// import { formatMonth, formatCurrency, formatDate } from "../utils";

// function Reports() {
//   const [activeReport, setActiveReport] = useState("salary");
//   const [employees, setEmployees] = useState([]);
//   const [salaries, setSalaries] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [filterModalOpen, setFilterModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     month: new Date().toISOString().slice(0, 7), // Current month (YYYY-MM)
//     department: "",
//     employeeId: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, [activeReport, filters]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       // Fetch employees data
//       const empData = await api.getEmployees();
//       setEmployees(empData);

//       // Fetch data based on active report
//       if (activeReport === "salary") {
//         const salaryData = await api.getSalaries({
//           month: filters.month,
//           ...(filters.employeeId && {
//             employeeId: parseInt(filters.employeeId),
//           }),
//         });
//         setSalaries(salaryData);
//       } else if (activeReport === "attendance") {
//         const attendanceData = await api.getAttendance({
//           ...(filters.employeeId && {
//             employeeId: parseInt(filters.employeeId),
//           }),
//         });
//         setAttendance(attendanceData);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const applyFilters = () => {
//     setFilterModalOpen(false);
//     fetchData();
//   };

//   const handleExport = () => {
//     alert(`Exporting ${activeReport} report with current filters`);
//   };

//   // Generate months for dropdown
//   const getMonths = () => {
//     const months = [];
//     const currentDate = new Date();
//     for (let i = 0; i < 12; i++) {
//       const date = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() - i,
//         1
//       );
//       const value = date.toISOString().slice(0, 7);
//       const label = date.toLocaleString("default", {
//         month: "long",
//         year: "numeric",
//       });
//       months.push({ value, label });
//     }
//     return months;
//   };

//   // Get departments from employees
//   const getDepartments = () => {
//     const departments = [...new Set(employees.map((emp) => emp.department))];
//     return departments.map((dept) => ({ value: dept, label: dept }));
//   };

//   // Format filtered employee names for display
//   const getFilteredEmployeeName = () => {
//     if (!filters.employeeId) return "All Employees";
//     const employee = employees.find(
//       (emp) => emp.id === parseInt(filters.employeeId)
//     );
//     return employee ? employee.name : `Employee #${filters.employeeId}`;
//   };

//   // Generate report data and columns based on active report
//   const getReportData = () => {
//     if (activeReport === "salary") {
//       const columns = [
//         {
//           key: "employeeId",
//           label: "Employee",
//           render: (row) => {
//             const employee = employees.find((e) => e.id === row.employeeId);
//             return employee ? employee.name : `Employee #${row.employeeId}`;
//           },
//         },
//         {
//           key: "month",
//           label: "Month",
//           render: (row) => formatMonth(row.month),
//         },
//         {
//           key: "grossSalary",
//           label: "Gross Salary",
//           render: (row) => formatCurrency(row.grossSalary),
//         },
//         {
//           key: "basicSalary",
//           label: "Basic",
//           render: (row) => formatCurrency(row.basicSalary),
//         },
//         {
//           key: "hra",
//           label: "HRA",
//           render: (row) => formatCurrency(row.hra),
//         },
//         {
//           key: "pfDeduction",
//           label: "PF",
//           render: (row) => formatCurrency(row.pfDeduction),
//         },
//         {
//           key: "esiDeduction",
//           label: "ESI",
//           render: (row) => formatCurrency(row.esiDeduction),
//         },
//         {
//           key: "tds",
//           label: "TDS",
//           render: (row) => formatCurrency(row.tds),
//         },
//         {
//           key: "netSalary",
//           label: "Net Salary",
//           render: (row) => formatCurrency(row.netSalary),
//         },
//       ];

//       return { columns, data: salaries };
//     } else if (activeReport === "attendance") {
//       const columns = [
//         {
//           key: "employeeName",
//           label: "Employee",
//           render: (row) => {
//             const employee = employees.find((e) => e.id === row.employeeId);
//             return employee ? employee.name : `Employee #${row.employeeId}`;
//           },
//         },
//         {
//           key: "date",
//           label: "Date",
//           render: (row) => formatDate(row.date),
//         },
//         {
//           key: "status",
//           label: "Status",
//           render: (row) =>
//             row.status.charAt(0).toUpperCase() + row.status.slice(1),
//         },
//         {
//           key: "checkIn",
//           label: "Check In",
//           render: (row) => (row.checkIn ? row.checkIn.slice(0, 5) : "-"),
//         },
//         {
//           key: "checkOut",
//           label: "Check Out",
//           render: (row) => (row.checkOut ? row.checkOut.slice(0, 5) : "-"),
//         },
//       ];

//       return { columns, data: attendance };
//     }

//     return { columns: [], data: [] };
//   };

//   // Calculate summary data
//   const calculateSummary = () => {
//     if (activeReport === "salary") {
//       const totalGrossSalary = salaries.reduce(
//         (sum, salary) => sum + salary.grossSalary,
//         0
//       );
//       const totalNetSalary = salaries.reduce(
//         (sum, salary) => sum + salary.netSalary,
//         0
//       );
//       const totalPF = salaries.reduce(
//         (sum, salary) => sum + salary.pfDeduction,
//         0
//       );
//       const totalESI = salaries.reduce(
//         (sum, salary) => sum + salary.esiDeduction,
//         0
//       );
//       const totalTDS = salaries.reduce((sum, salary) => sum + salary.tds, 0);

//       return {
//         totalGrossSalary,
//         totalNetSalary,
//         totalPF,
//         totalESI,
//         totalTDS,
//         averageGrossSalary: salaries.length
//           ? totalGrossSalary / salaries.length
//           : 0,
//         averageNetSalary: salaries.length
//           ? totalNetSalary / salaries.length
//           : 0,
//       };
//     } else if (activeReport === "attendance") {
//       const presentCount = attendance.filter(
//         (a) => a.status === "present"
//       ).length;
//       const leaveCount = attendance.filter((a) => a.status === "leave").length;
//       const absentCount = attendance.filter(
//         (a) => a.status === "absent"
//       ).length;
//       const totalCount = attendance.length;

//       return {
//         presentCount,
//         leaveCount,
//         absentCount,
//         totalCount,
//         presentPercentage: totalCount ? (presentCount / totalCount) * 100 : 0,
//         leavePercentage: totalCount ? (leaveCount / totalCount) * 100 : 0,
//         absentPercentage: totalCount ? (absentCount / totalCount) * 100 : 0,
//       };
//     }

//     return {};
//   };

//   const { columns, data } = getReportData();
//   const summary = calculateSummary();
//   const monthOptions = getMonths();
//   const departmentOptions = getDepartments();

//   // Get department-wise salary data for visualization
//   const getDepartmentSalaryData = () => {
//     const departmentMap = {};

//     salaries.forEach((salary) => {
//       const employee = employees.find((emp) => emp.id === salary.employeeId);
//       if (employee) {
//         const dept = employee.department;
//         if (!departmentMap[dept]) {
//           departmentMap[dept] = {
//             gross: 0,
//             net: 0,
//             count: 0,
//           };
//         }
//         departmentMap[dept].gross += salary.grossSalary;
//         departmentMap[dept].net += salary.netSalary;
//         departmentMap[dept].count += 1;
//       }
//     });

//     return Object.entries(departmentMap).map(([dept, data]) => ({
//       department: dept,
//       grossSalary: data.gross,
//       netSalary: data.net,
//       employeeCount: data.count,
//       averageSalary: data.count > 0 ? data.gross / data.count : 0,
//     }));
//   };

//   const departmentSalaryData = getDepartmentSalaryData();

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Reports & Analytics
//         </h1>
//         <div className="flex space-x-2">
//           <Button variant="outline" onClick={() => setFilterModalOpen(true)}>
//             <FiFilter className="w-4 h-4 mr-2" />
//             Filters
//           </Button>
//           <Button onClick={handleExport}>
//             <FiDownload className="w-4 h-4 mr-2" />
//             Export
//           </Button>
//         </div>
//       </div>

//       <div className="flex space-x-2 border-b">
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeReport === "salary"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveReport("salary")}
//         >
//           Salary Report
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeReport === "attendance"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveReport("attendance")}
//         >
//           Attendance Report
//         </button>
//       </div>

//       <div className="flex flex-wrap gap-2 text-sm">
//         <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
//           <span className="text-gray-600 mr-1">Month:</span>
//           <span className="font-medium">{formatMonth(filters.month)}</span>
//         </div>

//         {filters.department && (
//           <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
//             <span className="text-gray-600 mr-1">Department:</span>
//             <span className="font-medium">{filters.department}</span>
//           </div>
//         )}

//         <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
//           <span className="text-gray-600 mr-1">Employee:</span>
//           <span className="font-medium">{getFilteredEmployeeName()}</span>
//         </div>
//       </div>

//       {activeReport === "salary" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <Card className="bg-blue-50">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-blue-100 mr-3">
//                 <FiDollarSign className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <div className="text-sm text-blue-700">Total Gross Salary</div>
//                 <div className="text-xl font-semibold">
//                   {formatCurrency(summary.totalGrossSalary)}
//                 </div>
//               </div>
//             </div>
//           </Card>

//           <Card className="bg-green-50">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-green-100 mr-3">
//                 <FiDollarSign className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <div className="text-sm text-green-700">Total Net Salary</div>
//                 <div className="text-xl font-semibold">
//                   {formatCurrency(summary.totalNetSalary)}
//                 </div>
//               </div>
//             </div>
//           </Card>

//           <Card className="bg-yellow-50">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-yellow-100 mr-3">
//                 <FiUsers className="w-5 h-5 text-yellow-600" />
//               </div>
//               <div>
//                 <div className="text-sm text-yellow-700">Employee Count</div>
//                 <div className="text-xl font-semibold">{salaries.length}</div>
//               </div>
//             </div>
//           </Card>

//           <Card className="bg-purple-50">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-purple-100 mr-3">
//                 <FiBarChart2 className="w-5 h-5 text-purple-600" />
//               </div>
//               <div>
//                 <div className="text-sm text-purple-700">Average Salary</div>
//                 <div className="text-xl font-semibold">
//                   {formatCurrency(summary.averageGrossSalary)}
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeReport === "attendance" && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <Card className="bg-green-50">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-green-100 mr-3">
//                 <FiUsers className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <div className="text-sm text-green-700">Present</div>
//                 <div className="text-xl font-semibold">
//                   {summary.presentCount}
//                 </div>
//                 <div className="text-xs text-green-700">
//                   {summary.presentPercentage.toFixed(1)}% of total
//                 </div>
//               </div>
//             </div>
//           </Card>

//           <Card className="bg-yellow-50">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-yellow-100 mr-3">
//                 <FiUsers className="w-5 h-5 text-yellow-600" />
//               </div>
//               <div>
//                 <div className="text-sm text-yellow-700">Leave</div>
//                 <div className="text-xl font-semibold">
//                   {summary.leaveCount}
//                 </div>
//                 <div className="text-xs text-yellow-700">
//                   {summary.leavePercentage.toFixed(1)}% of total
//                 </div>
//               </div>
//             </div>
//           </Card>

//           <Card className="bg-red-50">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-red-100 mr-3">
//                 <FiUsers className="w-5 h-5 text-red-600" />
//               </div>
//               <div>
//                 <div className="text-sm text-red-700">Absent</div>
//                 <div className="text-xl font-semibold">
//                   {summary.absentCount}
//                 </div>
//                 <div className="text-xs text-red-700">
//                   {summary.absentPercentage.toFixed(1)}% of total
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeReport === "salary" && departmentSalaryData.length > 0 && (
//         <Card title="Department-wise Salary Distribution" className="mb-6">
//           <div className="space-y-4">
//             {departmentSalaryData.map((dept) => (
//               <div key={dept.department} className="space-y-1">
//                 <div className="flex justify-between items-center">
//                   <div className="font-medium">{dept.department}</div>
//                   <div className="text-sm text-gray-500">
//                     {dept.employeeCount} employees
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-primary h-2 rounded-full"
//                       style={{
//                         width: `${
//                           (dept.grossSalary / summary.totalGrossSalary) * 100
//                         }%`,
//                       }}
//                     ></div>
//                   </div>
//                   <div className="text-sm font-medium whitespace-nowrap">
//                     {formatCurrency(dept.grossSalary)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-gray-500">Loading report data...</div>
//         </div>
//       ) : (
//         <Table columns={columns} data={data} />
//       )}

//       {/* Filter Modal */}
//       <Modal
//         isOpen={filterModalOpen}
//         onClose={() => setFilterModalOpen(false)}
//         title="Filter Reports"
//       >
//         <div className="space-y-4">
//           <Select
//             label="Month"
//             id="month"
//             name="month"
//             value={filters.month}
//             onChange={handleFilterChange}
//             options={[{ value: "", label: "All Months" }, ...monthOptions]}
//           />

//           <Select
//             label="Department"
//             id="department"
//             name="department"
//             value={filters.department}
//             onChange={handleFilterChange}
//             options={[
//               { value: "", label: "All Departments" },
//               ...departmentOptions,
//             ]}
//           />

//           <Select
//             label="Employee"
//             id="employeeId"
//             name="employeeId"
//             value={filters.employeeId}
//             onChange={handleFilterChange}
//             options={[
//               { value: "", label: "All Employees" },
//               ...employees.map((emp) => ({
//                 value: emp.id.toString(),
//                 label: emp.name,
//               })),
//             ]}
//           />
//         </div>

//         <div className="flex justify-end space-x-3 mt-6">
//           <Button
//             variant="secondary"
//             type="button"
//             onClick={() => setFilterModalOpen(false)}
//           >
//             Cancel
//           </Button>
//           <Button onClick={applyFilters}>Apply Filters</Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default Reports;

//2

import { useState, useEffect } from "react";
import {
  FiDownload,
  FiFilter,
  FiBarChart2,
  FiPieChart,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";
import { Card, Button, Select, Table, Modal } from "../components/ui";
import { api } from "../services/mockApi";
import { formatMonth, formatCurrency, formatDate } from "../utils";

function Reports() {
  const [activeReport, setActiveReport] = useState("salary");
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    month: new Date().toISOString().slice(0, 7), // Current month (YYYY-MM)
    department: "",
    employeeId: "",
  });

  useEffect(() => {
    fetchData();
  }, [activeReport, filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch employees data
      const empData = await api.getEmployees();
      setEmployees(empData);

      // Fetch data based on active report
      if (activeReport === "salary") {
        const salaryData = await api.getSalaries({
          month: filters.month,
          ...(filters.employeeId && {
            employeeId: parseInt(filters.employeeId),
          }),
        });
        setSalaries(salaryData);
      } else if (activeReport === "attendance") {
        const attendanceData = await api.getAttendance({
          ...(filters.employeeId && {
            employeeId: parseInt(filters.employeeId),
          }),
        });
        setAttendance(attendanceData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    setFilterModalOpen(false);
    fetchData();
  };

  const handleExport = () => {
    alert(`Exporting ${activeReport} report with current filters`);
  };

  // Generate months for dropdown
  const getMonths = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const value = date.toISOString().slice(0, 7);
      const label = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      months.push({ value, label });
    }
    return months;
  };

  // Get departments from employees
  const getDepartments = () => {
    const departments = [...new Set(employees.map((emp) => emp.department))];
    return departments.map((dept) => ({ value: dept, label: dept }));
  };

  // Format filtered employee names for display
  const getFilteredEmployeeName = () => {
    if (!filters.employeeId) return "All Employees";
    const employee = employees.find(
      (emp) => emp.id === parseInt(filters.employeeId)
    );
    return employee ? employee.name : `Employee #${filters.employeeId}`;
  };

  // Generate report data and columns based on active report
  const getReportData = () => {
    if (activeReport === "salary") {
      const columns = [
        {
          key: "employeeName", // Changed from employeeId to avoid duplicate keys
          label: "Employee",
          render: (row) => {
            const employee = employees.find((e) => e.id === row.employeeId);
            return employee ? employee.name : `Employee #${row.employeeId}`;
          },
        },
        {
          key: "month",
          label: "Month",
          render: (row) => formatMonth(row.month),
        },
        {
          key: "grossSalary",
          label: "Gross Salary",
          render: (row) => {
            const value = Number.isFinite(row.grossSalary)
              ? row.grossSalary
              : 0;
            return formatCurrency(value);
          },
        },
        {
          key: "basicSalary",
          label: "Basic",
          render: (row) => {
            const grossSalary = Number.isFinite(row.grossSalary)
              ? row.grossSalary
              : 0;
            const value = Number.isFinite(row.basicSalary)
              ? row.basicSalary
              : grossSalary * 0.6;
            return formatCurrency(value);
          },
        },
        {
          key: "hra",
          label: "HRA",
          render: (row) => {
            const grossSalary = Number.isFinite(row.grossSalary)
              ? row.grossSalary
              : 0;
            const basicSalary = Number.isFinite(row.basicSalary)
              ? row.basicSalary
              : grossSalary * 0.6;
            const value = Number.isFinite(row.hra)
              ? row.hra
              : basicSalary * 0.4;
            return formatCurrency(value);
          },
        },
        {
          key: "pfDeduction",
          label: "PF",
          render: (row) => {
            const grossSalary = Number.isFinite(row.grossSalary)
              ? row.grossSalary
              : 0;
            const basicSalary = Number.isFinite(row.basicSalary)
              ? row.basicSalary
              : grossSalary * 0.6;
            const value = Number.isFinite(row.pfDeduction)
              ? row.pfDeduction
              : basicSalary * 0.12;
            return formatCurrency(value);
          },
        },
        {
          key: "esiDeduction",
          label: "ESI",
          render: (row) => {
            const grossSalary = Number.isFinite(row.grossSalary)
              ? row.grossSalary
              : 0;
            const value = Number.isFinite(row.esiDeduction)
              ? row.esiDeduction
              : grossSalary * 0.015;
            return formatCurrency(value);
          },
        },
        {
          key: "tds",
          label: "TDS",
          render: (row) => {
            const grossSalary = Number.isFinite(row.grossSalary)
              ? row.grossSalary
              : 0;
            const value = Number.isFinite(row.tds)
              ? row.tds
              : grossSalary * 0.1;
            return formatCurrency(value);
          },
        },
        {
          key: "netSalary",
          label: "Net Salary",
          render: (row) => {
            if (Number.isFinite(row.netSalary)) {
              return formatCurrency(row.netSalary);
            }

            // Calculate net salary if not available
            const grossSalary = Number.isFinite(row.grossSalary)
              ? row.grossSalary
              : 0;
            const basicSalary = Number.isFinite(row.basicSalary)
              ? row.basicSalary
              : grossSalary * 0.6;
            const pfDeduction = Number.isFinite(row.pfDeduction)
              ? row.pfDeduction
              : basicSalary * 0.12;
            const esiDeduction = Number.isFinite(row.esiDeduction)
              ? row.esiDeduction
              : grossSalary * 0.015;
            const professionalTax = Number.isFinite(row.professionalTax)
              ? row.professionalTax
              : 200;
            const tds = Number.isFinite(row.tds) ? row.tds : grossSalary * 0.1;

            const calculatedNetSalary =
              grossSalary -
              (pfDeduction + esiDeduction + professionalTax + tds);
            return formatCurrency(calculatedNetSalary);
          },
        },
      ];

      return { columns, data: salaries };
    } else if (activeReport === "attendance") {
      const columns = [
        {
          key: "employeeName",
          label: "Employee",
          render: (row) => {
            const employee = employees.find((e) => e.id === row.employeeId);
            return employee ? employee.name : `Employee #${row.employeeId}`;
          },
        },
        {
          key: "date",
          label: "Date",
          render: (row) => formatDate(row.date),
        },
        {
          key: "status",
          label: "Status",
          render: (row) =>
            row.status.charAt(0).toUpperCase() + row.status.slice(1),
        },
        {
          key: "checkIn",
          label: "Check In",
          render: (row) => (row.checkIn ? row.checkIn.slice(0, 5) : "-"),
        },
        {
          key: "checkOut",
          label: "Check Out",
          render: (row) => (row.checkOut ? row.checkOut.slice(0, 5) : "-"),
        },
      ];

      return { columns, data: attendance };
    }

    return { columns: [], data: [] };
  };

  // Calculate summary data
  const calculateSummary = () => {
    if (activeReport === "salary") {
      const totalGrossSalary = salaries.reduce((sum, salary) => {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        return sum + grossSalary;
      }, 0);

      const totalNetSalary = salaries.reduce((sum, salary) => {
        if (Number.isFinite(salary.netSalary)) {
          return sum + salary.netSalary;
        }
        // Calculate net salary if not available
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        const basicSalary = Number.isFinite(salary.basicSalary)
          ? salary.basicSalary
          : grossSalary * 0.6;
        const pfDeduction = Number.isFinite(salary.pfDeduction)
          ? salary.pfDeduction
          : basicSalary * 0.12;
        const esiDeduction = Number.isFinite(salary.esiDeduction)
          ? salary.esiDeduction
          : grossSalary * 0.015;
        const professionalTax = Number.isFinite(salary.professionalTax)
          ? salary.professionalTax
          : 200;
        const tds = Number.isFinite(salary.tds)
          ? salary.tds
          : grossSalary * 0.1;

        const calculatedNetSalary =
          grossSalary - (pfDeduction + esiDeduction + professionalTax + tds);
        return sum + calculatedNetSalary;
      }, 0);

      const totalPF = salaries.reduce((sum, salary) => {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        const basicSalary = Number.isFinite(salary.basicSalary)
          ? salary.basicSalary
          : grossSalary * 0.6;
        const pfDeduction = Number.isFinite(salary.pfDeduction)
          ? salary.pfDeduction
          : basicSalary * 0.12;
        return sum + pfDeduction;
      }, 0);

      const totalESI = salaries.reduce((sum, salary) => {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        const esiDeduction = Number.isFinite(salary.esiDeduction)
          ? salary.esiDeduction
          : grossSalary * 0.015;
        return sum + esiDeduction;
      }, 0);

      const totalTDS = salaries.reduce((sum, salary) => {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        const tds = Number.isFinite(salary.tds)
          ? salary.tds
          : grossSalary * 0.1;
        return sum + tds;
      }, 0);

      return {
        totalGrossSalary,
        totalNetSalary,
        totalPF,
        totalESI,
        totalTDS,
        averageGrossSalary: salaries.length
          ? totalGrossSalary / salaries.length
          : 0,
        averageNetSalary: salaries.length
          ? totalNetSalary / salaries.length
          : 0,
      };
    } else if (activeReport === "attendance") {
      const presentCount = attendance.filter(
        (a) => a.status === "present"
      ).length;
      const leaveCount = attendance.filter((a) => a.status === "leave").length;
      const absentCount = attendance.filter(
        (a) => a.status === "absent"
      ).length;
      const totalCount = attendance.length;

      return {
        presentCount,
        leaveCount,
        absentCount,
        totalCount,
        presentPercentage: totalCount ? (presentCount / totalCount) * 100 : 0,
        leavePercentage: totalCount ? (leaveCount / totalCount) * 100 : 0,
        absentPercentage: totalCount ? (absentCount / totalCount) * 100 : 0,
      };
    }

    return {};
  };

  const { columns, data } = getReportData();
  const summary = calculateSummary();
  const monthOptions = getMonths();
  const departmentOptions = getDepartments();

  // Get department-wise salary data for visualization
  const getDepartmentSalaryData = () => {
    const departmentMap = {};

    salaries.forEach((salary) => {
      const employee = employees.find((emp) => emp.id === salary.employeeId);
      if (employee) {
        const dept = employee.department;
        if (!departmentMap[dept]) {
          departmentMap[dept] = {
            gross: 0,
            net: 0,
            count: 0,
          };
        }

        // Add gross salary with fallback
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : employee.salary;
        departmentMap[dept].gross += grossSalary;

        // Calculate net salary with fallback
        let netSalary;
        if (Number.isFinite(salary.netSalary)) {
          netSalary = salary.netSalary;
        } else {
          const basicSalary = Number.isFinite(salary.basicSalary)
            ? salary.basicSalary
            : grossSalary * 0.6;
          const pfDeduction = Number.isFinite(salary.pfDeduction)
            ? salary.pfDeduction
            : basicSalary * 0.12;
          const esiDeduction = Number.isFinite(salary.esiDeduction)
            ? salary.esiDeduction
            : grossSalary * 0.015;
          const professionalTax = Number.isFinite(salary.professionalTax)
            ? salary.professionalTax
            : 200;
          const tds = Number.isFinite(salary.tds)
            ? salary.tds
            : grossSalary * 0.1;
          netSalary =
            grossSalary - (pfDeduction + esiDeduction + professionalTax + tds);
        }

        departmentMap[dept].net += netSalary;
        departmentMap[dept].count += 1;
      }
    });

    return Object.entries(departmentMap).map(([dept, data]) => ({
      department: dept,
      grossSalary: data.gross,
      netSalary: data.net,
      employeeCount: data.count,
      averageSalary: data.count > 0 ? data.gross / data.count : 0,
    }));
  };

  const departmentSalaryData = getDepartmentSalaryData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Reports & Analytics
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setFilterModalOpen(true)}>
            <FiFilter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button onClick={handleExport}>
            <FiDownload className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeReport === "salary"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveReport("salary")}
        >
          Salary Report
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeReport === "attendance"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveReport("attendance")}
        >
          Attendance Report
        </button>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
          <span className="text-gray-600 mr-1">Month:</span>
          <span className="font-medium">{formatMonth(filters.month)}</span>
        </div>

        {filters.department && (
          <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
            <span className="text-gray-600 mr-1">Department:</span>
            <span className="font-medium">{filters.department}</span>
          </div>
        )}

        <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
          <span className="text-gray-600 mr-1">Employee:</span>
          <span className="font-medium">{getFilteredEmployeeName()}</span>
        </div>
      </div>

      {activeReport === "salary" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-3">
                <FiDollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-blue-700">Total Gross Salary</div>
                <div className="text-xl font-semibold">
                  {formatCurrency(summary.totalGrossSalary)}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-green-50">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-3">
                <FiDollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-green-700">Total Net Salary</div>
                <div className="text-xl font-semibold">
                  {formatCurrency(summary.totalNetSalary)}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-yellow-50">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-3">
                <FiUsers className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-yellow-700">Employee Count</div>
                <div className="text-xl font-semibold">{salaries.length}</div>
              </div>
            </div>
          </Card>

          <Card className="bg-purple-50">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-3">
                <FiBarChart2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-purple-700">Average Salary</div>
                <div className="text-xl font-semibold">
                  {formatCurrency(summary.averageGrossSalary)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeReport === "attendance" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-green-50">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-3">
                <FiUsers className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-green-700">Present</div>
                <div className="text-xl font-semibold">
                  {summary.presentCount}
                </div>
                <div className="text-xs text-green-700">
                  {summary.presentPercentage.toFixed(1)}% of total
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-yellow-50">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-3">
                <FiUsers className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-yellow-700">Leave</div>
                <div className="text-xl font-semibold">
                  {summary.leaveCount}
                </div>
                <div className="text-xs text-yellow-700">
                  {summary.leavePercentage.toFixed(1)}% of total
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-red-50">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 mr-3">
                <FiUsers className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-red-700">Absent</div>
                <div className="text-xl font-semibold">
                  {summary.absentCount}
                </div>
                <div className="text-xs text-red-700">
                  {summary.absentPercentage.toFixed(1)}% of total
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeReport === "salary" && departmentSalaryData.length > 0 && (
        <Card title="Department-wise Salary Distribution" className="mb-6">
          <div className="space-y-4">
            {departmentSalaryData.map((dept) => (
              <div key={dept.department} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{dept.department}</div>
                  <div className="text-sm text-gray-500">
                    {dept.employeeCount} employees
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${
                          (dept.grossSalary / summary.totalGrossSalary) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-sm font-medium whitespace-nowrap">
                    {formatCurrency(dept.grossSalary)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading report data...</div>
        </div>
      ) : (
        <Table columns={columns} data={data} />
      )}

      {/* Filter Modal */}
      <Modal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        title="Filter Reports"
      >
        <div className="space-y-4">
          <Select
            label="Month"
            id="month"
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
            options={[{ value: "", label: "All Months" }, ...monthOptions]}
          />

          <Select
            label="Department"
            id="department"
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            options={[
              { value: "", label: "All Departments" },
              ...departmentOptions,
            ]}
          />

          <Select
            label="Employee"
            id="employeeId"
            name="employeeId"
            value={filters.employeeId}
            onChange={handleFilterChange}
            options={[
              { value: "", label: "All Employees" },
              ...employees.map((emp) => ({
                value: emp.id.toString(),
                label: emp.name,
              })),
            ]}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setFilterModalOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Reports;
