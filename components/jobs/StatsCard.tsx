import React from "react";

interface StatsCardProps {
  title: string;
  count: string | number;
  icon: React.ReactNode;
  iconBgClass: string;
  iconColorClass: string;
}

const StatsCard = ({
  title,
  count,
  icon,
  iconBgClass,
  iconColorClass,
}: StatsCardProps) => {
  return (
    <div className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 cursor-default flex items-center justify-between">
      <div>
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 group-hover:text-gray-600 transition-colors">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">
          {count}
        </p>
      </div>

      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBgClass} ${iconColorClass} shadow-inner group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
