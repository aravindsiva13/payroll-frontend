import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiUserPlus } from "react-icons/fi";
import {
  Table,
  Button,
  SearchInput,
  Modal,
  Input,
  Select,
  Alert,
} from "../components/ui";
import { api } from "../services/mockApi";
import { formatDate } from "../utils";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    salary: "",
    bankAccount: "",
    panCard: "",
    pfNumber: "",
    esiNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await api.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setAlert({ type: "error", message: "Failed to fetch employees" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      joiningDate: "",
      salary: "",
      bankAccount: "",
      panCard: "",
      pfNumber: "",
      esiNumber: "",
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      joiningDate: employee.joiningDate,
      salary: employee.salary.toString(),
      bankAccount: employee.bankAccount,
      panCard: employee.panCard,
      pfNumber: employee.pfNumber,
      esiNumber: employee.esiNumber,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.deleteEmployee(id);
        fetchEmployees();
        setAlert({ type: "success", message: "Employee deleted successfully" });
      } catch (error) {
        console.error("Error deleting employee:", error);
        setAlert({ type: "error", message: "Failed to delete employee" });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.joiningDate)
      newErrors.joiningDate = "Joining date is required";
    if (!formData.salary) newErrors.salary = "Salary is required";
    else if (isNaN(formData.salary))
      newErrors.salary = "Salary must be a number";
    if (!formData.bankAccount)
      newErrors.bankAccount = "Bank account is required";
    if (!formData.panCard) newErrors.panCard = "PAN card is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (currentEmployee) {
        await api.updateEmployee(currentEmployee.id, {
          ...formData,
          salary: parseFloat(formData.salary),
        });
        setAlert({ type: "success", message: "Employee updated successfully" });
      } else {
        await api.createEmployee({
          ...formData,
          salary: parseFloat(formData.salary),
        });
        setAlert({ type: "success", message: "Employee added successfully" });
      }
      setIsModalOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
      setAlert({ type: "error", message: "Failed to save employee" });
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "joiningDate",
      label: "Joining Date",
      render: (row) => formatDate(row.joiningDate),
    },
    {
      key: "salary",
      label: "Salary",
      render: (row) => `₹${row.salary.toLocaleString()}`,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="p-1"
            onClick={() => handleEditEmployee(row)}
          >
            <FiEdit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="danger"
            className="p-1"
            onClick={() => handleDeleteEmployee(row.id)}
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Engineering", label: "Engineering" },
    { value: "HR", label: "HR" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "Operations", label: "Operations" },
    { value: "Sales", label: "Sales" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
        <Button onClick={handleAddEmployee}>
          <FiUserPlus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="flex justify-between items-center">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search employees..."
          className="w-64"
        />
        <div className="text-sm text-gray-500">
          Total: {filteredEmployees.length} employees
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading employees...</div>
        </div>
      ) : (
        <Table columns={columns} data={filteredEmployees} />
      )}

      {/* Add/Edit Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentEmployee ? "Edit Employee" : "Add Employee"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Input
              label="Phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
            <Select
              label="Department"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              options={departmentOptions}
              error={errors.department}
            />
            <Input
              label="Designation"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              error={errors.designation}
            />
            <Input
              label="Joining Date"
              id="joiningDate"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleInputChange}
              error={errors.joiningDate}
            />
            <Input
              label="Salary"
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleInputChange}
              error={errors.salary}
            />
            <Input
              label="Bank Account"
              id="bankAccount"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleInputChange}
              error={errors.bankAccount}
            />
            <Input
              label="PAN Card"
              id="panCard"
              name="panCard"
              value={formData.panCard}
              onChange={handleInputChange}
              error={errors.panCard}
            />
            <Input
              label="PF Number"
              id="pfNumber"
              name="pfNumber"
              value={formData.pfNumber}
              onChange={handleInputChange}
              error={errors.pfNumber}
            />
            <Input
              label="ESI Number"
              id="esiNumber"
              name="esiNumber"
              value={formData.esiNumber}
              onChange={handleInputChange}
              error={errors.esiNumber}
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {currentEmployee ? "Update" : "Add"} Employee
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Employees;
