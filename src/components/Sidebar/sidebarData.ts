

import {
  FiHome,
  FiCreditCard,
  FiBarChart2,
  FiDollarSign,
  FiPieChart,
  FiSettings,
} from "react-icons/fi";


export const sidebarItems  = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    title: "Cards",
    path: "/dashboard/cards",
    icon: FiCreditCard,
  },
  {
    title: "Transactions",
    path: "/dashboard/transactions",
    icon: FiDollarSign,
  },
  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: FiBarChart2,
  },
  {
    title: "Budget",
    path: "/dashboard/budget",
    icon: FiPieChart,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: FiSettings,
  },
 
];