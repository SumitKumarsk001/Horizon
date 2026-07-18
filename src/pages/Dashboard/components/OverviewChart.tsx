import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", income: 1200 },
  { month: "Feb", income: 1900 },
  { month: "Mar", income: 1600 },
  { month: "Apr", income: 2400 },
  { month: "May", income: 2200 },
  { month: "Jun", income: 2900 },
  { month: "Jul", income: 2600 },
  { month: "Aug", income: 3200 },
  { month: "Sep", income: 3000 },
  { month: "Oct", income: 3700 },
  { month: "Nov", income: 3400 },
  { month: "Dec", income: 4200 },
];

const OverviewChart = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Overview
          </h2>
          <p className="text-sm text-slate-500">
            Monthly income overview
          </p>
        </div>

        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700">
          This Year
        </button>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#2563eb"
              strokeWidth={4}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewChart;