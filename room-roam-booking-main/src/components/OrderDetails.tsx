import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  ArrowLeft,
  Phone,
  Mail,
} from "lucide-react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Get booking details from localStorage
  const bookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
  const booking = bookings.find((b: { id: string }) => b.id === orderId);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">
                Pemesanan tidak ditemukan
              </h2>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Kembali ke Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Menunggu Konfirmasi":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Detail Pemesanan
            </h1>
            <p className="text-gray-600">ID Pemesanan: {booking.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hotel Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Hotel</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={booking.image}
                alt={booking.hotel}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{booking.hotel}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{booking.location}</span>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Pemesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Check-in</span>
                  </div>
                  <div className="font-medium">{booking.checkIn}</div>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Check-out</span>
                  </div>
                  <div className="font-medium">{booking.checkOut}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Jumlah Tamu</span>
                  </div>
                  <div className="font-medium">{booking.guests} orang</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Jumlah Kamar</div>
                  <div className="font-medium">{booking.rooms} kamar</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center text-gray-600 mb-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Total Pembayaran</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(booking.total)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Tamu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-gray-600 mb-1">Nama Lengkap</div>
                <div className="font-medium">
                  {booking.guestName || "John Doe"}
                </div>
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email</span>
                </div>
                <div className="font-medium">
                  {booking.guestEmail || "john.doe@email.com"}
                </div>
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Nomor Telepon</span>
                </div>
                <div className="font-medium">
                  {booking.guestPhone || "+62 812-3456-7890"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Harga per malam</span>
                <span className="font-medium">
                  {formatPrice(booking.pricePerNight || 500000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah malam</span>
                <span className="font-medium">{booking.nights || 2} malam</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pajak & biaya layanan</span>
                <span className="font-medium">
                  {formatPrice(booking.tax || 50000)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(booking.total)}</span>
              </div>
              <div className="mt-4">
                <div className="text-gray-600 mb-1">Metode Pembayaran</div>
                <div className="font-medium">
                  {booking.paymentMethod || "Transfer Bank"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline">Cetak Voucher</Button>
          <Button variant="outline">Hubungi Hotel</Button>
          {booking.status === "Confirmed" && (
            <Button variant="destructive">Batalkan Pemesanan</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
