
import React from 'react';
import { cn } from '../../utils/cn';

const colorMap = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

const Badge = ({ label, variant = 'info', className }) => (
  <span className={cn('text-xs font-medium px-2 py-1 rounded-full', colorMap[variant], className)}>
    {label}
  </span>
);

export default Badge;
