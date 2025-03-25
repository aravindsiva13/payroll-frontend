import { useState, useEffect } from "react";
import {
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiActivity,
} from "react-icons/fi";
import { Card } from "../components/ui";
import { api } from "../services/mockApi";
import { formatDate, formatCurrency } from "../utils";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await api.getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-red-500">Failed to load dashboard data</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-blue-100 mr-4">
            <FiUsers className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Employees</div>
            <div className="text-2xl font-semibold">{data.totalEmployees}</div>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-green-100 mr-4">
            <FiDollarSign className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Monthly Salary</div>
            <div className="text-2xl font-semibold">
              {formatCurrency(data.monthlySalaryTotal)}
            </div>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-yellow-100 mr-4">
            <FiCalendar className="text-yellow-600 w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Pending Leaves</div>
            <div className="text-2xl font-semibold">{data.pendingLeaves}</div>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-purple-100 mr-4">
            <FiFileText className="text-purple-600 w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Pending Expenses</div>
            <div className="text-2xl font-semibold">{data.pendingExpenses}</div>
          </div>
        </Card>
      </div>

      {/* Department distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Department Distribution">
          <div className="space-y-4">
            {data.departmentDistribution.map((dept) => (
              <div key={dept.department} className="flex items-center">
                <div className="w-32 text-sm">{dept.department}</div>
                <div className="flex-1">
                  <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full"
                      style={{
                        width: `${(dept.count / data.totalEmployees) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-sm font-medium">{dept.count}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activities */}
        <Card title="Recent Activities">
          <div className="space-y-4">
            {data.recentActivities.map((activity, index) => (
              <div key={index} className="flex">
                <div className="mt-1">
                  <FiActivity className="text-primary w-5 h-5" />
                </div>
                <div className="ml-4">
                  <div className="text-sm">{activity.description}</div>
                  <div className="text-xs text-gray-500">
                    {formatDate(activity.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
