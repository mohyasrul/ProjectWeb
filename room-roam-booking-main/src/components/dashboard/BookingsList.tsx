import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BookingCard from "./BookingCard";

interface BookingsListProps {
  userBookings: {
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
  }[];
  onViewDetails: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onDeleteBooking: (bookingId: string) => void;
}

const BookingsList = ({
  userBookings,
  onViewDetails,
  onCancelBooking,
  onDeleteBooking,
}: BookingsListProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pemesanan Anda</CardTitle>
      </CardHeader>
      <CardContent>
        {userBookings.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Belum ada pemesanan
            </h3>
            <p className="text-gray-600 mb-4">
              Mulai jelajahi hotel dan buat pemesanan pertama Anda!
            </p>
            <Button
              onClick={() => navigate("/hotels")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Cari Hotel
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {userBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onViewDetails={onViewDetails}
                onCancelBooking={onCancelBooking}
                onDeleteBooking={onDeleteBooking}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsList;
