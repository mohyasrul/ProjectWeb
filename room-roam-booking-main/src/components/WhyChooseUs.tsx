
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, MapPin, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Harga Terbaik Terjamin",
    description: "Kami menjamin harga terbaik atau kami akan mengembalikan selisihnya"
  },
  {
    icon: Clock,
    title: "Layanan 24/7",
    description: "Customer service kami siap membantu Anda kapan saja, di mana saja"
  },
  {
    icon: MapPin,
    title: "Ribuan Hotel Terpercaya",
    description: "Pilihan hotel terlengkap dari seluruh Indonesia dan dunia"
  },
  {
    icon: CreditCard,
    title: "Pembayaran Aman",
    description: "Sistem pembayaran yang aman dan terpercaya dengan berbagai metode"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih Kami?</h2>
          <p className="text-gray-600">Platform booking hotel terdepan dengan layanan terbaik</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
