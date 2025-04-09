// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Users, Settings, Bell } from 'lucide-react';

const Sidebar = () => {
   const links = [
      { to: '/', label: 'Dashboard', icon: <Home size={18} /> },
      { to: '/properties', label: 'Properties', icon: <FileText size={18} /> },
      { to: '/tenants', label: 'Tenants', icon: <Users size={18} /> },
      { to: '/payments', label: 'Payments', icon: <FileText size={18} /> },
      { to: '/leases', label: 'Leases', icon: <FileText size={18} /> },
      { to: '/maintenance', label: 'Maintenance', icon: <Settings size={18} /> },
      { to: '/notifications', label: 'Notifications', icon: <Bell size={18} /> },
      { to: '/reports', label: 'Reports', icon: <FileText size={18} /> },
      { to: '/documents', label: 'Documents', icon: <FileText size={18} /> }
   ];

   return (
      <aside className="w-64 h-full bg-white shadow-lg fixed top-0 left-0 hidden md:flex flex-col z-40">
         <div className="p-4 border-b font-bold text-lg">PDL Rentals</div>
         <nav className="flex-1 overflow-y-auto">
            <ul className="p-2 space-y-1">
               {links.map((link) => (
                  <li key={link.to}>
                     <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                           `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-100 transition ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600'
                           }`
                        }
                     >
                        {link.icon}
                        <span>{link.label}</span>
                     </NavLink>
                  </li>
               ))}
            </ul>
         </nav>
      </aside>
   );
};

export default Sidebar;
