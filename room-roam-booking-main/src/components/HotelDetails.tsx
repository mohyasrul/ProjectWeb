
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Users, Bed, AirVent, Tv, Bath } from 'lucide-react';

// Enhanced mock hotel data with all hotels including new cities
const mockHotels = [
  {
    id: 1,
    name: "Grand Hyatt Jakarta",
    location: "Jakarta Pusat, DKI Jakarta",
    rating: 9.2,
    pricePerNight: 1850000,
    description: "Terletak di jantung Jakarta, hotel kami menawarkan akomodasi nyaman dengan fasilitas modern. Sempurna untuk wisatawan bisnis dan liburan.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Parkir', 'Pusat Kebugaran', 'Pusat Bisnis', 'Ramah Hewan Peliharaan'],
    category: "Luxury",
    rooms: [
      {
        id: 1,
        type: "Kamar Queen Standard",
        price: 1850000,
        capacity: 2,
        bedCount: 1,
        bedSize: "Queen",
        roomSize: 35,
        amenities: ['Tempat Tidur Queen', 'WiFi Gratis', 'AC', 'TV', 'Minibar'],
        hasBalcony: false,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 2,
    name: "The Mulia Resort Bali",
    location: "Nusa Dua, Bali",
    rating: 9.5,
    pricePerNight: 2750000,
    description: "Resort mewah tepi pantai dengan pemandangan laut yang menakjubkan. Fasilitas kelas dunia dengan pantai pribadi yang indah.",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Pantai Pribadi', 'Kolam Renang', 'Spa', 'Restaurant'],
    category: "Resort",
    rooms: [
      {
        id: 1,
        type: "Ocean View Suite",
        price: 2750000,
        capacity: 4,
        bedCount: 2,
        bedSize: "Queen",
        roomSize: 60,
        amenities: ['2 Tempat Tidur Queen', 'Pemandangan Laut', 'WiFi Gratis', 'AC', 'Balkon'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: true,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 3,
    name: "Tugu Yogyakarta",
    location: "Yogyakarta, DIY",
    rating: 8.8,
    pricePerNight: 1250000,
    description: "Hotel bersejarah dengan arsitektur Jawa klasik dan koleksi seni budaya Indonesia. Lokasi strategis dekat Malioboro.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Parkir', 'Museum', 'Kolam Renang', 'Spa'],
    category: "Heritage",
    rooms: [
      {
        id: 1,
        type: "Heritage Room",
        price: 1250000,
        capacity: 2,
        bedCount: 1,
        bedSize: "King",
        roomSize: 35,
        amenities: ['Tempat Tidur King Heritage', 'WiFi Gratis', 'AC', 'TV', 'Minibar'],
        hasBalcony: false,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 4,
    name: "Shangri-La Hotel Surabaya",
    location: "Surabaya, Jawa Timur",
    rating: 9.0,
    pricePerNight: 1950000,
    description: "Hotel mewah di pusat kota Surabaya dengan pelayanan premium dan fasilitas lengkap untuk wisatawan bisnis dan leisure.",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Kolam Renang', 'Spa', 'Fitness Center', 'Business Center'],
    category: "Luxury",
    rooms: [
      {
        id: 1,
        type: "Deluxe Room",
        price: 1950000,
        capacity: 2,
        bedCount: 1,
        bedSize: "King",
        roomSize: 45,
        amenities: ['Tempat Tidur King', 'WiFi Gratis', 'AC', 'TV', 'Minibar'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 5,
    name: "The Ritz-Carlton Bali",
    location: "Nusa Dua, Bali",
    rating: 9.4,
    pricePerNight: 3500000,
    description: "Luxury beachfront resort dengan arsitektur yang memukau dan pelayanan world-class di lokasi eksklusif Nusa Dua.",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Pantai Pribadi', 'Spa', 'Kids Club', 'Multiple Restaurants'],
    category: "Luxury",
    rooms: [
      {
        id: 1,
        type: "Club Ocean View",
        price: 3500000,
        capacity: 3,
        bedCount: 1,
        bedSize: "King",
        roomSize: 70,
        amenities: ['Tempat Tidur King', 'Pemandangan Laut', 'WiFi Gratis', 'AC', 'Balkon'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: true,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 6,
    name: "Hotel Indonesia Kempinski",
    location: "Jakarta Pusat, DKI Jakarta",
    rating: 8.7,
    pricePerNight: 1750000,
    description: "Hotel bersejarah di bundaran HI dengan akses langsung ke Grand Indonesia Shopping Mall dan fasilitas premium.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Kolam Renang', 'Spa', 'Shopping Mall Access', 'Business Center'],
    category: "Business",
    rooms: [
      {
        id: 1,
        type: "Premium Room",
        price: 1750000,
        capacity: 2,
        bedCount: 1,
        bedSize: "King",
        roomSize: 42,
        amenities: ['Tempat Tidur King', 'WiFi Gratis', 'AC', 'TV', 'Minibar'],
        hasBalcony: false,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 7,
    name: "The Trans Luxury Hotel Bandung",
    location: "Bandung, Jawa Barat",
    rating: 8.9,
    pricePerNight: 1650000,
    description: "Hotel mewah di pusat kota Bandung dengan pemandangan pegunungan yang menakjubkan dan akses mudah ke berbagai destinasi wisata.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Kolam Renang', 'Spa', 'Fitness Center', 'Restaurant'],
    category: "Luxury",
    rooms: [
      {
        id: 1,
        type: "Deluxe Mountain View",
        price: 1650000,
        capacity: 2,
        bedCount: 1,
        bedSize: "King",
        roomSize: 40,
        amenities: ['Tempat Tidur King', 'Pemandangan Gunung', 'WiFi Gratis', 'AC', 'Balkon'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 8,
    name: "Grand Aston City Hall Medan",
    location: "Medan, Sumatera Utara",
    rating: 8.5,
    pricePerNight: 1450000,
    description: "Hotel modern di jantung kota Medan dengan fasilitas lengkap dan pelayanan berkualitas tinggi untuk wisatawan bisnis dan leisure.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Kolam Renang', 'Pusat Kebugaran', 'Business Center', 'Restaurant'],
    category: "Business",
    rooms: [
      {
        id: 1,
        type: "Superior Room",
        price: 1450000,
        capacity: 2,
        bedCount: 1,
        bedSize: "Queen",
        roomSize: 35,
        amenities: ['Tempat Tidur Queen', 'WiFi Gratis', 'AC', 'TV', 'Minibar'],
        hasBalcony: false,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 9,
    name: "Swiss-Belhotel Makassar",
    location: "Makassar, Sulawesi Selatan",
    rating: 8.3,
    pricePerNight: 1350000,
    description: "Hotel internasional di pusat kota Makassar dengan akses mudah ke pantai dan berbagai atraksi wisata lokal.",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Kolam Renang', 'Spa', 'Restaurant', 'Meeting Room'],
    category: "Business",
    rooms: [
      {
        id: 1,
        type: "Standard Twin",
        price: 1350000,
        capacity: 2,
        bedCount: 2,
        bedSize: "Twin",
        roomSize: 32,
        amenities: ['2 Tempat Tidur Twin', 'WiFi Gratis', 'AC', 'TV', 'Minibar'],
        hasBalcony: false,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 10,
    name: "Hotel Santika Premiere Semarang",
    location: "Semarang, Jawa Tengah",
    rating: 8.1,
    pricePerNight: 1250000,
    description: "Hotel premium di Semarang dengan arsitektur modern dan fasilitas lengkap, ideal untuk perjalanan bisnis dan wisata.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Kolam Renang', 'Fitness Center', 'Restaurant', 'Business Center'],
    category: "Business",
    rooms: [
      {
        id: 1,
        type: "Premier Room",
        price: 1250000,
        capacity: 2,
        bedCount: 1,
        bedSize: "King",
        roomSize: 38,
        amenities: ['Tempat Tidur King', 'WiFi Gratis', 'AC', 'TV', 'Minibar'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 11,
    name: "Aryaduta Palembang",
    location: "Palembang, Sumatera Selatan",
    rating: 8.4,
    pricePerNight: 1380000,
    description: "Hotel mewah di tepi Sungai Musi dengan pemandangan kota Palembang yang spektakuler dan fasilitas kelas atas.",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'River View', 'Spa', 'Restaurant', 'Business Center'],
    category: "Luxury",
    rooms: [
      {
        id: 1,
        type: "River View Room",
        price: 1380000,
        capacity: 2,
        bedCount: 1,
        bedSize: "King",
        roomSize: 42,
        amenities: ['Tempat Tidur King', 'Pemandangan Sungai', 'WiFi Gratis', 'AC', 'Balkon'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 12,
    name: "Radisson Golf & Convention Center Batam",
    location: "Batam, Kepulauan Riau",
    rating: 8.6,
    pricePerNight: 1520000,
    description: "Resort hotel dengan lapangan golf 18-hole dan fasilitas konvensi lengkap di pulau Batam yang indah.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Golf Course', 'Kolam Renang', 'Spa', 'Multiple Restaurants'],
    category: "Resort",
    rooms: [
      {
        id: 1,
        type: "Golf View Room",
        price: 1520000,
        capacity: 3,
        bedCount: 1,
        bedSize: "King",
        roomSize: 45,
        amenities: ['Tempat Tidur King', 'Pemandangan Golf', 'WiFi Gratis', 'AC', 'Balkon'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 13,
    name: "Hotel Tugu Malang",
    location: "Malang, Jawa Timur",
    rating: 9.0,
    pricePerNight: 1750000,
    description: "Hotel heritage dengan koleksi seni Indonesia yang unik dan arsitektur kolonial yang memukau di kota Malang yang sejuk.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Art Gallery', 'Spa', 'Restaurant', 'Garden'],
    category: "Heritage",
    rooms: [
      {
        id: 1,
        type: "Colonial Suite",
        price: 1750000,
        capacity: 2,
        bedCount: 1,
        bedSize: "King",
        roomSize: 50,
        amenities: ['Tempat Tidur King Heritage', 'Art Collection', 'WiFi Gratis', 'AC', 'Balkon'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 14,
    name: "Alila Solo",
    location: "Solo, Jawa Tengah",
    rating: 8.8,
    pricePerNight: 1480000,
    description: "Hotel boutique dengan desain kontemporer di pusat kota Solo, dekat dengan keraton dan berbagai destinasi budaya.",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Rooftop Pool', 'Spa', 'Restaurant', 'Cultural Tours'],
    category: "Boutique",
    rooms: [
      {
        id: 1,
        type: "City View Room",
        price: 1480000,
        capacity: 2,
        bedCount: 1,
        bedSize: "Queen",
        roomSize: 36,
        amenities: ['Tempat Tidur Queen', 'City View', 'WiFi Gratis', 'AC', 'Modern Design'],
        hasBalcony: false,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 15,
    name: "Katamaran Hotel & Resort Lombok",
    location: "Lombok, Nusa Tenggara Barat",
    rating: 9.1,
    pricePerNight: 2200000,
    description: "Resort tepi pantai eksklusif di Lombok dengan pantai pribadi dan pemandangan laut yang memukau serta akses ke Gili Islands.",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Private Beach', 'Water Sports', 'Spa', 'Island Tours'],
    category: "Resort",
    rooms: [
      {
        id: 1,
        type: "Beachfront Villa",
        price: 2200000,
        capacity: 4,
        bedCount: 2,
        bedSize: "King",
        roomSize: 65,
        amenities: ['2 Tempat Tidur King', 'Beachfront Access', 'WiFi Gratis', 'AC', 'Private Terrace'],
        hasBalcony: true,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: true,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 16,
    name: "Swiss-Belhotel Maleosan Manado",
    location: "Manado, Sulawesi Utara",
    rating: 8.2,
    pricePerNight: 1320000,
    description: "Hotel modern di pusat kota Manado dengan akses mudah ke Bunaken National Park dan berbagai destinasi diving terbaik.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Diving Center', 'Kolam Renang', 'Restaurant', 'Tour Services'],
    category: "Business",
    rooms: [
      {
        id: 1,
        type: "Standard Room",
        price: 1320000,
        capacity: 2,
        bedCount: 1,
        bedSize: "Queen",
        roomSize: 30,
        amenities: ['Tempat Tidur Queen', 'WiFi Gratis', 'AC', 'TV', 'Minibar'],
        hasBalcony: false,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: 17,
    name: "Mercure Balikpapan",
    location: "Balikpapan, Kalimantan Timur",
    rating: 8.0,
    pricePerNight: 1420000,
    description: "Hotel internasional di kota minyak Balikpapan dengan fasilitas modern dan pelayanan berkualitas untuk wisatawan bisnis.",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ['WiFi Gratis', 'Business Center', 'Fitness Center', 'Restaurant', 'Meeting Rooms'],
    category: "Business",
    rooms: [
      {
        id: 1,
        type: "Superior Room",
        price: 1420000,
        capacity: 2,
        bedCount: 1,
        bedSize: "King",
        roomSize: 34,
        amenities: ['Tempat Tidur King', 'WiFi Gratis', 'AC', 'TV', 'Work Desk'],
        hasBalcony: false,
        hasAirConditioning: true,
        hasTV: true,
        hasWiFi: true,
        hasMinibar: true,
        hasKitchen: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ]
  }
];

// Mock reviews for the hotel details page
const mockReviews = [
  {
    id: 1,
    user: "Sarah Wijaya",
    rating: 5,
    comment: "Hotel yang luar biasa dengan pelayanan yang sangat baik. Kamar bersih dan nyaman.",
    date: "15 Januari 2024"
  },
  {
    id: 2,
    user: "Budi Santoso",
    rating: 4,
    comment: "Lokasi bagus dan staf yang ramah. Akan menginap lagi!",
    date: "10 Januari 2024"
  }
];

// Room facility images for detailed view
const getRoomFacilityImages = (roomType: string) => {
  const facilityImages = {
    bathroom: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bedroom: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    balcony: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    livingroom: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    workspace: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  };
  
  return [
    { name: "Kamar Tidur", image: facilityImages.bedroom },
    { name: "Kamar Mandi", image: facilityImages.bathroom },
    { name: "Area Kerja", image: facilityImages.workspace },
    { name: "Ruang Tamu", image: facilityImages.livingroom }
  ];
};

const HotelDetails = () => {
  const { id } = useParams();
  const hotel = mockHotels.find(h => h.id === parseInt(id || '1')) || mockHotels[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hotel Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <div>
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              <div className="flex items-center mb-2">
                <Badge variant="secondary">{hotel.category}</Badge>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{hotel.location}</span>
              </div>
              <div className="flex items-center mb-4">
                {renderStars(Math.floor(hotel.rating))}
                <span className="ml-2 text-gray-600">({hotel.rating}/10)</span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600">{formatPrice(hotel.pricePerNight)}</span>
                <span className="text-gray-600 ml-2">per malam</span>
              </div>
              <p className="text-gray-700 mb-6">{hotel.description}</p>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary">{amenity}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Room Types */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Kamar yang Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {hotel.rooms.map((room) => (
                <div key={room.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <img
                      src={room.image}
                      alt={room.type}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.type}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Users className="h-4 w-4 mr-1" />
                            <span>Hingga {room.capacity} tamu</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{room.bedCount} {room.bedSize} Bed • {room.roomSize}m²</span>
                          </div>
                          
                          {/* Room Features */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {room.hasAirConditioning && <Badge variant="outline" className="text-xs"><AirVent className="h-3 w-3 mr-1" />AC</Badge>}
                            {room.hasTV && <Badge variant="outline" className="text-xs"><Tv className="h-3 w-3 mr-1" />TV</Badge>}
                            {room.hasWiFi && <Badge variant="outline" className="text-xs"><Wifi className="h-3 w-3 mr-1" />WiFi</Badge>}
                            {room.hasBalcony && <Badge variant="outline" className="text-xs">Balkon</Badge>}
                            {room.hasKitchen && <Badge variant="outline" className="text-xs">Dapur</Badge>}
                            {room.hasMinibar && <Badge variant="outline" className="text-xs">Minibar</Badge>}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-2">
                            {formatPrice(room.price)}
                          </div>
                          <div className="text-sm text-gray-500 mb-4">per malam</div>
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => window.location.href = `/booking/${hotel.id}/${room.id}`}
                          >
                            Pesan Sekarang
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Room Facility Images */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Fasilitas & Furniture Kamar</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {getRoomFacilityImages(room.type).map((facility, index) => (
                        <div key={index} className="relative">
                          <img
                            src={facility.image}
                            alt={facility.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-b-lg">
                            {facility.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Room Details */}
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Detail Kamar:</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Ukuran Kamar:</span>
                        <span className="ml-2 font-medium">{room.roomSize}m²</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Kapasitas:</span>
                        <span className="ml-2 font-medium">{room.capacity} orang</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Tempat Tidur:</span>
                        <span className="ml-2 font-medium">{room.bedCount} {room.bedSize}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">AC:</span>
                        <span className="ml-2 font-medium">{room.hasAirConditioning ? '✓' : '✗'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Balkon:</span>
                        <span className="ml-2 font-medium">{room.hasBalcony ? '✓' : '✗'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Dapur:</span>
                        <span className="ml-2 font-medium">{room.hasKitchen ? '✓' : '✗'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Ulasan Tamu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.user}</h4>
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelDetails;
