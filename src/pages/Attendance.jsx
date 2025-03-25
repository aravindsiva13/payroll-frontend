import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiCheck,
  FiX,
  FiPlus,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import {
  Card,
  Button,
  Select,
  Modal,
  Input,
  Alert,
  Badge,
  Table,
} from "../components/ui";
import { api } from "../services/mockApi";
import { formatDate, generateMonthlyAttendance } from "../utils";

function Attendance() {
  const [activeTab, setActiveTab] = useState("attendance");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState([]);
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [alert, setAlert] = useState(null);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    status: "present",
    checkIn: "",
    checkOut: "",
    leaveType: "casual",
    reason: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetchAttendanceData();
    }
  }, [selectedEmployee, selectedMonth, selectedYear, activeTab]);

  const fetchEmployees = async () => {
    try {
      const data = await api.getEmployees();
      setEmployees(data);
      if (data.length > 0) {
        setSelectedEmployee(data[0].id.toString());
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setAlert({ type: "error", message: "Failed to fetch employees" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      if (activeTab === "attendance") {
        const attendanceResponse = await api.getAttendance({
          employeeId: parseInt(selectedEmployee),
        });
        setAttendanceData(attendanceResponse);

        // Generate monthly calendar view with attendance data
        const monthAttendance = generateMonthlyAttendance(
          selectedYear,
          selectedMonth,
          attendanceResponse
        );
        setMonthlyAttendance(monthAttendance);
      } else {
        const leavesResponse = await api.getLeaves({
          employeeId: parseInt(selectedEmployee),
        });
        setLeaves(leavesResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ type: "error", message: "Failed to fetch data" });
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleAddAttendance = () => {
    setFormData({
      employeeId: selectedEmployee,
      date: new Date().toISOString().slice(0, 10),
      status: "present",
      checkIn: "09:00",
      checkOut: "18:00",
    });
    setAttendanceModalOpen(true);
  };

  const handleApplyLeave = () => {
    const today = new Date().toISOString().slice(0, 10);
    setFormData({
      employeeId: selectedEmployee,
      startDate: today,
      endDate: today,
      leaveType: "casual",
      reason: "",
    });
    setLeaveModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitAttendance = async (e) => {
    e.preventDefault();
    try {
      await api.createAttendance({
        employeeId: parseInt(formData.employeeId),
        date: formData.date,
        status: formData.status,
        checkIn: formData.status === "present" ? formData.checkIn : null,
        checkOut: formData.status === "present" ? formData.checkOut : null,
        leaveType: formData.status === "leave" ? formData.leaveType : null,
        reason: formData.status === "leave" ? formData.reason : null,
      });
      setAlert({
        type: "success",
        message: "Attendance recorded successfully",
      });
      setAttendanceModalOpen(false);
      fetchAttendanceData();
    } catch (error) {
      console.error("Error recording attendance:", error);
      setAlert({ type: "error", message: "Failed to record attendance" });
    }
  };

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    try {
      await api.createLeave({
        employeeId: parseInt(formData.employeeId),
        startDate: formData.startDate,
        endDate: formData.endDate,
        type: formData.leaveType,
        reason: formData.reason,
      });
      setAlert({
        type: "success",
        message: "Leave application submitted successfully",
      });
      setLeaveModalOpen(false);
      fetchAttendanceData();
    } catch (error) {
      console.error("Error applying for leave:", error);
      setAlert({ type: "error", message: "Failed to apply for leave" });
    }
  };

  const handleApproveLeave = async (id) => {
    try {
      await api.updateLeaveStatus(id, "approved");
      setAlert({ type: "success", message: "Leave approved successfully" });
      fetchAttendanceData();
    } catch (error) {
      console.error("Error approving leave:", error);
      setAlert({ type: "error", message: "Failed to approve leave" });
    }
  };

  const handleRejectLeave = async (id) => {
    try {
      await api.updateLeaveStatus(id, "rejected");
      setAlert({ type: "success", message: "Leave rejected successfully" });
      fetchAttendanceData();
    } catch (error) {
      console.error("Error rejecting leave:", error);
      setAlert({ type: "error", message: "Failed to reject leave" });
    }
  };

  // Generate years for dropdown (current year and previous 2 years)
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 3; i++) {
    years.push(currentYear - i);
  }

  // Generate months for dropdown
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const leaveColumns = [
    {
      key: "startDate",
      label: "Start Date",
      render: (row) => formatDate(row.startDate),
    },
    {
      key: "endDate",
      label: "End Date",
      render: (row) => formatDate(row.endDate),
    },
    { key: "type", label: "Leave Type" },
    { key: "reason", label: "Reason" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge
          color={
            row.status === "approved"
              ? "green"
              : row.status === "rejected"
              ? "red"
              : "yellow"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) =>
        row.status === "pending" && (
          <div className="flex space-x-2">
            <Button
              variant="success"
              className="p-1"
              onClick={() => handleApproveLeave(row.id)}
            >
              <FiCheckCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="danger"
              className="p-1"
              onClick={() => handleRejectLeave(row.id)}
            >
              <FiXCircle className="w-4 h-4" />
            </Button>
          </div>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Attendance & Leave Management
        </h1>
        <div className="flex space-x-2">
          {activeTab === "attendance" ? (
            <Button onClick={handleAddAttendance}>
              <FiClock className="w-4 h-4 mr-2" />
              Record Attendance
            </Button>
          ) : (
            <Button onClick={handleApplyLeave}>
              <FiCalendar className="w-4 h-4 mr-2" />
              Apply for Leave
            </Button>
          )}
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="flex space-x-2 border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "attendance"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("attendance")}
        >
          Attendance
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "leave"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("leave")}
        >
          Leave
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select
          className="w-64"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          options={employees.map((emp) => ({
            value: emp.id.toString(),
            label: emp.name,
          }))}
        />

        {activeTab === "attendance" && (
          <>
            <Select
              className="w-40"
              value={selectedMonth}
              onChange={handleMonthChange}
              options={months}
            />
            <Select
              className="w-32"
              value={selectedYear}
              onChange={handleYearChange}
              options={years.map((year) => ({
                value: year,
                label: year.toString(),
              }))}
            />
          </>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading data...</div>
        </div>
      ) : activeTab === "attendance" ? (
        <Card>
          <div className="grid grid-cols-7 gap-2">
            <div className="text-center font-medium text-sm p-2 bg-gray-100">
              Sun
            </div>
            <div className="text-center font-medium text-sm p-2 bg-gray-100">
              Mon
            </div>
            <div className="text-center font-medium text-sm p-2 bg-gray-100">
              Tue
            </div>
            <div className="text-center font-medium text-sm p-2 bg-gray-100">
              Wed
            </div>
            <div className="text-center font-medium text-sm p-2 bg-gray-100">
              Thu
            </div>
            <div className="text-center font-medium text-sm p-2 bg-gray-100">
              Fri
            </div>
            <div className="text-center font-medium text-sm p-2 bg-gray-100">
              Sat
            </div>

            {monthlyAttendance.map((day, index) => (
              <div
                key={index}
                className={`border rounded-md p-2 h-24 ${
                  day.isWeekend
                    ? "bg-gray-50"
                    : day.status === "present"
                    ? "bg-green-50"
                    : day.status === "leave"
                    ? "bg-yellow-50"
                    : day.status === "absent"
                    ? "bg-red-50"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">
                    {new Date(day.date).getDate()}
                  </span>
                  {day.status === "present" && (
                    <FiCheck className="text-green-500" />
                  )}
                  {day.status === "leave" && (
                    <FiCalendar className="text-yellow-500" />
                  )}
                  {day.status === "absent" && <FiX className="text-red-500" />}
                </div>
                {day.status === "present" && (
                  <div className="text-xs space-y-1">
                    <div>In: {day.checkIn?.slice(0, 5)}</div>
                    <div>Out: {day.checkOut?.slice(0, 5)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Table columns={leaveColumns} data={leaves} />
      )}

      {/* Record Attendance Modal */}
      <Modal
        isOpen={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        title="Record Attendance"
      >
        <form onSubmit={handleSubmitAttendance}>
          <div className="space-y-4">
            <Select
              label="Employee"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              options={employees.map((emp) => ({
                value: emp.id.toString(),
                label: emp.name,
              }))}
            />

            <Input
              label="Date"
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />

            <Select
              label="Status"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              options={[
                { value: "present", label: "Present" },
                { value: "leave", label: "Leave" },
                { value: "absent", label: "Absent" },
              ]}
            />

            {formData.status === "present" && (
              <>
                <Input
                  label="Check In Time"
                  id="checkIn"
                  name="checkIn"
                  type="time"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                />

                <Input
                  label="Check Out Time"
                  id="checkOut"
                  name="checkOut"
                  type="time"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                />
              </>
            )}

            {formData.status === "leave" && (
              <>
                <Select
                  label="Leave Type"
                  id="leaveType"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  options={[
                    { value: "casual", label: "Casual Leave" },
                    { value: "sick", label: "Sick Leave" },
                    { value: "earned", label: "Earned Leave" },
                    { value: "unpaid", label: "Unpaid Leave" },
                  ]}
                />

                <Input
                  label="Reason"
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                />
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setAttendanceModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Attendance</Button>
          </div>
        </form>
      </Modal>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        title="Apply for Leave"
      >
        <form onSubmit={handleSubmitLeave}>
          <div className="space-y-4">
            <Select
              label="Employee"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              options={employees.map((emp) => ({
                value: emp.id.toString(),
                label: emp.name,
              }))}
            />

            <Input
              label="Start Date"
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
            />

            <Input
              label="End Date"
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
            />

            <Select
              label="Leave Type"
              id="leaveType"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInputChange}
              options={[
                { value: "casual", label: "Casual Leave" },
                { value: "sick", label: "Sick Leave" },
                { value: "earned", label: "Earned Leave" },
                { value: "unpaid", label: "Unpaid Leave" },
              ]}
            />

            <Input
              label="Reason"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setLeaveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Apply for Leave</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Attendance;
