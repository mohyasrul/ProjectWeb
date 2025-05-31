
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    id: 'item-1',
    question: 'Bagaimana cara memesan hotel?',
    answer: 'Anda dapat memesan hotel dengan mudah melalui platform kami. Cukup cari destinasi yang diinginkan, pilih tanggal check-in dan check-out, pilih hotel yang sesuai, dan lakukan pembayaran. Konfirmasi booking akan dikirim ke email Anda.'
  },
  {
    id: 'item-2',
    question: 'Bisakah saya mendapatkan refund?',
    answer: 'Ya, kebijakan refund tergantung pada jenis tarif yang Anda pilih dan kebijakan hotel. Tarif yang dapat dibatalkan memungkinkan Anda mendapatkan refund penuh atau sebagian. Silakan periksa detail kebijakan pembatalan sebelum memesan.'
  },
  {
    id: 'item-3',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima berbagai metode pembayaran termasuk kartu kredit (Visa, Mastercard), transfer bank, e-wallet (GoPay, OVO, DANA), dan virtual account dari berbagai bank lokal.'
  },
  {
    id: 'item-4',
    question: 'Apakah harga yang ditampilkan sudah final?',
    answer: 'Ya, harga yang ditampilkan sudah termasuk pajak dan biaya layanan. Tidak ada biaya tersembunyi. Apa yang Anda lihat adalah apa yang Anda bayar.'
  },
  {
    id: 'item-5',
    question: 'Bagaimana jika saya perlu mengubah atau membatalkan reservasi?',
    answer: 'Anda dapat mengubah atau membatalkan reservasi melalui dashboard akun Anda atau dengan menghubungi customer service kami. Perubahan dan pembatalan tergantung pada kebijakan hotel yang bersangkutan.'
  },
  {
    id: 'item-6',
    question: 'Apakah customer service tersedia 24/7?',
    answer: 'Ya, tim customer service kami siap membantu Anda 24 jam sehari, 7 hari seminggu melalui live chat, email, atau telepon untuk memastikan perjalanan Anda berjalan lancar.'
  }
];

const FAQ = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-gray-600">Temukan jawaban untuk pertanyaan umum seputar layanan kami</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-lg mb-4 px-6">
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
