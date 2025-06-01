import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

const featuredHotels = [
  {
    id: 1,
    name: "Grand Hyatt Jakarta",
    location: "Jakarta Pusat, DKI Jakarta",
    rating: 9.2,
    price: 1850000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 1247,
  },
  {
    id: 2,
    name: "The Mulia Resort Bali",
    location: "Nusa Dua, Bali",
    rating: 9.5,
    price: 2750000,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 892,
  },
  {
    id: 3,
    name: "Tugu Yogyakarta",
    location: "Yogyakarta, DIY",
    rating: 8.8,
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 634,
  },
  {
    id: 4,
    name: "Swiss-Belhotel Makassar",
    location: "Makassar, Sulawesi Selatan",
    rating: 8.7,
    price: 980000,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 567,
  },
  {
    id: 5,
    name: "Hotel Santika Premiere Semarang",
    location: "Semarang, Jawa Tengah",
    rating: 8.9,
    price: 1100000,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 723,
  },
  {
    id: 6,
    name: "Aryaduta Palembang",
    location: "Palembang, Sumatera Selatan",
    rating: 8.6,
    price: 1050000,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 445,
  },
  {
    id: 7,
    name: "Radisson Golf & Convention Center Batam",
    location: "Batam, Kepulauan Riau",
    rating: 8.8,
    price: 1200000,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 612,
  },
  {
    id: 8,
    name: "Hotel Tugu Malang",
    location: "Malang, Jawa Timur",
    rating: 9.1,
    price: 1350000,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 398,
  },
  {
    id: 9,
    name: "Alila Solo",
    location: "Solo, Jawa Tengah",
    rating: 9.0,
    price: 1450000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 512,
  },
  {
    id: 10,
    name: "Katamaran Hotel & Resort Lombok",
    location: "Lombok, Nusa Tenggara Barat",
    rating: 8.9,
    price: 1650000,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 334,
  },
  {
    id: 11,
    name: "Swiss-Belhotel Maleosan Manado",
    location: "Manado, Sulawesi Utara",
    rating: 8.5,
    price: 950000,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 289,
  },
  {
    id: 12,
    name: "Mercure Balikpapan",
    location: "Balikpapan, Kalimantan Timur",
    rating: 8.7,
    price: 1150000,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    reviews: 467,
  },
];

const FeaturedHotels = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hotel Pilihan
          </h2>
          <p className="text-gray-600">
            Temukan pilihan akomodasi premium terbaik kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-sm font-semibold">
                  {formatPrice(hotel.price)}/malam
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {hotel.name}
                </h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {hotel.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      ({hotel.reviews} ulasan)
                    </span>
                  </div>
                </div>

                <Link to={`/hotel/${hotel.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Lihat Detail
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
