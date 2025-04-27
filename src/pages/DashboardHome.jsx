
import React from 'react';
import StatCard from '@/components/ui/StatCard';
import { Users, Home, DollarSign, Wrench } from 'lucide-react'; // example icons

const stats = [
  {
    title: 'Tenants',
    value: '124',
    sublabel: '+5% this month',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Properties',
    value: '37',
    sublabel: '+2 new listings',
    icon: Home,
    color: 'green',
  },
  {
    title: 'Payments',
    value: '$56,340',
    sublabel: '+$3,200 collected',
    icon: DollarSign,
    color: 'yellow',
  },
  {
    title: 'Maintenance Requests',
    value: '9',
    sublabel: '2 urgent',
    icon: Wrench,
    color: 'red',
  },
];

const DashboardHome = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            sublabel={stat.sublabel}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
