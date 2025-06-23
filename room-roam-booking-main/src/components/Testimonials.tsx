import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Joko Widodo",
    location: "Jakarta",
    rating: 5,
    comment:
      "We wok de tok, not only tok de tok. Platform ini memudahkan pencarian hotel terbaik!",
    avatar: "/jokowidodo.jpg",
  },
  {
    id: 2,
    name: "Gibran Rakabuming",
    location: "Solo",
    rating: 5,
    comment:
      "Sebagai fufufafa, saya butuh platform yang modern dan user-friendly. Hotelbewell adalah solusinya!",
    avatar: "/gibran.jpg",
  },
  {
    id: 3,
    name: "Prabowo Subianto",
    location: "Jakarta",
    rating: 5,
    comment: "HIDUP JOKOWI!",
    avatar: "/prabowo.jpg",
  },
  {
    id: 4,
    name: "Monkey D. Luffy",
    location: "East Blue",
    rating: 4,
    comment: "Selain suka daging, aku juga suka Hotel Be Well!",
    avatar: "/luffy.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-gray-600">
            Pengalaman nyata dari pelanggan yang telah mempercayai layanan kami
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 italic">
                      "{testimonial.comment}"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
