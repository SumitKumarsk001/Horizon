import { FiDollarSign, FiTarget, FiTrendingUp } from "react-icons/fi";

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
  const totalBudget = budgetData.reduce(
    (sum, item) => sum + item.budget,
    0
  );

  const totalSpent = budgetData.reduce(
    (sum, item) => sum + item.spent,
    0
  );

  const remaining = totalBudget - totalSpent;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Budget
        </h1>

        <p className="text-slate-500">
          Track your monthly spending and stay within budget.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
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
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
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
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Remaining
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                ${remaining}
              </h2>
            </div>

            <FiTrendingUp
              size={34}
              className="text-green-600"
            />
          </div>
        </div>

      </div>

      {/* Budget Categories */}
      <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">

        <h2 className="mb-6 text-xl font-semibold dark:text-white">
          Monthly Budget Overview
        </h2>

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

      </div>

    </div>
  );
};

export default Budget;