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
import WorkspaceCard from "../../components/Common/WorkspaceCard";
import PageHeader from "../../components/Common/PageHeader";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

const Analytics = () => {
  // derive data from stored transactions
  let stored: { amount:number; status:string; category:string; date:string }[] = [];
  try {
    const s = localStorage.getItem("transactions");
    if (s) stored = JSON.parse(s);
  } catch (e) { console.error(e); }

  const totalIncome = stored.filter((t) => t.status === "Income").reduce((s, t) => s + (t.amount||0), 0);
  const totalExpense = stored.filter((t) => t.status === "Expense").reduce((s, t) => s + (t.amount||0), 0);
  const savings = totalIncome - totalExpense;

  const categoryMap: Record<string, number> = {};
  stored.filter((t) => t.status === "Expense").forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + (t.amount || 0);
  });

  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  // simple monthly aggregation for last 6 months
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const lineData = months.slice(0,6).map((m) => ({ month: m, income: 0, expense: 0 }));
  stored.forEach((t) => {
    const d = new Date(t.date);
    if (!isNaN(d.getTime())) {
      const m = d.getMonth();
      const entry = lineData[m % lineData.length];
      if (entry) {
        if (t.status === "Income") entry.income += t.amount || 0;
        else entry.expense += t.amount || 0;
      }
    }
  });

  return (
    <div className="space-y-8">

      {/* Header */}
      <PageHeader
    title="Analytics"
    subtitle=" Monitor your financial performance."
     />

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <WorkspaceCard>
          <p className="text-slate-500">Income</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            ${totalIncome}
          </h2>
        </WorkspaceCard>

        <WorkspaceCard>
          <p className="text-slate-500">Expense</p>
          <h2 className="mt-2 text-3xl font-bold text-red-500">
            ${totalExpense}
          </h2>
        </WorkspaceCard>

        <WorkspaceCard>
          <p className="text-slate-500">Savings</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            ${savings}
          </h2>
        </WorkspaceCard>

        <WorkspaceCard>
          <p className="text-slate-500">Growth</p>
          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            +18%
          </h2>
        </WorkspaceCard>

      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">

        {/* Line Chart */}
        <WorkspaceCard title="Income vs Expense">
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
        </WorkspaceCard>

        {/* Pie Chart */}
        <WorkspaceCard title=" Expense Categories">
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
        </WorkspaceCard>

      </div>

    </div>
  );
};

export default Analytics;