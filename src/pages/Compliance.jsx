// import { useState, useEffect } from "react";
// import {
//   FiFileText,
//   FiDownload,
//   FiUpload,
//   FiCheck,
//   FiAlertCircle,
// } from "react-icons/fi";
// import {
//   Table,
//   Card,
//   Button,
//   Select,
//   Alert,
//   Badge,
//   Modal,
//   Input,
// } from "../components/ui";
// import { api } from "../services/mockApi";
// import { formatMonth, formatCurrency, formatDate } from "../utils";

// function Compliance() {
//   const [activeTab, setActiveTab] = useState("pf");
//   const [employees, setEmployees] = useState([]);
//   const [salaries, setSalaries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().toISOString().slice(0, 7)
//   ); // Current month (YYYY-MM)
//   const [alert, setAlert] = useState(null);
//   const [complianceModalOpen, setComplianceModalOpen] = useState(false);
//   const [selectedCompliance, setSelectedCompliance] = useState(null);
//   const [complianceData, setComplianceData] = useState({
//     challanNumber: "",
//     paymentDate: "",
//     amount: "",
//     remarks: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, [selectedMonth, activeTab]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [empData, salaryData] = await Promise.all([
//         api.getEmployees(),
//         api.getSalaries({ month: selectedMonth }),
//       ]);
//       setEmployees(empData);
//       setSalaries(salaryData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setAlert({ type: "error", message: "Failed to load data" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//   };

//   const handleGenerateReport = () => {
//     setAlert({
//       type: "success",
//       message: `${activeTab.toUpperCase()} report generated for ${formatMonth(
//         selectedMonth
//       )}`,
//     });
//   };

//   const handleDownloadTemplate = () => {
//     setAlert({
//       type: "success",
//       message: `${activeTab.toUpperCase()} template downloaded`,
//     });
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0];
//       e.target.value = null; // Reset file input
//       setAlert({
//         type: "success",
//         message: `${file.name} uploaded successfully`,
//       });
//     }
//   };

//   const handleComplianceUpdate = (type) => {
//     setSelectedCompliance(type);
//     setComplianceData({
//       challanNumber: "",
//       paymentDate: new Date().toISOString().slice(0, 10),
//       amount: "",
//       remarks: "",
//     });
//     setComplianceModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setComplianceData({ ...complianceData, [name]: value });
//   };

//   const handleSubmitCompliance = (e) => {
//     e.preventDefault();
//     setAlert({
//       type: "success",
//       message: `${selectedCompliance.toUpperCase()} payment details updated successfully`,
//     });
//     setComplianceModalOpen(false);
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

//   const monthOptions = getMonths();

//   // Calculate total PF contribution
//   const calculatePF = () => {
//     const totalEmployer = salaries.reduce(
//       (sum, salary) => sum + salary.pfDeduction,
//       0
//     );
//     const totalEmployee = salaries.reduce(
//       (sum, salary) => sum + salary.pfDeduction,
//       0
//     ); // In this mock, assuming equal contribution
//     return {
//       totalEmployer,
//       totalEmployee,
//       total: totalEmployer + totalEmployee,
//     };
//   };

//   // Calculate total ESI contribution
//   const calculateESI = () => {
//     const totalEmployer = salaries.reduce(
//       (sum, salary) => sum + salary.esiDeduction * 3.25,
//       0
//     ); // Employer contributes 3.25%
//     const totalEmployee = salaries.reduce(
//       (sum, salary) => sum + salary.esiDeduction,
//       0
//     ); // Employee contributes 0.75%
//     return {
//       totalEmployer,
//       totalEmployee,
//       total: totalEmployer + totalEmployee,
//     };
//   };

//   // Calculate total Professional Tax
//   const calculateProfessionalTax = () => {
//     return salaries.reduce((sum, salary) => sum + salary.professionalTax, 0);
//   };

//   // Calculate total TDS
//   const calculateTDS = () => {
//     return salaries.reduce((sum, salary) => sum + salary.tds, 0);
//   };

//   // Get compliance status
//   const getComplianceStatus = (type) => {
//     // In a real app, this would come from the database
//     const statuses = {
//       pf: { status: "paid", date: "2023-09-15", challan: "PF202309001" },
//       esi: { status: "pending", date: null, challan: null },
//       pt: { status: "paid", date: "2023-09-20", challan: "PT202309001" },
//       tds: { status: "overdue", date: null, challan: null },
//     };
//     return statuses[type] || { status: "pending", date: null, challan: null };
//   };

//   // Get contribution data for current employee
//   const getEmployeeData = () => {
//     const columns = [
//       {
//         key: "employeeId",
//         label: "Employee",
//         render: (row) => {
//           const employee = employees.find((e) => e.id === row.employeeId);
//           return employee ? employee.name : `Employee #${row.employeeId}`;
//         },
//       },
//       {
//         key: "employeeId",
//         label: "Employee ID",
//         render: (row) => {
//           const employee = employees.find((e) => e.id === row.employeeId);
//           return activeTab === "pf"
//             ? employee?.pfNumber
//             : activeTab === "esi"
//             ? employee?.esiNumber
//             : row.employeeId;
//         },
//       },
//     ];

//     if (activeTab === "pf") {
//       columns.push(
//         {
//           key: "pfDeduction",
//           label: "Employee Contribution",
//           render: (row) => formatCurrency(row.pfDeduction),
//         },
//         {
//           key: "pfDeduction",
//           label: "Employer Contribution",
//           render: (row) => formatCurrency(row.pfDeduction), // In this mock, assuming equal contribution
//         },
//         {
//           key: "pfDeduction",
//           label: "Total",
//           render: (row) => formatCurrency(row.pfDeduction * 2),
//         }
//       );
//     } else if (activeTab === "esi") {
//       columns.push(
//         {
//           key: "esiDeduction",
//           label: "Employee Contribution (0.75%)",
//           render: (row) => formatCurrency(row.esiDeduction),
//         },
//         {
//           key: "esiDeduction",
//           label: "Employer Contribution (3.25%)",
//           render: (row) => formatCurrency(row.esiDeduction * 3.25), // Assuming employer contributes 3.25%
//         },
//         {
//           key: "esiDeduction",
//           label: "Total",
//           render: (row) =>
//             formatCurrency(row.esiDeduction + row.esiDeduction * 3.25),
//         }
//       );
//     } else if (activeTab === "pt") {
//       columns.push({
//         key: "professionalTax",
//         label: "Professional Tax",
//         render: (row) => formatCurrency(row.professionalTax),
//       });
//     } else if (activeTab === "tds") {
//       columns.push({
//         key: "tds",
//         label: "TDS Amount",
//         render: (row) => formatCurrency(row.tds),
//       });
//     }

//     return { columns, data: salaries };
//   };

//   const { columns, data } = getEmployeeData();
//   const pfData = calculatePF();
//   const esiData = calculateESI();
//   const ptData = calculateProfessionalTax();
//   const tdsData = calculateTDS();
//   const complianceStatus = getComplianceStatus(activeTab);

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Statutory Compliance
//         </h1>
//         <div className="flex space-x-2">
//           <Button variant="outline" onClick={handleDownloadTemplate}>
//             <FiDownload className="w-4 h-4 mr-2" />
//             Download Template
//           </Button>
//           <label className="cursor-pointer">
//             <Button as="div">
//               <FiUpload className="w-4 h-4 mr-2" />
//               Upload Returns
//             </Button>
//             <input
//               type="file"
//               className="hidden"
//               onChange={handleFileChange}
//               accept=".xlsx,.xls,.csv"
//             />
//           </label>
//         </div>
//       </div>

//       {alert && <Alert type={alert.type} message={alert.message} />}

//       <div className="flex space-x-2 border-b">
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "pf"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("pf")}
//         >
//           Provident Fund (PF)
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "esi"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("esi")}
//         >
//           ESI
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "pt"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("pt")}
//         >
//           Professional Tax
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "tds"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("tds")}
//         >
//           TDS
//         </button>
//       </div>

//       <div className="flex flex-wrap gap-4 items-center">
//         <Select
//           className="w-64"
//           value={selectedMonth}
//           onChange={handleMonthChange}
//           options={[{ value: "", label: "Select Month" }, ...monthOptions]}
//         />

//         <div className="flex-1"></div>

//         <div className="flex items-center">
//           <span className="mr-2 text-sm font-medium">Status:</span>
//           <Badge
//             color={
//               complianceStatus.status === "paid"
//                 ? "green"
//                 : complianceStatus.status === "overdue"
//                 ? "red"
//                 : "yellow"
//             }
//           >
//             {complianceStatus.status.toUpperCase()}
//           </Badge>
//         </div>

//         {complianceStatus.challan && (
//           <div className="text-sm">
//             <span className="text-gray-500">Challan:</span>{" "}
//             {complianceStatus.challan}
//           </div>
//         )}

//         {complianceStatus.date && (
//           <div className="text-sm">
//             <span className="text-gray-500">Paid on:</span>{" "}
//             {formatDate(complianceStatus.date)}
//           </div>
//         )}

//         {complianceStatus.status !== "paid" && (
//           <Button
//             variant="success"
//             size="sm"
//             onClick={() => handleComplianceUpdate(activeTab)}
//           >
//             <FiCheck className="w-4 h-4 mr-1" />
//             Mark as Paid
//           </Button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {activeTab === "pf" && (
//           <>
//             <Card className="bg-blue-50">
//               <div className="text-sm text-blue-700 mb-1">
//                 Employee Contribution
//               </div>
//               <div className="text-xl font-semibold">
//                 {formatCurrency(pfData.totalEmployee)}
//               </div>
//             </Card>
//             <Card className="bg-blue-50">
//               <div className="text-sm text-blue-700 mb-1">
//                 Employer Contribution
//               </div>
//               <div className="text-xl font-semibold">
//                 {formatCurrency(pfData.totalEmployer)}
//               </div>
//             </Card>
//             <Card className="bg-blue-50">
//               <div className="text-sm text-blue-700 mb-1">
//                 Total PF Contribution
//               </div>
//               <div className="text-xl font-semibold">
//                 {formatCurrency(pfData.total)}
//               </div>
//             </Card>
//           </>
//         )}

//         {activeTab === "esi" && (
//           <>
//             <Card className="bg-green-50">
//               <div className="text-sm text-green-700 mb-1">
//                 Employee Contribution (0.75%)
//               </div>
//               <div className="text-xl font-semibold">
//                 {formatCurrency(esiData.totalEmployee)}
//               </div>
//             </Card>
//             <Card className="bg-green-50">
//               <div className="text-sm text-green-700 mb-1">
//                 Employer Contribution (3.25%)
//               </div>
//               <div className="text-xl font-semibold">
//                 {formatCurrency(esiData.totalEmployer)}
//               </div>
//             </Card>
//             <Card className="bg-green-50">
//               <div className="text-sm text-green-700 mb-1">
//                 Total ESI Contribution
//               </div>
//               <div className="text-xl font-semibold">
//                 {formatCurrency(esiData.total)}
//               </div>
//             </Card>
//           </>
//         )}

//         {activeTab === "pt" && (
//           <Card className="bg-purple-50">
//             <div className="text-sm text-purple-700 mb-1">
//               Total Professional Tax
//             </div>
//             <div className="text-xl font-semibold">
//               {formatCurrency(ptData)}
//             </div>
//           </Card>
//         )}

//         {activeTab === "tds" && (
//           <Card className="bg-yellow-50">
//             <div className="text-sm text-yellow-700 mb-1">Total TDS Amount</div>
//             <div className="text-xl font-semibold">
//               {formatCurrency(tdsData)}
//             </div>
//           </Card>
//         )}

//         <Card className="flex items-center justify-center">
//           <Button
//             className="w-full flex justify-center items-center"
//             onClick={handleGenerateReport}
//           >
//             <FiFileText className="w-4 h-4 mr-2" />
//             Generate Report
//           </Button>
//         </Card>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-gray-500">Loading compliance data...</div>
//         </div>
//       ) : data.length === 0 ? (
//         <Card>
//           <div className="py-8 text-center">
//             <FiAlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-800 mb-1">
//               No Data Available
//             </h3>
//             <p className="text-gray-500">
//               No salary records found for the selected month.
//             </p>
//           </div>
//         </Card>
//       ) : (
//         <Table columns={columns} data={data} />
//       )}

//       {/* Compliance Update Modal */}
//       <Modal
//         isOpen={complianceModalOpen}
//         onClose={() => setComplianceModalOpen(false)}
//         title={`Update ${selectedCompliance?.toUpperCase()} Payment Details`}
//       >
//         <form onSubmit={handleSubmitCompliance}>
//           <div className="space-y-4">
//             <Input
//               label="Challan Number"
//               id="challanNumber"
//               name="challanNumber"
//               value={complianceData.challanNumber}
//               onChange={handleInputChange}
//               required
//             />

//             <Input
//               label="Payment Date"
//               id="paymentDate"
//               name="paymentDate"
//               type="date"
//               value={complianceData.paymentDate}
//               onChange={handleInputChange}
//               required
//             />

//             <Input
//               label="Amount Paid"
//               id="amount"
//               name="amount"
//               type="number"
//               value={complianceData.amount}
//               onChange={handleInputChange}
//               required
//             />

//             <Input
//               label="Remarks"
//               id="remarks"
//               name="remarks"
//               value={complianceData.remarks}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="flex justify-end space-x-3 mt-6">
//             <Button
//               variant="secondary"
//               type="button"
//               onClick={() => setComplianceModalOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button type="submit">Save Payment Details</Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default Compliance;

//2

import { useState, useEffect } from "react";
import {
  FiFileText,
  FiDownload,
  FiUpload,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import {
  Table,
  Card,
  Button,
  Select,
  Alert,
  Badge,
  Modal,
  Input,
} from "../components/ui";
import { api } from "../services/mockApi";
import { formatMonth, formatCurrency, formatDate } from "../utils";

function Compliance() {
  const [activeTab, setActiveTab] = useState("pf");
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  ); // Current month (YYYY-MM)
  const [alert, setAlert] = useState(null);
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [complianceData, setComplianceData] = useState({
    challanNumber: "",
    paymentDate: "",
    amount: "",
    remarks: "",
  });

  useEffect(() => {
    fetchData();
  }, [selectedMonth, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [empData, salaryData] = await Promise.all([
        api.getEmployees(),
        api.getSalaries({ month: selectedMonth }),
      ]);
      setEmployees(empData);
      setSalaries(salaryData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ type: "error", message: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleGenerateReport = () => {
    setAlert({
      type: "success",
      message: `${activeTab.toUpperCase()} report generated for ${formatMonth(
        selectedMonth
      )}`,
    });
  };

  const handleDownloadTemplate = () => {
    setAlert({
      type: "success",
      message: `${activeTab.toUpperCase()} template downloaded`,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      e.target.value = null; // Reset file input
      setAlert({
        type: "success",
        message: `${file.name} uploaded successfully`,
      });
    }
  };

  const handleComplianceUpdate = (type) => {
    setSelectedCompliance(type);
    setComplianceData({
      challanNumber: "",
      paymentDate: new Date().toISOString().slice(0, 10),
      amount: "",
      remarks: "",
    });
    setComplianceModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplianceData({ ...complianceData, [name]: value });
  };

  const handleSubmitCompliance = (e) => {
    e.preventDefault();
    setAlert({
      type: "success",
      message: `${selectedCompliance.toUpperCase()} payment details updated successfully`,
    });
    setComplianceModalOpen(false);
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

  const monthOptions = getMonths();

  // Calculate total PF contribution with fallbacks
  const calculatePF = () => {
    const totalEmployer = salaries.reduce((sum, salary) => {
      // Calculate with fallback if pfDeduction is not available
      if (!Number.isFinite(salary.pfDeduction)) {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        const basicSalary = Number.isFinite(salary.basicSalary)
          ? salary.basicSalary
          : grossSalary * 0.6;
        return sum + basicSalary * 0.12;
      }
      return sum + salary.pfDeduction;
    }, 0);

    const totalEmployee = salaries.reduce((sum, salary) => {
      // Calculate with fallback if pfDeduction is not available
      if (!Number.isFinite(salary.pfDeduction)) {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        const basicSalary = Number.isFinite(salary.basicSalary)
          ? salary.basicSalary
          : grossSalary * 0.6;
        return sum + basicSalary * 0.12;
      }
      return sum + salary.pfDeduction;
    }, 0);

    return {
      totalEmployer,
      totalEmployee,
      total: totalEmployer + totalEmployee,
    };
  };

  // Calculate total ESI contribution with fallbacks
  const calculateESI = () => {
    const totalEmployer = salaries.reduce((sum, salary) => {
      // Calculate with fallback if esiDeduction is not available
      if (!Number.isFinite(salary.esiDeduction)) {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        return sum + grossSalary * 0.0325; // 3.25%
      }
      return sum + salary.esiDeduction * 3.25;
    }, 0);

    const totalEmployee = salaries.reduce((sum, salary) => {
      // Calculate with fallback if esiDeduction is not available
      if (!Number.isFinite(salary.esiDeduction)) {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        return sum + grossSalary * 0.0075; // 0.75%
      }
      return sum + salary.esiDeduction;
    }, 0);

    return {
      totalEmployer,
      totalEmployee,
      total: totalEmployer + totalEmployee,
    };
  };

  // Calculate total Professional Tax with fallbacks
  const calculateProfessionalTax = () => {
    return salaries.reduce((sum, salary) => {
      // Calculate with fallback if professionalTax is not available
      if (!Number.isFinite(salary.professionalTax)) {
        return sum + 200; // Default professional tax
      }
      return sum + salary.professionalTax;
    }, 0);
  };

  // Calculate total TDS with fallbacks
  const calculateTDS = () => {
    return salaries.reduce((sum, salary) => {
      // Calculate with fallback if tds is not available
      if (!Number.isFinite(salary.tds)) {
        const grossSalary = Number.isFinite(salary.grossSalary)
          ? salary.grossSalary
          : 0;
        return sum + grossSalary * 0.1; // 10% of gross salary
      }
      return sum + salary.tds;
    }, 0);
  };

  // Get compliance status
  const getComplianceStatus = (type) => {
    // In a real app, this would come from the database
    const statuses = {
      pf: { status: "paid", date: "2023-09-15", challan: "PF202309001" },
      esi: { status: "pending", date: null, challan: null },
      pt: { status: "paid", date: "2023-09-20", challan: "PT202309001" },
      tds: { status: "overdue", date: null, challan: null },
    };
    return statuses[type] || { status: "pending", date: null, challan: null };
  };

  // Get contribution data for current employee with fallbacks
  const getEmployeeData = () => {
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
        key: "employeeId",
        label: "Employee ID",
        render: (row) => {
          const employee = employees.find((e) => e.id === row.employeeId);
          return activeTab === "pf"
            ? employee?.pfNumber
            : activeTab === "esi"
            ? employee?.esiNumber
            : row.employeeId;
        },
      },
    ];

    if (activeTab === "pf") {
      columns.push(
        {
          key: "pfDeduction",
          label: "Employee Contribution",
          render: (row) => {
            // Calculate with fallback if pfDeduction is not available
            if (!Number.isFinite(row.pfDeduction)) {
              const grossSalary = Number.isFinite(row.grossSalary)
                ? row.grossSalary
                : 0;
              const basicSalary = Number.isFinite(row.basicSalary)
                ? row.basicSalary
                : grossSalary * 0.6;
              return formatCurrency(basicSalary * 0.12);
            }
            return formatCurrency(row.pfDeduction);
          },
        },
        {
          key: "pfEmployer",
          label: "Employer Contribution",
          render: (row) => {
            // Calculate with fallback if pfDeduction is not available
            if (!Number.isFinite(row.pfDeduction)) {
              const grossSalary = Number.isFinite(row.grossSalary)
                ? row.grossSalary
                : 0;
              const basicSalary = Number.isFinite(row.basicSalary)
                ? row.basicSalary
                : grossSalary * 0.6;
              return formatCurrency(basicSalary * 0.12);
            }
            return formatCurrency(row.pfDeduction); // In this mock, assuming equal contribution
          },
        },
        {
          key: "pfTotal",
          label: "Total",
          render: (row) => {
            // Calculate with fallback if pfDeduction is not available
            if (!Number.isFinite(row.pfDeduction)) {
              const grossSalary = Number.isFinite(row.grossSalary)
                ? row.grossSalary
                : 0;
              const basicSalary = Number.isFinite(row.basicSalary)
                ? row.basicSalary
                : grossSalary * 0.6;
              return formatCurrency(basicSalary * 0.12 * 2);
            }
            return formatCurrency(row.pfDeduction * 2);
          },
        }
      );
    } else if (activeTab === "esi") {
      columns.push(
        {
          key: "esiDeduction",
          label: "Employee Contribution (0.75%)",
          render: (row) => {
            // Calculate with fallback if esiDeduction is not available
            if (!Number.isFinite(row.esiDeduction)) {
              const grossSalary = Number.isFinite(row.grossSalary)
                ? row.grossSalary
                : 0;
              return formatCurrency(grossSalary * 0.0075);
            }
            return formatCurrency(row.esiDeduction);
          },
        },
        {
          key: "esiEmployer",
          label: "Employer Contribution (3.25%)",
          render: (row) => {
            // Calculate with fallback if esiDeduction is not available
            if (!Number.isFinite(row.esiDeduction)) {
              const grossSalary = Number.isFinite(row.grossSalary)
                ? row.grossSalary
                : 0;
              return formatCurrency(grossSalary * 0.0325);
            }
            return formatCurrency(row.esiDeduction * 3.25); // Assuming employer contributes 3.25%
          },
        },
        {
          key: "esiTotal",
          label: "Total",
          render: (row) => {
            // Calculate with fallback if esiDeduction is not available
            if (!Number.isFinite(row.esiDeduction)) {
              const grossSalary = Number.isFinite(row.grossSalary)
                ? row.grossSalary
                : 0;
              return formatCurrency(
                grossSalary * 0.0075 + grossSalary * 0.0325
              );
            }
            return formatCurrency(row.esiDeduction + row.esiDeduction * 3.25);
          },
        }
      );
    } else if (activeTab === "pt") {
      columns.push({
        key: "professionalTax",
        label: "Professional Tax",
        render: (row) => {
          // Calculate with fallback if professionalTax is not available
          if (!Number.isFinite(row.professionalTax)) {
            return formatCurrency(200); // Default professional tax
          }
          return formatCurrency(row.professionalTax);
        },
      });
    } else if (activeTab === "tds") {
      columns.push({
        key: "tds",
        label: "TDS Amount",
        render: (row) => {
          // Calculate with fallback if tds is not available
          if (!Number.isFinite(row.tds)) {
            const grossSalary = Number.isFinite(row.grossSalary)
              ? row.grossSalary
              : 0;
            return formatCurrency(grossSalary * 0.1); // 10% of gross salary
          }
          return formatCurrency(row.tds);
        },
      });
    }

    return { columns, data: salaries };
  };

  const { columns, data } = getEmployeeData();
  const pfData = calculatePF();
  const esiData = calculateESI();
  const ptData = calculateProfessionalTax();
  const tdsData = calculateTDS();
  const complianceStatus = getComplianceStatus(activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Statutory Compliance
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <FiDownload className="w-4 h-4 mr-2" />
            Download Template
          </Button>
          <label className="cursor-pointer">
            <Button as="div">
              <FiUpload className="w-4 h-4 mr-2" />
              Upload Returns
            </Button>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv"
            />
          </label>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="flex space-x-2 border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "pf"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("pf")}
        >
          Provident Fund (PF)
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "esi"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("esi")}
        >
          ESI
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "pt"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("pt")}
        >
          Professional Tax
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "tds"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("tds")}
        >
          TDS
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Select
          className="w-64"
          value={selectedMonth}
          onChange={handleMonthChange}
          options={[{ value: "", label: "Select Month" }, ...monthOptions]}
        />

        <div className="flex-1"></div>

        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium">Status:</span>
          <Badge
            color={
              complianceStatus.status === "paid"
                ? "green"
                : complianceStatus.status === "overdue"
                ? "red"
                : "yellow"
            }
          >
            {complianceStatus.status.toUpperCase()}
          </Badge>
        </div>

        {complianceStatus.challan && (
          <div className="text-sm">
            <span className="text-gray-500">Challan:</span>{" "}
            {complianceStatus.challan}
          </div>
        )}

        {complianceStatus.date && (
          <div className="text-sm">
            <span className="text-gray-500">Paid on:</span>{" "}
            {formatDate(complianceStatus.date)}
          </div>
        )}

        {complianceStatus.status !== "paid" && (
          <Button
            variant="success"
            size="sm"
            onClick={() => handleComplianceUpdate(activeTab)}
          >
            <FiCheck className="w-4 h-4 mr-1" />
            Mark as Paid
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeTab === "pf" && (
          <>
            <Card className="bg-blue-50">
              <div className="text-sm text-blue-700 mb-1">
                Employee Contribution
              </div>
              <div className="text-xl font-semibold">
                {formatCurrency(pfData.totalEmployee)}
              </div>
            </Card>
            <Card className="bg-blue-50">
              <div className="text-sm text-blue-700 mb-1">
                Employer Contribution
              </div>
              <div className="text-xl font-semibold">
                {formatCurrency(pfData.totalEmployer)}
              </div>
            </Card>
            <Card className="bg-blue-50">
              <div className="text-sm text-blue-700 mb-1">
                Total PF Contribution
              </div>
              <div className="text-xl font-semibold">
                {formatCurrency(pfData.total)}
              </div>
            </Card>
          </>
        )}

        {activeTab === "esi" && (
          <>
            <Card className="bg-green-50">
              <div className="text-sm text-green-700 mb-1">
                Employee Contribution (0.75%)
              </div>
              <div className="text-xl font-semibold">
                {formatCurrency(esiData.totalEmployee)}
              </div>
            </Card>
            <Card className="bg-green-50">
              <div className="text-sm text-green-700 mb-1">
                Employer Contribution (3.25%)
              </div>
              <div className="text-xl font-semibold">
                {formatCurrency(esiData.totalEmployer)}
              </div>
            </Card>
            <Card className="bg-green-50">
              <div className="text-sm text-green-700 mb-1">
                Total ESI Contribution
              </div>
              <div className="text-xl font-semibold">
                {formatCurrency(esiData.total)}
              </div>
            </Card>
          </>
        )}

        {activeTab === "pt" && (
          <Card className="bg-purple-50">
            <div className="text-sm text-purple-700 mb-1">
              Total Professional Tax
            </div>
            <div className="text-xl font-semibold">
              {formatCurrency(ptData)}
            </div>
          </Card>
        )}

        {activeTab === "tds" && (
          <Card className="bg-yellow-50">
            <div className="text-sm text-yellow-700 mb-1">Total TDS Amount</div>
            <div className="text-xl font-semibold">
              {formatCurrency(tdsData)}
            </div>
          </Card>
        )}

        <Card className="flex items-center justify-center">
          <Button
            className="w-full flex justify-center items-center"
            onClick={handleGenerateReport}
          >
            <FiFileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading compliance data...</div>
        </div>
      ) : data.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <FiAlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              No Data Available
            </h3>
            <p className="text-gray-500">
              No salary records found for the selected month.
            </p>
          </div>
        </Card>
      ) : (
        <Table columns={columns} data={data} />
      )}

      {/* Compliance Update Modal */}
      <Modal
        isOpen={complianceModalOpen}
        onClose={() => setComplianceModalOpen(false)}
        title={`Update ${selectedCompliance?.toUpperCase()} Payment Details`}
      >
        <form onSubmit={handleSubmitCompliance}>
          <div className="space-y-4">
            <Input
              label="Challan Number"
              id="challanNumber"
              name="challanNumber"
              value={complianceData.challanNumber}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Payment Date"
              id="paymentDate"
              name="paymentDate"
              type="date"
              value={complianceData.paymentDate}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Amount Paid"
              id="amount"
              name="amount"
              type="number"
              value={complianceData.amount}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Remarks"
              id="remarks"
              name="remarks"
              value={complianceData.remarks}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setComplianceModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Payment Details</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Compliance;
