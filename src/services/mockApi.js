// // Mock data
// const employees = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "9876543210",
//     department: "Engineering",
//     designation: "Senior Developer",
//     joiningDate: "2020-01-15",
//     salary: 85000,
//     bankAccount: "HDFC1234567",
//     panCard: "ABCDE1234F",
//     pfNumber: "PF123456789",
//     esiNumber: "ESI12345678",
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     phone: "9876543211",
//     department: "HR",
//     designation: "HR Manager",
//     joiningDate: "2019-05-10",
//     salary: 75000,
//     bankAccount: "ICICI7654321",
//     panCard: "FGHIJ5678K",
//     pfNumber: "PF987654321",
//     esiNumber: "ESI87654321",
//     status: "active",
//   },
//   {
//     id: 3,
//     name: "Robert Johnson",
//     email: "robert.johnson@example.com",
//     phone: "9876543212",
//     department: "Finance",
//     designation: "Accountant",
//     joiningDate: "2021-03-22",
//     salary: 65000,
//     bankAccount: "SBI9876543",
//     panCard: "KLMNO9012P",
//     pfNumber: "PF456789123",
//     esiNumber: "ESI45678912",
//     status: "active",
//   },
//   {
//     id: 4,
//     name: "Lisa Anderson",
//     email: "lisa.anderson@example.com",
//     phone: "9876543213",
//     department: "Marketing",
//     designation: "Marketing Specialist",
//     joiningDate: "2022-01-05",
//     salary: 60000,
//     bankAccount: "AXIS6543210",
//     panCard: "PQRST3456U",
//     pfNumber: "PF789123456",
//     esiNumber: "ESI78912345",
//     status: "active",
//   },
//   {
//     id: 5,
//     name: "Michael Brown",
//     email: "michael.brown@example.com",
//     phone: "9876543214",
//     department: "Engineering",
//     designation: "Junior Developer",
//     joiningDate: "2022-06-15",
//     salary: 45000,
//     bankAccount: "KOTAK5432109",
//     panCard: "UVWXY7890Z",
//     pfNumber: "PF321654987",
//     esiNumber: "ESI32165498",
//     status: "active",
//   },
// ];

// const attendance = [
//   {
//     id: 1,
//     employeeId: 1,
//     date: "2023-09-01",
//     status: "present",
//     checkIn: "09:00:00",
//     checkOut: "18:00:00",
//   },
//   {
//     id: 2,
//     employeeId: 1,
//     date: "2023-09-02",
//     status: "present",
//     checkIn: "09:15:00",
//     checkOut: "18:30:00",
//   },
//   {
//     id: 3,
//     employeeId: 1,
//     date: "2023-09-03",
//     status: "leave",
//     leaveType: "casual",
//     reason: "Personal work",
//   },
//   {
//     id: 4,
//     employeeId: 2,
//     date: "2023-09-01",
//     status: "present",
//     checkIn: "08:45:00",
//     checkOut: "17:45:00",
//   },
//   {
//     id: 5,
//     employeeId: 2,
//     date: "2023-09-02",
//     status: "present",
//     checkIn: "08:50:00",
//     checkOut: "17:55:00",
//   },
// ];

// const leaves = [
//   {
//     id: 1,
//     employeeId: 1,
//     startDate: "2023-09-03",
//     endDate: "2023-09-03",
//     type: "casual",
//     reason: "Personal work",
//     status: "approved",
//   },
//   {
//     id: 2,
//     employeeId: 2,
//     startDate: "2023-09-10",
//     endDate: "2023-09-15",
//     type: "sick",
//     reason: "Medical treatment",
//     status: "pending",
//   },
//   {
//     id: 3,
//     employeeId: 3,
//     startDate: "2023-09-20",
//     endDate: "2023-09-22",
//     type: "earned",
//     reason: "Family vacation",
//     status: "approved",
//   },
// ];

// const salaries = [
//   {
//     id: 1,
//     employeeId: 1,
//     month: "2023-08",
//     basicSalary: 50000,
//     hra: 20000,
//     conveyanceAllowance: 5000,
//     medicalAllowance: 5000,
//     specialAllowance: 5000,
//     grossSalary: 85000,
//     pfDeduction: 6000,
//     esiDeduction: 1275,
//     professionalTax: 200,
//     tds: 8500,
//     netSalary: 69025,
//     status: "paid",
//   },
//   {
//     id: 2,
//     employeeId: 2,
//     month: "2023-08",
//     basicSalary: 45000,
//     hra: 18000,
//     conveyanceAllowance: 4000,
//     medicalAllowance: 4000,
//     specialAllowance: 4000,
//     grossSalary: 75000,
//     pfDeduction: 5400,
//     esiDeduction: 1125,
//     professionalTax: 200,
//     tds: 7500,
//     netSalary: 60775,
//     status: "paid",
//   },
//   {
//     id: 3,
//     employeeId: 3,
//     month: "2023-08",
//     basicSalary: 40000,
//     hra: 16000,
//     conveyanceAllowance: 3000,
//     medicalAllowance: 3000,
//     specialAllowance: 3000,
//     grossSalary: 65000,
//     pfDeduction: 4800,
//     esiDeduction: 975,
//     professionalTax: 200,
//     tds: 6500,
//     netSalary: 52525,
//     status: "paid",
//   },
// ];

// const expenses = [
//   {
//     id: 1,
//     employeeId: 1,
//     date: "2023-08-15",
//     category: "Travel",
//     amount: 2500,
//     description: "Client meeting travel expenses",
//     status: "approved",
//     reimbursed: true,
//   },
//   {
//     id: 2,
//     employeeId: 2,
//     date: "2023-08-20",
//     category: "Office Supplies",
//     amount: 1500,
//     description: "Stationery purchase",
//     status: "pending",
//     reimbursed: false,
//   },
//   {
//     id: 3,
//     employeeId: 1,
//     date: "2023-08-25",
//     category: "Training",
//     amount: 5000,
//     description: "Online course fee",
//     status: "approved",
//     reimbursed: true,
//   },
// ];

// // Helper function to simulate API delay
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // Mock API endpoints
// export const api = {
//   // Employee endpoints
//   getEmployees: async () => {
//     await delay(500);
//     return [...employees];
//   },

//   getEmployee: async (id) => {
//     await delay(300);
//     const employee = employees.find((emp) => emp.id === id);
//     if (!employee) throw new Error("Employee not found");
//     return { ...employee };
//   },

//   createEmployee: async (data) => {
//     await delay(700);
//     const newEmployee = {
//       id: employees.length + 1,
//       ...data,
//       status: "active",
//     };
//     employees.push(newEmployee);
//     return newEmployee;
//   },

//   updateEmployee: async (id, data) => {
//     await delay(500);
//     const index = employees.findIndex((emp) => emp.id === id);
//     if (index === -1) throw new Error("Employee not found");
//     const updatedEmployee = { ...employees[index], ...data };
//     employees[index] = updatedEmployee;
//     return updatedEmployee;
//   },

//   deleteEmployee: async (id) => {
//     await delay(300);
//     const index = employees.findIndex((emp) => emp.id === id);
//     if (index === -1) throw new Error("Employee not found");
//     const deletedEmployee = employees[index];
//     employees.splice(index, 1);
//     return deletedEmployee;
//   },

//   // Attendance endpoints
//   getAttendance: async (params) => {
//     await delay(500);
//     let result = [...attendance];

//     if (params?.employeeId) {
//       result = result.filter((a) => a.employeeId === params.employeeId);
//     }

//     if (params?.fromDate && params?.toDate) {
//       result = result.filter(
//         (a) => a.date >= params.fromDate && a.date <= params.toDate
//       );
//     }

//     return result;
//   },

//   createAttendance: async (data) => {
//     await delay(300);
//     const newAttendance = {
//       id: attendance.length + 1,
//       ...data,
//     };
//     attendance.push(newAttendance);
//     return newAttendance;
//   },

//   // Leave endpoints
//   getLeaves: async (params) => {
//     await delay(500);
//     let result = [...leaves];

//     if (params?.employeeId) {
//       result = result.filter((l) => l.employeeId === params.employeeId);
//     }

//     if (params?.status) {
//       result = result.filter((l) => l.status === params.status);
//     }

//     return result;
//   },

//   createLeave: async (data) => {
//     await delay(300);
//     const newLeave = {
//       id: leaves.length + 1,
//       ...data,
//       status: "pending",
//     };
//     leaves.push(newLeave);
//     return newLeave;
//   },

//   updateLeaveStatus: async (id, status) => {
//     await delay(300);
//     const index = leaves.findIndex((l) => l.id === id);
//     if (index === -1) throw new Error("Leave not found");
//     leaves[index].status = status;
//     return leaves[index];
//   },

//   // Salary endpoints
//   getSalaries: async (params) => {
//     await delay(700);
//     let result = [...salaries];

//     if (params?.employeeId) {
//       result = result.filter((s) => s.employeeId === params.employeeId);
//     }

//     if (params?.month) {
//       result = result.filter((s) => s.month === params.month);
//     }

//     return result;
//   },

//   generateSalary: async (employeeId, month) => {
//     await delay(1000);
//     const employee = employees.find((emp) => emp.id === employeeId);
//     if (!employee) throw new Error("Employee not found");

//     // Check if salary already exists
//     const existingSalary = salaries.find(
//       (s) => s.employeeId === employeeId && s.month === month
//     );
//     if (existingSalary) return existingSalary;

//     // Calculate salary components based on employee data
//     const basicSalary = employee.salary * 0.6;
//     const hra = employee.salary * 0.24;
//     const conveyanceAllowance = employee.salary * 0.05;
//     const medicalAllowance = employee.salary * 0.05;
//     const specialAllowance = employee.salary * 0.06;
//     const grossSalary = employee.salary;

//     // Calculate deductions
//     const pfDeduction = basicSalary * 0.12;
//     const esiDeduction = grossSalary * 0.015;
//     const professionalTax = 200;
//     const tds = grossSalary * 0.1;

//     const netSalary =
//       grossSalary - (pfDeduction + esiDeduction + professionalTax + tds);

//     const newSalary = {
//       id: salaries.length + 1,
//       employeeId,
//       month,
//       basicSalary,
//       hra,
//       conveyanceAllowance,
//       medicalAllowance,
//       specialAllowance,
//       grossSalary,
//       pfDeduction,
//       esiDeduction,
//       professionalTax,
//       tds,
//       netSalary,
//       status: "pending",
//     };

//     salaries.push(newSalary);
//     return newSalary;
//   },

//   processSalary: async (id, status) => {
//     await delay(500);
//     const index = salaries.findIndex((s) => s.id === id);
//     if (index === -1) throw new Error("Salary not found");
//     salaries[index].status = status;
//     return salaries[index];
//   },

//   // Expense endpoints
//   getExpenses: async (params) => {
//     await delay(500);
//     let result = [...expenses];

//     if (params?.employeeId) {
//       result = result.filter((e) => e.employeeId === params.employeeId);
//     }

//     if (params?.status) {
//       result = result.filter((e) => e.status === params.status);
//     }

//     return result;
//   },

//   createExpense: async (data) => {
//     await delay(300);
//     const newExpense = {
//       id: expenses.length + 1,
//       ...data,
//       status: "pending",
//       reimbursed: false,
//     };
//     expenses.push(newExpense);
//     return newExpense;
//   },

//   updateExpenseStatus: async (id, status, reimbursed = false) => {
//     await delay(300);
//     const index = expenses.findIndex((e) => e.id === id);
//     if (index === -1) throw new Error("Expense not found");
//     expenses[index].status = status;
//     expenses[index].reimbursed = reimbursed;
//     return expenses[index];
//   },

//   // Dashboard data
//   getDashboardData: async () => {
//     await delay(800);
//     return {
//       totalEmployees: employees.length,
//       activeEmployees: employees.filter((emp) => emp.status === "active")
//         .length,
//       pendingLeaves: leaves.filter((l) => l.status === "pending").length,
//       pendingExpenses: expenses.filter((e) => e.status === "pending").length,
//       monthlySalaryTotal: salaries
//         .filter((s) => s.month === "2023-08")
//         .reduce((sum, s) => sum + s.grossSalary, 0),
//       departmentDistribution: [
//         { department: "Engineering", count: 2 },
//         { department: "HR", count: 1 },
//         { department: "Finance", count: 1 },
//         { department: "Marketing", count: 1 },
//       ],
//       recentActivities: [
//         {
//           type: "salary",
//           description: "Salary processed for August 2023",
//           date: "2023-09-01",
//         },
//         {
//           type: "leave",
//           description: "John Doe's leave request approved",
//           date: "2023-08-31",
//         },
//         {
//           type: "expense",
//           description: "New expense claim submitted by Jane Smith",
//           date: "2023-08-30",
//         },
//         {
//           type: "employee",
//           description: "New employee Michael Brown joined",
//           date: "2023-08-15",
//         },
//       ],
//     };
//   },
// };

//2

// Mock data
const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    department: "Engineering",
    designation: "Senior Developer",
    joiningDate: "2020-01-15",
    salary: 85000,
    bankAccount: "HDFC1234567",
    panCard: "ABCDE1234F",
    pfNumber: "PF123456789",
    esiNumber: "ESI12345678",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543211",
    department: "HR",
    designation: "HR Manager",
    joiningDate: "2019-05-10",
    salary: 75000,
    bankAccount: "ICICI7654321",
    panCard: "FGHIJ5678K",
    pfNumber: "PF987654321",
    esiNumber: "ESI87654321",
    status: "active",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "9876543212",
    department: "Finance",
    designation: "Accountant",
    joiningDate: "2021-03-22",
    salary: 65000,
    bankAccount: "SBI9876543",
    panCard: "KLMNO9012P",
    pfNumber: "PF456789123",
    esiNumber: "ESI45678912",
    status: "active",
  },
  {
    id: 4,
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    phone: "9876543213",
    department: "Marketing",
    designation: "Marketing Specialist",
    joiningDate: "2022-01-05",
    salary: 60000,
    bankAccount: "AXIS6543210",
    panCard: "PQRST3456U",
    pfNumber: "PF789123456",
    esiNumber: "ESI78912345",
    status: "active",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "9876543214",
    department: "Engineering",
    designation: "Junior Developer",
    joiningDate: "2022-06-15",
    salary: 45000,
    bankAccount: "KOTAK5432109",
    panCard: "UVWXY7890Z",
    pfNumber: "PF321654987",
    esiNumber: "ESI32165498",
    status: "active",
  },
];

const attendance = [
  {
    id: 1,
    employeeId: 1,
    date: "2023-09-01",
    status: "present",
    checkIn: "09:00:00",
    checkOut: "18:00:00",
  },
  {
    id: 2,
    employeeId: 1,
    date: "2023-09-02",
    status: "present",
    checkIn: "09:15:00",
    checkOut: "18:30:00",
  },
  {
    id: 3,
    employeeId: 1,
    date: "2023-09-03",
    status: "leave",
    leaveType: "casual",
    reason: "Personal work",
  },
  {
    id: 4,
    employeeId: 2,
    date: "2023-09-01",
    status: "present",
    checkIn: "08:45:00",
    checkOut: "17:45:00",
  },
  {
    id: 5,
    employeeId: 2,
    date: "2023-09-02",
    status: "present",
    checkIn: "08:50:00",
    checkOut: "17:55:00",
  },
];

const leaves = [
  {
    id: 1,
    employeeId: 1,
    startDate: "2023-09-03",
    endDate: "2023-09-03",
    type: "casual",
    reason: "Personal work",
    status: "approved",
  },
  {
    id: 2,
    employeeId: 2,
    startDate: "2023-09-10",
    endDate: "2023-09-15",
    type: "sick",
    reason: "Medical treatment",
    status: "pending",
  },
  {
    id: 3,
    employeeId: 3,
    startDate: "2023-09-20",
    endDate: "2023-09-22",
    type: "earned",
    reason: "Family vacation",
    status: "approved",
  },
];

const salaries = [
  {
    id: 1,
    employeeId: 1,
    month: "2023-08",
    basicSalary: 50000,
    hra: 20000,
    conveyanceAllowance: 5000,
    medicalAllowance: 5000,
    specialAllowance: 5000,
    grossSalary: 85000,
    pfDeduction: 6000,
    esiDeduction: 1275,
    professionalTax: 200,
    tds: 8500,
    netSalary: 69025,
    status: "paid",
    approvedBy: "Admin User",
    approvalDate: "2023-08-25",
    approvalComments: "Approved",
  },
  {
    id: 2,
    employeeId: 2,
    month: "2023-08",
    basicSalary: 45000,
    hra: 18000,
    conveyanceAllowance: 4000,
    medicalAllowance: 4000,
    specialAllowance: 4000,
    grossSalary: 75000,
    pfDeduction: 5400,
    esiDeduction: 1125,
    professionalTax: 200,
    tds: 7500,
    netSalary: 60775,
    status: "paid",
    approvedBy: "Admin User",
    approvalDate: "2023-08-25",
    approvalComments: "Approved",
  },
  {
    id: 3,
    employeeId: 3,
    month: "2023-08",
    basicSalary: 40000,
    hra: 16000,
    conveyanceAllowance: 3000,
    medicalAllowance: 3000,
    specialAllowance: 3000,
    grossSalary: 65000,
    pfDeduction: 4800,
    esiDeduction: 975,
    professionalTax: 200,
    tds: 6500,
    netSalary: 52525,
    status: "paid",
    approvedBy: "Admin User",
    approvalDate: "2023-08-25",
    approvalComments: "Approved",
  },
];

const expenses = [
  {
    id: 1,
    employeeId: 1,
    date: "2023-08-15",
    category: "Travel",
    amount: 2500,
    description: "Client meeting travel expenses",
    status: "approved",
    reimbursed: true,
  },
  {
    id: 2,
    employeeId: 2,
    date: "2023-08-20",
    category: "Office Supplies",
    amount: 1500,
    description: "Stationery purchase",
    status: "pending",
    reimbursed: false,
  },
  {
    id: 3,
    employeeId: 1,
    date: "2023-08-25",
    category: "Training",
    amount: 5000,
    description: "Online course fee",
    status: "approved",
    reimbursed: true,
  },
];

// Salary Components mock data
const salaryComponents = [
  {
    id: 1,
    name: "Basic Salary",
    type: "earning",
    category: "fixed",
    calculationType: "percentage",
    value: 60,
    taxable: "yes",
    description: "Base salary component",
    applicableTo: "all",
  },
  {
    id: 2,
    name: "House Rent Allowance",
    type: "earning",
    category: "fixed",
    calculationType: "percentage",
    value: 40,
    taxable: "yes",
    description: "HRA component",
    applicableTo: "all",
  },
  {
    id: 3,
    name: "Conveyance Allowance",
    type: "earning",
    category: "fixed",
    calculationType: "fixed",
    value: 1600,
    taxable: "no",
    description: "Fixed transport allowance",
    applicableTo: "fulltime",
  },
  {
    id: 4,
    name: "Medical Allowance",
    type: "earning",
    category: "fixed",
    calculationType: "fixed",
    value: 1250,
    taxable: "no",
    description: "Medical benefits",
    applicableTo: "all",
  },
  {
    id: 5,
    name: "Professional Tax",
    type: "deduction",
    category: "fixed",
    calculationType: "fixed",
    value: 200,
    taxable: "no",
    description: "Statutory professional tax",
    applicableTo: "all",
  },
  {
    id: 6,
    name: "Provident Fund",
    type: "deduction",
    category: "fixed",
    calculationType: "percentage",
    value: 12,
    taxable: "no",
    description: "Employee PF contribution",
    applicableTo: "fulltime",
  },
  {
    id: 7,
    name: "Performance Bonus",
    type: "earning",
    category: "variable",
    calculationType: "percentage",
    value: 10,
    taxable: "yes",
    description: "Variable performance-based bonus",
    applicableTo: "all",
  },
];

// Salary Structures mock data
const salaryStructures = [
  {
    id: 1,
    name: "Regular Full-Time",
    description: "Standard structure for full-time employees",
    employeeType: "fulltime",
    status: "active",
    components: [
      {
        componentId: 1, // Basic Salary
        isPercentage: true,
        percentageOf: "grossSalary",
        percentageValue: 60,
        value: 0,
      },
      {
        componentId: 2, // HRA
        isPercentage: true,
        percentageOf: "basicSalary",
        percentageValue: 40,
        value: 0,
      },
      {
        componentId: 3, // Conveyance Allowance
        isPercentage: false,
        percentageOf: null,
        percentageValue: 0,
        value: 1600,
      },
      {
        componentId: 4, // Medical Allowance
        isPercentage: false,
        percentageOf: null,
        percentageValue: 0,
        value: 1250,
      },
      {
        componentId: 5, // Professional Tax
        isPercentage: false,
        percentageOf: null,
        percentageValue: 0,
        value: 200,
      },
      {
        componentId: 6, // Provident Fund
        isPercentage: true,
        percentageOf: "basicSalary",
        percentageValue: 12,
        value: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Part-Time Structure",
    description: "Salary structure for part-time employees",
    employeeType: "parttime",
    status: "active",
    components: [
      {
        componentId: 1, // Basic Salary
        isPercentage: true,
        percentageOf: "grossSalary",
        percentageValue: 70,
        value: 0,
      },
      {
        componentId: 2, // HRA
        isPercentage: true,
        percentageOf: "basicSalary",
        percentageValue: 30,
        value: 0,
      },
      {
        componentId: 5, // Professional Tax
        isPercentage: false,
        percentageOf: null,
        percentageValue: 0,
        value: 100,
      },
    ],
  },
  {
    id: 3,
    name: "Contract Structure",
    description: "Salary structure for contract employees",
    employeeType: "contract",
    status: "active",
    components: [
      {
        componentId: 1, // Basic Salary
        isPercentage: true,
        percentageOf: "grossSalary",
        percentageValue: 100,
        value: 0,
      },
    ],
  },
];

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Single, unified export of the API object
export const api = {
  // Employee endpoints
  getEmployees: async () => {
    await delay(500);
    return [...employees];
  },

  getEmployee: async (id) => {
    await delay(300);
    const employee = employees.find((emp) => emp.id === id);
    if (!employee) throw new Error("Employee not found");
    return { ...employee };
  },

  createEmployee: async (data) => {
    await delay(700);
    const newEmployee = {
      id: employees.length + 1,
      ...data,
      status: "active",
    };
    employees.push(newEmployee);
    return newEmployee;
  },

  updateEmployee: async (id, data) => {
    await delay(500);
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) throw new Error("Employee not found");
    const updatedEmployee = { ...employees[index], ...data };
    employees[index] = updatedEmployee;
    return updatedEmployee;
  },

  deleteEmployee: async (id) => {
    await delay(300);
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) throw new Error("Employee not found");
    const deletedEmployee = employees[index];
    employees.splice(index, 1);
    return deletedEmployee;
  },

  // Attendance endpoints
  getAttendance: async (params) => {
    await delay(500);
    let result = [...attendance];

    if (params?.employeeId) {
      result = result.filter((a) => a.employeeId === params.employeeId);
    }

    if (params?.fromDate && params?.toDate) {
      result = result.filter(
        (a) => a.date >= params.fromDate && a.date <= params.toDate
      );
    }

    return result;
  },

  createAttendance: async (data) => {
    await delay(300);
    const newAttendance = {
      id: attendance.length + 1,
      overtime: data.overtime || 0,
      ...data,
    };
    attendance.push(newAttendance);
    return newAttendance;
  },

  // Leave endpoints
  getLeaves: async (params) => {
    await delay(500);
    let result = [...leaves];

    if (params?.employeeId) {
      result = result.filter((l) => l.employeeId === params.employeeId);
    }

    if (params?.status) {
      result = result.filter((l) => l.status === params.status);
    }

    return result;
  },

  createLeave: async (data) => {
    await delay(300);
    const newLeave = {
      id: leaves.length + 1,
      ...data,
      status: "pending",
    };
    leaves.push(newLeave);
    return newLeave;
  },

  updateLeaveStatus: async (id, status) => {
    await delay(300);
    const index = leaves.findIndex((l) => l.id === id);
    if (index === -1) throw new Error("Leave not found");
    leaves[index].status = status;
    return leaves[index];
  },

  // Enhanced Salary endpoints with approval workflow
  getSalaries: async (params = {}) => {
    await delay(700);
    let result = [...salaries];

    if (params?.employeeId) {
      result = result.filter((s) => s.employeeId === params.employeeId);
    }

    if (params?.month) {
      result = result.filter((s) => s.month === params.month);
    }

    if (params?.status) {
      // Support for both single status and array of statuses
      const statusArray = Array.isArray(params.status)
        ? params.status
        : [params.status];
      result = result.filter((s) => statusArray.includes(s.status));
    }

    return result;
  },

  generateSalary: async (employeeId, month, calculationData = null) => {
    await delay(1000);
    const employee = employees.find((emp) => emp.id === employeeId);
    if (!employee) throw new Error("Employee not found");

    // Check if salary already exists
    const existingSalary = salaries.find(
      (s) => s.employeeId === employeeId && s.month === month
    );
    if (existingSalary) return existingSalary;

    // If calculation data is provided, use it; otherwise do the standard calculation
    let salaryData;
    if (calculationData) {
      salaryData = {
        ...calculationData,
        employeeId,
        month,
        id: salaries.length + 1,
      };
    } else {
      // Calculate salary components based on employee data
      const basicSalary = employee.salary * 0.6;
      const hra = employee.salary * 0.24;
      const conveyanceAllowance = employee.salary * 0.05;
      const medicalAllowance = employee.salary * 0.05;
      const specialAllowance = employee.salary * 0.06;
      const grossSalary = employee.salary;

      // Calculate deductions
      const pfDeduction = basicSalary * 0.12;
      const esiDeduction = grossSalary * 0.015;
      const professionalTax = 200;
      const tds = grossSalary * 0.1;

      const netSalary =
        grossSalary - (pfDeduction + esiDeduction + professionalTax + tds);

      salaryData = {
        id: salaries.length + 1,
        employeeId,
        month,
        basicSalary,
        hra,
        conveyanceAllowance,
        medicalAllowance,
        specialAllowance,
        grossSalary,
        pfDeduction,
        esiDeduction,
        professionalTax,
        tds,
        netSalary,
        status: "draft",
        approvedBy: null,
        approvalDate: null,
        approvalComments: null,
      };
    }

    salaries.push(salaryData);
    return salaryData;
  },

  updateSalaryStatus: async (id, status, comments = null) => {
    await delay(500);
    const index = salaries.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Salary not found");

    salaries[index].status = status;

    if (status === "approved" || status === "rejected") {
      salaries[index].approvedBy = "Admin User"; // In a real app, this would be the current user
      salaries[index].approvalDate = new Date().toISOString();
      salaries[index].approvalComments = comments;
    }

    return salaries[index];
  },

  processSalary: async (id, status) => {
    await delay(500);
    const index = salaries.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Salary not found");
    salaries[index].status = status;
    return salaries[index];
  },

  // Expense endpoints
  getExpenses: async (params) => {
    await delay(500);
    let result = [...expenses];

    if (params?.employeeId) {
      result = result.filter((e) => e.employeeId === params.employeeId);
    }

    if (params?.status) {
      result = result.filter((e) => e.status === params.status);
    }

    return result;
  },

  createExpense: async (data) => {
    await delay(300);
    const newExpense = {
      id: expenses.length + 1,
      ...data,
      status: "pending",
      reimbursed: false,
    };
    expenses.push(newExpense);
    return newExpense;
  },

  updateExpenseStatus: async (id, status, reimbursed = false) => {
    await delay(300);
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("Expense not found");
    expenses[index].status = status;
    expenses[index].reimbursed = reimbursed;
    return expenses[index];
  },

  // Dashboard data
  getDashboardData: async () => {
    await delay(800);
    return {
      totalEmployees: employees.length,
      activeEmployees: employees.filter((emp) => emp.status === "active")
        .length,
      pendingLeaves: leaves.filter((l) => l.status === "pending").length,
      pendingExpenses: expenses.filter((e) => e.status === "pending").length,
      monthlySalaryTotal: salaries
        .filter((s) => s.month === "2023-08")
        .reduce((sum, s) => sum + s.grossSalary, 0),
      departmentDistribution: [
        { department: "Engineering", count: 2 },
        { department: "HR", count: 1 },
        { department: "Finance", count: 1 },
        { department: "Marketing", count: 1 },
      ],
      recentActivities: [
        {
          type: "salary",
          description: "Salary processed for August 2023",
          date: "2023-09-01",
        },
        {
          type: "leave",
          description: "John Doe's leave request approved",
          date: "2023-08-31",
        },
        {
          type: "expense",
          description: "New expense claim submitted by Jane Smith",
          date: "2023-08-30",
        },
        {
          type: "employee",
          description: "New employee Michael Brown joined",
          date: "2023-08-15",
        },
      ],
    };
  },

  // Salary Component endpoints
  getSalaryComponents: async () => {
    await delay(500);
    return [...salaryComponents];
  },

  getSalaryComponent: async (id) => {
    await delay(300);
    const component = salaryComponents.find((comp) => comp.id === id);
    if (!component) throw new Error("Salary component not found");
    return { ...component };
  },

  createSalaryComponent: async (data) => {
    await delay(700);
    const newComponent = {
      id: salaryComponents.length + 1,
      ...data,
    };
    salaryComponents.push(newComponent);
    return newComponent;
  },

  updateSalaryComponent: async (id, data) => {
    await delay(500);
    const index = salaryComponents.findIndex((comp) => comp.id === id);
    if (index === -1) throw new Error("Salary component not found");
    const updatedComponent = { ...salaryComponents[index], ...data };
    salaryComponents[index] = updatedComponent;
    return updatedComponent;
  },

  deleteSalaryComponent: async (id) => {
    await delay(300);
    const index = salaryComponents.findIndex((comp) => comp.id === id);
    if (index === -1) throw new Error("Salary component not found");
    const deletedComponent = salaryComponents[index];
    salaryComponents.splice(index, 1);
    return deletedComponent;
  },

  // Salary Structure endpoints
  getSalaryStructures: async () => {
    await delay(500);
    return [...salaryStructures];
  },

  getSalaryStructure: async (id) => {
    await delay(300);
    const structure = salaryStructures.find((str) => str.id === id);
    if (!structure) throw new Error("Salary structure not found");
    return { ...structure };
  },

  createSalaryStructure: async (data) => {
    await delay(700);
    const newStructure = {
      id: salaryStructures.length + 1,
      ...data,
    };
    salaryStructures.push(newStructure);
    return newStructure;
  },

  updateSalaryStructure: async (id, data) => {
    await delay(500);
    const index = salaryStructures.findIndex((str) => str.id === id);
    if (index === -1) throw new Error("Salary structure not found");
    const updatedStructure = { ...salaryStructures[index], ...data };
    salaryStructures[index] = updatedStructure;
    return updatedStructure;
  },

  deleteSalaryStructure: async (id) => {
    await delay(300);
    const index = salaryStructures.findIndex((str) => str.id === id);
    if (index === -1) throw new Error("Salary structure not found");
    const deletedStructure = salaryStructures[index];
    salaryStructures.splice(index, 1);
    return deletedStructure;
  },
};
