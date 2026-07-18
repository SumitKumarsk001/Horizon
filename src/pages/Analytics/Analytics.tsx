import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const lineData = [
  { month: "Jan", income: 4000, expense: 2400 },
  { month: "Feb", income: 3200, expense: 2200 },
  { month: "Mar", income: 4500, expense: 2600 },
  { month: "Apr", income: 5000, expense: 2900 },
  { month: "May", income: 4200, expense: 2500 },
  { month: "Jun", income: 6000, expense: 3400 },
];

const pieData = [
  { name: "Food", value: 35 },
  { name: "Shopping", value: 25 },
  { name: "Bills", value: 20 },
  { name: "Travel", value: 20 },
];

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

const Analytics = () => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Analytics
        </h1>

        <p className="text-slate-500">
          Monitor your financial performance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          <p className="text-slate-500">Income</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            $24,000
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          <p className="text-slate-500">Expense</p>
          <h2 className="mt-2 text-3xl font-bold text-red-500">
            $13,500
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          <p className="text-slate-500">Savings</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            $10,500
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          <p className="text-slate-500">Growth</p>
          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            +18%
          </h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">

        {/* Line Chart */}
        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">

          <h2 className="mb-6 text-xl font-semibold dark:text-white">
            Income vs Expense
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={3}
                />

                <Line
                  dataKey="expense"
                  stroke="#ef4444"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Pie Chart */}
        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">

          <h2 className="mb-6 text-xl font-semibold dark:text-white">
            Expense Categories
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;