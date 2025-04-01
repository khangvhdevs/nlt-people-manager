
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  ClipboardCheck, 
  UserX, 
  Settings, 
  Menu,
  Home,
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const menuItems = [
    { 
      name: t('sidebar.dashboard'), 
      icon: <Home size={20} />, 
      path: '/',
      roles: ['user', 'hr', 'leader', 'co-leader', 'admin']
    },
    { 
      name: t('sidebar.employees'), 
      icon: <Users size={20} />, 
      path: '/employees',
      roles: ['hr', 'leader', 'co-leader', 'admin']
    },
    { 
      name: t('sidebar.teams'), 
      icon: <UserPlus size={20} />, 
      path: '/teams',
      roles: ['hr', 'leader', 'co-leader', 'admin']
    },
    { 
      name: t('sidebar.attendance'), 
      icon: <ClipboardCheck size={20} />, 
      path: '/attendance',
      roles: ['user', 'hr', 'leader', 'co-leader', 'admin']
    },
    { 
      name: t('sidebar.blacklist'), 
      icon: <UserX size={20} />, 
      path: '/blacklist',
      roles: ['hr', 'admin']
    },
    { 
      name: t('sidebar.settings'), 
      icon: <Settings size={20} />, 
      path: '/settings',
      roles: ['user', 'hr', 'leader', 'co-leader', 'admin']
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = user 
    ? menuItems.filter(item => item.roles.includes(user.role))
    : menuItems;

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground shadow-lg transition-transform duration-300 transform md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8" />
            <span className="text-xl font-bold">{t('app.name')}</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggle} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {filteredMenuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-sidebar-accent transition-colors duration-200"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {user && (
          <div className="p-4 border-t border-sidebar-border mt-auto">
            <Button
              variant="ghost"
              className="flex items-center w-full justify-start text-sm hover:bg-sidebar-accent"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>{t('auth.logout')}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
