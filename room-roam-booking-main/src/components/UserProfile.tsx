import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Settings,
  Award,
  Bell,
  Shield,
  LogOut,
  Camera,
  Star,
  TrendingUp,
  Gift,
  Crown,
  Heart,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");

  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Berhasil keluar",
      description: "Anda telah berhasil keluar dari akun",
    });
  };

  // Get user bookings and calculate membership
  const userBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
  const completedBookings = userBookings.filter(
    (booking: { status: string }) => booking.status === "Dikonfirmasi"
  ).length;

  const totalSpent = userBookings.reduce(
    (sum: number, booking: any) => sum + booking.total,
    0
  );

  const getMembershipData = () => {
    if (completedBookings >= 15) {
      return {
        level: "Diamond",
        color: "bg-gradient-to-r from-purple-600 to-pink-600",
        textColor: "text-white",
        icon: Crown,
        progress: 100,
        nextLevel: null,
        benefits: [
          "Upgrade kamar gratis",
          "Late checkout",
          "Welcome drink",
          "Priority support",
          "Exclusive deals",
        ],
      };
    } else if (completedBookings >= 10) {
      return {
        level: "Platinum",
        color: "bg-gradient-to-r from-gray-700 to-gray-900",
        textColor: "text-white",
        icon: Award,
        progress: (completedBookings / 15) * 100,
        nextLevel: "Diamond (15 booking)",
        benefits: [
          "Upgrade kamar",
          "Late checkout",
          "Welcome drink",
          "Priority support",
        ],
      };
    } else if (completedBookings >= 5) {
      return {
        level: "Gold",
        color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
        textColor: "text-white",
        icon: Star,
        progress: (completedBookings / 10) * 100,
        nextLevel: "Platinum (10 booking)",
        benefits: [
          "Welcome drink",
          "Upgrade kamar (subject to availability)",
          "Priority check-in",
        ],
      };
    } else {
      return {
        level: "Silver",
        color: "bg-gradient-to-r from-gray-400 to-gray-500",
        textColor: "text-white",
        icon: Gift,
        progress: (completedBookings / 5) * 100,
        nextLevel: "Gold (5 booking)",
        benefits: [
          "Poin reward",
          "Newsletter eksklusif",
          "Birthday special offer",
        ],
      };
    }
  };

  const membershipData = getMembershipData();

  const tabs = [
    { id: "personal", label: "Informasi Pribadi", icon: User },
    { id: "membership", label: "Membership", icon: Crown },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Enhanced Profile Header */}
        <Card className="mb-8 overflow-hidden shadow-xl">
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
                  <Badge
                    className={`${membershipData.color} ${membershipData.textColor} border-0`}
                  >
                    <membershipData.icon className="h-3 w-3 mr-1" />
                    Member {membershipData.level}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {completedBookings} Booking Selesai
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Bergabung 2025
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-center bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">
                    {Math.floor(totalSpent / 100000)}
                  </div>
                  <div className="text-sm text-blue-100">Poin Tersedia</div>
                </div>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  Dashboard
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          activeTab === tab.id
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {tab.label}
                      </Button>
                    );
                  })}
                </nav>

                <Separator className="my-4" />

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Keluar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Personal Information Tab */}
            {activeTab === "personal" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Informasi Pribadi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={user.name}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user.email}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Info Akun
                    </h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• Member sejak: 2025</p>
                      <p>• Total booking: {completedBookings}</p>
                      <p>• Status member: {membershipData.level}</p>
                      <p>
                        • Total pengeluaran:{" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(totalSpent)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Membership Tab */}
            {activeTab === "membership" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="h-5 w-5 mr-2" />
                    Status Membership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div
                      className={`p-6 rounded-lg ${membershipData.color} ${membershipData.textColor}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <membershipData.icon className="h-8 w-8 mr-3" />
                          <div>
                            <h3 className="text-2xl font-bold">
                              Member {membershipData.level}
                            </h3>
                            <p className="opacity-90">
                              Status membership Anda saat ini
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {completedBookings}
                          </div>
                          <div className="opacity-90">Booking Selesai</div>
                        </div>
                      </div>

                      {membershipData.nextLevel && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm opacity-90">
                            <span>Progress ke {membershipData.nextLevel}</span>
                            <span>{Math.round(membershipData.progress)}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-white h-2 rounded-full transition-all duration-300"
                              style={{ width: `${membershipData.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3">
                        Keuntungan Member {membershipData.level}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {membershipData.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 bg-green-50 rounded-lg"
                          >
                            <Heart className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                            <span className="text-sm text-green-800">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(totalSpent)}
                        </div>
                        <div className="text-sm text-blue-700">
                          Total Pengeluaran
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.floor(totalSpent / 100000)}
                        </div>
                        <div className="text-sm text-purple-700">
                          Poin Tersedia
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Gift className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">
                          3
                        </div>
                        <div className="text-sm text-green-700">
                          Voucher Aktif
                        </div>
                      </div>
                    </div>
                  </div>
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
