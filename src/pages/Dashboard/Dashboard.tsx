import {
  FiCreditCard,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

import StatCard from "./components/StateCard";
import OverviewChart from "./components/OverviewChart";
import BankCard from "./components/BankCard";
import { TfiWallet } from "react-icons/tfi";
import RecentTransactions from "./components/RecentTransactions";

const parseUserName = () => {
  if (typeof window === "undefined") return "";
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return "";

  try {
    const user = JSON.parse(storedUser) as {
      firstName?: string;
      lastName?: string;
    };
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  } catch {
    return "";
  }
};



const Dashboard = () => {
  const userName = parseUserName() || "Card Holder";

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

         <StatCard
          title="Total Balance"
          amount="$23,450"
          percentage="+12%"
          icon={<TfiWallet size={26} />}
        /> 

        <StatCard
          title="Income"
          amount="$8,540"
          percentage="+8%"
          icon={<FiTrendingUp size={26} />}
        />

        <StatCard
          title="Expenses"
          amount="$2,350"
          percentage="-4%"
          icon={<FiCreditCard size={26} />}
        />

        <StatCard
          title="Savings"
          amount="$13,200"
          percentage="+15%"
          icon={<FiDollarSign size={26} />}
        />

      </div>

        {/* Overview Chart */}
        <div>
            <OverviewChart />
        </div>
        <div>
             <BankCard
              holderName={userName}
              cardNumber="**** **** **** 1234"
              balance="$12,540.00"
              expiry="12/29"
              />
        </div>
        <div className="mt-8">
            <RecentTransactions />
        </div>

    </div>
  );
};

export default Dashboard;