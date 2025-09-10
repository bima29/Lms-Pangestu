import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  name: string;
  path: string | string[];
  icon: LucideIcon;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-primary-900 text-white h-screen flex flex-col">
      <div className="p-6 flex-shrink-0">
        <h2 className="text-xl font-bold text-accent-400">Pangestu LMS</h2>
        <p className="text-xs text-primary-300 mt-1">Learning Management System</p>
      </div>
      
      <nav className="px-3 flex-1 overflow-y-auto sidebar-scroll">
        {items.map((item) => {
          const Icon = item.icon;
          const paths = Array.isArray(item.path) ? item.path : [item.path];
          // Active if current path starts with any of the paths (for dynamic routes)
          const isActive = paths.some(p => location.pathname.startsWith(p));
          return (
            <Link
              key={paths[0]}
              to={paths[0]}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 ${
                isActive 
                  ? 'bg-accent-500 text-white' 
                  : 'text-primary-200 hover:bg-primary-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;