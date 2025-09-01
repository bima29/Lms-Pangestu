import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import Button from '../components/ui/Button';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <ShieldX className="h-16 w-16 text-error-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h1>
        <p className="text-gray-600 mb-6">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <Link to="/login">
          <Button>Kembali ke Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;