import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Star, Headphones } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section
        className="relative py-32 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Tentang Hotel Be Well
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Kami berkomitmen untuk memberikan pengalaman menginap terbaik bagi
            setiap tamu melalui platform yang mudah digunakan dan layanan yang
            terpercaya.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-6 w-6 mr-2 text-red-500" />
                  Misi Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Menyediakan platform booking hotel yang memudahkan wisatawan
                  Indonesia untuk menemukan dan memesan akomodasi terbaik dengan
                  harga yang kompetitif, serta memberikan pengalaman perjalanan
                  yang tak terlupakan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-6 w-6 mr-2 text-yellow-500" />
                  Visi Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Menjadi platform booking hotel nomor satu di Indonesia yang
                  dipercaya oleh jutaan wisatawan dan menjadi mitra utama bagi
                  hotel-hotel di seluruh nusantara.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nilai-Nilai Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Kepercayaan</h3>
                  <p className="text-sm text-gray-600">
                    Membangun kepercayaan melalui transparansi dan keamanan
                    transaksi
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Kualitas</h3>
                  <p className="text-sm text-gray-600">
                    Mengutamakan kualitas dalam setiap aspek layanan kami
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Headphones className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Pelayanan</h3>
                  <p className="text-sm text-gray-600">
                    Memberikan pelayanan terbaik dengan response time yang cepat
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Inovasi</h3>
                  <p className="text-sm text-gray-600">
                    Terus berinovasi untuk memberikan pengalaman terbaik
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sejarah Singkat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg">2020 - Awal Mula</h3>
                  <p className="text-gray-700">
                    Hotel Be Well didirikan dengan visi menyederhanakan proses
                    booking hotel di Indonesia dan memberikan akses mudah ke
                    akomodasi berkualitas.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg">2021 - Ekspansi</h3>
                  <p className="text-gray-700">
                    Berhasil menjalin kemitraan dengan 1000+ hotel di berbagai
                    kota besar Indonesia dan melayani 100,000+ pengguna aktif.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg">2022 - Inovasi</h3>
                  <p className="text-gray-700">
                    Meluncurkan fitur-fitur baru seperti virtual tour, review
                    system, dan program loyalitas untuk meningkatkan pengalaman
                    pengguna.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-lg">2023 - Sekarang</h3>
                  <p className="text-gray-700">
                    Menjadi salah satu platform booking hotel terpercaya di
                    Indonesia dengan 5000+ hotel partner dan jutaan pengguna
                    puas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
