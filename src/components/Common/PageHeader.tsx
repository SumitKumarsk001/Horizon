import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  action?: ReactNode;
};

const PageHeader = ({
  title,
  subtitle,
  action,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          {title}
        </h1>

        <p className="text-slate-500">
          {subtitle}
        </p>
      </div>

      {action}
    </div>
  );
};

export default PageHeader;