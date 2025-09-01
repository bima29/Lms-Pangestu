import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-primary-900">Pangestu LMS</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <img 
                src={user?.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1'} 
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/profile'}
              className="flex items-center gap-2 border-primary-500 text-primary-700 hover:bg-primary-50 hover:border-primary-700 transition-colors px-3 py-1 rounded-md shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-xs font-semibold">Pengaturan Profil</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2 border-red-400 text-red-600 hover:bg-red-50 hover:border-red-600 transition-colors px-3 py-1 rounded-md shadow-sm"
            >
              <LogOut className="h-4 w-4 mr-1 text-red-400" />
              <span className="text-xs font-semibold">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;