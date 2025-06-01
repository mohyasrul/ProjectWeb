import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "10 Hotel Terbaik di Bali Tahun Ini",
    excerpt:
      "Temukan pilihan akomodasi terbaik di Pulau Dewata untuk liburan yang tak terlupakan. Dari resort mewah hingga villa pribadi, Bali menawarkan pengalaman menginap yang tak terlupakan.",
    content:
      "Bali tetap menjadi destinasi favorit wisatawan domestik dan internasional. Dengan berbagai pilihan akomodasi yang tersedia, mulai dari resort tepi pantai hingga villa di tengah persawahan, Pulau Dewata menawarkan pengalaman menginap yang beragam. Berikut adalah 10 hotel terbaik di Bali yang wajib Anda pertimbangkan untuk liburan berikutnya...",
    author: "Tim Editorial",
    date: "15 Des 2024",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Destinasi",
  },
  {
    id: 2,
    title: "Tips Liburan Hemat Bersama Keluarga",
    excerpt:
      "Cara cerdas merencanakan liburan keluarga tanpa menguras kantong dengan tetap mendapatkan pengalaman yang menyenangkan dan berkesan.",
    content:
      "Liburan bersama keluarga tidak harus mahal. Dengan perencanaan yang tepat dan tips-tips cerdas, Anda bisa menikmati waktu berkualitas bersama keluarga tanpa khawatir tentang budget. Mulai dari memilih waktu yang tepat hingga mencari promo hotel terbaik...",
    author: "Sarah Wijaya",
    date: "12 Januari 2025",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Tips Travel",
  },
  {
    id: 3,
    title: "Panduan Wisata Kuliner Jakarta",
    excerpt:
      "Eksplorasi kuliner terbaik Jakarta dari street food hingga fine dining yang wajib dicoba saat berkunjung ke ibu kota.",
    content:
      "Jakarta sebagai melting pot kuliner Indonesia menawarkan pengalaman kuliner yang tak terbatas. Dari gudeg Yu Djum hingga restoran fine dining di hotel berbintang lima, ibu kota memiliki segalanya untuk memuaskan lidah para pecinta kuliner...",
    author: "Budi Santoso",
    date: "10 Des 2024",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Kuliner",
  },
  {
    id: 4,
    title: "Wisata Alam Tersembunyi di Jawa Timur",
    excerpt:
      "Jelajahi keindahan alam Jawa Timur yang masih tersembunyi, dari air terjun eksotis hingga pantai-pantai cantik yang belum banyak dikunjungi.",
    content:
      "Jawa Timur menyimpan banyak destinasi wisata alam yang menakjubkan namun belum banyak diketahui wisatawan. Dari Air Terjun Madakaripura yang memukau hingga Pantai Papuma yang eksotis...",
    author: "Andi Prasetyo",
    date: "8 Des 2024",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Destinasi",
  },
  {
    id: 5,
    title: "Hotel Boutique Terbaik di Yogyakarta",
    excerpt:
      "Menginap di hotel boutique yang menggabungkan kemewahan modern dengan sentuhan budaya Jawa yang autentik di Kota Gudeg.",
    content:
      "Yogyakarta tidak hanya terkenal dengan wisata budayanya, tetapi juga memiliki pilihan akomodasi boutique yang memukau. Hotel-hotel ini menawarkan pengalaman menginap yang unik dengan desain yang memadukan modernitas dan tradisi Jawa...",
    author: "Dewi Sartika",
    date: "5 Des 2024",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Hotel",
  },
  {
    id: 6,
    title: "Menjelajahi Keindahan Lombok Utara",
    excerpt:
      "Panduan lengkap untuk menjelajahi keindahan alam Lombok Utara, dari Gili Trawangan hingga Air Terjun Sekumpul yang memesona.",
    content:
      "Lombok Utara menawarkan pengalaman wisata alam yang tak terlupakan. Dengan pantai-pantai berpasir putih, air laut yang jernih, dan pemandangan gunung yang menakjubkan...",
    author: "Made Wijaya",
    date: "3 Des 2024",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Destinasi",
  },
];

const ArticlesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Artikel & Tips Travel
          </h1>
          <p className="text-gray-600 text-lg">
            Temukan inspirasi dan panduan untuk perjalanan Anda selanjutnya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />

              <CardContent className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {article.date}
                  </div>
                </div>

                <Link to={`/article/${article.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Baca Selengkapnya
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
