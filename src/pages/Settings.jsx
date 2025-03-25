// import { useState } from "react";
// import {
//   FiSave,
//   FiUser,
//   FiDollarSign,
//   FiFileText,
//   FiSettings,
//   FiLock,
//   FiCheckCircle,
// } from "react-icons/fi";
// import { Card, Input, Button, Select, Alert } from "../components/ui";

// function Settings() {
//   const [activeTab, setActiveTab] = useState("company");
//   const [alert, setAlert] = useState(null);

//   // Company Settings
//   const [companySettings, setCompanySettings] = useState({
//     companyName: "Your Company Name",
//     address: "123 Business Street, City",
//     phone: "+91 9876543210",
//     email: "contact@yourcompany.com",
//     website: "www.yourcompany.com",
//     pan: "ABCDE1234F",
//     gstin: "22AAAAA0000A1Z5",
//     pfNumber: "PFXYZ123456",
//     esiNumber: "ESI12345678",
//     logo: null,
//   });

//   // Payroll Settings
//   const [payrollSettings, setPayrollSettings] = useState({
//     salaryProcessingDate: "28",
//     basicPercentage: "60",
//     hraPercentage: "40",
//     pfPercentage: "12",
//     esiEmployerPercentage: "3.25",
//     esiEmployeePercentage: "0.75",
//     professionalTax: "200",
//     minimumWage: "15000",
//   });

//   // Tax Settings
//   const [taxSettings, setTaxSettings] = useState({
//     taxRegime: "old",
//     financialYear: "2023-2024",
//     exemptionSection80C: "150000",
//     exemptionHRA: "true",
//     exemptionLTA: "true",
//     exemptionMedical: "true",
//   });

//   // System Settings
//   const [systemSettings, setSystemSettings] = useState({
//     theme: "light",
//     dateFormat: "dd/MM/yyyy",
//     timeFormat: "24h",
//     timezone: "Asia/Kolkata",
//     language: "en",
//     currency: "INR",
//     emailNotifications: "true",
//     backupFrequency: "weekly",
//   });

//   const handleCompanyChange = (e) => {
//     const { name, value } = e.target;
//     setCompanySettings({ ...companySettings, [name]: value });
//   };

//   const handlePayrollChange = (e) => {
//     const { name, value } = e.target;
//     setPayrollSettings({ ...payrollSettings, [name]: value });
//   };

//   const handleTaxChange = (e) => {
//     const { name, value } = e.target;
//     setTaxSettings({ ...taxSettings, [name]: value });
//   };

//   const handleSystemChange = (e) => {
//     const { name, value } = e.target;
//     setSystemSettings({ ...systemSettings, [name]: value });
//   };

//   const handleLogoChange = (e) => {
//     if (e.target.files.length > 0) {
//       setCompanySettings({ ...companySettings, logo: e.target.files[0] });
//     }
//   };

//   const handleSaveSettings = () => {
//     setAlert({ type: "success", message: "Settings saved successfully" });
//     setTimeout(() => {
//       setAlert(null);
//     }, 3000);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           System Settings
//         </h1>
//         <Button onClick={handleSaveSettings}>
//           <FiSave className="w-4 h-4 mr-2" />
//           Save Settings
//         </Button>
//       </div>

//       {alert && <Alert type={alert.type} message={alert.message} />}

//       <div className="flex space-x-2 border-b">
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "company"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("company")}
//         >
//           <FiUser className="inline-block mr-1" /> Company
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "payroll"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("payroll")}
//         >
//           <FiDollarSign className="inline-block mr-1" /> Payroll
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "tax"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("tax")}
//         >
//           <FiFileText className="inline-block mr-1" /> Tax
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "system"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("system")}
//         >
//           <FiSettings className="inline-block mr-1" /> System
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "users"
//               ? "text-primary border-b-2 border-primary"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("users")}
//         >
//           <FiLock className="inline-block mr-1" /> Users & Permissions
//         </button>
//       </div>

//       {activeTab === "company" && (
//         <Card>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="md:col-span-2">
//               <h3 className="text-lg font-medium mb-4">Company Information</h3>
//             </div>

//             <Input
//               label="Company Name"
//               id="companyName"
//               name="companyName"
//               value={companySettings.companyName}
//               onChange={handleCompanyChange}
//             />

//             <Input
//               label="Address"
//               id="address"
//               name="address"
//               value={companySettings.address}
//               onChange={handleCompanyChange}
//             />

//             <Input
//               label="Phone"
//               id="phone"
//               name="phone"
//               value={companySettings.phone}
//               onChange={handleCompanyChange}
//             />

//             <Input
//               label="Email"
//               id="email"
//               name="email"
//               type="email"
//               value={companySettings.email}
//               onChange={handleCompanyChange}
//             />

//             <Input
//               label="Website"
//               id="website"
//               name="website"
//               value={companySettings.website}
//               onChange={handleCompanyChange}
//             />

//             <div className="md:col-span-2">
//               <h3 className="text-lg font-medium mb-4 mt-4">
//                 Statutory Information
//               </h3>
//             </div>

//             <Input
//               label="PAN Number"
//               id="pan"
//               name="pan"
//               value={companySettings.pan}
//               onChange={handleCompanyChange}
//             />

//             <Input
//               label="GSTIN"
//               id="gstin"
//               name="gstin"
//               value={companySettings.gstin}
//               onChange={handleCompanyChange}
//             />

//             <Input
//               label="PF Number"
//               id="pfNumber"
//               name="pfNumber"
//               value={companySettings.pfNumber}
//               onChange={handleCompanyChange}
//             />

//             <Input
//               label="ESI Number"
//               id="esiNumber"
//               name="esiNumber"
//               value={companySettings.esiNumber}
//               onChange={handleCompanyChange}
//             />

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Company Logo
//               </label>
//               <div className="flex items-center">
//                 <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center mr-4">
//                   {companySettings.logo ? (
//                     <img
//                       src={URL.createObjectURL(companySettings.logo)}
//                       alt="Company Logo"
//                       className="max-w-full max-h-full"
//                     />
//                   ) : (
//                     <FiUser className="w-12 h-12 text-gray-400" />
//                   )}
//                 </div>
//                 <label className="cursor-pointer">
//                   <Button as="div" variant="outline">
//                     Upload Logo
//                   </Button>
//                   <input
//                     type="file"
//                     className="hidden"
//                     onChange={handleLogoChange}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </Card>
//       )}

//       {activeTab === "payroll" && (
//         <Card>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="md:col-span-2">
//               <h3 className="text-lg font-medium mb-4">
//                 Payroll Configuration
//               </h3>
//             </div>

//             <Select
//               label="Salary Processing Date"
//               id="salaryProcessingDate"
//               name="salaryProcessingDate"
//               value={payrollSettings.salaryProcessingDate}
//               onChange={handlePayrollChange}
//               options={Array.from({ length: 31 }, (_, i) => ({
//                 value: (i + 1).toString(),
//                 label: `${i + 1}${getOrdinalSuffix(i + 1)} of the month`,
//               }))}
//             />

//             <Input
//               label="Basic Salary Percentage (%)"
//               id="basicPercentage"
//               name="basicPercentage"
//               type="number"
//               value={payrollSettings.basicPercentage}
//               onChange={handlePayrollChange}
//             />

//             <Input
//               label="HRA Percentage (% of Basic)"
//               id="hraPercentage"
//               name="hraPercentage"
//               type="number"
//               value={payrollSettings.hraPercentage}
//               onChange={handlePayrollChange}
//             />

//             <Input
//               label="PF Percentage (%)"
//               id="pfPercentage"
//               name="pfPercentage"
//               type="number"
//               value={payrollSettings.pfPercentage}
//               onChange={handlePayrollChange}
//             />

//             <Input
//               label="ESI Employer Contribution (%)"
//               id="esiEmployerPercentage"
//               name="esiEmployerPercentage"
//               type="number"
//               value={payrollSettings.esiEmployerPercentage}
//               onChange={handlePayrollChange}
//             />

//             <Input
//               label="ESI Employee Contribution (%)"
//               id="esiEmployeePercentage"
//               name="esiEmployeePercentage"
//               type="number"
//               value={payrollSettings.esiEmployeePercentage}
//               onChange={handlePayrollChange}
//             />

//             <Input
//               label="Professional Tax (₹)"
//               id="professionalTax"
//               name="professionalTax"
//               type="number"
//               value={payrollSettings.professionalTax}
//               onChange={handlePayrollChange}
//             />

//             <Input
//               label="Minimum Wage (₹)"
//               id="minimumWage"
//               name="minimumWage"
//               type="number"
//               value={payrollSettings.minimumWage}
//               onChange={handlePayrollChange}
//             />
//           </div>
//         </Card>
//       )}

//       {activeTab === "tax" && (
//         <Card>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="md:col-span-2">
//               <h3 className="text-lg font-medium mb-4">Tax Configuration</h3>
//             </div>

//             <Select
//               label="Tax Regime"
//               id="taxRegime"
//               name="taxRegime"
//               value={taxSettings.taxRegime}
//               onChange={handleTaxChange}
//               options={[
//                 { value: "old", label: "Old Tax Regime" },
//                 { value: "new", label: "New Tax Regime" },
//               ]}
//             />

//             <Select
//               label="Financial Year"
//               id="financialYear"
//               name="financialYear"
//               value={taxSettings.financialYear}
//               onChange={handleTaxChange}
//               options={[
//                 { value: "2023-2024", label: "2023-2024" },
//                 { value: "2024-2025", label: "2024-2025" },
//               ]}
//             />

//             <Input
//               label="Section 80C Exemption Limit (₹)"
//               id="exemptionSection80C"
//               name="exemptionSection80C"
//               type="number"
//               value={taxSettings.exemptionSection80C}
//               onChange={handleTaxChange}
//             />

//             <div className="flex flex-col">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Exemptions Enabled
//               </label>
//               <div className="space-y-2 mt-2">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="exemptionHRA"
//                     name="exemptionHRA"
//                     checked={taxSettings.exemptionHRA === "true"}
//                     onChange={(e) =>
//                       handleTaxChange({
//                         target: {
//                           name: "exemptionHRA",
//                           value: e.target.checked ? "true" : "false",
//                         },
//                       })
//                     }
//                     className="h-4 w-4 text-primary border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor="exemptionHRA"
//                     className="ml-2 block text-sm text-gray-700"
//                   >
//                     HRA Exemption
//                   </label>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="exemptionLTA"
//                     name="exemptionLTA"
//                     checked={taxSettings.exemptionLTA === "true"}
//                     onChange={(e) =>
//                       handleTaxChange({
//                         target: {
//                           name: "exemptionLTA",
//                           value: e.target.checked ? "true" : "false",
//                         },
//                       })
//                     }
//                     className="h-4 w-4 text-primary border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor="exemptionLTA"
//                     className="ml-2 block text-sm text-gray-700"
//                   >
//                     LTA Exemption
//                   </label>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="exemptionMedical"
//                     name="exemptionMedical"
//                     checked={taxSettings.exemptionMedical === "true"}
//                     onChange={(e) =>
//                       handleTaxChange({
//                         target: {
//                           name: "exemptionMedical",
//                           value: e.target.checked ? "true" : "false",
//                         },
//                       })
//                     }
//                     className="h-4 w-4 text-primary border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor="exemptionMedical"
//                     className="ml-2 block text-sm text-gray-700"
//                   >
//                     Medical Exemption
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       )}

//       {activeTab === "system" && (
//         <Card>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="md:col-span-2">
//               <h3 className="text-lg font-medium mb-4">System Configuration</h3>
//             </div>

//             <Select
//               label="Theme"
//               id="theme"
//               name="theme"
//               value={systemSettings.theme}
//               onChange={handleSystemChange}
//               options={[
//                 { value: "light", label: "Light" },
//                 { value: "dark", label: "Dark" },
//                 { value: "system", label: "System Default" },
//               ]}
//             />

//             <Select
//               label="Date Format"
//               id="dateFormat"
//               name="dateFormat"
//               value={systemSettings.dateFormat}
//               onChange={handleSystemChange}
//               options={[
//                 { value: "dd/MM/yyyy", label: "DD/MM/YYYY" },
//                 { value: "MM/dd/yyyy", label: "MM/DD/YYYY" },
//                 { value: "yyyy-MM-dd", label: "YYYY-MM-DD" },
//               ]}
//             />

//             <Select
//               label="Time Format"
//               id="timeFormat"
//               name="timeFormat"
//               value={systemSettings.timeFormat}
//               onChange={handleSystemChange}
//               options={[
//                 { value: "12h", label: "12-hour (AM/PM)" },
//                 { value: "24h", label: "24-hour" },
//               ]}
//             />

//             <Select
//               label="Timezone"
//               id="timezone"
//               name="timezone"
//               value={systemSettings.timezone}
//               onChange={handleSystemChange}
//               options={[
//                 { value: "Asia/Kolkata", label: "Indian Standard Time (IST)" },
//                 { value: "America/New_York", label: "Eastern Time (ET)" },
//                 { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
//               ]}
//             />

//             <Select
//               label="Language"
//               id="language"
//               name="language"
//               value={systemSettings.language}
//               onChange={handleSystemChange}
//               options={[
//                 { value: "en", label: "English" },
//                 { value: "hi", label: "Hindi" },
//                 { value: "ta", label: "Tamil" },
//               ]}
//             />

//             <Select
//               label="Currency"
//               id="currency"
//               name="currency"
//               value={systemSettings.currency}
//               onChange={handleSystemChange}
//               options={[
//                 { value: "INR", label: "Indian Rupee (₹)" },
//                 { value: "USD", label: "US Dollar ($)" },
//                 { value: "EUR", label: "Euro (€)" },
//               ]}
//             />

//             <div className="flex flex-col">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Notifications
//               </label>
//               <div className="flex items-center mt-2">
//                 <input
//                   type="checkbox"
//                   id="emailNotifications"
//                   name="emailNotifications"
//                   checked={systemSettings.emailNotifications === "true"}
//                   onChange={(e) =>
//                     handleSystemChange({
//                       target: {
//                         name: "emailNotifications",
//                         value: e.target.checked ? "true" : "false",
//                       },
//                     })
//                   }
//                   className="h-4 w-4 text-primary border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="emailNotifications"
//                   className="ml-2 block text-sm text-gray-700"
//                 >
//                   Enable email notifications
//                 </label>
//               </div>
//             </div>

//             <Select
//               label="Backup Frequency"
//               id="backupFrequency"
//               name="backupFrequency"
//               value={systemSettings.backupFrequency}
//               onChange={handleSystemChange}
//               options={[
//                 { value: "daily", label: "Daily" },
//                 { value: "weekly", label: "Weekly" },
//                 { value: "monthly", label: "Monthly" },
//               ]}
//             />
//           </div>
//         </Card>
//       )}

//       {activeTab === "users" && (
//         <Card>
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-medium mb-4">Users & Permissions</h3>
//               <p className="text-sm text-gray-500 mb-4">
//                 Manage user access and permission levels for the payroll system.
//               </p>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   <tr>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                             <span className="text-gray-600 font-medium">
//                               AD
//                             </span>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             Admin User
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       admin@example.com
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       Administrator
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <button className="text-primary hover:text-primary-dark mr-3">
//                         Edit
//                       </button>
//                       <button className="text-gray-500 hover:text-gray-700">
//                         Reset Password
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                             <span className="text-gray-600 font-medium">
//                               HR
//                             </span>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             HR Manager
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       hr@example.com
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       HR Manager
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <button className="text-primary hover:text-primary-dark mr-3">
//                         Edit
//                       </button>
//                       <button className="text-gray-500 hover:text-gray-700">
//                         Reset Password
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                             <span className="text-gray-600 font-medium">
//                               AC
//                             </span>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             Accountant
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       accountant@example.com
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       Accountant
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                         Invited
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <button className="text-primary hover:text-primary-dark mr-3">
//                         Edit
//                       </button>
//                       <button className="text-gray-500 hover:text-gray-700">
//                         Resend Invite
//                       </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className="mt-4">
//               <Button variant="outline">
//                 <FiUser className="w-4 h-4 mr-2" />
//                 Add New User
//               </Button>
//             </div>

//             <div className="mt-8 border-t pt-6">
//               <h4 className="font-medium mb-4">Role Permissions</h4>
//               <div className="space-y-4">
//                 <div className="border rounded-md p-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <h5 className="font-medium">Administrator</h5>
//                     <button className="text-sm text-primary">Edit</button>
//                   </div>
//                   <p className="text-sm text-gray-500 mb-2">
//                     Full access to all modules and settings
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Employees
//                     </span>
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Payroll
//                     </span>
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Attendance
//                     </span>
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Reports
//                     </span>
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Settings
//                     </span>
//                   </div>
//                 </div>

//                 <div className="border rounded-md p-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <h5 className="font-medium">HR Manager</h5>
//                     <button className="text-sm text-primary">Edit</button>
//                   </div>
//                   <p className="text-sm text-gray-500 mb-2">
//                     Access to employee and attendance management
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Employees
//                     </span>
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Attendance
//                     </span>
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Reports (Limited)
//                     </span>
//                   </div>
//                 </div>

//                 <div className="border rounded-md p-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <h5 className="font-medium">Accountant</h5>
//                     <button className="text-sm text-primary">Edit</button>
//                   </div>
//                   <p className="text-sm text-gray-500 mb-2">
//                     Access to payroll and financial reports
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Payroll
//                     </span>
//                     <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
//                       Reports (Financial)
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <Button variant="outline">
//                   <FiCheckCircle className="w-4 h-4 mr-2" />
//                   Add New Role
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// // Helper function to get ordinal suffix
// function getOrdinalSuffix(day) {
//   if (day > 3 && day < 21) return "th";
//   switch (day % 10) {
//     case 1:
//       return "st";
//     case 2:
//       return "nd";
//     case 3:
//       return "rd";
//     default:
//       return "th";
//   }
// }

// export default Settings;

//2

import { useState, useEffect } from "react";
import {
  FiSave,
  FiUser,
  FiDollarSign,
  FiFileText,
  FiSettings,
  FiLock,
  FiCheck,
  FiCheckCircle,
  FiInfo,
  FiPlus,
  FiDownload,
  FiUserPlus,
  FiUpload,
  FiEdit2,
  FiX,
  FiAlertTriangle,
  FiMail,
  FiLayers,
  FiClock,
  FiHelpCircle,
  FiSliders,
  FiGrid,
  FiUsers,
  FiCreditCard,
  FiFlag,
} from "react-icons/fi";
import {
  Card,
  Input,
  Button,
  Select,
  Alert,
  Modal,
  Badge,
} from "../components/ui";

function Settings() {
  const [activeTab, setActiveTab] = useState("company");
  const [activeSection, setActiveSection] = useState(null);
  const [alert, setAlert] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  // Company Settings
  const [companySettings, setCompanySettings] = useState({
    companyName: "Your Company Name",
    address: "123 Business Street, City",
    phone: "+91 9876543210",
    email: "contact@yourcompany.com",
    website: "www.yourcompany.com",
    pan: "ABCDE1234F",
    gstin: "22AAAAA0000A1Z5",
    pfNumber: "PFXYZ123456",
    esiNumber: "ESI12345678",
    logo: null,
    fiscalYearStart: "April",
    businessType: "private",
    industry: "technology",
    registrationNumber: "REG123456",
    incorporationDate: "2020-01-15",
  });

  // Payroll Settings
  const [payrollSettings, setPayrollSettings] = useState({
    salaryProcessingDate: "28",
    basicPercentage: "60",
    hraPercentage: "40",
    pfPercentage: "12",
    esiEmployerPercentage: "3.25",
    esiEmployeePercentage: "0.75",
    professionalTax: "200",
    minimumWage: "15000",
    payrollApprovalRequired: "true",
    multiLevelApproval: "false",
    allowAdvanceSalary: "true",
    maxAdvancePercentage: "30",
    overtimeRate: "1.5",
    bonusCalculationMethod: "percentage",
    defaultBonusPercentage: "10",
    leaveEncashmentAllowed: "true",
    salaryRoundOff: "nearest",
    roundOffTo: "1",
    gratuityCalculationRule: "standard",
    standardDeductions: [], // Array of standard deductions
  });

  // Tax Settings
  const [taxSettings, setTaxSettings] = useState({
    taxRegime: "old",
    financialYear: "2023-2024",
    exemptionSection80C: "150000",
    exemptionHRA: "true",
    exemptionLTA: "true",
    exemptionMedical: "true",
    tdsDeductionCycle: "monthly",
    autoGenerateForm16: "true",
    applySurcharge: "true",
    healthEducationCess: "4",
    tdsFilingReminders: "true",
    enableAdvancedTaxCalculator: "true",
    taxSlabs: [], // Array of tax slabs
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    theme: "light",
    dateFormat: "dd/MM/yyyy",
    timeFormat: "24h",
    timezone: "Asia/Kolkata",
    language: "en",
    currency: "INR",
    emailNotifications: "true",
    backupFrequency: "weekly",
    backupStorage: "local",
    autoLogout: "30", // minutes
    sessionTimeout: "60", // minutes
    allowMultipleLogins: "false",
    enableAuditLog: "true",
    dataRetentionPeriod: "12", // months
    enableTwoFactorAuth: "false",
    passwordPolicy: {
      minLength: "8",
      requireLowercase: "true",
      requireUppercase: "true",
      requireNumbers: "true",
      requireSpecialChars: "true",
      expireDays: "90",
    },
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: "true",
    smsNotifications: "false",
    pushNotifications: "false",
    salarySlipGenerated: "true",
    leavesApproved: "true",
    attendanceReminders: "true",
    taxDeductionAlerts: "true",
    complianceDueReminders: "true",
    birthdayReminders: "true",
    workAnniversaryReminders: "true",
    holidayReminders: "true",
    emailTemplate: "standard",
    emailFooter: "Company Confidential",
    notificationDays: {
      salaryProcessing: "2",
      leaveExpiry: "7",
      taxFiling: "7",
      complianceDue: "5",
    },
  });

  // Integration Settings
  const [integrationSettings, setIntegrationSettings] = useState({
    enableBankingIntegration: "false",
    enableHRMSIntegration: "false",
    enableAccountingIntegration: "false",
    bankingProvider: "",
    hrmsProvider: "",
    accountingProvider: "",
    enableAPIAccess: "false",
    apiKeys: [],
    webhookURLs: [],
  });

  // Effect to track changes
  useEffect(() => {
    // Set the active section based on the active tab when tab changes
    if (activeTab === "company") setActiveSection("companyInfo");
    if (activeTab === "payroll") setActiveSection("payrollBasics");
    if (activeTab === "tax") setActiveSection("taxBasics");
    if (activeTab === "system") setActiveSection("systemPreferences");
    if (activeTab === "users") setActiveSection("userManagement");
    if (activeTab === "notifications") setActiveSection("notificationChannels");
    if (activeTab === "integrations") setActiveSection("integrationProviders");
  }, [activeTab]);

  // Mark that changes have been made
  useEffect(() => {
    setHasChanges(true);
  }, [
    companySettings,
    payrollSettings,
    taxSettings,
    systemSettings,
    notificationSettings,
    integrationSettings,
  ]);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanySettings({ ...companySettings, [name]: value });
  };

  const handlePayrollChange = (e) => {
    const { name, value } = e.target;
    setPayrollSettings({ ...payrollSettings, [name]: value });
  };

  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setTaxSettings({ ...taxSettings, [name]: value });
  };

  const handleSystemChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings({ ...systemSettings, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, value } = e.target;
    setNotificationSettings({ ...notificationSettings, [name]: value });
  };

  const handleIntegrationChange = (e) => {
    const { name, value } = e.target;
    setIntegrationSettings({ ...integrationSettings, [name]: value });
  };

  const handlePasswordPolicyChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings({
      ...systemSettings,
      passwordPolicy: {
        ...systemSettings.passwordPolicy,
        [name]: value,
      },
    });
  };

  const handleNotificationDaysChange = (e) => {
    const { name, value } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      notificationDays: {
        ...notificationSettings.notificationDays,
        [name]: value,
      },
    });
  };

  const handleLogoChange = (e) => {
    if (e.target.files.length > 0) {
      setCompanySettings({ ...companySettings, logo: e.target.files[0] });
    }
  };

  const validateSettings = () => {
    // Example validation for company settings
    if (activeTab === "company") {
      if (!companySettings.companyName.trim()) {
        setAlert({ type: "error", message: "Company name is required" });
        return false;
      }
      if (!companySettings.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setAlert({
          type: "error",
          message: "Please enter a valid email address",
        });
        return false;
      }
    }

    // Example validation for payroll settings
    if (activeTab === "payroll") {
      if (
        parseInt(payrollSettings.basicPercentage) <= 0 ||
        parseInt(payrollSettings.basicPercentage) > 100
      ) {
        setAlert({
          type: "error",
          message: "Basic salary percentage must be between 1 and 100",
        });
        return false;
      }
    }

    return true;
  };

  const handleSaveSettings = () => {
    if (!validateSettings()) return;
    setConfirmModal(true);
  };

  const confirmSaveSettings = () => {
    // In a real app, this would send data to an API
    setAlert({ type: "success", message: "Settings saved successfully" });
    setConfirmModal(false);
    setHasChanges(false);

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleBackupSettings = () => {
    // Create a JSON object with all settings
    const settingsData = {
      company: companySettings,
      payroll: payrollSettings,
      tax: taxSettings,
      system: systemSettings,
      notifications: notificationSettings,
      integrations: integrationSettings,
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(settingsData, null, 2);

    // Create blob and download
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payroll_settings_${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setAlert({ type: "success", message: "Settings backed up successfully" });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleRestoreSettings = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const settings = JSON.parse(event.target.result);
        setIsRestoring(true);

        // In a real app, you would validate the imported data structure
        if (settings.company) setCompanySettings(settings.company);
        if (settings.payroll) setPayrollSettings(settings.payroll);
        if (settings.tax) setTaxSettings(settings.tax);
        if (settings.system) setSystemSettings(settings.system);
        if (settings.notifications)
          setNotificationSettings(settings.notifications);
        if (settings.integrations)
          setIntegrationSettings(settings.integrations);

        setAlert({
          type: "success",
          message:
            "Settings restored successfully. Please review and save to apply.",
        });
      } catch (error) {
        setAlert({
          type: "error",
          message: "Failed to restore settings. Invalid file format.",
        });
      } finally {
        e.target.value = null; // Reset file input
        setIsRestoring(false);
      }
    };

    reader.readAsText(file);
  };

  // Helper function for tooltips
  const Tooltip = ({ text }) => (
    <span className="ml-1 relative group">
      <FiHelpCircle className="inline-block text-gray-400 w-4 h-4" />
      <span className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white p-2 rounded text-xs w-48 -mt-2 ml-2">
        {text}
      </span>
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          System Settings
        </h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="file"
              id="restoreFile"
              className="hidden"
              accept=".json"
              onChange={handleRestoreSettings}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("restoreFile").click()}
              disabled={isRestoring}
            >
              <FiUpload className="w-4 h-4 mr-2" />
              Restore
            </Button>
          </div>
          <Button variant="outline" onClick={handleBackupSettings}>
            <FiDownload className="w-4 h-4 mr-2" />
            Backup
          </Button>
          <Button onClick={handleSaveSettings} disabled={!hasChanges}>
            <FiSave className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <div className="space-y-1">
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "company"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("company")}
              >
                <FiUser className="mr-2" /> Company
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "payroll"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("payroll")}
              >
                <FiDollarSign className="mr-2" /> Payroll
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "tax"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("tax")}
              >
                <FiFileText className="mr-2" /> Taxation
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "system"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("system")}
              >
                <FiSettings className="mr-2" /> System
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "notifications"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <FiMail className="mr-2" /> Notifications
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "integrations"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("integrations")}
              >
                <FiLayers className="mr-2" /> Integrations
              </button>
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "users"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <FiLock className="mr-2" /> Users & Permissions
              </button>
            </div>

            {/* Section Navigation */}
            {activeTab === "company" && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                  Company Sections
                </h3>
                <div className="space-y-1">
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "companyInfo"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("companyInfo")}
                  >
                    Company Information
                  </button>
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "statutoryInfo"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("statutoryInfo")}
                  >
                    Statutory Information
                  </button>
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "branding"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("branding")}
                  >
                    Branding
                  </button>
                </div>
              </div>
            )}

            {activeTab === "payroll" && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                  Payroll Sections
                </h3>
                <div className="space-y-1">
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "payrollBasics"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("payrollBasics")}
                  >
                    Basic Configuration
                  </button>
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "salaryStructure"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("salaryStructure")}
                  >
                    Salary Structure
                  </button>
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "payrollApproval"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("payrollApproval")}
                  >
                    Approval Workflow
                  </button>
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "advancedPayroll"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("advancedPayroll")}
                  >
                    Advanced Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                  System Sections
                </h3>
                <div className="space-y-1">
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "systemPreferences"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("systemPreferences")}
                  >
                    General Preferences
                  </button>
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "security"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("security")}
                  >
                    Security
                  </button>
                  <button
                    className={`w-full text-left px-4 py-1.5 text-sm rounded-md ${
                      activeSection === "dataManagement"
                        ? "bg-gray-100 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveSection("dataManagement")}
                  >
                    Data Management
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Company Settings */}
          {activeTab === "company" && (
            <>
              {/* Company Information Section */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-lg font-medium text-gray-800"
                    id="companyInfo"
                  >
                    Company Information
                  </h2>
                  <Badge color="blue">Basic Details</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Company Name"
                    id="companyName"
                    name="companyName"
                    value={companySettings.companyName}
                    onChange={handleCompanyChange}
                    required
                  />

                  <Input
                    label="Registration Number"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={companySettings.registrationNumber}
                    onChange={handleCompanyChange}
                  />

                  <Input
                    label="Address"
                    id="address"
                    name="address"
                    value={companySettings.address}
                    onChange={handleCompanyChange}
                  />

                  <Input
                    label="Incorporation Date"
                    id="incorporationDate"
                    name="incorporationDate"
                    type="date"
                    value={companySettings.incorporationDate}
                    onChange={handleCompanyChange}
                  />

                  <Input
                    label="Phone"
                    id="phone"
                    name="phone"
                    value={companySettings.phone}
                    onChange={handleCompanyChange}
                  />

                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={companySettings.email}
                    onChange={handleCompanyChange}
                  />

                  <Input
                    label="Website"
                    id="website"
                    name="website"
                    value={companySettings.website}
                    onChange={handleCompanyChange}
                  />

                  <Select
                    label="Business Type"
                    id="businessType"
                    name="businessType"
                    value={companySettings.businessType}
                    onChange={handleCompanyChange}
                    options={[
                      { value: "proprietorship", label: "Proprietorship" },
                      { value: "partnership", label: "Partnership" },
                      { value: "llp", label: "Limited Liability Partnership" },
                      { value: "private", label: "Private Limited Company" },
                      { value: "public", label: "Public Limited Company" },
                    ]}
                  />

                  <Select
                    label="Industry"
                    id="industry"
                    name="industry"
                    value={companySettings.industry}
                    onChange={handleCompanyChange}
                    options={[
                      { value: "technology", label: "Information Technology" },
                      { value: "manufacturing", label: "Manufacturing" },
                      { value: "healthcare", label: "Healthcare" },
                      { value: "education", label: "Education" },
                      { value: "retail", label: "Retail" },
                      { value: "finance", label: "Finance" },
                      { value: "other", label: "Other" },
                    ]}
                  />

                  <Select
                    label="Fiscal Year Start"
                    id="fiscalYearStart"
                    name="fiscalYearStart"
                    value={companySettings.fiscalYearStart}
                    onChange={handleCompanyChange}
                    options={[
                      { value: "January", label: "January" },
                      { value: "April", label: "April" },
                      { value: "July", label: "July" },
                      { value: "October", label: "October" },
                    ]}
                  />
                </div>
              </Card>

              {/* Statutory Information */}
              <Card id="statutoryInfo">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Statutory Information
                  </h2>
                  <Badge color="purple">Compliance</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={
                      <span className="flex items-center">
                        PAN Number
                        <Tooltip text="Permanent Account Number issued by the Income Tax Department" />
                      </span>
                    }
                    id="pan"
                    name="pan"
                    value={companySettings.pan}
                    onChange={handleCompanyChange}
                  />

                  <Input
                    label={
                      <span className="flex items-center">
                        GSTIN
                        <Tooltip text="Goods and Services Tax Identification Number" />
                      </span>
                    }
                    id="gstin"
                    name="gstin"
                    value={companySettings.gstin}
                    onChange={handleCompanyChange}
                  />

                  <Input
                    label={
                      <span className="flex items-center">
                        PF Number
                        <Tooltip text="Provident Fund Registration Number" />
                      </span>
                    }
                    id="pfNumber"
                    name="pfNumber"
                    value={companySettings.pfNumber}
                    onChange={handleCompanyChange}
                  />

                  <Input
                    label={
                      <span className="flex items-center">
                        ESI Number
                        <Tooltip text="Employee State Insurance Registration Number" />
                      </span>
                    }
                    id="esiNumber"
                    name="esiNumber"
                    value={companySettings.esiNumber}
                    onChange={handleCompanyChange}
                  />
                </div>
              </Card>

              {/* Company Branding */}
              <Card id="branding">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Company Branding
                  </h2>
                  <Badge color="indigo">Visual Identity</Badge>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <div className="flex items-center">
                      <div className="w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                        {companySettings.logo ? (
                          <img
                            src={URL.createObjectURL(companySettings.logo)}
                            alt="Company Logo"
                            className="max-w-full max-h-full"
                          />
                        ) : (
                          <FiUser className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="cursor-pointer">
                          <Button as="div" variant="outline">
                            <FiUpload className="w-4 h-4 mr-2" />
                            Upload Logo
                          </Button>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleLogoChange}
                            accept="image/*"
                          />
                        </label>
                        <p className="text-xs text-gray-500">
                          Recommended size: 200x200 pixels. Max file size: 1MB.
                          Formats: JPG, PNG, SVG.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-2">
                      Document Branding
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      These settings control how your company brand appears on
                      payslips, reports, and other documents.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md flex items-center space-x-3">
                        <input
                          type="radio"
                          id="minimalBranding"
                          name="documentBranding"
                          className="h-4 w-4 text-primary border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="minimalBranding" className="flex-1">
                          <span className="block font-medium text-sm">
                            Minimal
                          </span>
                          <span className="block text-xs text-gray-500">
                            Logo and company name only
                          </span>
                        </label>
                      </div>
                      <div className="p-4 border rounded-md flex items-center space-x-3">
                        <input
                          type="radio"
                          id="standardBranding"
                          name="documentBranding"
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label htmlFor="standardBranding" className="flex-1">
                          <span className="block font-medium text-sm">
                            Standard
                          </span>
                          <span className="block text-xs text-gray-500">
                            Logo, name, and contact details
                          </span>
                        </label>
                      </div>
                      <div className="p-4 border rounded-md flex items-center space-x-3">
                        <input
                          type="radio"
                          id="fullBranding"
                          name="documentBranding"
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label htmlFor="fullBranding" className="flex-1">
                          <span className="block font-medium text-sm">
                            Full
                          </span>
                          <span className="block text-xs text-gray-500">
                            Complete branded header and footer
                          </span>
                        </label>
                      </div>
                      <div className="p-4 border rounded-md flex items-center space-x-3">
                        <input
                          type="radio"
                          id="customBranding"
                          name="documentBranding"
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label htmlFor="customBranding" className="flex-1">
                          <span className="block font-medium text-sm">
                            Custom
                          </span>
                          <span className="block text-xs text-gray-500">
                            Upload custom templates
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Payroll Settings */}
          {activeTab === "payroll" && (
            <>
              {/* Basic Payroll Configuration */}
              <Card id="payrollBasics">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Basic Payroll Configuration
                  </h2>
                  <Badge color="green">Essential</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Salary Processing Date"
                    id="salaryProcessingDate"
                    name="salaryProcessingDate"
                    value={payrollSettings.salaryProcessingDate}
                    onChange={handlePayrollChange}
                    options={Array.from({ length: 31 }, (_, i) => ({
                      value: (i + 1).toString(),
                      label: `${i + 1}${getOrdinalSuffix(i + 1)} of the month`,
                    }))}
                  />

                  <Select
                    label="Salary Rounding"
                    id="salaryRoundOff"
                    name="salaryRoundOff"
                    value={payrollSettings.salaryRoundOff}
                    onChange={handlePayrollChange}
                    options={[
                      { value: "none", label: "No Rounding" },
                      { value: "nearest", label: "Round to Nearest" },
                      { value: "up", label: "Round Up" },
                      { value: "down", label: "Round Down" },
                    ]}
                  />

                  <Input
                    label={
                      <span className="flex items-center">
                        Basic Salary Percentage (%)
                        <Tooltip text="Percentage of CTC allocated to basic salary" />
                      </span>
                    }
                    id="basicPercentage"
                    name="basicPercentage"
                    type="number"
                    value={payrollSettings.basicPercentage}
                    onChange={handlePayrollChange}
                  />

                  <Input
                    label="Round Off To"
                    id="roundOffTo"
                    name="roundOffTo"
                    type="number"
                    value={payrollSettings.roundOffTo}
                    onChange={handlePayrollChange}
                    disabled={payrollSettings.salaryRoundOff === "none"}
                  />

                  <Input
                    label="HRA Percentage (% of Basic)"
                    id="hraPercentage"
                    name="hraPercentage"
                    type="number"
                    value={payrollSettings.hraPercentage}
                    onChange={handlePayrollChange}
                  />

                  <Input
                    label="Minimum Wage (₹)"
                    id="minimumWage"
                    name="minimumWage"
                    type="number"
                    value={payrollSettings.minimumWage}
                    onChange={handlePayrollChange}
                  />

                  <Input
                    label="Overtime Rate (× of hourly rate)"
                    id="overtimeRate"
                    name="overtimeRate"
                    type="number"
                    step="0.1"
                    value={payrollSettings.overtimeRate}
                    onChange={handlePayrollChange}
                  />

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allow Leave Encashment
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="leaveEncashmentYes"
                          name="leaveEncashmentAllowed"
                          checked={
                            payrollSettings.leaveEncashmentAllowed === "true"
                          }
                          onChange={() =>
                            handlePayrollChange({
                              target: {
                                name: "leaveEncashmentAllowed",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="leaveEncashmentYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="leaveEncashmentNo"
                          name="leaveEncashmentAllowed"
                          checked={
                            payrollSettings.leaveEncashmentAllowed === "false"
                          }
                          onChange={() =>
                            handlePayrollChange({
                              target: {
                                name: "leaveEncashmentAllowed",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="leaveEncashmentNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Salary Structure */}
              <Card id="salaryStructure">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Salary Structure Components
                  </h2>
                  <Badge color="orange">Structure</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="PF Percentage (%)"
                    id="pfPercentage"
                    name="pfPercentage"
                    type="number"
                    value={payrollSettings.pfPercentage}
                    onChange={handlePayrollChange}
                  />

                  <Input
                    label="Professional Tax (₹)"
                    id="professionalTax"
                    name="professionalTax"
                    type="number"
                    value={payrollSettings.professionalTax}
                    onChange={handlePayrollChange}
                  />

                  <Input
                    label="ESI Employer Contribution (%)"
                    id="esiEmployerPercentage"
                    name="esiEmployerPercentage"
                    type="number"
                    step="0.01"
                    value={payrollSettings.esiEmployerPercentage}
                    onChange={handlePayrollChange}
                  />

                  <Input
                    label="ESI Employee Contribution (%)"
                    id="esiEmployeePercentage"
                    name="esiEmployeePercentage"
                    type="number"
                    step="0.01"
                    value={payrollSettings.esiEmployeePercentage}
                    onChange={handlePayrollChange}
                  />

                  <Select
                    label="Bonus Calculation Method"
                    id="bonusCalculationMethod"
                    name="bonusCalculationMethod"
                    value={payrollSettings.bonusCalculationMethod}
                    onChange={handlePayrollChange}
                    options={[
                      { value: "percentage", label: "Percentage of Salary" },
                      { value: "fixed", label: "Fixed Amount" },
                      { value: "performance", label: "Performance Based" },
                    ]}
                  />

                  <Input
                    label="Default Bonus Percentage (%)"
                    id="defaultBonusPercentage"
                    name="defaultBonusPercentage"
                    type="number"
                    value={payrollSettings.defaultBonusPercentage}
                    onChange={handlePayrollChange}
                    disabled={
                      payrollSettings.bonusCalculationMethod !== "percentage"
                    }
                  />

                  <Select
                    label="Gratuity Calculation Rule"
                    id="gratuityCalculationRule"
                    name="gratuityCalculationRule"
                    value={payrollSettings.gratuityCalculationRule}
                    onChange={handlePayrollChange}
                    options={[
                      { value: "standard", label: "Standard (15 days/year)" },
                      { value: "custom", label: "Custom Rule" },
                    ]}
                  />
                </div>

                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">Standard Deductions</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        alert("Add Deduction feature would open a modal here")
                      }
                    >
                      <FiPlus className="w-3 h-3 mr-1" /> Add Deduction
                    </Button>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4 text-center text-sm text-gray-500">
                    No standard deductions configured. Click "Add Deduction" to
                    configure recurring deductions.
                  </div>
                </div>
              </Card>

              {/* Payroll Approval */}
              <Card id="payrollApproval">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Payroll Approval Workflow
                  </h2>
                  <Badge color="red">Control</Badge>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Require Approval for Payroll Processing
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="approvalRequiredYes"
                          name="payrollApprovalRequired"
                          checked={
                            payrollSettings.payrollApprovalRequired === "true"
                          }
                          onChange={() =>
                            handlePayrollChange({
                              target: {
                                name: "payrollApprovalRequired",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="approvalRequiredYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="approvalRequiredNo"
                          name="payrollApprovalRequired"
                          checked={
                            payrollSettings.payrollApprovalRequired === "false"
                          }
                          onChange={() =>
                            handlePayrollChange({
                              target: {
                                name: "payrollApprovalRequired",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="approvalRequiredNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enable Multi-Level Approval
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="multiLevelYes"
                          name="multiLevelApproval"
                          checked={
                            payrollSettings.multiLevelApproval === "true"
                          }
                          onChange={() =>
                            handlePayrollChange({
                              target: {
                                name: "multiLevelApproval",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                          disabled={
                            payrollSettings.payrollApprovalRequired === "false"
                          }
                        />
                        <label
                          htmlFor="multiLevelYes"
                          className={`ml-2 block text-sm ${
                            payrollSettings.payrollApprovalRequired === "false"
                              ? "text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="multiLevelNo"
                          name="multiLevelApproval"
                          checked={
                            payrollSettings.multiLevelApproval === "false"
                          }
                          onChange={() =>
                            handlePayrollChange({
                              target: {
                                name: "multiLevelApproval",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                          disabled={
                            payrollSettings.payrollApprovalRequired === "false"
                          }
                        />
                        <label
                          htmlFor="multiLevelNo"
                          className={`ml-2 block text-sm ${
                            payrollSettings.payrollApprovalRequired === "false"
                              ? "text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {payrollSettings.payrollApprovalRequired === "true" && (
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                        <FiInfo className="mr-2" /> Current Approval Flow
                      </h3>
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                          1
                        </div>
                        <div className="h-0.5 w-12 bg-gray-200"></div>
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                          2
                        </div>
                        <div className="h-0.5 w-12 bg-gray-200"></div>
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                          3
                        </div>
                      </div>
                      <div className="flex mt-1">
                        <div className="w-6 text-xs text-center mr-6">HR</div>
                        <div className="w-6 text-xs text-center mr-6">
                          Finance
                        </div>
                        <div className="w-6 text-xs text-center">CEO</div>
                      </div>
                      <div className="mt-2 text-xs text-blue-600">
                        * Click "Edit Approval Hierarchy" to customize the
                        approval flow
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={
                        payrollSettings.payrollApprovalRequired === "false"
                      }
                    >
                      Edit Approval Hierarchy
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Advanced Payroll Settings */}
              <Card id="advancedPayroll">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Advanced Payroll Settings
                  </h2>
                  <Badge color="teal">Advanced</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allow Advance Salary
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="advanceSalaryYes"
                          name="allowAdvanceSalary"
                          checked={
                            payrollSettings.allowAdvanceSalary === "true"
                          }
                          onChange={() =>
                            handlePayrollChange({
                              target: {
                                name: "allowAdvanceSalary",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="advanceSalaryYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="advanceSalaryNo"
                          name="allowAdvanceSalary"
                          checked={
                            payrollSettings.allowAdvanceSalary === "false"
                          }
                          onChange={() =>
                            handlePayrollChange({
                              target: {
                                name: "allowAdvanceSalary",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="advanceSalaryNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Maximum Advance (% of salary)"
                    id="maxAdvancePercentage"
                    name="maxAdvancePercentage"
                    type="number"
                    value={payrollSettings.maxAdvancePercentage}
                    onChange={handlePayrollChange}
                    disabled={payrollSettings.allowAdvanceSalary === "false"}
                  />

                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium mb-2">
                      Prorated Salary Settings
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          Prorate first month salary for new joiners
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          Prorate last month salary for exiting employees
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          Prorate salary based on attendance
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium mb-2">
                      Arrears & Backdated Payments
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="arrearsImmediate"
                          name="arrearsHandling"
                          className="h-4 w-4 text-primary border-gray-300"
                          defaultChecked
                        />
                        <label
                          htmlFor="arrearsImmediate"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          <span className="font-medium">
                            Process Immediately
                          </span>{" "}
                          - Calculate and pay in the next payroll
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="arrearsSeparate"
                          name="arrearsHandling"
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="arrearsSeparate"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          <span className="font-medium">
                            Process Separately
                          </span>{" "}
                          - Create separate arrears payroll
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="arrearsScheduled"
                          name="arrearsHandling"
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="arrearsScheduled"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          <span className="font-medium">
                            Scheduled Processing
                          </span>{" "}
                          - Process arrears in monthly batches
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <>
              {/* System Preferences */}
              <Card id="systemPreferences">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    General Preferences
                  </h2>
                  <Badge color="blue">Appearance</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Theme"
                    id="theme"
                    name="theme"
                    value={systemSettings.theme}
                    onChange={handleSystemChange}
                    options={[
                      { value: "light", label: "Light" },
                      { value: "dark", label: "Dark" },
                      { value: "system", label: "System Default" },
                    ]}
                  />

                  <Select
                    label="Language"
                    id="language"
                    name="language"
                    value={systemSettings.language}
                    onChange={handleSystemChange}
                    options={[
                      { value: "en", label: "English" },
                      { value: "hi", label: "Hindi" },
                      { value: "ta", label: "Tamil" },
                      { value: "te", label: "Telugu" },
                      { value: "bn", label: "Bengali" },
                      { value: "mr", label: "Marathi" },
                      { value: "gu", label: "Gujarati" },
                    ]}
                  />

                  <Select
                    label="Date Format"
                    id="dateFormat"
                    name="dateFormat"
                    value={systemSettings.dateFormat}
                    onChange={handleSystemChange}
                    options={[
                      { value: "dd/MM/yyyy", label: "DD/MM/YYYY" },
                      { value: "MM/dd/yyyy", label: "MM/DD/YYYY" },
                      { value: "yyyy-MM-dd", label: "YYYY-MM-DD" },
                      { value: "dd-MMM-yyyy", label: "DD-MMM-YYYY" },
                    ]}
                  />

                  <Select
                    label="Time Format"
                    id="timeFormat"
                    name="timeFormat"
                    value={systemSettings.timeFormat}
                    onChange={handleSystemChange}
                    options={[
                      { value: "12h", label: "12-hour (AM/PM)" },
                      { value: "24h", label: "24-hour" },
                    ]}
                  />

                  <Select
                    label="Timezone"
                    id="timezone"
                    name="timezone"
                    value={systemSettings.timezone}
                    onChange={handleSystemChange}
                    options={[
                      {
                        value: "Asia/Kolkata",
                        label: "Indian Standard Time (IST)",
                      },
                      { value: "America/New_York", label: "Eastern Time (ET)" },
                      {
                        value: "Europe/London",
                        label: "Greenwich Mean Time (GMT)",
                      },
                      {
                        value: "Asia/Dubai",
                        label: "Gulf Standard Time (GST)",
                      },
                      {
                        value: "Asia/Singapore",
                        label: "Singapore Time (SGT)",
                      },
                    ]}
                  />

                  <Select
                    label="Currency"
                    id="currency"
                    name="currency"
                    value={systemSettings.currency}
                    onChange={handleSystemChange}
                    options={[
                      { value: "INR", label: "Indian Rupee (₹)" },
                      { value: "USD", label: "US Dollar ($)" },
                      { value: "EUR", label: "Euro (€)" },
                      { value: "GBP", label: "British Pound (£)" },
                      { value: "AED", label: "UAE Dirham (د.إ)" },
                      { value: "SGD", label: "Singapore Dollar (S$)" },
                    ]}
                  />
                </div>

                <div className="mt-6 border-t pt-4">
                  <h3 className="text-sm font-medium mb-3">
                    System UI Customization
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border p-3 rounded-md cursor-pointer hover:border-primary">
                      <div className="h-24 bg-blue-50 rounded-md mb-2 flex items-center justify-center text-sm text-blue-500">
                        <FiGrid className="mr-1" /> Default Layout
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="defaultLayout"
                          name="uiLayout"
                          className="h-4 w-4 text-primary border-gray-300"
                          defaultChecked
                        />
                        <label
                          htmlFor="defaultLayout"
                          className="ml-2 text-sm font-medium"
                        >
                          Standard
                        </label>
                      </div>
                    </div>
                    <div className="border p-3 rounded-md cursor-pointer hover:border-primary">
                      <div className="h-24 bg-purple-50 rounded-md mb-2 flex items-center justify-center text-sm text-purple-500">
                        <FiGrid className="mr-1" /> Compact Layout
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="compactLayout"
                          name="uiLayout"
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="compactLayout"
                          className="ml-2 text-sm font-medium"
                        >
                          Compact
                        </label>
                      </div>
                    </div>
                    <div className="border p-3 rounded-md cursor-pointer hover:border-primary">
                      <div className="h-24 bg-green-50 rounded-md mb-2 flex items-center justify-center text-sm text-green-500">
                        <FiGrid className="mr-1" /> Expanded Layout
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="expandedLayout"
                          name="uiLayout"
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="expandedLayout"
                          className="ml-2 text-sm font-medium"
                        >
                          Comfortable
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Security Settings */}
              <Card id="security">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Security Settings
                  </h2>
                  <Badge color="red">Critical</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Two-Factor Authentication
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="twoFactorYes"
                          name="enableTwoFactorAuth"
                          checked={
                            systemSettings.enableTwoFactorAuth === "true"
                          }
                          onChange={() =>
                            handleSystemChange({
                              target: {
                                name: "enableTwoFactorAuth",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="twoFactorYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Enabled
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="twoFactorNo"
                          name="enableTwoFactorAuth"
                          checked={
                            systemSettings.enableTwoFactorAuth === "false"
                          }
                          onChange={() =>
                            handleSystemChange({
                              target: {
                                name: "enableTwoFactorAuth",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="twoFactorNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Disabled
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allow Multiple Logins
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="multipleLoginsYes"
                          name="allowMultipleLogins"
                          checked={
                            systemSettings.allowMultipleLogins === "true"
                          }
                          onChange={() =>
                            handleSystemChange({
                              target: {
                                name: "allowMultipleLogins",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="multipleLoginsYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="multipleLoginsNo"
                          name="allowMultipleLogins"
                          checked={
                            systemSettings.allowMultipleLogins === "false"
                          }
                          onChange={() =>
                            handleSystemChange({
                              target: {
                                name: "allowMultipleLogins",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="multipleLoginsNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Auto Logout After Inactivity (minutes)"
                    id="autoLogout"
                    name="autoLogout"
                    type="number"
                    value={systemSettings.autoLogout}
                    onChange={handleSystemChange}
                  />

                  <Input
                    label="Session Timeout (minutes)"
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={handleSystemChange}
                  />

                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium mb-3">
                      Password Policy
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Minimum Password Length"
                        id="minLength"
                        name="minLength"
                        type="number"
                        value={systemSettings.passwordPolicy.minLength}
                        onChange={handlePasswordPolicyChange}
                      />

                      <Input
                        label="Password Expiry (days)"
                        id="expireDays"
                        name="expireDays"
                        type="number"
                        value={systemSettings.passwordPolicy.expireDays}
                        onChange={handlePasswordPolicyChange}
                      />

                      <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="requireLowercase"
                              name="requireLowercase"
                              checked={
                                systemSettings.passwordPolicy
                                  .requireLowercase === "true"
                              }
                              onChange={(e) =>
                                handlePasswordPolicyChange({
                                  target: {
                                    name: "requireLowercase",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="h-4 w-4 text-primary border-gray-300 rounded"
                            />
                            <label
                              htmlFor="requireLowercase"
                              className="ml-2 block text-sm text-gray-700"
                            >
                              Require lowercase letters
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="requireUppercase"
                              name="requireUppercase"
                              checked={
                                systemSettings.passwordPolicy
                                  .requireUppercase === "true"
                              }
                              onChange={(e) =>
                                handlePasswordPolicyChange({
                                  target: {
                                    name: "requireUppercase",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="h-4 w-4 text-primary border-gray-300 rounded"
                            />
                            <label
                              htmlFor="requireUppercase"
                              className="ml-2 block text-sm text-gray-700"
                            >
                              Require uppercase letters
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="requireNumbers"
                              name="requireNumbers"
                              checked={
                                systemSettings.passwordPolicy.requireNumbers ===
                                "true"
                              }
                              onChange={(e) =>
                                handlePasswordPolicyChange({
                                  target: {
                                    name: "requireNumbers",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="h-4 w-4 text-primary border-gray-300 rounded"
                            />
                            <label
                              htmlFor="requireNumbers"
                              className="ml-2 block text-sm text-gray-700"
                            >
                              Require numbers
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="requireSpecialChars"
                              name="requireSpecialChars"
                              checked={
                                systemSettings.passwordPolicy
                                  .requireSpecialChars === "true"
                              }
                              onChange={(e) =>
                                handlePasswordPolicyChange({
                                  target: {
                                    name: "requireSpecialChars",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="h-4 w-4 text-primary border-gray-300 rounded"
                            />
                            <label
                              htmlFor="requireSpecialChars"
                              className="ml-2 block text-sm text-gray-700"
                            >
                              Require special characters
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h3 className="text-sm font-medium mb-3">IP Restrictions</h3>
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ipRestrictionsNone"
                        name="ipRestrictions"
                        className="h-4 w-4 text-primary border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="ipRestrictionsNone"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        No restrictions
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ipRestrictionsWhitelist"
                        name="ipRestrictions"
                        className="h-4 w-4 text-primary border-gray-300"
                      />
                      <label
                        htmlFor="ipRestrictionsWhitelist"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Whitelist specific IPs
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ipRestrictionsRange"
                        name="ipRestrictions"
                        className="h-4 w-4 text-primary border-gray-300"
                      />
                      <label
                        htmlFor="ipRestrictionsRange"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Allow IP ranges
                      </label>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <FiSettings className="w-4 h-4 mr-2" />
                    Configure IP Restrictions
                  </Button>
                </div>
              </Card>

              {/* Data Management */}
              <Card id="dataManagement">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Data Management
                  </h2>
                  <Badge color="purple">Storage</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Backup Frequency"
                    id="backupFrequency"
                    name="backupFrequency"
                    value={systemSettings.backupFrequency}
                    onChange={handleSystemChange}
                    options={[
                      { value: "daily", label: "Daily" },
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                      { value: "manual", label: "Manual Only" },
                    ]}
                  />

                  <Select
                    label="Backup Storage Location"
                    id="backupStorage"
                    name="backupStorage"
                    value={systemSettings.backupStorage}
                    onChange={handleSystemChange}
                    options={[
                      { value: "local", label: "Local Storage" },
                      { value: "cloud", label: "Cloud Storage" },
                      { value: "both", label: "Both Local and Cloud" },
                    ]}
                  />

                  <Input
                    label="Data Retention Period (months)"
                    id="dataRetentionPeriod"
                    name="dataRetentionPeriod"
                    type="number"
                    value={systemSettings.dataRetentionPeriod}
                    onChange={handleSystemChange}
                  />

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enable Audit Logging
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="auditLogYes"
                          name="enableAuditLog"
                          checked={systemSettings.enableAuditLog === "true"}
                          onChange={() =>
                            handleSystemChange({
                              target: { name: "enableAuditLog", value: "true" },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="auditLogYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Enabled
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="auditLogNo"
                          name="enableAuditLog"
                          checked={systemSettings.enableAuditLog === "false"}
                          onChange={() =>
                            handleSystemChange({
                              target: {
                                name: "enableAuditLog",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="auditLogNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Disabled
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                      <FiAlertTriangle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-yellow-800">
                          Data Management Notice
                        </h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          Please ensure your data retention policies comply with
                          local regulations such as GDPR, CCPA, or other
                          applicable laws. Consult with legal counsel before
                          making significant changes to data management
                          settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">
                      Manual Backup & Restore
                    </h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBackupSettings}
                      >
                        <FiDownload className="mr-2 h-4 w-4" />
                        Backup Now
                      </Button>
                      <div className="relative">
                        <input
                          type="file"
                          id="restoreSystemFile"
                          className="hidden"
                          accept=".json"
                          onChange={handleRestoreSettings}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document.getElementById("restoreSystemFile").click()
                          }
                        >
                          <FiUpload className="mr-2 h-4 w-4" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Backup History</h4>
                    {/* Mock backup history table */}
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left font-medium text-gray-500 py-2">
                            Date & Time
                          </th>
                          <th className="text-left font-medium text-gray-500 py-2">
                            Type
                          </th>
                          <th className="text-left font-medium text-gray-500 py-2">
                            Size
                          </th>
                          <th className="text-left font-medium text-gray-500 py-2">
                            Status
                          </th>
                          <th className="text-left font-medium text-gray-500 py-2">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2">2023-09-15 08:00:00</td>
                          <td className="py-2">Automated</td>
                          <td className="py-2">4.2 MB</td>
                          <td className="py-2">
                            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                              Success
                            </span>
                          </td>
                          <td className="py-2">
                            <button className="text-primary hover:text-primary-dark text-sm mr-2">
                              Download
                            </button>
                            <button className="text-red-500 hover:text-red-700 text-sm">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2">2023-09-14 08:00:00</td>
                          <td className="py-2">Automated</td>
                          <td className="py-2">4.1 MB</td>
                          <td className="py-2">
                            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                              Success
                            </span>
                          </td>
                          <td className="py-2">
                            <button className="text-primary hover:text-primary-dark text-sm mr-2">
                              Download
                            </button>
                            <button className="text-red-500 hover:text-red-700 text-sm">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2">2023-09-13 13:45:22</td>
                          <td className="py-2">Manual</td>
                          <td className="py-2">4.1 MB</td>
                          <td className="py-2">
                            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                              Success
                            </span>
                          </td>
                          <td className="py-2">
                            <button className="text-primary hover:text-primary-dark text-sm mr-2">
                              Download
                            </button>
                            <button className="text-red-500 hover:text-red-700 text-sm">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <>
              {/* Notification Channels */}
              <Card id="notificationChannels">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Notification Channels
                  </h2>
                  <Badge color="yellow">Communication</Badge>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Notifications
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="emailNotifYes"
                          name="emailNotifications"
                          checked={
                            notificationSettings.emailNotifications === "true"
                          }
                          onChange={() =>
                            handleNotificationChange({
                              target: {
                                name: "emailNotifications",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="emailNotifYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Enabled
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="emailNotifNo"
                          name="emailNotifications"
                          checked={
                            notificationSettings.emailNotifications === "false"
                          }
                          onChange={() =>
                            handleNotificationChange({
                              target: {
                                name: "emailNotifications",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="emailNotifNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Disabled
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS Notifications
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="smsNotifYes"
                          name="smsNotifications"
                          checked={
                            notificationSettings.smsNotifications === "true"
                          }
                          onChange={() =>
                            handleNotificationChange({
                              target: {
                                name: "smsNotifications",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="smsNotifYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Enabled
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="smsNotifNo"
                          name="smsNotifications"
                          checked={
                            notificationSettings.smsNotifications === "false"
                          }
                          onChange={() =>
                            handleNotificationChange({
                              target: {
                                name: "smsNotifications",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="smsNotifNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Disabled
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Push Notifications
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="pushNotifYes"
                          name="pushNotifications"
                          checked={
                            notificationSettings.pushNotifications === "true"
                          }
                          onChange={() =>
                            handleNotificationChange({
                              target: {
                                name: "pushNotifications",
                                value: "true",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="pushNotifYes"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Enabled
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="pushNotifNo"
                          name="pushNotifications"
                          checked={
                            notificationSettings.pushNotifications === "false"
                          }
                          onChange={() =>
                            handleNotificationChange({
                              target: {
                                name: "pushNotifications",
                                value: "false",
                              },
                            })
                          }
                          className="h-4 w-4 text-primary border-gray-300"
                        />
                        <label
                          htmlFor="pushNotifNo"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Disabled
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">
                      SMTP Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="SMTP Server"
                        id="smtpServer"
                        name="smtpServer"
                        placeholder="smtp.example.com"
                        disabled={
                          notificationSettings.emailNotifications === "false"
                        }
                      />
                      <Input
                        label="SMTP Port"
                        id="smtpPort"
                        name="smtpPort"
                        placeholder="587"
                        disabled={
                          notificationSettings.emailNotifications === "false"
                        }
                      />
                      <Input
                        label="SMTP Username"
                        id="smtpUsername"
                        name="smtpUsername"
                        placeholder="username@example.com"
                        disabled={
                          notificationSettings.emailNotifications === "false"
                        }
                      />
                      <Input
                        label="SMTP Password"
                        id="smtpPassword"
                        name="smtpPassword"
                        type="password"
                        placeholder="••••••••"
                        disabled={
                          notificationSettings.emailNotifications === "false"
                        }
                      />
                      <div className="md:col-span-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={
                            notificationSettings.emailNotifications === "false"
                          }
                        >
                          Test SMTP Connection
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">
                      SMS Gateway Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="SMS Gateway Provider"
                        id="smsProvider"
                        name="smsProvider"
                        disabled={
                          notificationSettings.smsNotifications === "false"
                        }
                        options={[
                          { value: "", label: "Select Provider" },
                          { value: "twilio", label: "Twilio" },
                          { value: "aws_sns", label: "AWS SNS" },
                          { value: "msg91", label: "MSG91" },
                          { value: "custom", label: "Custom" },
                        ]}
                      />
                      <Input
                        label="API Key / Auth Token"
                        id="smsApiKey"
                        name="smsApiKey"
                        type="password"
                        placeholder="••••••••"
                        disabled={
                          notificationSettings.smsNotifications === "false"
                        }
                      />
                      <div className="md:col-span-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={
                            notificationSettings.smsNotifications === "false"
                          }
                        >
                          Test SMS Configuration
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notification Events */}
              <Card id="notificationEvents">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Notification Events
                  </h2>
                  <Badge color="green">Alerts</Badge>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border rounded-md p-4">
                      <h3 className="text-sm font-medium mb-3">
                        Payroll Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="salarySlipGenerated"
                            className="text-sm"
                          >
                            Salary Slip Generated
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="salarySlipGenerated"
                              checked={
                                notificationSettings.salarySlipGenerated ===
                                "true"
                              }
                              onChange={(e) =>
                                handleNotificationChange({
                                  target: {
                                    name: "salarySlipGenerated",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="taxDeductionAlerts"
                            className="text-sm"
                          >
                            Tax Deduction Alerts
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="taxDeductionAlerts"
                              checked={
                                notificationSettings.taxDeductionAlerts ===
                                "true"
                              }
                              onChange={(e) =>
                                handleNotificationChange({
                                  target: {
                                    name: "taxDeductionAlerts",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="complianceDueReminders"
                            className="text-sm"
                          >
                            Compliance Due Reminders
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="complianceDueReminders"
                              checked={
                                notificationSettings.complianceDueReminders ===
                                "true"
                              }
                              onChange={(e) =>
                                handleNotificationChange({
                                  target: {
                                    name: "complianceDueReminders",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border rounded-md p-4">
                      <h3 className="text-sm font-medium mb-3">
                        Leave & Attendance
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label htmlFor="leavesApproved" className="text-sm">
                            Leaves Approved/Rejected
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="leavesApproved"
                              checked={
                                notificationSettings.leavesApproved === "true"
                              }
                              onChange={(e) =>
                                handleNotificationChange({
                                  target: {
                                    name: "leavesApproved",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="attendanceReminders"
                            className="text-sm"
                          >
                            Attendance Reminders
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="attendanceReminders"
                              checked={
                                notificationSettings.attendanceReminders ===
                                "true"
                              }
                              onChange={(e) =>
                                handleNotificationChange({
                                  target: {
                                    name: "attendanceReminders",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <label htmlFor="holidayReminders" className="text-sm">
                            Holiday Reminders
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="holidayReminders"
                              checked={
                                notificationSettings.holidayReminders === "true"
                              }
                              onChange={(e) =>
                                handleNotificationChange({
                                  target: {
                                    name: "holidayReminders",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border rounded-md p-4">
                      <h3 className="text-sm font-medium mb-3">
                        Employee Events
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="birthdayReminders"
                            className="text-sm"
                          >
                            Birthday Reminders
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="birthdayReminders"
                              checked={
                                notificationSettings.birthdayReminders ===
                                "true"
                              }
                              onChange={(e) =>
                                handleNotificationChange({
                                  target: {
                                    name: "birthdayReminders",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="workAnniversaryReminders"
                            className="text-sm"
                          >
                            Work Anniversary Reminders
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="workAnniversaryReminders"
                              checked={
                                notificationSettings.workAnniversaryReminders ===
                                "true"
                              }
                              onChange={(e) =>
                                handleNotificationChange({
                                  target: {
                                    name: "workAnniversaryReminders",
                                    value: e.target.checked ? "true" : "false",
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">
                      Advanced Notification Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Days Before Salary Processing"
                        id="salaryProcessing"
                        name="salaryProcessing"
                        type="number"
                        value={
                          notificationSettings.notificationDays.salaryProcessing
                        }
                        onChange={(e) => handleNotificationDaysChange(e)}
                      />
                      <Input
                        label="Days Before Leave Expiry"
                        id="leaveExpiry"
                        name="leaveExpiry"
                        type="number"
                        value={
                          notificationSettings.notificationDays.leaveExpiry
                        }
                        onChange={(e) => handleNotificationDaysChange(e)}
                      />
                      <Input
                        label="Days Before Tax Filing"
                        id="taxFiling"
                        name="taxFiling"
                        type="number"
                        value={notificationSettings.notificationDays.taxFiling}
                        onChange={(e) => handleNotificationDaysChange(e)}
                      />
                      <Input
                        label="Days Before Compliance Due"
                        id="complianceDue"
                        name="complianceDue"
                        type="number"
                        value={
                          notificationSettings.notificationDays.complianceDue
                        }
                        onChange={(e) => handleNotificationDaysChange(e)}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">
                      Email Template Settings
                    </h3>
                    <div className="space-y-4">
                      <Select
                        label="Email Template Style"
                        id="emailTemplate"
                        name="emailTemplate"
                        value={notificationSettings.emailTemplate}
                        onChange={handleNotificationChange}
                        options={[
                          { value: "standard", label: "Standard Template" },
                          { value: "minimal", label: "Minimal Template" },
                          { value: "branded", label: "Branded Template" },
                          { value: "custom", label: "Custom Template" },
                        ]}
                      />
                      <Input
                        label="Email Footer Text"
                        id="emailFooter"
                        name="emailFooter"
                        value={notificationSettings.emailFooter}
                        onChange={handleNotificationChange}
                      />
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Preview Email Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Integration Settings */}
          {activeTab === "integrations" && (
            <>
              {/* Integration Providers */}
              <Card id="integrationProviders">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Integration Providers
                  </h2>
                  <Badge color="indigo">Connectivity</Badge>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <FiCreditCard className="text-blue-500 w-5 h-5 mr-2" />
                          <h3 className="text-sm font-medium">
                            Banking Integration
                          </h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              integrationSettings.enableBankingIntegration ===
                              "true"
                            }
                            onChange={(e) =>
                              handleIntegrationChange({
                                target: {
                                  name: "enableBankingIntegration",
                                  value: e.target.checked ? "true" : "false",
                                },
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Connect with banking services for direct salary deposits
                        and reconciliation.
                      </p>
                      <Select
                        id="bankingProvider"
                        name="bankingProvider"
                        value={integrationSettings.bankingProvider}
                        onChange={handleIntegrationChange}
                        disabled={
                          integrationSettings.enableBankingIntegration ===
                          "false"
                        }
                        options={[
                          { value: "", label: "Select Provider" },
                          { value: "hdfc", label: "HDFC Bank" },
                          { value: "icici", label: "ICICI Bank" },
                          { value: "sbi", label: "State Bank of India" },
                          { value: "axis", label: "Axis Bank" },
                          { value: "other", label: "Other Bank" },
                        ]}
                      />
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled={
                            integrationSettings.enableBankingIntegration ===
                            "false"
                          }
                        >
                          Configure Banking
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <FiUsers className="text-green-500 w-5 h-5 mr-2" />
                          <h3 className="text-sm font-medium">
                            HRMS Integration
                          </h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              integrationSettings.enableHRMSIntegration ===
                              "true"
                            }
                            onChange={(e) =>
                              handleIntegrationChange({
                                target: {
                                  name: "enableHRMSIntegration",
                                  value: e.target.checked ? "true" : "false",
                                },
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Connect with HR management systems to sync employee data
                        and attendance.
                      </p>
                      <Select
                        id="hrmsProvider"
                        name="hrmsProvider"
                        value={integrationSettings.hrmsProvider}
                        onChange={handleIntegrationChange}
                        disabled={
                          integrationSettings.enableHRMSIntegration === "false"
                        }
                        options={[
                          { value: "", label: "Select Provider" },
                          { value: "zoho", label: "Zoho People" },
                          { value: "bamboo", label: "BambooHR" },
                          { value: "workday", label: "Workday" },
                          { value: "darwinbox", label: "DarwinBox" },
                          { value: "other", label: "Other HRMS" },
                        ]}
                      />
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled={
                            integrationSettings.enableHRMSIntegration ===
                            "false"
                          }
                        >
                          Configure HRMS
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <FiDollarSign className="text-purple-500 w-5 h-5 mr-2" />
                          <h3 className="text-sm font-medium">
                            Accounting Integration
                          </h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              integrationSettings.enableAccountingIntegration ===
                              "true"
                            }
                            onChange={(e) =>
                              handleIntegrationChange({
                                target: {
                                  name: "enableAccountingIntegration",
                                  value: e.target.checked ? "true" : "false",
                                },
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Connect with accounting software to sync payroll entries
                        and expenses.
                      </p>
                      <Select
                        id="accountingProvider"
                        name="accountingProvider"
                        value={integrationSettings.accountingProvider}
                        onChange={handleIntegrationChange}
                        disabled={
                          integrationSettings.enableAccountingIntegration ===
                          "false"
                        }
                        options={[
                          { value: "", label: "Select Provider" },
                          { value: "tally", label: "Tally" },
                          { value: "quickbooks", label: "QuickBooks" },
                          { value: "xero", label: "Xero" },
                          { value: "zohobooks", label: "Zoho Books" },
                          { value: "other", label: "Other" },
                        ]}
                      />
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled={
                            integrationSettings.enableAccountingIntegration ===
                            "false"
                          }
                        >
                          Configure Accounting
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">
                      Biometric & Attendance Devices
                    </h3>
                    <div className="bg-white border rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <FiClock className="text-orange-500 w-5 h-5 mr-2" />
                          <h3 className="text-sm font-medium">
                            Biometric Integration
                          </h3>
                        </div>
                        <Button variant="outline" size="sm">
                          Add Device
                        </Button>
                      </div>

                      <div className="bg-gray-50 rounded-md p-4 text-center text-sm text-gray-500">
                        No biometric devices have been configured yet.
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">API Access</h3>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Enable API Access</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              integrationSettings.enableAPIAccess === "true"
                            }
                            onChange={(e) =>
                              handleIntegrationChange({
                                target: {
                                  name: "enableAPIAccess",
                                  value: e.target.checked ? "true" : "false",
                                },
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>

                    {integrationSettings.enableAPIAccess === "true" ? (
                      <div className="space-y-4">
                        <div className="bg-gray-50 border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-sm font-medium">API Key</h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Created on: 2023-09-01
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                Regenerate
                              </Button>
                              <Button variant="danger" size="sm">
                                Revoke
                              </Button>
                            </div>
                          </div>
                          <div className="mt-3 bg-gray-100 p-2 rounded-md flex items-center justify-between">
                            <code className="text-xs">
                              ••••••••••••••••••••••••••••••••••••••••
                            </code>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2 p-1"
                            >
                              <FiCopy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                          <div className="flex">
                            <FiInfo className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                            <div>
                              <h3 className="text-sm font-medium text-blue-800">
                                API Documentation
                              </h3>
                              <p className="text-sm text-blue-700 mt-1">
                                Visit our API documentation to learn how to
                                integrate with our payroll system.
                                <a
                                  href="#"
                                  className="text-blue-600 hover:underline font-medium block mt-1"
                                >
                                  View API Documentation →
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-md p-4 text-center text-sm text-gray-500">
                        Enable API access to integrate with third-party
                        applications.
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Import/Export Settings */}
              <Card id="importExport">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Data Import & Export
                  </h2>
                  <Badge color="pink">Data Transfer</Badge>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-md p-4">
                      <h3 className="text-sm font-medium mb-2">Import Data</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Import employee data, attendance records, or salary
                        structures from CSV or Excel files.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 border rounded-md">
                          <input
                            type="radio"
                            id="importEmployees"
                            name="importType"
                            className="h-4 w-4 text-primary border-gray-300"
                            defaultChecked
                          />
                          <label
                            htmlFor="importEmployees"
                            className="ml-2 block text-sm"
                          >
                            Employee Data
                          </label>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <input
                            type="radio"
                            id="importAttendance"
                            name="importType"
                            className="h-4 w-4 text-primary border-gray-300"
                          />
                          <label
                            htmlFor="importAttendance"
                            className="ml-2 block text-sm"
                          >
                            Attendance Records
                          </label>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <input
                            type="radio"
                            id="importSalary"
                            name="importType"
                            className="h-4 w-4 text-primary border-gray-300"
                          />
                          <label
                            htmlFor="importSalary"
                            className="ml-2 block text-sm"
                          >
                            Salary Structures
                          </label>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          <FiUpload className="mr-2 h-4 w-4" />
                          Import Data
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="text-sm font-medium mb-2">Export Data</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Export payroll data, reports, and other information to
                        various formats.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 border rounded-md">
                          <input
                            type="radio"
                            id="exportPayroll"
                            name="exportType"
                            className="h-4 w-4 text-primary border-gray-300"
                            defaultChecked
                          />
                          <label
                            htmlFor="exportPayroll"
                            className="ml-2 block text-sm"
                          >
                            Payroll Data
                          </label>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <input
                            type="radio"
                            id="exportEmployee"
                            name="exportType"
                            className="h-4 w-4 text-primary border-gray-300"
                          />
                          <label
                            htmlFor="exportEmployee"
                            className="ml-2 block text-sm"
                          >
                            Employee Directory
                          </label>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <input
                            type="radio"
                            id="exportTax"
                            name="exportType"
                            className="h-4 w-4 text-primary border-gray-300"
                          />
                          <label
                            htmlFor="exportTax"
                            className="ml-2 block text-sm"
                          >
                            Tax Reports
                          </label>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          <FiDownload className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">
                      Data Format Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Default Import Format"
                        id="importFormat"
                        name="importFormat"
                        options={[
                          { value: "csv", label: "CSV" },
                          { value: "xlsx", label: "Excel (XLSX)" },
                          { value: "xls", label: "Excel 97-2003 (XLS)" },
                          { value: "json", label: "JSON" },
                        ]}
                        defaultValue="csv"
                      />
                      <Select
                        label="Default Export Format"
                        id="exportFormat"
                        name="exportFormat"
                        options={[
                          { value: "csv", label: "CSV" },
                          { value: "xlsx", label: "Excel (XLSX)" },
                          { value: "pdf", label: "PDF" },
                          { value: "json", label: "JSON" },
                        ]}
                        defaultValue="xlsx"
                      />
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">
                      Scheduled Exports
                    </h3>
                    <div className="bg-gray-50 rounded-md p-4 text-center text-sm text-gray-500">
                      No scheduled exports configured. Set up recurring exports
                      for regular reports.
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm">
                        <FiClock className="mr-2 h-4 w-4" />
                        Schedule Export
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Users & Permissions */}
          {activeTab === "users" && (
            <>
              <Card id="userManagement">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Users & Permissions
                  </h2>
                  <Button variant="outline">
                    <FiUserPlus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-white font-medium">
                                  AD
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Admin User
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          admin@example.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                            Administrator
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2023-09-15 10:30 AM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary hover:text-primary-dark mr-3">
                            Edit
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            Reset Password
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center">
                                <span className="text-white font-medium">
                                  HR
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                HR Manager
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          hr@example.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            HR Manager
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2023-09-15 09:15 AM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary hover:text-primary-dark mr-3">
                            Edit
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            Reset Password
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white font-medium">
                                  AC
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Accountant
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          accountant@example.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Accountant
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Invited
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Never
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary hover:text-primary-dark mr-3">
                            Edit
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            Resend Invite
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
                                <span className="text-white font-medium">
                                  JD
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                John Doe
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          john.doe@example.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            Employee
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2023-09-14 05:20 PM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary hover:text-primary-dark mr-3">
                            Edit
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            Reset Password
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card id="roleManagement">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Role Management
                  </h2>
                  <Button variant="outline">
                    <FiPlus className="w-4 h-4 mr-2" />
                    Add New Role
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">Administrator</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Full access to all modules and settings
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="mr-2">
                          <FiEdit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Badge color="blue">System</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Employees
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Payroll
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Attendance
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Reports
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Settings
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Compliance
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        User Management
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +5 more
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">HR Manager</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Access to employee and attendance management
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="mr-2">
                          <FiEdit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Badge color="blue">System</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Employees
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Attendance
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Reports (Limited)
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">Accountant</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Access to payroll and financial reports
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="mr-2">
                          <FiEdit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Badge color="blue">System</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Payroll
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Reports (Financial)
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">Employee</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Self-service access for employees
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="mr-2">
                          <FiEdit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Badge color="blue">System</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Profile
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Payslips
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Leave Management
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Tax Declarations
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-md p-4 border-dashed flex items-center justify-center">
                    <Button variant="outline">
                      <FiPlus className="w-4 h-4 mr-2" />
                      Create Custom Role
                    </Button>
                  </div>
                </div>
              </Card>

              <Card id="userDirectory">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Login & Security Audit
                  </h2>
                  <Select
                    className="w-48"
                    options={[
                      { value: "all", label: "All Events" },
                      { value: "login", label: "Login Events" },
                      { value: "changes", label: "Setting Changes" },
                      { value: "security", label: "Security Events" },
                    ]}
                    defaultValue="all"
                  />
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium">
                          Failed Login Attempt
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          User: admin@example.com | IP: 192.168.1.25
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        2023-09-15 08:45 AM
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium">
                          Successfully Logged In
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          User: admin@example.com | IP: 192.168.1.25
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        2023-09-15 08:46 AM
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium">
                          Settings Changed
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          User: admin@example.com | Changed: Company Information
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        2023-09-15 09:12 AM
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium">
                          Successfully Logged In
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          User: hr@example.com | IP: 192.168.1.30
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        2023-09-15 09:15 AM
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Password Reset</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          User: john.doe@example.com | Initiated by: Admin
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        2023-09-15 10:22 AM
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="text-primary hover:text-primary-dark text-sm">
                    View All Audit Logs
                  </button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="Save Settings"
      >
        <div className="p-4">
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <FiInfo className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Settings Changes
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Are you sure you want to save these settings? This will update
                your system configuration.
              </p>
            </div>
          </div>
          <div className="flex space-x-3 justify-end mt-5">
            <Button variant="outline" onClick={() => setConfirmModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSaveSettings}>
              <FiCheck className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Helper function to get ordinal suffix
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default Settings;
