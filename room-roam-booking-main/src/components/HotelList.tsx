
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, MapPin, Users, Bed, AirVent, Tv, Wifi } from 'lucide-react';

// Use the same hotel data as HotelDetails
const mockHotels = [
  {
    id: 1,
    name: "Grand Hyatt Jakarta",
    location: "Jakarta Pusat, DKI Jakarta",
    rating: 9.2,
    pricePerNight: 1850000,
    description: "Terletak di jantung Jakarta, hotel kami menawarkan akomodasi nyaman dengan fasilitas modern. Sempurna untuk wisatawan bisnis dan liburan.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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

const HotelList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredHotels, setFilteredHotels] = useState(mockHotels);
  const [filters, setFilters] = useState({
    location: '',
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 2,
    rooms: 1,
    priceRange: [0, 5000000],
    bedCount: 'all',
    bedSize: 'all',
    roomSizeRange: [0, 100],
    category: 'all',
    rating: 0,
    hasBalcony: false,
    hasAirConditioning: false,
    hasTV: false,
    hasWiFi: false,
    hasMinibar: false,
    hasKitchen: false,
    amenities: [] as string[]
  });

  const allAmenities = [
    'WiFi Gratis', 'Kolam Renang', 'Spa', 'Fitness Center', 'Restaurant',
    'Business Center', 'Parkir', 'Pantai Pribadi', 'Kids Club', 'Golf Course',
    'Art Gallery', 'Diving Center', 'River View', 'Shopping Mall Access'
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get('location');
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    const guestsParam = searchParams.get('guests');
    const roomsParam = searchParams.get('rooms');

    setFilters(prev => ({
      ...prev,
      location: locationParam || '',
      checkIn: checkInParam ? new Date(checkInParam) : null,
      checkOut: checkOutParam ? new Date(checkOutParam) : null,
      guests: guestsParam ? parseInt(guestsParam) : 2,
      rooms: roomsParam ? parseInt(roomsParam) : 1
    }));
  }, [location]);

  useEffect(() => {
    let filtered = mockHotels;

    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(searchTerm) ||
        hotel.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) {
      filtered = filtered.filter(hotel => 
        hotel.pricePerNight >= filters.priceRange[0] && 
        hotel.pricePerNight <= filters.priceRange[1]
      );
    }

    if (filters.bedCount && filters.bedCount !== 'all') {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => room.bedCount.toString() === filters.bedCount)
      );
    }

    if (filters.bedSize && filters.bedSize !== 'all') {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => room.bedSize === filters.bedSize)
      );
    }

    if (filters.roomSizeRange[0] > 0 || filters.roomSizeRange[1] < 100) {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => 
          room.roomSize >= filters.roomSizeRange[0] && 
          room.roomSize <= filters.roomSizeRange[1]
        )
      );
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(hotel => hotel.category === filters.category);
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= filters.rating);
    }

    if (filters.hasBalcony) {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => room.hasBalcony)
      );
    }

    if (filters.hasAirConditioning) {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => room.hasAirConditioning)
      );
    }

    if (filters.hasTV) {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => room.hasTV)
      );
    }

    if (filters.hasWiFi) {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => room.hasWiFi)
      );
    }

    if (filters.hasMinibar) {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => room.hasMinibar)
      );
    }

    if (filters.hasKitchen) {
      filtered = filtered.filter(hotel =>
        hotel.rooms.some(room => room.hasKitchen)
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel =>
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    setFilteredHotels(filtered);
  }, [filters]);

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

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotel Tersedia</h1>
          <p className="text-gray-600">Ditemukan {filteredHotels.length} hotel yang sesuai dengan pencarian Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Filter Pencarian</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Lokasi</label>
                  <Input
                    placeholder="Cari kota atau hotel..."
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Kisaran Harga per Malam: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({...filters, priceRange: value})}
                    max={5000000}
                    min={0}
                    step={100000}
                    className="w-full"
                  />
                </div>

                {/* Bed Count Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Jumlah Tempat Tidur</label>
                  <Select value={filters.bedCount} onValueChange={(value) => setFilters({...filters, bedCount: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jumlah tempat tidur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="1">1 Tempat Tidur</SelectItem>
                      <SelectItem value="2">2 Tempat Tidur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bed Size Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Ukuran Tempat Tidur</label>
                  <Select value={filters.bedSize} onValueChange={(value) => setFilters({...filters, bedSize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih ukuran tempat tidur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="Twin">Twin</SelectItem>
                      <SelectItem value="Queen">Queen</SelectItem>
                      <SelectItem value="King">King</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Room Size Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Ukuran Kamar: {filters.roomSizeRange[0]}m² - {filters.roomSizeRange[1]}m²
                  </label>
                  <Slider
                    value={filters.roomSizeRange}
                    onValueChange={(value) => setFilters({...filters, roomSizeRange: value})}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Kategori Hotel</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Resort">Resort</SelectItem>
                      <SelectItem value="Heritage">Heritage</SelectItem>
                      <SelectItem value="Boutique">Boutique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Rating Minimum</label>
                  <Select value={filters.rating.toString()} onValueChange={(value) => setFilters({...filters, rating: parseFloat(value)})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rating minimum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Semua</SelectItem>
                      <SelectItem value="8">8.0+</SelectItem>
                      <SelectItem value="8.5">8.5+</SelectItem>
                      <SelectItem value="9">9.0+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Room Features */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Fasilitas Kamar</label>
                  <div className="space-y-3">
                    {[
                      { key: 'hasBalcony', label: 'Balkon', icon: null },
                      { key: 'hasAirConditioning', label: 'AC', icon: AirVent },
                      { key: 'hasTV', label: 'TV', icon: Tv },
                      { key: 'hasWiFi', label: 'WiFi', icon: Wifi },
                      { key: 'hasMinibar', label: 'Minibar', icon: null },
                      { key: 'hasKitchen', label: 'Dapur', icon: null }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={filters[key as keyof typeof filters] as boolean}
                          onCheckedChange={(checked) => setFilters({...filters, [key]: checked})}
                        />
                        <label htmlFor={key} className="text-sm flex items-center">
                          {Icon && <Icon className="h-4 w-4 mr-1" />}
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Public Amenities */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Fasilitas Umum</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {allAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={filters.amenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                        />
                        <label htmlFor={amenity} className="text-sm">{amenity}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => setFilters({
                    location: '',
                    checkIn: null,
                    checkOut: null,
                    guests: 2,
                    rooms: 1,
                    priceRange: [0, 5000000],
                    bedCount: 'all',
                    bedSize: 'all',
                    roomSizeRange: [0, 100],
                    category: 'all',
                    rating: 0,
                    hasBalcony: false,
                    hasAirConditioning: false,
                    hasTV: false,
                    hasWiFi: false,
                    hasMinibar: false,
                    hasKitchen: false,
                    amenities: []
                  })}
                  variant="outline" 
                  className="w-full"
                >
                  Reset Filter
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Hotels Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div onClick={() => navigate(`/hotel/${hotel.id}`)}>
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                        <Badge variant="secondary">{hotel.category}</Badge>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{hotel.location}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        {renderStars(Math.floor(hotel.rating))}
                        <span className="ml-2 text-sm text-gray-600">({hotel.rating}/10)</span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{hotel.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {hotel.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{hotel.amenities.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                      
                      {/* Room Details */}
                      {hotel.rooms[0] && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{hotel.rooms[0].type}</span>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{hotel.rooms[0].capacity}</span>
                              <Bed className="h-3 w-3 ml-2 mr-1" />
                              <span>{hotel.rooms[0].bedCount} {hotel.rooms[0].bedSize}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {hotel.rooms[0].hasAirConditioning && <Badge variant="outline" className="text-xs"><AirVent className="h-3 w-3" /></Badge>}
                            {hotel.rooms[0].hasTV && <Badge variant="outline" className="text-xs"><Tv className="h-3 w-3" /></Badge>}
                            {hotel.rooms[0].hasWiFi && <Badge variant="outline" className="text-xs"><Wifi className="h-3 w-3" /></Badge>}
                            {hotel.rooms[0].hasBalcony && <Badge variant="outline" className="text-xs">Balkon</Badge>}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">{formatPrice(hotel.pricePerNight)}</span>
                          <span className="text-gray-600 text-sm ml-1">per malam</span>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Lihat Detail
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada hotel ditemukan</h3>
                <p className="text-gray-600 mb-4">Coba ubah filter pencarian Anda untuk hasil yang lebih baik.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
