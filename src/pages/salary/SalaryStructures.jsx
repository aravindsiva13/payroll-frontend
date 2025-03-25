import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiPlusCircle,
  FiMinusCircle,
} from "react-icons/fi";
import {
  Card,
  Button,
  Input,
  Table,
  Modal,
  Select,
  Alert,
  Badge,
} from "../../components/ui";
import { api } from "../../services/mockApi";

function SalaryStructures() {
  const [structures, setStructures] = useState([]);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStructure, setCurrentStructure] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    employeeType: "fulltime",
    status: "active",
    components: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [structuresData, componentsData] = await Promise.all([
        api.getSalaryStructures(),
        api.getSalaryComponents(),
      ]);
      setStructures(structuresData);
      setComponents(componentsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ type: "error", message: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStructure = () => {
    setCurrentStructure(null);
    setFormData({
      name: "",
      description: "",
      employeeType: "fulltime",
      status: "active",
      components: [],
    });
    setModalOpen(true);
  };

  const handleEditStructure = (structure) => {
    setCurrentStructure(structure);
    setFormData({
      name: structure.name,
      description: structure.description,
      employeeType: structure.employeeType,
      status: structure.status,
      components: [...structure.components],
    });
    setModalOpen(true);
  };

  const handleDuplicateStructure = (structure) => {
    setCurrentStructure(null);
    setFormData({
      name: `Copy of ${structure.name}`,
      description: structure.description,
      employeeType: structure.employeeType,
      status: "active",
      components: [...structure.components],
    });
    setModalOpen(true);
  };

  const handleDeleteStructure = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this salary structure?")
    ) {
      try {
        await api.deleteSalaryStructure(id);
        setAlert({
          type: "success",
          message: "Salary structure deleted successfully",
        });
        fetchData();
      } catch (error) {
        console.error("Error deleting structure:", error);
        setAlert({
          type: "error",
          message: "Failed to delete salary structure",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddComponent = () => {
    if (components.length === 0) {
      setAlert({
        type: "error",
        message:
          "No salary components available. Please create components first.",
      });
      return;
    }

    // Find a component that's not already added
    const availableComponents = components.filter(
      (comp) => !formData.components.some((c) => c.componentId === comp.id)
    );

    if (availableComponents.length === 0) {
      setAlert({
        type: "error",
        message: "All available components have been added.",
      });
      return;
    }

    const newComponent = {
      componentId: availableComponents[0].id,
      value:
        availableComponents[0].calculationType === "fixed"
          ? availableComponents[0].value
          : 0,
      isPercentage: availableComponents[0].calculationType === "percentage",
      percentageOf:
        availableComponents[0].calculationType === "percentage"
          ? "basicSalary"
          : null,
      percentageValue:
        availableComponents[0].calculationType === "percentage"
          ? availableComponents[0].value
          : 0,
    };

    setFormData({
      ...formData,
      components: [...formData.components, newComponent],
    });
  };

  const handleRemoveComponent = (index) => {
    const updatedComponents = [...formData.components];
    updatedComponents.splice(index, 1);
    setFormData({ ...formData, components: updatedComponents });
  };

  const handleComponentChange = (index, field, value) => {
    const updatedComponents = [...formData.components];
    updatedComponents[index][field] = value;
    setFormData({ ...formData, components: updatedComponents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentStructure) {
        await api.updateSalaryStructure(currentStructure.id, formData);
        setAlert({
          type: "success",
          message: "Salary structure updated successfully",
        });
      } else {
        await api.createSalaryStructure(formData);
        setAlert({
          type: "success",
          message: "Salary structure added successfully",
        });
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving structure:", error);
      setAlert({ type: "error", message: "Failed to save salary structure" });
    }
  };

  const getComponentName = (componentId) => {
    const component = components.find((c) => c.id === componentId);
    return component ? component.name : "Unknown Component";
  };

  const getComponentType = (componentId) => {
    const component = components.find((c) => c.id === componentId);
    return component ? component.type : "earning";
  };

  const columns = [
    { key: "name", label: "Structure Name" },
    {
      key: "employeeType",
      label: "Employee Type",
      render: (row) => {
        if (row.employeeType === "fulltime") return "Full-Time";
        if (row.employeeType === "parttime") return "Part-Time";
        if (row.employeeType === "contract") return "Contract";
        return row.employeeType;
      },
    },
    {
      key: "componentCount",
      label: "Components",
      render: (row) => row.components.length,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge color={row.status === "active" ? "green" : "gray"}>
          {row.status === "active" ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="p-1"
            onClick={() => handleEditStructure(row)}
          >
            <FiEdit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="p-1"
            onClick={() => handleDuplicateStructure(row)}
          >
            <FiCopy className="w-4 h-4" />
          </Button>
          <Button
            variant="danger"
            className="p-1"
            onClick={() => handleDeleteStructure(row.id)}
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
          Salary Structures
        </h1>
        <Button onClick={handleAddStructure}>
          <FiPlus className="w-4 h-4 mr-2" />
          Create Structure
        </Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Manage Salary Structures</h2>
          <p className="text-gray-600">
            Create and manage different salary structures for various types of
            employees. Combine salary components to build comprehensive pay
            packages.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading salary structures...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table columns={columns} data={structures} />
          </div>
        )}
      </Card>

      {/* Add/Edit Structure Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          currentStructure ? "Edit Salary Structure" : "Create Salary Structure"
        }
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Structure Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
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

            <Select
              label="Employee Type"
              id="employeeType"
              name="employeeType"
              value={formData.employeeType}
              onChange={handleInputChange}
              options={[
                { value: "fulltime", label: "Full-Time" },
                { value: "parttime", label: "Part-Time" },
                { value: "contract", label: "Contract" },
              ]}
            />

            <Select
              label="Status"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium">Structure Components</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddComponent}
              >
                <FiPlusCircle className="w-4 h-4 mr-1" />
                Add Component
              </Button>
            </div>

            {formData.components.length === 0 ? (
              <div className="bg-gray-50 border rounded-md p-6 text-center">
                <p className="text-gray-500">
                  No components added yet. Click "Add Component" to start
                  building your salary structure.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.components.map((component, index) => {
                  const componentName = getComponentName(component.componentId);
                  const componentType = getComponentType(component.componentId);
                  const isDeduction = componentType === "deduction";

                  return (
                    <div
                      key={index}
                      className={`border rounded-md p-4 ${
                        isDeduction ? "bg-red-50" : "bg-green-50"
                      }`}
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-medium flex items-center">
                          {isDeduction ? (
                            <FiMinusCircle className="text-red-500 mr-2" />
                          ) : (
                            <FiPlusCircle className="text-green-500 mr-2" />
                          )}
                          {componentName}
                        </div>
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          className="p-1"
                          onClick={() => handleRemoveComponent(index)}
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Select
                          label="Component"
                          value={component.componentId}
                          onChange={(e) =>
                            handleComponentChange(
                              index,
                              "componentId",
                              parseInt(e.target.value)
                            )
                          }
                          options={components.map((c) => ({
                            value: c.id,
                            label: c.name,
                          }))}
                        />

                        {component.isPercentage ? (
                          <>
                            <Input
                              label="Percentage Value (%)"
                              type="number"
                              value={component.percentageValue}
                              onChange={(e) =>
                                handleComponentChange(
                                  index,
                                  "percentageValue",
                                  parseFloat(e.target.value)
                                )
                              }
                              min="0"
                              step="0.01"
                            />

                            <Select
                              label="Percentage Of"
                              value={component.percentageOf}
                              onChange={(e) =>
                                handleComponentChange(
                                  index,
                                  "percentageOf",
                                  e.target.value
                                )
                              }
                              options={[
                                { value: "basicSalary", label: "Basic Salary" },
                                { value: "grossSalary", label: "Gross Salary" },
                              ]}
                            />
                          </>
                        ) : (
                          <Input
                            label="Fixed Value (₹)"
                            type="number"
                            value={component.value}
                            onChange={(e) =>
                              handleComponentChange(
                                index,
                                "value",
                                parseInt(e.target.value)
                              )
                            }
                            min="0"
                          />
                        )}

                        <Select
                          label="Calculation Type"
                          value={
                            component.isPercentage ? "percentage" : "fixed"
                          }
                          onChange={(e) =>
                            handleComponentChange(
                              index,
                              "isPercentage",
                              e.target.value === "percentage"
                            )
                          }
                          options={[
                            { value: "fixed", label: "Fixed Amount" },
                            { value: "percentage", label: "Percentage Based" },
                          ]}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
              <FiCheck className="w-4 h-4 mr-2" />
              {currentStructure ? "Update" : "Save"} Structure
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default SalaryStructures;
