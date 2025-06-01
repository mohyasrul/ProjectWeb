import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "Bali",
    description: "Pulau Dewata dengan pantai eksotis",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotelsCount: "500+ hotel",
  },
  {
    id: 2,
    name: "Jakarta",
    description: "Ibu kota dengan hiburan tak terbatas",
    image:
      "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SmFrYXJ0YXxlbnwwfHwwfHx8MA%3D%3D",
    hotelsCount: "800+ hotel",
  },
  {
    id: 3,
    name: "Bandung",
    description: "Kota kembang dengan kuliner legendaris",
    image:
      "https://images.unsplash.com/photo-1611638281871-1063d3e76e1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuZHVuZ3xlbnwwfHwwfHx8MA%3D%3D",
    hotelsCount: "300+ hotel",
  },
  {
    id: 4,
    name: "Yogyakarta",
    description: "Gudeg dan warisan budaya Jawa",
    image:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHlvZ3lha2FydGF8ZW58MHx8MHx8fDA%3D",
    hotelsCount: "200+ hotel",
  },
  {
    id: 5,
    name: "Palembang",
    description: "Kota Pempek dengan sejarah Sriwijaya",
    image:
      "https://images.unsplash.com/photo-1543033926-1482ed3498be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHBhbGVtYmFuZ3xlbnwwfHwwfHx8MA%3D%3D",
    hotelsCount: "150+ hotel",
  },
  {
    id: 6,
    name: "Batam",
    description: "Pulau industri dengan resort tepi laut",
    image:
      "https://images.unsplash.com/photo-1559934252-5b447c07b033?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtvdGElMjBiYXRhbXxlbnwwfHwwfHx8MA%3D%3D",
    hotelsCount: "180+ hotel",
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Destinasi Populer
          </h2>
          <p className="text-gray-600">
            Jelajahi kota-kota favorit dengan penawaran hotel terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-sm opacity-90">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {destination.hotelsCount}
                  </span>
                  <Link to={`/hotels?location=${destination.name}`}>
                    <Button variant="outline" size="sm">
                      Lihat Hotel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
