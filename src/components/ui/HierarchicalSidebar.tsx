import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarItem {
  name: string;
  path?: string;
  icon: LucideIcon;
  children?: SidebarItem[];
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

interface HierarchicalSidebarProps {
  groups: SidebarGroup[];
}

const HierarchicalSidebar: React.FC<HierarchicalSidebarProps> = ({ groups }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const hasActiveChild = (item: SidebarItem): boolean => {
    if (item.path && isActive(item.path)) return true;
    if (item.children) {
      return item.children.some(child => hasActiveChild(child));
    }
    return false;
  };

  const renderItem = (item: SidebarItem, level: number = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.name);
    const itemIsActive = item.path ? isActive(item.path) : false;
    const hasActiveChildren = hasActiveChild(item);

    const paddingLeft = level === 0 ? 'pl-3' : level === 1 ? 'pl-6' : 'pl-9';

    return (
      <div key={item.name}>
        {item.path ? (
          <Link
            to={item.path}
            className={`flex items-center gap-3 ${paddingLeft} pr-3 py-2.5 rounded-lg mb-1 transition-all duration-200 ${
              itemIsActive 
                ? 'bg-accent-500 text-white' 
                : hasActiveChildren
                ? 'bg-primary-800 text-accent-300'
                : 'text-primary-200 hover:bg-primary-800 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium flex-1">{item.name}</span>
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleExpanded(item.name);
                }}
                className="p-1 hover:bg-primary-700 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
          </Link>
        ) : (
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`flex items-center gap-3 ${paddingLeft} pr-3 py-2.5 rounded-lg mb-1 transition-all duration-200 w-full ${
              hasActiveChildren
                ? 'bg-primary-800 text-accent-300'
                : 'text-primary-200 hover:bg-primary-800 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium flex-1 text-left">{item.name}</span>
            {hasChildren && (
              isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )
            )}
          </button>
        )}
        
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-primary-900 text-white h-screen flex flex-col">
      <div className="p-6 flex-shrink-0">
        <h2 className="text-xl font-bold text-accent-400">Pangestu LMS</h2>
        <p className="text-xs text-primary-300 mt-1">Learning Management System</p>
      </div>
      
      <nav className="px-3 flex-1 overflow-y-auto sidebar-scroll">
        {groups.map((group, groupIndex) => (
          <div key={group.title} className={groupIndex > 0 ? 'mt-6' : ''}>
            {group.title && (
              <h3 className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-2 px-3">
                {group.title}
              </h3>
            )}
            {group.items.map(item => renderItem(item))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default HierarchicalSidebar;
