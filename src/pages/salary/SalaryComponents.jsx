import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSave } from "react-icons/fi";
import {
  Card,
  Button,
  Input,
  Table,
  Modal,
  Select,
  Alert,
} from "../../components/ui";
import { api } from "../../services/mockApi";

function SalaryComponents() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "earning",
    category: "fixed",
    calculationType: "fixed",
    value: "",
    taxable: "yes",
    description: "",
    applicableTo: "all",
  });

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const data = await api.getSalaryComponents();
      setComponents(data);
    } catch (error) {
      console.error("Error fetching salary components:", error);
      setAlert({ type: "error", message: "Failed to load salary components" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponent = () => {
    setCurrentComponent(null);
    setFormData({
      name: "",
      type: "earning",
      category: "fixed",
      calculationType: "fixed",
      value: "",
      taxable: "yes",
      description: "",
      applicableTo: "all",
    });
    setModalOpen(true);
  };

  const handleEditComponent = (component) => {
    setCurrentComponent(component);
    setFormData({
      name: component.name,
      type: component.type,
      category: component.category,
      calculationType: component.calculationType,
      value: component.value.toString(),
      taxable: component.taxable,
      description: component.description,
      applicableTo: component.applicableTo,
    });
    setModalOpen(true);
  };

  const handleDeleteComponent = async (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      try {
        await api.deleteSalaryComponent(id);
        setAlert({
          type: "success",
          message: "Component deleted successfully",
        });
        fetchComponents();
      } catch (error) {
        console.error("Error deleting component:", error);
        setAlert({ type: "error", message: "Failed to delete component" });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentComponent) {
        await api.updateSalaryComponent(currentComponent.id, {
          ...formData,
          value:
            formData.calculationType === "percentage"
              ? parseFloat(formData.value)
              : parseInt(formData.value),
        });
        setAlert({
          type: "success",
          message: "Component updated successfully",
        });
      } else {
        await api.createSalaryComponent({
          ...formData,
          value:
            formData.calculationType === "percentage"
              ? parseFloat(formData.value)
              : parseInt(formData.value),
        });
        setAlert({ type: "success", message: "Component added successfully" });
      }
      setModalOpen(false);
      fetchComponents();
    } catch (error) {
      console.error("Error saving component:", error);
      setAlert({ type: "error", message: "Failed to save component" });
    }
  };

  const columns = [
    { key: "name", label: "Component Name" },
    {
      key: "type",
      label: "Type",
      render: (row) => (row.type === "earning" ? "Earning" : "Deduction"),
    },
    {
      key: "category",
      label: "Category",
      render: (row) =>
        row.category.charAt(0).toUpperCase() + row.category.slice(1),
    },
    {
      key: "value",
      label: "Value",
      render: (row) => {
        if (row.calculationType === "percentage") {
          return `${row.value}% of ${
            row.category === "fixed"
              ? "Basic Salary"
              : row.category === "variable"
              ? "Variable Pay"
              : "Gross Salary"
          }`;
        } else {
          return `₹${row.value.toLocaleString()}`;
        }
      },
    },
    {
      key: "taxable",
      label: "Taxable",
      render: (row) => (row.taxable === "yes" ? "Yes" : "No"),
    },
    {
      key: "applicableTo",
      label: "Applicable To",
      render: (row) => {
        if (row.applicableTo === "all") return "All Employees";
        if (row.applicableTo === "fulltime") return "Full-Time";
        if (row.applicableTo === "parttime") return "Part-Time";
        if (row.applicableTo === "contract") return "Contract";
        return row.applicableTo;
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="p-1"
            onClick={() => handleEditComponent(row)}
          >
            <FiEdit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="danger"
            className="p-1"
            onClick={() => handleDeleteComponent(row.id)}
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Salary Components
        </h1>
        <Button onClick={handleAddComponent}>
          <FiPlus className="w-4 h-4 mr-2" />
          Add Component
        </Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Manage Salary Components</h2>
          <p className="text-gray-600">
            Configure earnings and deductions that make up employee salary
            structures. Create fixed and variable components, set calculation
            rules, and define applicability.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading components...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table columns={columns} data={components} />
          </div>
        )}
      </Card>

      {/* Add/Edit Component Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          currentComponent ? "Edit Salary Component" : "Add Salary Component"
        }
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Component Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="md:col-span-2"
            />

            <Select
              label="Type"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              options={[
                { value: "earning", label: "Earning" },
                { value: "deduction", label: "Deduction" },
              ]}
            />

            <Select
              label="Category"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              options={[
                { value: "fixed", label: "Fixed" },
                { value: "variable", label: "Variable" },
                { value: "allowance", label: "Allowance" },
                { value: "adhoc", label: "Ad-hoc" },
              ]}
            />

            <Select
              label="Calculation Type"
              id="calculationType"
              name="calculationType"
              value={formData.calculationType}
              onChange={handleInputChange}
              options={[
                { value: "fixed", label: "Fixed Amount" },
                { value: "percentage", label: "Percentage" },
              ]}
            />

            <Input
              label={`Value ${
                formData.calculationType === "percentage" ? "(%)" : "(₹)"
              }`}
              id="value"
              name="value"
              type="number"
              value={formData.value}
              onChange={handleInputChange}
              required
              min="0"
              step={formData.calculationType === "percentage" ? "0.01" : "1"}
            />

            <Select
              label="Taxable"
              id="taxable"
              name="taxable"
              value={formData.taxable}
              onChange={handleInputChange}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />

            <Select
              label="Applicable To"
              id="applicableTo"
              name="applicableTo"
              value={formData.applicableTo}
              onChange={handleInputChange}
              options={[
                { value: "all", label: "All Employees" },
                { value: "fulltime", label: "Full-Time Employees" },
                { value: "parttime", label: "Part-Time Employees" },
                { value: "contract", label: "Contract Employees" },
              ]}
              className="md:col-span-2"
            />

            <Input
              label="Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="md:col-span-2"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <FiSave className="w-4 h-4 mr-2" />
              {currentComponent ? "Update" : "Save"} Component
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default SalaryComponents;
