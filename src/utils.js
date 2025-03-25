import {
  format,
  parse,
  differenceInDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

// Date formatting functions
export const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd MMM yyyy");
};

export const formatDateTime = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd MMM yyyy hh:mm a");
};

export const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  return format(new Date().setHours(hours, minutes), "hh:mm a");
};

export const formatMonth = (month) => {
  if (!month) return "";
  return format(parse(month, "yyyy-MM", new Date()), "MMMM yyyy");
};

// Calculation functions
export const calculateDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  return differenceInDays(new Date(endDate), new Date(startDate)) + 1;
};

export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

// Salary calculation functions
export const calculateBasicSalary = (grossSalary) => {
  return grossSalary * 0.6;
};

export const calculateHRA = (basicSalary) => {
  return basicSalary * 0.4;
};

export const calculatePF = (basicSalary) => {
  return Math.min(basicSalary * 0.12, 1800); // Maximum PF contribution cap
};

export const calculateESI = (grossSalary) => {
  // ESI applicable if gross salary is less than or equal to 21,000
  if (grossSalary <= 21000) {
    return grossSalary * 0.0075; // 0.75% of gross salary
  }
  return 0;
};

export const calculateProfessionalTax = (state, grossSalary) => {
  // Professional tax varies by state, this is a simplified calculation
  const ptRates = {
    Karnataka: 200,
    Maharashtra: 200,
    "Tamil Nadu": 195,
    Gujarat: 200,
    "West Bengal": 210,
    default: 200,
  };

  return ptRates[state] || ptRates.default;
};

export const calculateTDS = (annualSalary) => {
  // Simplified TDS calculation based on old regime
  let taxAmount = 0;

  if (annualSalary <= 250000) {
    taxAmount = 0;
  } else if (annualSalary <= 500000) {
    taxAmount = (annualSalary - 250000) * 0.05;
  } else if (annualSalary <= 750000) {
    taxAmount = 12500 + (annualSalary - 500000) * 0.1;
  } else if (annualSalary <= 1000000) {
    taxAmount = 37500 + (annualSalary - 750000) * 0.15;
  } else if (annualSalary <= 1250000) {
    taxAmount = 75000 + (annualSalary - 1000000) * 0.2;
  } else if (annualSalary <= 1500000) {
    taxAmount = 125000 + (annualSalary - 1250000) * 0.25;
  } else {
    taxAmount = 187500 + (annualSalary - 1500000) * 0.3;
  }

  return taxAmount / 12; // Monthly TDS
};

// Generate months array for dropdowns
export const getMonthsArray = (count = 12) => {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < count; i++) {
    const date = addMonths(currentDate, -i);
    const value = format(date, "yyyy-MM");
    const label = format(date, "MMMM yyyy");
    months.push({ value, label });
  }

  return months;
};

// Generate monthly attendance data
export const generateMonthlyAttendance = (year, month, attendanceData) => {
  const firstDay = startOfMonth(new Date(year, month - 1));
  const lastDay = endOfMonth(firstDay);

  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

  return daysInMonth.map((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const attendance = attendanceData.find((a) => a.date === dateStr);

    return {
      date: dateStr,
      day: format(day, "EEEE"),
      isWeekend:
        format(day, "EEEE") === "Saturday" || format(day, "EEEE") === "Sunday",
      status: attendance
        ? attendance.status
        : format(day, "EEEE") === "Saturday" || format(day, "EEEE") === "Sunday"
        ? "weekend"
        : "absent",
      checkIn: attendance?.checkIn || null,
      checkOut: attendance?.checkOut || null,
    };
  });
};

// Currency formatter
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Generate Pay Slip
// export const generatePaySlip = (salary, employee) => {
//   if (!salary || !employee) return null;

//   return {
//     employeeName: employee.name,
//     employeeId: employee.id,
//     designation: employee.designation,
//     department: employee.department,
//     month: formatMonth(salary.month),
//     bankAccount: employee.bankAccount,
//     earnings: {
//       basicSalary: salary.basicSalary,
//       hra: salary.hra,
//       conveyanceAllowance: salary.conveyanceAllowance,
//       medicalAllowance: salary.medicalAllowance,
//       specialAllowance: salary.specialAllowance,
//       totalEarnings: salary.grossSalary,
//     },
//     deductions: {
//       providentFund: salary.pfDeduction,
//       esi: salary.esiDeduction,
//       professionalTax: salary.professionalTax,
//       tds: salary.tds,
//       totalDeductions:
//         salary.pfDeduction +
//         salary.esiDeduction +
//         salary.professionalTax +
//         salary.tds,
//     },
//     netSalary: salary.netSalary,
//   };
// };

export const generatePaySlip = (salary, employee) => {
  if (!salary || !employee) return null;

  // Determine the gross salary first as other calculations depend on it
  const grossSalary = Number.isFinite(salary.grossSalary)
    ? salary.grossSalary
    : employee.salary;

  // Provide fallbacks for salary components if they don't exist or are invalid
  const basicSalary = Number.isFinite(salary.basicSalary)
    ? salary.basicSalary
    : grossSalary * 0.6;
  const hra = Number.isFinite(salary.hra) ? salary.hra : grossSalary * 0.24;
  const conveyanceAllowance = Number.isFinite(salary.conveyanceAllowance)
    ? salary.conveyanceAllowance
    : grossSalary * 0.05;
  const medicalAllowance = Number.isFinite(salary.medicalAllowance)
    ? salary.medicalAllowance
    : grossSalary * 0.05;
  const specialAllowance = Number.isFinite(salary.specialAllowance)
    ? salary.specialAllowance
    : grossSalary * 0.06;

  // Calculate deductions with fallbacks
  const pfDeduction = Number.isFinite(salary.pfDeduction)
    ? salary.pfDeduction
    : basicSalary * 0.12;
  const esiDeduction = Number.isFinite(salary.esiDeduction)
    ? salary.esiDeduction
    : grossSalary * 0.015;
  const professionalTax = Number.isFinite(salary.professionalTax)
    ? salary.professionalTax
    : 200;
  const tds = Number.isFinite(salary.tds) ? salary.tds : grossSalary * 0.1;

  const totalDeductions = pfDeduction + esiDeduction + professionalTax + tds;
  const netSalary = Number.isFinite(salary.netSalary)
    ? salary.netSalary
    : grossSalary - totalDeductions;

  return {
    employeeName: employee.name,
    employeeId: employee.id,
    designation: employee.designation,
    department: employee.department,
    month: formatMonth(salary.month),
    bankAccount: employee.bankAccount,
    earnings: {
      basicSalary,
      hra,
      conveyanceAllowance,
      medicalAllowance,
      specialAllowance,
      totalEarnings: grossSalary,
    },
    deductions: {
      providentFund: pfDeduction,
      esi: esiDeduction,
      professionalTax,
      tds,
      totalDeductions,
    },
    netSalary,
  };
};
