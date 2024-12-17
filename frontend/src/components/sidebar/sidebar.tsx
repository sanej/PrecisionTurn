// components/sidebar/Sidebar.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, LineChart, TrendingUp, Grid, Brain, 
  Clock, Wrench, Map, FileText, Bot, Database, 
  Settings, PanelLeftClose
} from 'lucide-react';

const menuSections = [
  {
    items: [
      { id: 'home', label: 'Home', icon: Home, path: '/' },
      { id: 'ops', label: 'Ops Intelligence', icon: LineChart, path: '/ops-intelligence' },
      { id: 'value', label: 'Value Pulse', icon: TrendingUp, path: '/value-pulse' },
      { id: 'strategic', label: 'Strategic Intelligence', icon: Grid, path: '/strategic-intelligence' },
    ]
  },
  {
    title: 'TURNAROUND MANAGEMENT',
    items: [
      { id: 'navigator', label: 'Turnaround Navigator', icon: Brain, path: '/navigator' },
      { id: 'tasks', label: 'Tasks & Schedule', icon: Clock, path: '/tasks' },
      { id: 'organization', label: 'Organization & Assets', icon: Wrench, path: '/organization' },
      { id: 'map', label: 'Map View', icon: Map, path: '/map' },
    ]
  },
  {
    title: 'RESOURCES',
    items: [
      { id: 'documents', label: 'Documents Hub', icon: FileText, path: '/documents' },
      { id: 'ai-agents', label: 'AI Agents Hub', icon: Bot, path: '/ai-agents' },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'integration', label: 'Integration Hub', icon: Database, path: '/integration' },
      { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    ]
  }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div 
      className={`flex flex-col flex-shrink-0 border-r border-gray-200 bg-white
        ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}
    >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center h-14 px-4 border-b border-gray-200">
          <div 
            className={`flex items-center gap-2 ${collapsed ? 'w-full justify-center cursor-pointer' : ''}`}
            onClick={collapsed ? () => setCollapsed(false) : undefined}
          >
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">PT</span>
            </div>
          {!collapsed && (
            <span className="font-semibold text-lg">PrecisionTurn</span>
          )}
        </div>
        
        {/* Only show toggle button when expanded */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="ml-auto p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors
              group relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PanelLeftClose size={18} />
            <span className="absolute hidden group-hover:block right-0 translate-x-full px-2 py-1 ml-2 
              text-xs text-white bg-gray-900 rounded-md pointer-events-none whitespace-nowrap">
              Collapse sidebar
            </span>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {section.title && !collapsed && (
              <h3 className="mb-2 px-2 text-xs font-medium text-gray-500">
                {section.title}
              </h3>
            )}
            
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`flex items-center gap-x-3 px-2 py-2 text-sm rounded-lg 
                      transition-colors duration-200 group relative
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    {!collapsed && <span>{item.label}</span>}
                    {collapsed && (
                      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs 
                        rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}