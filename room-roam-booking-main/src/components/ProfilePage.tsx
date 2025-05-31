import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hotel, Users, Award, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleCityClick = (city: string) => {
    navigate(`/hotels?location=${encodeURIComponent(city)}`);
  };

  const cities = [
    "Jakarta",
    "Bali",
    "Yogyakarta",
    "Surabaya",
    "Bandung",
    "Medan",
    "Makassar",
    "Semarang",
    "Palembang",
    "Batam",
    "Malang",
    "Solo",
    "Lombok",
    "Manado",
    "Balikpapan",
  ];

  // Statistics data for the graph
  const monthlyData = [
    { month: "Jan", bookings: 65000 },
    { month: "Feb", bookings: 75000 },
    { month: "Mar", bookings: 85000 },
    { month: "Apr", bookings: 95000 },
    { month: "May", bookings: 105000 },
    { month: "Jun", bookings: 120000 },
  ];

  const pieData = [
    { name: "Hotel Partner", value: 5000, color: "#3B82F6" },
    { name: "Kota", value: 300, color: "#10B981" },
    { name: "Pengguna (x1000)", value: 1200, color: "#F59E0B" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Profil Hotel Be Well
          </h1>
          <p className="text-xl text-gray-600">
            Platform booking hotel terpercaya di Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hotel className="h-6 w-6 mr-2 text-blue-600" />
                Tentang Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <img
                  src="/DSCF3349 copy.jpg"
                  alt="Founder Hotel Be Well"
                  className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
                />
                <div className="text-center md:text-left">
                  <h3 className="font-semibold text-lg mb-1">
                    Mohammad Yasrul
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">Founder & CEO</p>
                  <p className="text-xs text-gray-500">
                    "Siap bantai Traveloka, tiket.com, dan pegipegi!"
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Hotel Be Well adalah platform booking hotel online terdepan di
                Indonesia yang menghubungkan wisatawan dengan akomodasi
                berkualitas tinggi di seluruh nusantara.
              </p>
              <p className="text-gray-700">
                Dengan komitmen memberikan pelayanan terbaik, kami menyediakan
                akses mudah ke ribuan hotel dan resort pilihan dengan harga
                terjangkau.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                Statistik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hotel Partner</span>
                  <span className="font-semibold">5,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kota di Indonesia</span>
                  <span className="font-semibold">300+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengguna Aktif</span>
                  <span className="font-semibold">1,200,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pemesanan Berhasil</span>
                  <span className="font-semibold">8,500,000+</span>
                </div>
              </div>

              {/* Minimalist Statistics Graph */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Pertumbuhan Pemesanan (6 Bulan Terakhir)
                </h4>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={monthlyData}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                    />
                    <YAxis hide />
                    <Bar
                      dataKey="bookings"
                      fill="#3B82F6"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-6 w-6 mr-2 text-blue-600" />
              Keunggulan Kami
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Hotel className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Hotel Berkualitas</h3>
                <p className="text-sm text-gray-600">
                  Semua hotel telah terverifikasi dan memenuhi standar kualitas
                  tinggi
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Layanan 24/7</h3>
                <p className="text-sm text-gray-600">
                  Customer service siap membantu Anda kapan saja
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Harga Terbaik</h3>
                <p className="text-sm text-gray-600">
                  Jaminan harga terbaik dengan berbagai promo menarik
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-blue-600" />
              Destinasi Populer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <Badge
                  key={city}
                  variant="secondary"
                  className="text-sm cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Klik pada nama kota untuk melihat hotel yang tersedia di destinasi
              tersebut.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
