import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Berhasil!",
        description:
          "Anda telah berlangganan newsletter kami. Cek email untuk voucher diskon!",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Gift className="w-8 h-8 text-yellow-600" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dapatkan Promo Terbaik Langsung di Email Anda!
              </h2>

              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Berlangganan newsletter kami dan dapatkan voucher diskon 15%
                untuk pemesanan pertama Anda, plus update promo eksklusif dan
                tips travel terbaru.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Berlangganan
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                Dengan berlangganan, Anda menyetujui{" "}
                <span className="text-blue-600 cursor-pointer">
                  kebijakan privasi
                </span>{" "}
                kami.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
