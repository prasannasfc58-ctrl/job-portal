"use client"

import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SkillMatchChartProps {
  value: number;
}

const RADIAN = Math.PI / 180;

export function SkillMatchChart({ value }: SkillMatchChartProps) {
  const data = [
    { name: 'match', value: value },
    { name: 'remaining', value: 100 - value },
  ];

  return (
    <div className="w-10 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            dataKey="value"
            innerRadius={12}
            outerRadius={16}
            stroke="none"
            paddingAngle={0}
          >
            <Cell fill="hsl(var(--primary))" />
            <Cell fill="hsl(var(--primary) / 0.2)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
