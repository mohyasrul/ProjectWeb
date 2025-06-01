import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "10 Hotel Terbaik di Bali Tahun Ini",
    excerpt:
      "Temukan pilihan akomodasi terbaik di Pulau Dewata untuk liburan yang tak terlupakan. Dari resort mewah hingga villa pribadi, Bali menawarkan pengalaman menginap yang tak terlupakan.",
    content: `Bali tetap menjadi destinasi favorit wisatawan domestik dan internasional. Dengan berbagai pilihan akomodasi yang tersedia, mulai dari resort tepi pantai hingga villa di tengah persawahan, Pulau Dewata menawarkan pengalaman menginap yang beragam.

Berikut adalah 10 hotel terbaik di Bali yang wajib Anda pertimbangkan untuk liburan berikutnya:

**1. The Mulia Resort & Villas Nusa Dua**
Resort mewah ini menawarkan pemandangan laut yang spektakuler dan fasilitas world-class. Dengan pantai pribadi dan spa yang menakjubkan, The Mulia adalah pilihan sempurna untuk bulan madu atau liburan romantis.

**2. Four Seasons Resort Bali at Sayan**
Terletak di tengah hutan hujan tropis, resort ini menawarkan pengalaman yang unik dengan arsitektur yang memadukan kemewahan modern dengan keindahan alam Bali.

**3. COMO Shambhala Estate**
Sebuah wellness retreat yang menggabungkan kemewahan dengan program kesehatan holistik. Terletak di Ubud, resort ini perfect untuk detoks dan relaksasi.

**4. The St. Regis Bali Resort**
Resort beachfront yang menawarkan kemewahan tingkat tinggi dengan butler service 24 jam dan pantai pribadi yang menakjubkan.

**5. Alila Villas Uluwatu**
Dengan pemandangan cliff-top yang dramatis, resort ini menawarkan pengalaman yang tak terlupakan dengan infinity pool yang menghadap Samudra Hindia.

Dan masih banyak lagi pilihan hotel menakjubkan lainnya di Bali yang siap memberikan pengalaman menginap terbaik untuk liburan Anda.`,
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
    content: `Liburan bersama keluarga tidak harus mahal. Dengan perencanaan yang tepat dan tips-tips cerdas, Anda bisa menikmati waktu berkualitas bersama keluarga tanpa khawatir tentang budget.

**1. Pilih Waktu yang Tepat**
Hindari peak season dan libur nasional. Pilih weekday atau low season untuk mendapatkan harga hotel yang lebih murah.

**2. Booking Jauh-Jauh Hari**
Semakin awal Anda booking, semakin besar peluang mendapatkan harga terbaik. Banyak hotel memberikan early bird discount.

**3. Manfaatkan Promo dan Voucher**
Selalu cek promo yang tersedia di platform booking. Subscribe newsletter untuk mendapatkan voucher eksklusif.

**4. Pilih Akomodasi dengan Fasilitas Lengkap**
Hotel dengan breakfast included, kolam renang, dan kids club bisa menghemat budget makan dan hiburan.

**5. Transportasi Hemat**
Pertimbangkan transportasi umum atau sewa mobil jika lebih ekonomis daripada taksi.

**6. Aktivitas Gratis**
Cari tahu aktivitas gratis di destinasi yang Anda kunjungi, seperti taman kota, pantai publik, atau museum dengan hari gratis.

Dengan tips-tips ini, liburan keluarga yang menyenangkan dan berkesan tetap bisa diwujudkan dengan budget yang terjangkau.`,
    author: "Sarah Wijaya",
    date: "12 Des 2024",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Tips Travel",
  },
  {
    id: 3,
    title: "Panduan Wisata Kuliner Jakarta",
    excerpt:
      "Eksplorasi kuliner terbaik Jakarta dari street food hingga fine dining yang wajib dicoba saat berkunjung ke ibu kota.",
    content: `Jakarta sebagai melting pot kuliner Indonesia menawarkan pengalaman kuliner yang tak terbatas. Dari gudeg Yu Djum hingga restoran fine dining di hotel berbintang lima, ibu kota memiliki segalanya untuk memuaskan lidah para pecinta kuliner.

**Street Food Legendaris:**

**1. Kerak Telor Betawi**
Makanan khas Jakarta yang wajib dicoba. Terbuat dari beras ketan putih, telur ayam, ebi yang disangrai kering, bawang merah goreng, dan kelapa sangrai.

**2. Soto Betawi**
Soto khas Jakarta dengan kuah santan yang gurih, berisi daging sapi, jeroan, dan kentang. Cocok dinikmati dengan nasi putih hangat.

**3. Rujak Juhi Betawi**
Rujak khas Jakarta dengan campuran sayuran segar, kerupuk, dan bumbu petis yang khas.

**Fine Dining Experience:**

**1. Skye Restaurant**
Restaurant di lantai 56 BCA Tower dengan pemandangan kota Jakarta yang menakjubkan.

**2. Lara Djonggrang**
Restaurant dengan konsep traditional Indonesian dalam suasana mystical yang unik.

**3. Amuz Gourmet**
French fine dining dengan sentuhan Indonesian yang sophisticated.

Jakarta memang surga kuliner yang tak pernah kehabisan kejutan untuk dicoba!`,
    author: "Budi Santoso",
    date: "10 Des 2024",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Kuliner",
  },
];

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id || "1"));

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel tidak ditemukan
          </h1>
          <Link to="/articles">
            <Button>Kembali ke Daftar Artikel</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/articles"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Artikel
        </Link>

        <Card className="overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />

          <CardContent className="p-8">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{article.date}</span>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="text-gray-900 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/articles">
            <Button variant="outline" size="lg">
              Lihat Artikel Lainnya
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
