
import React from 'react';

const partners = [
  {
    name: "Booking.com",
    logo: "https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png"
  },
  {
    name: "Agoda",
    logo: "https://logoeps.com/wp-content/uploads/2013/03/agoda-vector-logo.png"
  },
  {
    name: "BCA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
  },
  {
    name: "VISA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
  },
  {
    name: "Mastercard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
  },
  {
    name: "GoPay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg"
  },
  {
    name: "OVO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg"
  },
  {
    name: "DANA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg"
  }
];

const Partners = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Terpercaya</h2>
          <p className="text-gray-600">Bermitra dengan platform dan layanan pembayaran terbaik</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const img = e.currentTarget;
                  const span = img.nextElementSibling as HTMLSpanElement;
                  img.style.display = 'none';
                  if (span) {
                    span.style.display = 'block';
                  }
                }}
              />
              <span className="hidden text-gray-600 font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
