// import { useState, useEffect } from "react";
// import {
//   FiDollarSign,
//   FiDownload,
//   FiEye,
//   FiCheckCircle,
//   FiClock,
// } from "react-icons/fi";
// import {
//   Table,
//   Button,
//   Card,
//   Modal,
//   Select,
//   Alert,
//   Badge,
// } from "../components/ui";
// import { api } from "../services/mockApi";
// import { formatMonth, formatCurrency, generatePaySlip } from "../utils";

// function Payroll() {
//   const [salaries, setSalaries] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().toISOString().slice(0, 7)
//   ); // Current month (YYYY-MM)
//   const [alert, setAlert] = useState(null);
//   const [payslipModalOpen, setPayslipModalOpen] = useState(false);
//   const [currentPayslip, setCurrentPayslip] = useState(null);
//   const [processModalOpen, setProcessModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, [selectedMonth]);

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

//   const handleGeneratePayroll = () => {
//     setSelectedEmployee("");
//     setProcessModalOpen(true);
//   };

//   const handleProcessSalary = async () => {
//     if (!selectedEmployee) {
//       setAlert({ type: "error", message: "Please select an employee" });
//       return;
//     }

//     setProcessing(true);
//     try {
//       await api.generateSalary(parseInt(selectedEmployee), selectedMonth);
//       setAlert({ type: "success", message: "Salary generated successfully" });
//       setProcessModalOpen(false);
//       fetchData();
//     } catch (error) {
//       console.error("Error generating salary:", error);
//       setAlert({ type: "error", message: "Failed to generate salary" });
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handlePaySalary = async (id) => {
//     try {
//       await api.processSalary(id, "paid");
//       setAlert({ type: "success", message: "Salary marked as paid" });
//       fetchData();
//     } catch (error) {
//       console.error("Error processing salary:", error);
//       setAlert({ type: "error", message: "Failed to process salary" });
//     }
//   };

//   const handleViewPayslip = async (salaryId) => {
//     const salary = salaries.find((s) => s.id === salaryId);
//     if (!salary) return;

//     const employee = employees.find((e) => e.id === salary.employeeId);
//     if (!employee) return;

//     const payslip = generatePaySlip(salary, employee);
//     setCurrentPayslip(payslip);
//     setPayslipModalOpen(true);
//   };

//   const columns = [
//     {
//       key: "employeeId",
//       label: "Employee",
//       render: (row) => {
//         const employee = employees.find((e) => e.id === row.employeeId);
//         return employee ? employee.name : `Employee #${row.employeeId}`;
//       },
//     },
//     {
//       key: "month",
//       label: "Month",
//       render: (row) => formatMonth(row.month),
//     },
//     {
//       key: "grossSalary",
//       label: "Gross Salary",
//       render: (row) => formatCurrency(row.grossSalary),
//     },
//     {
//       key: "netSalary",
//       label: "Net Salary",
//       render: (row) => formatCurrency(row.netSalary),
//     },
//     {
//       key: "status",
//       label: "Status",
//       render: (row) => (
//         <Badge color={row.status === "paid" ? "green" : "yellow"}>
//           {row.status === "paid" ? "Paid" : "Pending"}
//         </Badge>
//       ),
//     },
//     {
//       key: "actions",
//       label: "Actions",
//       render: (row) => (
//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             className="p-1 text-blue-600"
//             onClick={() => handleViewPayslip(row.id)}
//           >
//             <FiEye className="w-4 h-4" />
//           </Button>
//           {row.status === "pending" && (
//             <Button
//               variant="success"
//               className="p-1"
//               onClick={() => handlePaySalary(row.id)}
//             >
//               <FiCheckCircle className="w-4 h-4" />
//             </Button>
//           )}
//           <Button
//             variant="outline"
//             className="p-1 text-green-600"
//             onClick={() => handleViewPayslip(row.id)}
//           >
//             <FiDownload className="w-4 h-4" />
//           </Button>
//         </div>
//       ),
//     },
//   ];

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

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Payroll Processing
//         </h1>
//         <Button onClick={handleGeneratePayroll}>
//           <FiDollarSign className="w-4 h-4 mr-2" />
//           Generate Payroll
//         </Button>
//       </div>

//       {alert && <Alert type={alert.type} message={alert.message} />}

//       <div className="flex justify-between items-center">
//         <Select
//           className="w-64"
//           value={selectedMonth}
//           onChange={handleMonthChange}
//           options={[{ value: "", label: "Select Month" }, ...monthOptions]}
//         />
//         <div className="text-sm text-gray-500">
//           Total: {salaries.length} salaries
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-gray-500">Loading payroll data...</div>
//         </div>
//       ) : salaries.length === 0 ? (
//         <Card>
//           <div className="py-8 text-center">
//             <FiDollarSign className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-800 mb-1">
//               No Salary Data
//             </h3>
//             <p className="text-gray-500">
//               No salary records found for the selected month. Generate payroll
//               to create salary records.
//             </p>
//           </div>
//         </Card>
//       ) : (
//         <Table columns={columns} data={salaries} />
//       )}

//       {/* Process Salary Modal */}
//       <Modal
//         isOpen={processModalOpen}
//         onClose={() => setProcessModalOpen(false)}
//         title="Generate Salary"
//       >
//         <div className="mb-4">
//           <p className="text-sm text-gray-600 mb-4">
//             Select an employee to generate salary for{" "}
//             {formatMonth(selectedMonth)}.
//           </p>
//           <Select
//             label="Employee"
//             value={selectedEmployee}
//             onChange={(e) => setSelectedEmployee(e.target.value)}
//             options={[
//               { value: "", label: "Select Employee" },
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
//             onClick={() => setProcessModalOpen(false)}
//             disabled={processing}
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleProcessSalary} disabled={processing}>
//             {processing ? (
//               <>
//                 <FiClock className="w-4 h-4 mr-2 animate-spin" />
//                 Processing...
//               </>
//             ) : (
//               "Generate Salary"
//             )}
//           </Button>
//         </div>
//       </Modal>

//       {/* Payslip Modal */}
//       <Modal
//         isOpen={payslipModalOpen}
//         onClose={() => setPayslipModalOpen(false)}
//         title="Salary Slip"
//         size="lg"
//       >
//         {currentPayslip && (
//           <div className="space-y-6">
//             <div className="border-b pb-4">
//               <h3 className="text-xl font-semibold text-center mb-1">
//                 Payroll Management System
//               </h3>
//               <p className="text-center text-gray-500">
//                 Salary Slip for {currentPayslip.month}
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Employee Name</p>
//                 <p className="font-medium">{currentPayslip.employeeName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Employee ID</p>
//                 <p className="font-medium">{currentPayslip.employeeId}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Designation</p>
//                 <p className="font-medium">{currentPayslip.designation}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Department</p>
//                 <p className="font-medium">{currentPayslip.department}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Bank Account</p>
//                 <p className="font-medium">{currentPayslip.bankAccount}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Month</p>
//                 <p className="font-medium">{currentPayslip.month}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-8">
//               <div>
//                 <h4 className="font-medium mb-2 border-b pb-1">Earnings</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Basic Salary</span>
//                     <span>
//                       {formatCurrency(currentPayslip.earnings.basicSalary)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">HRA</span>
//                     <span>{formatCurrency(currentPayslip.earnings.hra)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Conveyance Allowance</span>
//                     <span>
//                       {formatCurrency(
//                         currentPayslip.earnings.conveyanceAllowance
//                       )}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Medical Allowance</span>
//                     <span>
//                       {formatCurrency(currentPayslip.earnings.medicalAllowance)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Special Allowance</span>
//                     <span>
//                       {formatCurrency(currentPayslip.earnings.specialAllowance)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between font-medium border-t pt-1 mt-1">
//                     <span>Total Earnings</span>
//                     <span>
//                       {formatCurrency(currentPayslip.earnings.totalEarnings)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-medium mb-2 border-b pb-1">Deductions</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Provident Fund</span>
//                     <span>
//                       {formatCurrency(currentPayslip.deductions.providentFund)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">ESI</span>
//                     <span>{formatCurrency(currentPayslip.deductions.esi)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Professional Tax</span>
//                     <span>
//                       {formatCurrency(
//                         currentPayslip.deductions.professionalTax
//                       )}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Income Tax (TDS)</span>
//                     <span>{formatCurrency(currentPayslip.deductions.tds)}</span>
//                   </div>
//                   <div className="flex justify-between font-medium border-t pt-1 mt-1">
//                     <span>Total Deductions</span>
//                     <span>
//                       {formatCurrency(
//                         currentPayslip.deductions.totalDeductions
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t pt-4">
//               <div className="flex justify-between font-medium text-lg">
//                 <span>Net Salary</span>
//                 <span>{formatCurrency(currentPayslip.netSalary)}</span>
//               </div>
//             </div>

//             <div className="flex justify-end mt-4">
//               <Button variant="outline" className="flex items-center">
//                 <FiDownload className="mr-2" />
//                 Download PDF
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default Payroll;

//2

// import { useState, useEffect } from "react";
// import {
//   FiDollarSign,
//   FiDownload,
//   FiEye,
//   FiCheckCircle,
//   FiClock,
//   FiX,
//   FiAlertCircle,
//   FiCheckSquare,
//   FiUserCheck,
// } from "react-icons/fi";
// import {
//   Table,
//   Button,
//   Card,
//   Modal,
//   Select,
//   Alert,
//   Badge,
//   Input,
// } from "../components/ui";
// import { api } from "../services/mockApi";
// import {
//   formatMonth,
//   formatCurrency,
//   formatDate,
//   generatePaySlip,
// } from "../utils";

// function Payroll() {
//   const [salaries, setSalaries] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [structures, setStructures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().toISOString().slice(0, 7)
//   ); // Current month (YYYY-MM)
//   const [alert, setAlert] = useState(null);
//   const [payslipModalOpen, setPayslipModalOpen] = useState(false);
//   const [currentPayslip, setCurrentPayslip] = useState(null);
//   const [generateModalOpen, setGenerateModalOpen] = useState(false);
//   const [approvalModalOpen, setApprovalModalOpen] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [currentApproval, setCurrentApproval] = useState(null);
//   const [approvalComment, setApprovalComment] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [activeTab, setActiveTab] = useState("pending");

//   useEffect(() => {
//     fetchData();
//   }, [selectedMonth, activeTab]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [empData, salaryData, structuresData, attendanceData] =
//         await Promise.all([
//           api.getEmployees(),
//           api.getSalaries({
//             month: selectedMonth,
//             status:
//               activeTab === "pending"
//                 ? ["draft", "pending_approval", "approved", "rejected"]
//                 : ["paid"],
//           }),
//           api.getSalaryStructures(),
//           api.getAttendance({
//             month: selectedMonth,
//           }),
//         ]);
//       setEmployees(empData);
//       setSalaries(salaryData);
//       setStructures(structuresData);
//       setAttendanceData(attendanceData);
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

//   const handleGeneratePayroll = () => {
//     // Get list of employees who don't have salary records for the selected month
//     const employeesWithSalary = salaries.map((s) => s.employeeId);
//     const eligibleEmployees = employees.filter(
//       (e) => !employeesWithSalary.includes(e.id)
//     );

//     setSelectedEmployees(
//       eligibleEmployees.length > 0 ? [eligibleEmployees[0].id] : []
//     );
//     setGenerateModalOpen(true);
//   };

//   const handleEmployeeSelect = (e) => {
//     const value = parseInt(e.target.value);

//     if (selectedEmployees.includes(value)) {
//       setSelectedEmployees(selectedEmployees.filter((id) => id !== value));
//     } else {
//       setSelectedEmployees([...selectedEmployees, value]);
//     }
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       // Get all eligible employees
//       const employeesWithSalary = salaries.map((s) => s.employeeId);
//       const eligibleEmployeeIds = employees
//         .filter((e) => !employeesWithSalary.includes(e.id))
//         .map((e) => e.id);

//       setSelectedEmployees(eligibleEmployeeIds);
//     } else {
//       setSelectedEmployees([]);
//     }
//   };

//   const calculateSalaryComponents = (employeeId, grossSalary) => {
//     // Find employee
//     const employee = employees.find((e) => e.id === employeeId);
//     if (!employee) return {};

//     // Find applicable salary structure
//     const structure = structures.find(
//       (s) => s.employeeType === employee.employmentType
//     );
//     if (!structure) return {};

//     // Calculate attendance factor (simple calculation for example)
//     const empAttendance = attendanceData.filter(
//       (a) => a.employeeId === employeeId
//     );
//     const workingDays = 22; // Simplified assumption
//     const presentDays = empAttendance.filter(
//       (a) => a.status === "present"
//     ).length;
//     const attendanceFactor = presentDays / workingDays;

//     // Calculate overtime
//     const overtimeHours = empAttendance.reduce((total, record) => {
//       if (record.status === "present" && record.overtime) {
//         return total + record.overtime;
//       }
//       return total;
//     }, 0);

//     // Calculate basic salary (usually a percentage of gross)
//     const basicSalary = grossSalary * 0.6;

//     // Calculate components based on structure
//     const calculatedComponents = structure.components.map((component) => {
//       let calculatedValue = 0;

//       if (component.isPercentage) {
//         const baseValue =
//           component.percentageOf === "basicSalary" ? basicSalary : grossSalary;
//         calculatedValue = baseValue * (component.percentageValue / 100);
//       } else {
//         calculatedValue = component.value;
//       }

//       return {
//         ...component,
//         calculatedValue: Math.round(calculatedValue),
//       };
//     });

//     // Calculate earnings and deductions
//     const earnings = calculatedComponents
//       .filter((c) => c.type === "earning")
//       .reduce((sum, c) => sum + c.calculatedValue, 0);

//     const deductions = calculatedComponents
//       .filter((c) => c.type === "deduction")
//       .reduce((sum, c) => sum + c.calculatedValue, 0);

//     // Add standard deductions
//     const pfDeduction = basicSalary * 0.12;
//     const esiDeduction = grossSalary <= 21000 ? grossSalary * 0.0075 : 0;
//     const professionalTax = 200;

//     // Calculate net salary
//     const netSalary =
//       grossSalary - deductions - pfDeduction - esiDeduction - professionalTax;

//     return {
//       basicSalary,
//       attendanceFactor,
//       overtimeHours,
//       calculatedComponents,
//       earnings,
//       deductions,
//       pfDeduction,
//       esiDeduction,
//       professionalTax,
//       netSalary,
//     };
//   };

//   const handleGenerateSalaries = async () => {
//     if (selectedEmployees.length === 0) {
//       setAlert({
//         type: "error",
//         message: "Please select at least one employee",
//       });
//       return;
//     }

//     setProcessing(true);
//     try {
//       // For each selected employee, generate a salary record
//       const promises = selectedEmployees.map(async (employeeId) => {
//         const employee = employees.find((e) => e.id === employeeId);
//         if (!employee) return null;

//         // Get gross salary from employee record
//         const grossSalary = employee.salary;

//         // Calculate salary components
//         const calculations = calculateSalaryComponents(employeeId, grossSalary);

//         // Create salary record
//         return api.generateSalary(employeeId, selectedMonth, {
//           basicSalary: calculations.basicSalary,
//           calculatedComponents: calculations.calculatedComponents,
//           attendanceFactor: calculations.attendanceFactor,
//           overtimeHours: calculations.overtimeHours,
//           pfDeduction: calculations.pfDeduction,
//           esiDeduction: calculations.esiDeduction,
//           professionalTax: calculations.professionalTax,
//           grossSalary: grossSalary,
//           netSalary: calculations.netSalary,
//           status: "draft",
//         });
//       });

//       await Promise.all(promises);

//       setAlert({ type: "success", message: "Payroll generated successfully" });
//       setGenerateModalOpen(false);
//       fetchData();
//     } catch (error) {
//       console.error("Error generating payroll:", error);
//       setAlert({ type: "error", message: "Failed to generate payroll" });
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleSubmitForApproval = async (id) => {
//     try {
//       await api.updateSalaryStatus(id, "pending_approval");
//       setAlert({ type: "success", message: "Salary submitted for approval" });
//       fetchData();
//     } catch (error) {
//       console.error("Error submitting for approval:", error);
//       setAlert({ type: "error", message: "Failed to submit for approval" });
//     }
//   };

//   const handleApprove = async () => {
//     if (!currentApproval) return;

//     try {
//       await api.updateSalaryStatus(
//         currentApproval.id,
//         "approved",
//         approvalComment
//       );
//       setAlert({ type: "success", message: "Salary approved successfully" });
//       setApprovalModalOpen(false);
//       setApprovalComment("");
//       fetchData();
//     } catch (error) {
//       console.error("Error approving salary:", error);
//       setAlert({ type: "error", message: "Failed to approve salary" });
//     }
//   };

//   const handleReject = async () => {
//     if (!currentApproval || !approvalComment) {
//       setAlert({
//         type: "error",
//         message: "Please provide a reason for rejection",
//       });
//       return;
//     }

//     try {
//       await api.updateSalaryStatus(
//         currentApproval.id,
//         "rejected",
//         approvalComment
//       );
//       setAlert({ type: "success", message: "Salary rejected" });
//       setApprovalModalOpen(false);
//       setApprovalComment("");
//       fetchData();
//     } catch (error) {
//       console.error("Error rejecting salary:", error);
//       setAlert({ type: "error", message: "Failed to reject salary" });
//     }
//   };

//   const handleOpenApproval = (salary) => {
//     setCurrentApproval(salary);
//     setApprovalComment("");
//     setApprovalModalOpen(true);
//   };

//   const handlePaySalary = async (id) => {
//     try {
//       await api.updateSalaryStatus(id, "paid");
//       setAlert({ type: "success", message: "Salary marked as paid" });
//       fetchData();
//     } catch (error) {
//       console.error("Error processing salary:", error);
//       setAlert({ type: "error", message: "Failed to process salary" });
//     }
//   };

//   const handleViewPayslip = async (salaryId) => {
//     const salary = salaries.find((s) => s.id === salaryId);
//     if (!salary) return;

//     const employee = employees.find((e) => e.id === salary.employeeId);
//     if (!employee) return;

//     const payslip = generatePaySlip(salary, employee);
//     setCurrentPayslip(payslip);
//     setPayslipModalOpen(true);
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "draft":
//         return <Badge color="gray">Draft</Badge>;
//       case "pending_approval":
//         return <Badge color="yellow">Pending Approval</Badge>;
//       case "approved":
//         return <Badge color="green">Approved</Badge>;
//       case "rejected":
//         return <Badge color="red">Rejected</Badge>;
//       case "paid":
//         return <Badge color="blue">Paid</Badge>;
//       default:
//         return <Badge color="gray">{status}</Badge>;
//     }
//   };

//   const columns = [
//     {
//       key: "employeeId",
//       label: "Employee",
//       render: (row) => {
//         const employee = employees.find((e) => e.id === row.employeeId);
//         return employee ? employee.name : `Employee #${row.employeeId}`;
//       },
//     },
//     {
//       key: "month",
//       label: "Month",
//       render: (row) => formatMonth(row.month),
//     },
//     {
//       key: "grossSalary",
//       label: "Gross Salary",
//       render: (row) => formatCurrency(row.grossSalary),
//     },
//     {
//       key: "netSalary",
//       label: "Net Salary",
//       render: (row) => formatCurrency(row.netSalary),
//     },
//     {
//       key: "status",
//       label: "Status",
//       render: (row) => getStatusBadge(row.status),
//     },
//     {
//       key: "actions",
//       label: "Actions",
//       render: (row) => (
//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             className="p-1 text-blue-600"
//             onClick={() => handleViewPayslip(row.id)}
//           >
//             <FiEye className="w-4 h-4" />
//           </Button>

//           {row.status === "draft" && (
//             <Button
//               variant="outline"
//               className="p-1 text-yellow-600"
//               onClick={() => handleSubmitForApproval(row.id)}
//               title="Submit for Approval"
//             >
//               <FiAlertCircle className="w-4 h-4" />
//             </Button>
//           )}

//           {row.status === "pending_approval" && (
//             <Button
//               variant="outline"
//               className="p-1 text-indigo-600"
//               onClick={() => handleOpenApproval(row)}
//               title="Review"
//             >
//               <FiCheckSquare className="w-4 h-4" />
//             </Button>
//           )}

//           {row.status === "approved" && (
//             <Button
//               variant="success"
//               className="p-1"
//               onClick={() => handlePaySalary(row.id)}
//               title="Process Payment"
//             >
//               <FiDollarSign className="w-4 h-4" />
//             </Button>
//           )}

//           <Button
//             variant="outline"
//             className="p-1 text-green-600"
//             onClick={() => handleViewPayslip(row.id)}
//             title="Download Payslip"
//           >
//             <FiDownload className="w-4 h-4" />
//           </Button>
//         </div>
//       ),
//     },
//   ];

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

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Payroll Processing
//         </h1>
//         <Button onClick={handleGeneratePayroll}>
//           <FiDollarSign className="w-4 h-4 mr-2" />
//           Generate Payroll
//         </Button>
//       </div>

//       {alert && <Alert type={alert.type} message={alert.message} />}

//       <div className="flex space-x-2 border-b mb-4">
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "pending"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("pending")}
//         >
//           Processing
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "paid"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("paid")}
//         >
//           Paid
//         </button>
//       </div>

//       <div className="flex justify-between items-center">
//         <Select
//           className="w-64"
//           value={selectedMonth}
//           onChange={handleMonthChange}
//           options={[{ value: "", label: "Select Month" }, ...monthOptions]}
//         />
//         <div className="text-sm text-gray-500">
//           Total: {salaries.length} salaries
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-gray-500">Loading payroll data...</div>
//         </div>
//       ) : salaries.length === 0 ? (
//         <Card>
//           <div className="py-8 text-center">
//             <FiDollarSign className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-800 mb-1">
//               No Salary Data
//             </h3>
//             <p className="text-gray-500">
//               No salary records found for the selected month. Generate payroll
//               to create salary records.
//             </p>
//           </div>
//         </Card>
//       ) : (
//         <Table columns={columns} data={salaries} />
//       )}

//       {/* Generate Payroll Modal */}
//       <Modal
//         isOpen={generateModalOpen}
//         onClose={() => setGenerateModalOpen(false)}
//         title="Generate Payroll"
//         size="lg"
//       >
//         <div className="space-y-4">
//           <p className="text-gray-600">
//             Select employees to generate payroll for{" "}
//             {formatMonth(selectedMonth)}.
//           </p>

//           {/* Select all checkbox */}
//           <div className="flex items-center mb-2">
//             <input
//               type="checkbox"
//               id="selectAll"
//               className="h-4 w-4 border-gray-300 rounded"
//               onChange={handleSelectAll}
//               checked={
//                 selectedEmployees.length > 0 &&
//                 selectedEmployees.length ===
//                   employees.filter(
//                     (e) => !salaries.map((s) => s.employeeId).includes(e.id)
//                   ).length
//               }
//             />
//             <label
//               htmlFor="selectAll"
//               className="ml-2 block text-sm text-gray-900 font-medium"
//             >
//               Select All Eligible Employees
//             </label>
//           </div>

//           <div className="border rounded-md max-h-60 overflow-y-auto">
//             {employees.filter(
//               (e) => !salaries.map((s) => s.employeeId).includes(e.id)
//             ).length === 0 ? (
//               <div className="p-4 text-center text-gray-500">
//                 All employees already have salary records for this month
//               </div>
//             ) : (
//               employees
//                 .filter(
//                   (e) => !salaries.map((s) => s.employeeId).includes(e.id)
//                 )
//                 .map((employee) => (
//                   <div
//                     key={employee.id}
//                     className="flex items-center p-3 border-b"
//                   >
//                     <input
//                       type="checkbox"
//                       id={`emp-${employee.id}`}
//                       className="h-4 w-4 border-gray-300 rounded"
//                       value={employee.id}
//                       checked={selectedEmployees.includes(employee.id)}
//                       onChange={handleEmployeeSelect}
//                     />
//                     <label
//                       htmlFor={`emp-${employee.id}`}
//                       className="ml-2 block flex-1"
//                     >
//                       <div className="text-sm font-medium text-gray-900">
//                         {employee.name}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {employee.designation} •{" "}
//                         {formatCurrency(employee.salary)}/month
//                       </div>
//                     </label>
//                   </div>
//                 ))
//             )}
//           </div>

//           <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 text-sm text-yellow-800">
//             <p>
//               <strong>Note:</strong> Salary calculation will use attendance
//               records, overtime, applicable deductions, and defined salary
//               structures.
//             </p>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-3 mt-6">
//           <Button
//             variant="secondary"
//             type="button"
//             onClick={() => setGenerateModalOpen(false)}
//             disabled={processing}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleGenerateSalaries}
//             disabled={processing || selectedEmployees.length === 0}
//           >
//             {processing ? (
//               <>
//                 <FiClock className="w-4 h-4 mr-2 animate-spin" />
//                 Processing...
//               </>
//             ) : (
//               "Generate Payroll"
//             )}
//           </Button>
//         </div>
//       </Modal>

//       {/* Approval Modal */}
//       <Modal
//         isOpen={approvalModalOpen}
//         onClose={() => setApprovalModalOpen(false)}
//         title="Payroll Approval"
//         size="md"
//       >
//         {currentApproval && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
//               <div>
//                 <div className="text-sm text-gray-500">Employee</div>
//                 <div className="font-medium">
//                   {
//                     employees.find((e) => e.id === currentApproval.employeeId)
//                       ?.name
//                   }
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-500">Month</div>
//                 <div className="font-medium">
//                   {formatMonth(currentApproval.month)}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-500">Gross Salary</div>
//                 <div className="font-medium">
//                   {formatCurrency(currentApproval.grossSalary)}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-500">Net Salary</div>
//                 <div className="font-medium">
//                   {formatCurrency(currentApproval.netSalary)}
//                 </div>
//               </div>
//             </div>

//             <Input
//               label="Comments"
//               id="approvalComment"
//               name="approvalComment"
//               value={approvalComment}
//               onChange={(e) => setApprovalComment(e.target.value)}
//               placeholder="Add comments or feedback (required for rejection)"
//               multiline
//               rows={3}
//             />

//             <div className="flex justify-end space-x-3 mt-6">
//               <Button
//                 variant="danger"
//                 onClick={handleReject}
//                 disabled={!approvalComment}
//               >
//                 <FiX className="w-4 h-4 mr-2" />
//                 Reject
//               </Button>
//               <Button variant="success" onClick={handleApprove}>
//                 <FiCheckCircle className="w-4 h-4 mr-2" />
//                 Approve
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Payslip Modal - same as before */}
//       <Modal
//         isOpen={payslipModalOpen}
//         onClose={() => setPayslipModalOpen(false)}
//         title="Salary Slip"
//         size="lg"
//       >
//         {currentPayslip && (
//           <div className="space-y-6">
//             <div className="border-b pb-4">
//               <h3 className="text-xl font-semibold text-center mb-1">
//                 Payroll Management System
//               </h3>
//               <p className="text-center text-gray-500">
//                 Salary Slip for {currentPayslip.month}
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Employee Name</p>
//                 <p className="font-medium">{currentPayslip.employeeName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Employee ID</p>
//                 <p className="font-medium">{currentPayslip.employeeId}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Designation</p>
//                 <p className="font-medium">{currentPayslip.designation}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Department</p>
//                 <p className="font-medium">{currentPayslip.department}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Bank Account</p>
//                 <p className="font-medium">{currentPayslip.bankAccount}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Month</p>
//                 <p className="font-medium">{currentPayslip.month}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-8">
//               <div>
//                 <h4 className="font-medium mb-2 border-b pb-1">Earnings</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Basic Salary</span>
//                     <span>
//                       {formatCurrency(currentPayslip.earnings.basicSalary)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">HRA</span>
//                     <span>{formatCurrency(currentPayslip.earnings.hra)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Conveyance Allowance</span>
//                     <span>
//                       {formatCurrency(
//                         currentPayslip.earnings.conveyanceAllowance
//                       )}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Medical Allowance</span>
//                     <span>
//                       {formatCurrency(currentPayslip.earnings.medicalAllowance)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Special Allowance</span>
//                     <span>
//                       {formatCurrency(currentPayslip.earnings.specialAllowance)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between font-medium border-t pt-1 mt-1">
//                     <span>Total Earnings</span>
//                     <span>
//                       {formatCurrency(currentPayslip.earnings.totalEarnings)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-medium mb-2 border-b pb-1">Deductions</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Provident Fund</span>
//                     <span>
//                       {formatCurrency(currentPayslip.deductions.providentFund)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">ESI</span>
//                     <span>{formatCurrency(currentPayslip.deductions.esi)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Professional Tax</span>
//                     <span>
//                       {formatCurrency(
//                         currentPayslip.deductions.professionalTax
//                       )}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm">Income Tax (TDS)</span>
//                     <span>{formatCurrency(currentPayslip.deductions.tds)}</span>
//                   </div>
//                   <div className="flex justify-between font-medium border-t pt-1 mt-1">
//                     <span>Total Deductions</span>
//                     <span>
//                       {formatCurrency(
//                         currentPayslip.deductions.totalDeductions
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t pt-4">
//               <div className="flex justify-between font-medium text-lg">
//                 <span>Net Salary</span>
//                 <span>{formatCurrency(currentPayslip.netSalary)}</span>
//               </div>
//             </div>

//             <div className="flex justify-end mt-4">
//               <Button variant="outline" className="flex items-center">
//                 <FiDownload className="mr-2" />
//                 Download PDF
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default Payroll;

//3

import { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiX,
  FiAlertCircle,
  FiCheckSquare,
  FiUserCheck,
} from "react-icons/fi";
import {
  Table,
  Button,
  Card,
  Modal,
  Select,
  Alert,
  Badge,
  Input,
} from "../components/ui";
import { api } from "../services/mockApi";
import {
  formatMonth,
  formatCurrency,
  formatDate,
  generatePaySlip,
} from "../utils";

function Payroll() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  ); // Current month (YYYY-MM)
  const [alert, setAlert] = useState(null);
  const [payslipModalOpen, setPayslipModalOpen] = useState(false);
  const [currentPayslip, setCurrentPayslip] = useState(null);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [currentApproval, setCurrentApproval] = useState(null);
  const [approvalComment, setApprovalComment] = useState("");
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchData();
  }, [selectedMonth, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [empData, salaryData, structuresData, attendanceData] =
        await Promise.all([
          api.getEmployees(),
          api.getSalaries({
            month: selectedMonth,
            status:
              activeTab === "pending"
                ? ["draft", "pending_approval", "approved", "rejected"]
                : ["paid"],
          }),
          api.getSalaryStructures(),
          api.getAttendance({
            month: selectedMonth,
          }),
        ]);
      setEmployees(empData);
      setSalaries(salaryData);
      setStructures(structuresData);
      setAttendanceData(attendanceData);
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

  const handleGeneratePayroll = () => {
    // Get list of employees who don't have salary records for the selected month
    const employeesWithSalary = salaries.map((s) => s.employeeId);
    const eligibleEmployees = employees.filter(
      (e) => !employeesWithSalary.includes(e.id)
    );

    setSelectedEmployees(
      eligibleEmployees.length > 0 ? [eligibleEmployees[0].id] : []
    );
    setGenerateModalOpen(true);
  };

  const handleEmployeeSelect = (e) => {
    const value = parseInt(e.target.value);

    if (selectedEmployees.includes(value)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== value));
    } else {
      setSelectedEmployees([...selectedEmployees, value]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Get all eligible employees
      const employeesWithSalary = salaries.map((s) => s.employeeId);
      const eligibleEmployeeIds = employees
        .filter((e) => !employeesWithSalary.includes(e.id))
        .map((e) => e.id);

      setSelectedEmployees(eligibleEmployeeIds);
    } else {
      setSelectedEmployees([]);
    }
  };

  const calculateSalaryComponents = (employeeId, grossSalary) => {
    // Find employee
    const employee = employees.find((e) => e.id === employeeId);
    if (!employee) return {};

    // Find applicable salary structure
    const structure = structures.find(
      (s) => s.employeeType === employee.employmentType
    );
    if (!structure) return {};

    // Calculate attendance factor (simple calculation for example)
    const empAttendance = attendanceData.filter(
      (a) => a.employeeId === employeeId
    );
    const workingDays = 22; // Simplified assumption
    const presentDays = empAttendance.filter(
      (a) => a.status === "present"
    ).length;
    const attendanceFactor = presentDays / workingDays;

    // Calculate overtime
    const overtimeHours = empAttendance.reduce((total, record) => {
      if (record.status === "present" && record.overtime) {
        return total + record.overtime;
      }
      return total;
    }, 0);

    // Calculate basic salary (usually a percentage of gross)
    const basicSalary = grossSalary * 0.6;

    // Calculate components based on structure
    const calculatedComponents = structure.components.map((component) => {
      let calculatedValue = 0;

      if (component.isPercentage) {
        const baseValue =
          component.percentageOf === "basicSalary" ? basicSalary : grossSalary;
        calculatedValue = baseValue * (component.percentageValue / 100);
      } else {
        calculatedValue = component.value;
      }

      return {
        ...component,
        calculatedValue: Math.round(calculatedValue),
      };
    });

    // Calculate earnings and deductions
    const earnings = calculatedComponents
      .filter((c) => c.type === "earning")
      .reduce((sum, c) => sum + c.calculatedValue, 0);

    const deductions = calculatedComponents
      .filter((c) => c.type === "deduction")
      .reduce((sum, c) => sum + c.calculatedValue, 0);

    // Add standard deductions
    const pfDeduction = basicSalary * 0.12;
    const esiDeduction = grossSalary <= 21000 ? grossSalary * 0.0075 : 0;
    const professionalTax = 200;

    // Calculate net salary
    const netSalary =
      grossSalary - deductions - pfDeduction - esiDeduction - professionalTax;

    return {
      basicSalary,
      attendanceFactor,
      overtimeHours,
      calculatedComponents,
      earnings,
      deductions,
      pfDeduction,
      esiDeduction,
      professionalTax,
      netSalary,
    };
  };

  const handleGenerateSalaries = async () => {
    if (selectedEmployees.length === 0) {
      setAlert({
        type: "error",
        message: "Please select at least one employee",
      });
      return;
    }

    setProcessing(true);
    try {
      // For each selected employee, generate a salary record
      const promises = selectedEmployees.map(async (employeeId) => {
        const employee = employees.find((e) => e.id === employeeId);
        if (!employee) return null;

        // Get gross salary from employee record
        const grossSalary = employee.salary;

        // Calculate salary components
        const calculations = calculateSalaryComponents(employeeId, grossSalary);

        // Create salary record
        return api.generateSalary(employeeId, selectedMonth, {
          basicSalary: calculations.basicSalary,
          calculatedComponents: calculations.calculatedComponents,
          attendanceFactor: calculations.attendanceFactor,
          overtimeHours: calculations.overtimeHours,
          pfDeduction: calculations.pfDeduction,
          esiDeduction: calculations.esiDeduction,
          professionalTax: calculations.professionalTax,
          grossSalary: grossSalary,
          netSalary: calculations.netSalary,
          status: "draft",
        });
      });

      await Promise.all(promises);

      setAlert({ type: "success", message: "Payroll generated successfully" });
      setGenerateModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error generating payroll:", error);
      setAlert({ type: "error", message: "Failed to generate payroll" });
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmitForApproval = async (id) => {
    try {
      await api.updateSalaryStatus(id, "pending_approval");
      setAlert({ type: "success", message: "Salary submitted for approval" });
      fetchData();
    } catch (error) {
      console.error("Error submitting for approval:", error);
      setAlert({ type: "error", message: "Failed to submit for approval" });
    }
  };

  const handleApprove = async () => {
    if (!currentApproval) return;

    try {
      await api.updateSalaryStatus(
        currentApproval.id,
        "approved",
        approvalComment
      );
      setAlert({ type: "success", message: "Salary approved successfully" });
      setApprovalModalOpen(false);
      setApprovalComment("");
      fetchData();
    } catch (error) {
      console.error("Error approving salary:", error);
      setAlert({ type: "error", message: "Failed to approve salary" });
    }
  };

  const handleReject = async () => {
    if (!currentApproval || !approvalComment) {
      setAlert({
        type: "error",
        message: "Please provide a reason for rejection",
      });
      return;
    }

    try {
      await api.updateSalaryStatus(
        currentApproval.id,
        "rejected",
        approvalComment
      );
      setAlert({ type: "success", message: "Salary rejected" });
      setApprovalModalOpen(false);
      setApprovalComment("");
      fetchData();
    } catch (error) {
      console.error("Error rejecting salary:", error);
      setAlert({ type: "error", message: "Failed to reject salary" });
    }
  };

  const handleOpenApproval = (salary) => {
    setCurrentApproval(salary);
    setApprovalComment("");
    setApprovalModalOpen(true);
  };

  const handlePaySalary = async (id) => {
    try {
      await api.updateSalaryStatus(id, "paid");
      setAlert({ type: "success", message: "Salary marked as paid" });
      fetchData();
    } catch (error) {
      console.error("Error processing salary:", error);
      setAlert({ type: "error", message: "Failed to process salary" });
    }
  };

  const handleViewPayslip = async (salaryId) => {
    const salary = salaries.find((s) => s.id === salaryId);
    if (!salary) return;

    const employee = employees.find((e) => e.id === salary.employeeId);
    if (!employee) return;

    const payslip = generatePaySlip(salary, employee);
    setCurrentPayslip(payslip);
    setPayslipModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "draft":
        return <Badge color="gray">Draft</Badge>;
      case "pending_approval":
        return <Badge color="yellow">Pending Approval</Badge>;
      case "approved":
        return <Badge color="green">Approved</Badge>;
      case "rejected":
        return <Badge color="red">Rejected</Badge>;
      case "paid":
        return <Badge color="blue">Paid</Badge>;
      default:
        return <Badge color="gray">{status}</Badge>;
    }
  };

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
        const value = Number.isFinite(row.grossSalary) ? row.grossSalary : 0;
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
          grossSalary - (pfDeduction + esiDeduction + professionalTax + tds);
        return formatCurrency(calculatedNetSalary);
      },
    },
    {
      key: "status",
      label: "Status",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="p-1 text-blue-600"
            onClick={() => handleViewPayslip(row.id)}
          >
            <FiEye className="w-4 h-4" />
          </Button>

          {row.status === "draft" && (
            <Button
              variant="outline"
              className="p-1 text-yellow-600"
              onClick={() => handleSubmitForApproval(row.id)}
              title="Submit for Approval"
            >
              <FiAlertCircle className="w-4 h-4" />
            </Button>
          )}

          {row.status === "pending_approval" && (
            <Button
              variant="outline"
              className="p-1 text-indigo-600"
              onClick={() => handleOpenApproval(row)}
              title="Review"
            >
              <FiCheckSquare className="w-4 h-4" />
            </Button>
          )}

          {row.status === "approved" && (
            <Button
              variant="success"
              className="p-1"
              onClick={() => handlePaySalary(row.id)}
              title="Process Payment"
            >
              <FiDollarSign className="w-4 h-4" />
            </Button>
          )}

          <Button
            variant="outline"
            className="p-1 text-green-600"
            onClick={() => handleViewPayslip(row.id)}
            title="Download Payslip"
          >
            <FiDownload className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Payroll Processing
        </h1>
        <Button onClick={handleGeneratePayroll}>
          <FiDollarSign className="w-4 h-4 mr-2" />
          Generate Payroll
        </Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="flex space-x-2 border-b mb-4">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "pending"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Processing
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "paid"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("paid")}
        >
          Paid
        </button>
      </div>

      <div className="flex justify-between items-center">
        <Select
          className="w-64"
          value={selectedMonth}
          onChange={handleMonthChange}
          options={[{ value: "", label: "Select Month" }, ...monthOptions]}
        />
        <div className="text-sm text-gray-500">
          Total: {salaries.length} salaries
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading payroll data...</div>
        </div>
      ) : salaries.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <FiDollarSign className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              No Salary Data
            </h3>
            <p className="text-gray-500">
              No salary records found for the selected month. Generate payroll
              to create salary records.
            </p>
          </div>
        </Card>
      ) : (
        <Table columns={columns} data={salaries} />
      )}

      {/* Generate Payroll Modal */}
      <Modal
        isOpen={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        title="Generate Payroll"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Select employees to generate payroll for{" "}
            {formatMonth(selectedMonth)}.
          </p>

          {/* Select all checkbox */}
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="selectAll"
              className="h-4 w-4 border-gray-300 rounded"
              onChange={handleSelectAll}
              checked={
                selectedEmployees.length > 0 &&
                selectedEmployees.length ===
                  employees.filter(
                    (e) => !salaries.map((s) => s.employeeId).includes(e.id)
                  ).length
              }
            />
            <label
              htmlFor="selectAll"
              className="ml-2 block text-sm text-gray-900 font-medium"
            >
              Select All Eligible Employees
            </label>
          </div>

          <div className="border rounded-md max-h-60 overflow-y-auto">
            {employees.filter(
              (e) => !salaries.map((s) => s.employeeId).includes(e.id)
            ).length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                All employees already have salary records for this month
              </div>
            ) : (
              employees
                .filter(
                  (e) => !salaries.map((s) => s.employeeId).includes(e.id)
                )
                .map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center p-3 border-b"
                  >
                    <input
                      type="checkbox"
                      id={`emp-${employee.id}`}
                      className="h-4 w-4 border-gray-300 rounded"
                      value={employee.id}
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={handleEmployeeSelect}
                    />
                    <label
                      htmlFor={`emp-${employee.id}`}
                      className="ml-2 block flex-1"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {employee.designation} •{" "}
                        {formatCurrency(employee.salary)}/month
                      </div>
                    </label>
                  </div>
                ))
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 text-sm text-yellow-800">
            <p>
              <strong>Note:</strong> Salary calculation will use attendance
              records, overtime, applicable deductions, and defined salary
              structures.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setGenerateModalOpen(false)}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerateSalaries}
            disabled={processing || selectedEmployees.length === 0}
          >
            {processing ? (
              <>
                <FiClock className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Generate Payroll"
            )}
          </Button>
        </div>
      </Modal>

      {/* Approval Modal */}
      <Modal
        isOpen={approvalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
        title="Payroll Approval"
        size="md"
      >
        {currentApproval && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
              <div>
                <div className="text-sm text-gray-500">Employee</div>
                <div className="font-medium">
                  {
                    employees.find((e) => e.id === currentApproval.employeeId)
                      ?.name
                  }
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Month</div>
                <div className="font-medium">
                  {formatMonth(currentApproval.month)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Gross Salary</div>
                <div className="font-medium">
                  {formatCurrency(currentApproval.grossSalary)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Net Salary</div>
                <div className="font-medium">
                  {formatCurrency(currentApproval.netSalary)}
                </div>
              </div>
            </div>

            <Input
              label="Comments"
              id="approvalComment"
              name="approvalComment"
              value={approvalComment}
              onChange={(e) => setApprovalComment(e.target.value)}
              placeholder="Add comments or feedback (required for rejection)"
              multiline
              rows={3}
            />

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="danger"
                onClick={handleReject}
                disabled={!approvalComment}
              >
                <FiX className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button variant="success" onClick={handleApprove}>
                <FiCheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Payslip Modal */}
      <Modal
        isOpen={payslipModalOpen}
        onClose={() => setPayslipModalOpen(false)}
        title="Salary Slip"
        size="lg"
      >
        {currentPayslip && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold text-center mb-1">
                Payroll Management System
              </h3>
              <p className="text-center text-gray-500">
                Salary Slip for {currentPayslip.month}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Employee Name</p>
                <p className="font-medium">{currentPayslip.employeeName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium">{currentPayslip.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-medium">{currentPayslip.designation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{currentPayslip.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bank Account</p>
                <p className="font-medium">{currentPayslip.bankAccount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Month</p>
                <p className="font-medium">{currentPayslip.month}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-2 border-b pb-1">Earnings</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Basic Salary</span>
                    <span>
                      {formatCurrency(currentPayslip.earnings.basicSalary)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">HRA</span>
                    <span>{formatCurrency(currentPayslip.earnings.hra)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Conveyance Allowance</span>
                    <span>
                      {formatCurrency(
                        currentPayslip.earnings.conveyanceAllowance
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Medical Allowance</span>
                    <span>
                      {formatCurrency(currentPayslip.earnings.medicalAllowance)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Special Allowance</span>
                    <span>
                      {formatCurrency(currentPayslip.earnings.specialAllowance)}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1 mt-1">
                    <span>Total Earnings</span>
                    <span>
                      {formatCurrency(currentPayslip.earnings.totalEarnings)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 border-b pb-1">Deductions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Provident Fund</span>
                    <span>
                      {formatCurrency(currentPayslip.deductions.providentFund)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">ESI</span>
                    <span>{formatCurrency(currentPayslip.deductions.esi)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Professional Tax</span>
                    <span>
                      {formatCurrency(
                        currentPayslip.deductions.professionalTax
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Income Tax (TDS)</span>
                    <span>{formatCurrency(currentPayslip.deductions.tds)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1 mt-1">
                    <span>Total Deductions</span>
                    <span>
                      {formatCurrency(
                        currentPayslip.deductions.totalDeductions
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-medium text-lg">
                <span>Net Salary</span>
                <span>{formatCurrency(currentPayslip.netSalary)}</span>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" className="flex items-center">
                <FiDownload className="mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Payroll;
