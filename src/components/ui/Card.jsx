
import React from 'react';
import { cn } from '../..//utils/cn';

const Card = ({ title, children, footer, className }) => (
  <div className={cn('bg-white rounded-lg shadow p-4', className)}>
    {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
    <div>{children}</div>
    {footer && <div className="mt-4 border-t pt-2 text-sm text-gray-500">{footer}</div>}
  </div>
);

export default Card;
