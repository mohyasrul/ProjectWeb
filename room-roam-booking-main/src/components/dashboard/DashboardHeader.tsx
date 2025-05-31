
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  username: string;
  onLogout: () => void;
}

const DashboardHeader = ({ username, onLogout }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Selamat datang kembali, {username}!</h1>
        <p className="text-gray-600">Kelola pemesanan dan pengaturan akun Anda</p>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => navigate('/user-profile')} variant="outline">
          <User className="h-4 w-4 mr-2" />
          Edit Profil
        </Button>
        <Button onClick={onLogout} variant="outline">
          Keluar
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
