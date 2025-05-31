
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from './DatePicker';
import { useAuthStore } from '../store/authStore';

// Mock hotel data to get the correct hotel and room info
const mockHotels = [
  {
    id: 1,
    name: "Grand Hyatt Jakarta",
    location: "Jakarta Pusat, DKI Jakarta",
    rooms: [
      {
        id: 1,
        type: "Kamar Queen Standard",
        price: 1850000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 2,
    name: "The Mulia Resort Bali",
    location: "Nusa Dua, Bali",
    rooms: [
      {
        id: 1,
        type: "Ocean View Suite",
        price: 2750000,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 3,
    name: "Tugu Yogyakarta",
    location: "Yogyakarta, DIY",
    rooms: [
      {
        id: 1,
        type: "Heritage Room",
        price: 1250000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 4,
    name: "Shangri-La Hotel Surabaya",
    location: "Surabaya, Jawa Timur",
    rooms: [
      {
        id: 1,
        type: "Deluxe Room",
        price: 1950000,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 5,
    name: "The Ritz-Carlton Bali",
    location: "Nusa Dua, Bali",
    rooms: [
      {
        id: 1,
        type: "Club Ocean View",
        price: 3500000,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 6,
    name: "Hotel Indonesia Kempinski",
    location: "Jakarta Pusat, DKI Jakarta",
    rooms: [
      {
        id: 1,
        type: "Premium Room",
        price: 1750000,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 7,
    name: "The Trans Luxury Hotel Bandung",
    location: "Bandung, Jawa Barat",
    rooms: [
      {
        id: 1,
        type: "Deluxe Mountain View",
        price: 1650000,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 8,
    name: "Grand Aston City Hall Medan",
    location: "Medan, Sumatera Utara",
    rooms: [
      {
        id: 1,
        type: "Superior Room",
        price: 1450000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  // Add more hotels as needed for all the existing ones
];

const BookingForm = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const { user, setAuthModalOpen } = useAuthStore();
  
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 2,
    rooms: 1,
    specialRequests: ''
  });

  // Find the hotel and room based on URL parameters
  const hotel = mockHotels.find(h => h.id === parseInt(hotelId || '1'));
  const room = hotel?.rooms.find(r => r.id === parseInt(roomId || '1'));

  if (!hotel || !room) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel atau kamar tidak ditemukan</h1>
          <Button onClick={() => navigate('/hotels')}>Kembali ke Daftar Hotel</Button>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const diffTime = bookingData.checkOut.getTime() - bookingData.checkIn.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const totalPrice = room.price * calculateNights() * bookingData.rooms;
  const taxes = totalPrice * 0.11; // PPN 11%
  const finalTotal = totalPrice + taxes;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    // Create booking object
    const newBooking = {
      id: Date.now(),
      hotel: hotel.name,
      location: hotel.location,
      checkIn: bookingData.checkIn?.toISOString().split('T')[0] || '',
      checkOut: bookingData.checkOut?.toISOString().split('T')[0] || '',
      guests: bookingData.guests,
      rooms: bookingData.rooms,
      total: finalTotal,
      status: "Dikonfirmasi",
      image: room.image
    };

    // Store booking in localStorage (simulating database)
    const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

    console.log('Pemesanan berhasil:', { ...bookingData, hotelId, roomId, totalPrice: finalTotal });
    alert('Pemesanan berhasil! Anda akan menerima email konfirmasi segera.');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selesaikan Pemesanan Anda</h1>
          <p className="text-gray-600">{hotel.name} - {room.type}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Tamu</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nama Depan *</Label>
                      <Input
                        id="firstName"
                        value={bookingData.firstName}
                        onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nama Belakang *</Label>
                      <Input
                        id="lastName"
                        value={bookingData.lastName}
                        onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Alamat Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Tanggal Check-in *</Label>
                      <DatePicker
                        selected={bookingData.checkIn}
                        onSelect={(date) => setBookingData({...bookingData, checkIn: date})}
                        placeholder="Pilih tanggal check-in"
                      />
                    </div>
                    <div>
                      <Label>Tanggal Check-out *</Label>
                      <DatePicker
                        selected={bookingData.checkOut}
                        onSelect={(date) => setBookingData({...bookingData, checkOut: date})}
                        placeholder="Pilih tanggal check-out"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guests">Jumlah Tamu</Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value) || 1})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms">Jumlah Kamar</Label>
                      <Input
                        id="rooms"
                        type="number"
                        min="1"
                        value={bookingData.rooms}
                        onChange={(e) => setBookingData({...bookingData, rooms: parseInt(e.target.value) || 1})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Permintaan Khusus (Opsional)</Label>
                    <textarea
                      id="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Permintaan khusus atau preferensi..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                    {user ? 'Konfirmasi Pemesanan' : 'Masuk untuk Menyelesaikan Pemesanan'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Ringkasan Pemesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <img src={room.image} alt={room.type} className="w-full h-32 object-cover rounded-lg mb-3" />
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-gray-600">{room.type}</p>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{bookingData.checkIn?.toLocaleDateString('id-ID') || 'Pilih tanggal'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{bookingData.checkOut?.toLocaleDateString('id-ID') || 'Pilih tanggal'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Malam:</span>
                    <span>{calculateNights()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tamu:</span>
                    <span>{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kamar:</span>
                    <span>{bookingData.rooms}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{formatPrice(room.price)} × {calculateNights()} malam × {bookingData.rooms} kamar</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak & biaya (PPN 11%)</span>
                    <span>{formatPrice(taxes)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ Pembatalan gratis hingga 24 jam sebelum check-in
                  </p>
                  <p className="text-sm text-green-800">
                    ✓ Tidak perlu pembayaran hari ini
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
