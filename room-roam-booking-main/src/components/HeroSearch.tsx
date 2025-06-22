import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Search } from "lucide-react";
import { DatePicker } from "./DatePicker";

const HeroSearch = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 2,
    rooms: 1,
  });

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchData.location) {
      params.append("location", searchData.location);
    }
    if (searchData.checkIn) {
      params.append("checkIn", searchData.checkIn.toISOString());
    }
    if (searchData.checkOut) {
      params.append("checkOut", searchData.checkOut.toISOString());
    }
    params.append("guests", searchData.guests.toString());
    params.append("rooms", searchData.rooms.toString());

    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <section
      className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Discover amazing hotels around Nusantara with the best prices and
            reviews
          </p>
        </div>
        <Card className="max-w-4xl mx-auto bg-white/10 border-white/10 shadow-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-2">
                <Label
                  htmlFor="location"
                  className="text-sm font-medium text-white/90"
                >
                  Where are you going?
                </Label>
                <Input
                  id="location"
                  placeholder="City, state, or else"
                  value={searchData.location}
                  onChange={(e) =>
                    setSearchData({ ...searchData, location: e.target.value })
                  }
                  className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-white/90">
                  Check-in
                </Label>
                <DatePicker
                  selected={searchData.checkIn}
                  onSelect={(date) =>
                    setSearchData({ ...searchData, checkIn: date })
                  }
                  placeholder="Select date"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-white/90">
                  Check-out
                </Label>
                <DatePicker
                  selected={searchData.checkOut}
                  onSelect={(date) =>
                    setSearchData({ ...searchData, checkOut: date })
                  }
                  placeholder="Select date"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-white/90">
                  Guests & Rooms
                </Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    min="1"
                    value={searchData.guests}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        guests: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-20 bg-white/20 border-white/30 text-white/90 placeholder:text-white/60 backdrop-blur-sm"
                  />
                  <Input
                    type="number"
                    min="1"
                    value={searchData.rooms}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        rooms: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-20 bg-white/20 border-white/30 text-white/90 placeholder:text-white/60 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full md:w-auto mt-6 bg-blue-600/80 hover:bg-blue-700/90 backdrop-blur-sm text-white px-8 py-3 text-lg border border-white/20"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Hotels
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HeroSearch;
