
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CreditCard, MapPin } from 'lucide-react';

interface DashboardStatsProps {
  totalBookings: number;
  totalSpent: number;
  citiesVisited: number;
}

const DashboardStats = ({ totalBookings, totalSpent, citiesVisited }: DashboardStatsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">{totalBookings}</p>
              <p className="text-gray-600">Total Pemesanan</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {formatPrice(totalSpent)}
              </p>
              <p className="text-gray-600">Total Pengeluaran</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">{citiesVisited}</p>
              <p className="text-gray-600">Kota Dikunjungi</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
