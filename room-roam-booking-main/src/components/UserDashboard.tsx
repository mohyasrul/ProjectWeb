import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardStats from "./dashboard/DashboardStats";
import BookingsList from "./dashboard/BookingsList";

interface Booking {
  id: string;
  total: number;
  location: string;
  status: string;
}

const UserDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    setUserBookings(bookings);
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
    const updatedBookings = userBookings.map((booking: Booking) =>
      booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
    );
    setUserBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    toast({
      title: "Berhasil",
      description: "Pemesanan berhasil dibatalkan",
    });
  };

  const handleViewDetails = (bookingId: string) => {
    navigate(`/order-details/${bookingId}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Silakan masuk untuk melihat dashboard Anda
            </h2>
            <Button className="bg-blue-600 hover:bg-blue-700">Masuk</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extract username from email (part before @)
  const getUsernameFromEmail = (email: string) => {
    return email.split("@")[0];
  };

  const username = getUsernameFromEmail(user.email);
  const totalSpent = userBookings.reduce(
    (sum: number, booking: Booking) => sum + booking.total,
    0
  );
  const citiesVisited = new Set(
    userBookings.map((booking: Booking) => booking.location)
  ).size;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <DashboardHeader username={username} onLogout={logout} />

        <DashboardStats
          totalBookings={userBookings.length}
          totalSpent={totalSpent}
          citiesVisited={citiesVisited}
        />

        <BookingsList
          userBookings={userBookings}
          onViewDetails={handleViewDetails}
          onCancelBooking={handleCancelBooking}
          onDeleteBooking={handleDeleteBooking}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
