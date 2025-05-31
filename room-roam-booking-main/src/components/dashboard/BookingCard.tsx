
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Trash2, X } from 'lucide-react';

interface BookingCardProps {
  booking: any;
  onViewDetails: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onDeleteBooking: (bookingId: string) => void;
}

const BookingCard = ({ booking, onViewDetails, onCancelBooking, onDeleteBooking }: BookingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Menunggu Konfirmasi':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={booking.image}
          alt={booking.hotel}
          className="w-full md:w-48 h-32 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {booking.hotel}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{booking.location}</span>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(booking.total)}
              </div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Check-in</span>
              </div>
              <div className="font-medium">{booking.checkIn}</div>
            </div>
            <div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Check-out</span>
              </div>
              <div className="font-medium">{booking.checkOut}</div>
            </div>
            <div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                <span>Tamu</span>
              </div>
              <div className="font-medium">{booking.guests}</div>
            </div>
            <div>
              <div className="flex items-center text-gray-600">
                <span>Kamar</span>
              </div>
              <div className="font-medium">{booking.rooms}</div>
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(booking.id)}
            >
              Lihat Detail
            </Button>
            {booking.status === 'Confirmed' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onCancelBooking(booking.id)}
              >
                <X className="h-4 w-4 mr-1" />
                Batalkan
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDeleteBooking(booking.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
