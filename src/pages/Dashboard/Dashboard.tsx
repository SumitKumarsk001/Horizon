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
import PageHeader from "../../components/Common/PageHeader";
import ErrorBoundary from "../../components/Common/ErrorBoundary";

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
    
    <PageHeader
    title="Dashboard"
    subtitle="Welcome back! Here's your financial overview."
/>

      {/* Stat Cards */}
       <ErrorBoundary>
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
        </ErrorBoundary>
        {/* Overview Chart & Bank Card */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            <ErrorBoundary>
            <OverviewChart />
            </ErrorBoundary>
            <ErrorBoundary>
             <BankCard
              holderName={userName}
              cardNumber="**** **** **** 1234"
              balance="$12,540.00"
              expiry="12/29"
              />
              </ErrorBoundary>
        </div>
        
        <div className="mt-8">
          <ErrorBoundary>
            <RecentTransactions />
            </ErrorBoundary>
        </div>

    </div>
  );
};

export default Dashboard;