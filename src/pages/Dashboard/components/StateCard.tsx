import React from "react";

type StatCardProps = {
  title: string;
  amount: string;
  percentage: string;
  icon: React.ReactNode;
};

const StatCard = ({
  title,
  amount,
  percentage,
  icon,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {amount}
          </h2>

          <p className="mt-2 text-sm font-medium text-green-600">
            {percentage}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;