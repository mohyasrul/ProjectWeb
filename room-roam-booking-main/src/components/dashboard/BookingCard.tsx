import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Trash2,
  X,
  Eye,
  Star,
  Clock,
} from "lucide-react";

interface BookingCardProps {
  booking: {
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
  };
  onViewDetails: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onDeleteBooking: (bookingId: string) => void;
}

const BookingCard = ({
  booking,
  onViewDetails,
  onCancelBooking,
  onDeleteBooking,
}: BookingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dikonfirmasi":
        return "bg-green-100 text-green-800 border-green-200";
      case "Menunggu Konfirmasi":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Dikonfirmasi":
        return "✅";
      case "Menunggu Konfirmasi":
        return "⏳";
      case "Cancelled":
        return "❌";
      default:
        return "📋";
    }
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

  const getPaymentMethodInfo = (method: string) => {
    switch (method) {
      case "dana":
        return { name: "DANA", color: "bg-blue-100 text-blue-800", icon: "💳" };
      case "ovo":
        return {
          name: "OVO",
          color: "bg-purple-100 text-purple-800",
          icon: "💳",
        };
      case "gopay":
        return {
          name: "GoPay",
          color: "bg-green-100 text-green-800",
          icon: "💳",
        };
      case "bank_transfer":
        return {
          name: "Transfer Bank",
          color: "bg-red-100 text-red-800",
          icon: "🏦",
        };
      case "virtual_account":
        return {
          name: "Virtual Account",
          color: "bg-yellow-100 text-yellow-800",
          icon: "🏧",
        };
      default:
        return {
          name: "Transfer Bank",
          color: "bg-gray-100 text-gray-800",
          icon: "💳",
        };
    }
  };

  const isUpcoming = new Date(booking.checkIn) > new Date();
  const canCancel = booking.status !== "Cancelled" && isUpcoming;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Hotel Image */}
          <div className="lg:w-64 h-48 lg:h-auto relative">
            <img
              src={
                booking.image ||
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
              alt={booking.hotel}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${getStatusColor(booking.status)} border`}>
                <span className="mr-1">{getStatusIcon(booking.status)}</span>
                {booking.status}
              </Badge>
            </div>
            {isUpcoming && booking.status === "Dikonfirmasi" && (
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Upcoming
                </Badge>
              </div>
            )}
          </div>

          {/* Booking Details */}
          <div className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row justify-between h-full">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {booking.hotel}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{booking.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        4.8 (245 ulasan)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatPrice(booking.total)}
                    </p>
                    <p className="text-sm text-gray-500">Total biaya</p>
                  </div>
                </div>{" "}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-green-600" />
                    <div>
                      <p className="font-medium">Check-in</p>
                      <p>{formatDate(booking.checkIn)}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-red-600" />
                    <div>
                      <p className="font-medium">Check-out</p>
                      <p>{formatDate(booking.checkOut)}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <div>
                      <p className="font-medium">Tamu</p>
                      <p>{booking.guests} orang</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-4 h-4 mr-2 flex items-center justify-center">
                      🏠
                    </div>
                    <div>
                      <p className="font-medium">Kamar</p>
                      <p>{booking.rooms} kamar</p>
                    </div>
                  </div>
                </div>
                {/* Payment Method Info */}
                {booking.paymentMethod && (
                  <div className="mb-4">
                    {(() => {
                      const paymentInfo = getPaymentMethodInfo(
                        booking.paymentMethod
                      );
                      return (
                        <div className="flex items-center">
                          <span className="text-lg mr-2">
                            {paymentInfo.icon}
                          </span>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">
                              Dibayar dengan:
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${paymentInfo.color}`}
                            >
                              {paymentInfo.name}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => onViewDetails(booking.id)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Lihat Detail
                  </Button>

                  {canCancel && (
                    <Button
                      onClick={() => onCancelBooking(booking.id)}
                      size="sm"
                      variant="outline"
                      className="text-orange-600 border-orange-600 hover:bg-orange-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Batalkan
                    </Button>
                  )}

                  <Button
                    onClick={() => onDeleteBooking(booking.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
