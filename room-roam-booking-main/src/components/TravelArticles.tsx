import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "10 Hotel Terbaik di Bali Tahun Ini",
    excerpt: "Temukan pilihan akomodasi terbaik di Pulau Dewata untuk liburan yang tak terlupakan",
    author: "Tim Editorial",
    date: "15 Des 2024",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Destinasi"
  },
  {
    id: 2,
    title: "Tips Liburan Hemat Bersama Keluarga",
    excerpt: "Cara cerdas merencanakan liburan keluarga tanpa menguras kantong",
    author: "Sarah Wijaya",
    date: "12 Des 2024",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Tips Travel"
  },
  {
    id: 3,
    title: "Panduan Wisata Kuliner Jakarta",
    excerpt: "Eksplorasi kuliner terbaik Jakarta dari street food hingga fine dining",
    author: "Budi Santoso",
    date: "10 Des 2024",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Kuliner"
  }
];

const TravelArticles = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel & Tips Travel</h2>
          <p className="text-gray-600">Inspirasi dan panduan untuk perjalanan Anda selanjutnya</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
        
        <div className="text-center mt-8">
          <Link to="/articles">
            <Button variant="outline" size="lg">
              Lihat Semua Artikel
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelArticles;
