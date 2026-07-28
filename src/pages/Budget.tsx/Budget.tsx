import { FiDollarSign, FiTarget, FiTrendingUp } from "react-icons/fi";
import WorkspaceCard from "../../components/Common/WorkspaceCard";
import PageHeader from "../../components/Common/PageHeader";
import OfflineFallback from "../../components/Common/OfflineFallback";
import useNetworkStatus from "../../hooks/useNetworkStatus";

type BudgetItem = {
  id: number;
  category: string;
  spent: number;
  budget: number;
};

const budgetData: BudgetItem[] = [
  {
    id: 1,
    category: "Food",
    spent: 420,
    budget: 600,
  },
  {
    id: 2,
    category: "Shopping",
    spent: 750,
    budget: 1000,
  },
  {
    id: 3,
    category: "Travel",
    spent: 350,
    budget: 500,
  },
  {
    id: 4,
    category: "Entertainment",
    spent: 180,
    budget: 300,
  },
  {
    id: 5,
    category: "Bills",
    spent: 280,
    budget: 400,
  },
];

const Budget = () => {
    // Load transactions and compute spent per category
    let stored: { id:number; title:string; category:string; date:string; amount:number; status: string }[] = [];
    try {
      const s = localStorage.getItem("transactions");
      if (s) stored = JSON.parse(s);
    } catch (e) { console.error(e); }

    const spentByCategory = (cat: string) =>
      stored
        .filter((t) => t.status === "Expense" && t.category === cat)
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
    const totalSpent = budgetData.reduce((sum, item) => sum + spentByCategory(item.category), 0);
    const remaining = totalBudget - totalSpent;

    const online = useNetworkStatus();
    if (!online) {
  return (
    <OfflineFallback
      onRetry={() => window.location.reload()}
    />
  );
}

  return (
    <div className="space-y-8">

      {/* Header */}
        <PageHeader
    title=" Budget"
    subtitle="Track your monthly spending and stay within budget.."
     />
      

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        <WorkspaceCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Total Budget
              </p>

              <h2 className="mt-2 text-3xl font-bold dark:text-white">
                ${totalBudget}
              </h2>
            </div>

            <FiTarget
              size={34}
              className="text-blue-600"
            />
          </div>
        </WorkspaceCard>

        <WorkspaceCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Total Spent
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-500">
                ${totalSpent}
              </h2>
            </div>

            <FiDollarSign
              size={34}
              className="text-red-500"
            />
          </div>
        </WorkspaceCard>

        <WorkspaceCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Remaining
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                ${-remaining}
              </h2>
            </div>

            <FiTrendingUp
              size={34}
              className="text-green-600"
            />
          </div>
        </WorkspaceCard>

      </div>

      {/* Budget Categories */}
      <WorkspaceCard title=" Monthly Budget Overview">
        <div className="space-y-6">

          {budgetData.map((item) => {
            const percentage = (item.spent / item.budget) * 100;

            return (
              <div key={item.id}>

                <div className="mb-2 flex justify-between">

                  <div>
                    <h3 className="font-semibold dark:text-white">
                      {item.category}
                    </h3>

                    <p className="text-sm text-slate-500">
                      ${item.spent} of ${item.budget}
                    </p>
                  </div>

                  <span className="font-semibold dark:text-white">
                    {percentage.toFixed(0)}%
                  </span>

                </div>

                {/* Progress Bar */}

                <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700">

                  <div
                    className={`h-3 rounded-full transition-all ${
                      percentage >= 90
                        ? "bg-red-500"
                        : percentage >= 70
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>
      </WorkspaceCard>

    </div>
  );
};

export default Budget;