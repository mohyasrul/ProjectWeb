import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Award,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Camera,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get user bookings from localStorage
  const userBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
  const completedBookings = userBookings.filter(
    (booking: { status: string }) => booking.status === "Dikonfirmasi"
  ).length;

  const membershipLevel =
    completedBookings >= 10
      ? "Platinum"
      : completedBookings >= 5
      ? "Gold"
      : "Silver";
  const membershipColor =
    membershipLevel === "Platinum"
      ? "bg-purple-100 text-purple-800"
      : membershipLevel === "Gold"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";

  const tabs = [
    { id: "personal", label: "Informasi Pribadi", icon: User },
    { id: "security", label: "Keamanan", icon: Shield },
    { id: "preferences", label: "Preferensi", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src="https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D" />
                  <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-blue-100 mb-4">{user.email}</p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge className={`${membershipColor} border-0`}>
                    <Award className="h-3 w-3 mr-1" />
                    Member {membershipLevel}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {completedBookings} Booking Selesai
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Bergabung 2024
                  </Badge>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">2,540</div>
                  <div className="text-sm text-blue-100">Poin Tersedia</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}

                  <Separator className="my-2" />

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Keluar
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "personal" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-6 w-6 mr-2 text-blue-600" />
                      Informasi Pribadi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={user.name}
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={user.email}
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input id="phone" placeholder="+62 812-3456-7890" />
                      </div>
                      <div>
                        <Label htmlFor="birthdate">Tanggal Lahir</Label>
                        <Input id="birthdate" type="date" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Alamat</Label>
                      <Input
                        id="address"
                        placeholder="Masukkan alamat lengkap"
                      />
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Simpan Perubahan
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Status Membership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          className={`${membershipColor} text-lg px-4 py-2`}
                        >
                          <Award className="h-4 w-4 mr-2" />
                          Member {membershipLevel}
                        </Badge>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            2,540
                          </div>
                          <div className="text-sm text-gray-600">Poin</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            {completedBookings}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total Booking
                          </div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            12
                          </div>
                          <div className="text-sm text-gray-600">Tahun Ini</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            5
                          </div>
                          <div className="text-sm text-gray-600">Favorit</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            98%
                          </div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-blue-600" />
                    Keamanan Akun
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="currentPassword">Password Saat Ini</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Masukkan password saat ini"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPassword">Password Baru</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Masukkan password baru"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">
                      Konfirmasi Password Baru
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Konfirmasi password baru"
                    />
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Update Password
                  </Button>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Autentikasi Dua Faktor</h4>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">SMS Authentication</div>
                        <div className="text-sm text-gray-600">
                          Terima kode verifikasi via SMS
                        </div>
                      </div>
                      <Button variant="outline">Aktifkan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "preferences" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-6 w-6 mr-2 text-blue-600" />
                    Preferensi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Notifikasi</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email Promosi</div>
                          <div className="text-sm text-gray-600">
                            Terima penawaran dan promosi khusus
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Konfirmasi Booking</div>
                          <div className="text-sm text-gray-600">
                            Notifikasi konfirmasi pemesanan
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Reminder Check-in</div>
                          <div className="text-sm text-gray-600">
                            Pengingat sebelum check-in
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-4">Preferensi Kamar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bedType">Tipe Tempat Tidur</Label>
                        <select
                          id="bedType"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option>King Bed</option>
                          <option>Queen Bed</option>
                          <option>Twin Beds</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="roomType">Tipe Kamar</Label>
                        <select
                          id="roomType"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option>Standard</option>
                          <option>Deluxe</option>
                          <option>Suite</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Simpan Preferensi
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
