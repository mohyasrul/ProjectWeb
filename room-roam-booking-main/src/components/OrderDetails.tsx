import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Share2,
  MessageSquare,
} from "lucide-react";
import CancellationPolicyModal from "./CancellationPolicyModal";

interface BookingDetail {
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

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCancellationModal, setShowCancellationModal] = useState(false);

  useEffect(() => {
    // Load booking from localStorage
    const userBookings = JSON.parse(
      localStorage.getItem("userBookings") || "[]"
    );
    const foundBooking = userBookings.find(
      (b: BookingDetail) => b.id.toString() === orderId
    );

    if (foundBooking) {
      setBooking(foundBooking);
    }
    setLoading(false);
  }, [orderId]);

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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Dikonfirmasi":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          message: "Pemesanan Anda telah dikonfirmasi",
        };
      case "Menunggu Konfirmasi":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          message: "Pemesanan sedang diproses",
        };
      case "Cancelled":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle,
          message: "Pemesanan telah dibatalkan",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          message: "Status pemesanan",
        };
    }
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

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCancelBooking = () => {
    setShowCancellationModal(true);
  };

  const confirmCancelBooking = () => {
    if (!booking) return;

    const userBookings = JSON.parse(
      localStorage.getItem("userBookings") || "[]"
    );
    const updatedBookings = userBookings.map((b: BookingDetail) =>
      b.id === booking.id ? { ...b, status: "Cancelled" } : b
    );

    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    setBooking({ ...booking, status: "Cancelled" });

    // Calculate refund amount based on cancellation policy
    const calculateDaysUntilCheckIn = () => {
      const checkInDate = new Date(booking.checkIn);
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
        return { percentage: 25, amount: booking.total * 0.25 };
      } else if (daysUntilCheckIn >= 1) {
        return { percentage: 50, amount: booking.total * 0.5 };
      } else {
        return { percentage: 100, amount: booking.total };
      }
    };

    const cancellationFee = getCancellationFee();
    const refundAmount = booking.total - cancellationFee.amount;

    toast({
      title: "Pemesanan berhasil dibatalkan",
      description: `Refund sebesar ${new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(refundAmount)} akan diproses dalam 3-7 hari kerja.`,
    });
  };

  const handleDownloadReceipt = () => {
    toast({
      title: "Coming Soon",
      description: "Fitur download receipt segera hadir!",
    });
  };

  const handleShareBooking = () => {
    toast({
      title: "Coming Soon",
      description: "Fitur share booking segera hadir!",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail pesanan...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Pesanan Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-6">
              Pesanan yang Anda cari tidak dapat ditemukan atau telah dihapus.
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusInfo = getStatusInfo(booking.status);
  const paymentInfo = getPaymentMethodInfo(
    booking.paymentMethod || "bank_transfer"
  );
  const nights = calculateNights(booking.checkIn, booking.checkOut);
  const isUpcoming = new Date(booking.checkIn) > new Date();
  const canCancel = booking.status !== "Cancelled" && isUpcoming;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="mb-4 hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Dashboard
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Detail Pesanan
              </h1>
              <p className="text-gray-600">
                ID Pesanan:{" "}
                <span className="font-mono font-medium">#{booking.id}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleDownloadReceipt}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleShareBooking} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <statusInfo.icon className="h-8 w-8 text-current mr-3" />
                <div>
                  <Badge
                    className={`${statusInfo.color} border text-lg px-4 py-2`}
                  >
                    {booking.status}
                  </Badge>
                  <p className="text-gray-600 mt-2">{statusInfo.message}</p>
                </div>
              </div>

              {canCancel && (
                <Button
                  onClick={handleCancelBooking}
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Batalkan Pesanan
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hotel Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64 md:h-80">
                  <img
                    src={
                      booking.image ||
                      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={booking.hotel}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800">
                      {nights} malam
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {booking.hotel}
                      </h2>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
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
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-xs text-gray-600 mb-1">Check-in</p>
                      <p className="text-sm font-medium">
                        {formatDateShort(booking.checkIn)}
                      </p>
                    </div>

                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-6 w-6 text-red-600 mx-auto mb-2" />
                      <p className="text-xs text-gray-600 mb-1">Check-out</p>
                      <p className="text-sm font-medium">
                        {formatDateShort(booking.checkOut)}
                      </p>
                    </div>

                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-xs text-gray-600 mb-1">Tamu</p>
                      <p className="text-sm font-medium">
                        {booking.guests} orang
                      </p>
                    </div>

                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mx-auto mb-2">🏠</div>
                      <p className="text-xs text-gray-600 mb-1">Kamar</p>
                      <p className="text-sm font-medium">
                        {booking.rooms} kamar
                      </p>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="mt-4">
                      <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 mb-1">
                            Permintaan Khusus
                          </p>
                          <p className="text-sm text-blue-800">
                            {booking.specialRequests}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Informasi Kontak Hotel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-sm">+62 21 1234 5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-sm">
                    reservation@
                    {booking.hotel.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-sm">{booking.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in</span>
                    <span className="font-medium">
                      {formatDateShort(booking.checkIn)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out</span>
                    <span className="font-medium">
                      {formatDateShort(booking.checkOut)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durasi</span>
                    <span className="font-medium">{nights} malam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah tamu</span>
                    <span className="font-medium">{booking.guests} orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah kamar</span>
                    <span className="font-medium">{booking.rooms} kamar</span>
                  </div>
                </div>

                <Separator />

                {booking.guestName && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Nama Tamu
                    </p>
                    <p className="text-sm text-gray-600">{booking.guestName}</p>
                  </div>
                )}

                <Separator />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-900">
                      Total Biaya
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(booking.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Informasi Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{paymentInfo.icon}</span>
                    <div>
                      <p className="font-medium">{paymentInfo.name}</p>
                      <p className="text-sm text-gray-600">Metode pembayaran</p>
                    </div>
                  </div>
                  <Badge className={paymentInfo.color}>Lunas</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {booking.status === "Dikonfirmasi" && (
              <Card>
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Hubungi Hotel
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Lihat di Peta
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Permintaan Tambahan
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Cancellation Policy Modal */}
        {booking && (
          <CancellationPolicyModal
            isOpen={showCancellationModal}
            onClose={() => setShowCancellationModal(false)}
            onConfirmCancel={confirmCancelBooking}
            booking={booking}
          />
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
