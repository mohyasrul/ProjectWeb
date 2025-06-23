import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  CreditCard,
  MapPin,
  User,
  Settings,
  LogOut,
  Star,
  Clock,
  TrendingUp,
  Award,
  Bell,
  Hotel,
  Plus,
  Eye,
  Trash2,
  X,
} from "lucide-react";
import BookingCard from "./dashboard/BookingCard";
import CancellationPolicyModal from "./CancellationPolicyModal";

interface Booking {
  id: string;
  hotel: string;
  image: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  total: number;
  status: string;
  paymentMethod?: string;
  guestName?: string;
  specialRequests?: string;
}

const UserDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  useEffect(() => {
    // Load bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    setUserBookings(bookings);

    // Generate recent activities based on bookings
    const activities = bookings
      .slice(0, 3)
      .map((booking: Booking, index: number) => ({
        id: index + 1,
        type:
          booking.status === "Dikonfirmasi"
            ? "booking_confirmed"
            : "booking_pending",
        message: `Pemesanan ${booking.hotel} di ${booking.location}`,
        time: "2 jam yang lalu",
        icon: booking.status === "Dikonfirmasi" ? "✅" : "⏳",
      }));
    setRecentActivities(activities);
  }, []);

  const handleDeleteBooking = (bookingId: string) => {
    const updatedBookings = userBookings.filter(
      (booking: Booking) => booking.id !== bookingId
    );
    setUserBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    toast({
      title: "Berhasil",
      description: "Riwayat pemesanan berhasil dihapus",
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    const booking = userBookings.find((b) => b.id === bookingId);
    if (booking) {
      setBookingToCancel(booking);
      setShowCancellationModal(true);
    }
  };

  const confirmCancelBooking = () => {
    if (!bookingToCancel) return;

    const updatedBookings = userBookings.map((booking: Booking) =>
      booking.id === bookingToCancel.id
        ? { ...booking, status: "Cancelled" }
        : booking
    );
    setUserBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

    // Calculate refund amount based on cancellation policy
    const calculateDaysUntilCheckIn = () => {
      const checkInDate = new Date(bookingToCancel.checkIn);
      const today = new Date();
      const diffTime = checkInDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    const getCancellationFee = () => {
      const daysUntilCheckIn = calculateDaysUntilCheckIn();

      if (daysUntilCheckIn >= 7) {
        return { percentage: 0, amount: 0 };
      } else if (daysUntilCheckIn >= 3) {
        return { percentage: 25, amount: bookingToCancel.total * 0.25 };
      } else if (daysUntilCheckIn >= 1) {
        return { percentage: 50, amount: bookingToCancel.total * 0.5 };
      } else {
        return { percentage: 100, amount: bookingToCancel.total };
      }
    };

    const cancellationFee = getCancellationFee();
    const refundAmount = bookingToCancel.total - cancellationFee.amount;

    toast({
      title: "Pemesanan berhasil dibatalkan",
      description: `Refund sebesar ${new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(refundAmount)} akan diproses dalam 3-7 hari kerja.`,
    });

    setBookingToCancel(null);
  };

  const handleViewDetails = (bookingId: string) => {
    navigate(`/order-details/${bookingId}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Berhasil keluar",
      description: "Anda telah berhasil keluar dari akun",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Silakan masuk untuk melihat dashboard Anda
            </h2>
            <p className="text-gray-600 mb-6">
              Akses dashboard untuk mengelola pemesanan dan pengaturan akun
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full"
              onClick={() => navigate("/")}
            >
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate dashboard metrics
  const totalSpent = userBookings.reduce(
    (sum: number, booking: Booking) => sum + booking.total,
    0
  );
  const citiesVisited = new Set(
    userBookings.map((booking: Booking) => booking.location)
  ).size;
  const confirmedBookings = userBookings.filter(
    (b) => b.status === "Dikonfirmasi"
  ).length;
  const membershipLevel =
    confirmedBookings >= 10
      ? "Platinum"
      : confirmedBookings >= 5
      ? "Gold"
      : "Silver";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-4 border-blue-200">
                <AvatarImage src="https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Selamat datang, {user.name}!
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge
                    className={`${
                      membershipLevel === "Platinum"
                        ? "bg-purple-100 text-purple-800"
                        : membershipLevel === "Gold"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <Award className="h-3 w-3 mr-1" />
                    Member {membershipLevel}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Bergabung 2025
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => navigate("/user-profile")}
                variant="outline"
                className="hover:bg-blue-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Pengaturan
              </Button>
              <Button
                onClick={() => navigate("/hotels")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Pesan Hotel
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Pemesanan</p>
                  <p className="text-3xl font-bold">{userBookings.length}</p>
                </div>
                <Calendar className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Pengeluaran</p>
                  <p className="text-2xl font-bold">
                    {formatPrice(totalSpent)}
                  </p>
                </div>
                <CreditCard className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-sky-500 to-sky-700 text-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Kota Dikunjungi</p>
                  <p className="text-3xl font-bold">{citiesVisited}</p>
                </div>
                <MapPin className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-amber-700 text-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Rating Rata-rata</p>
                  <p className="text-3xl font-bold">4.8</p>
                </div>
                <Star className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivities.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Belum ada aktivitas terbaru</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivities.map((activity: any) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="text-lg">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate("/hotels")}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                >
                  <Hotel className="h-4 w-4 mr-2" />
                  Cari Hotel Baru
                </Button>
                <Button
                  onClick={() => navigate("/user-profile")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <User className="h-4 w-4 mr-2" />
                  Edit Profil
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    toast({
                      title: "Coming Soon",
                      description: "Fitur notifikasi segera hadir!",
                    })
                  }
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Pengaturan Notifikasi
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bookings List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Pemesanan Anda</CardTitle>
              </CardHeader>
              <CardContent>
                {userBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Hotel className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Belum ada pemesanan
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Mulai jelajahi hotel dan buat pemesanan pertama Anda!
                    </p>
                    <Button
                      onClick={() => navigate("/hotels")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Cari Hotel
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userBookings.map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onViewDetails={handleViewDetails}
                        onCancelBooking={handleCancelBooking}
                        onDeleteBooking={handleDeleteBooking}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Cancellation Policy Modal */}
      {bookingToCancel && (
        <CancellationPolicyModal
          isOpen={showCancellationModal}
          onClose={() => {
            setShowCancellationModal(false);
            setBookingToCancel(null);
          }}
          onConfirmCancel={confirmCancelBooking}
          booking={bookingToCancel}
        />
      )}
    </div>
  );
};

export default UserDashboard;
