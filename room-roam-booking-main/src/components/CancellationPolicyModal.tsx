import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  CreditCard,
} from "lucide-react";

interface CancellationPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
  booking: {
    id: string;
    hotel: string;
    checkIn: string;
    total: number;
    status: string;
  };
}

const CancellationPolicyModal = ({
  isOpen,
  onClose,
  onConfirmCancel,
  booking,
}: CancellationPolicyModalProps) => {
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDaysUntilCheckIn = () => {
    const checkInDate = new Date(booking.checkIn);
    const today = new Date();
    const diffTime = checkInDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCancellationFee = () => {
    const daysUntilCheckIn = calculateDaysUntilCheckIn();

    if (daysUntilCheckIn >= 7) {
      return { percentage: 0, amount: 0, type: "free" };
    } else if (daysUntilCheckIn >= 3) {
      return { percentage: 25, amount: booking.total * 0.25, type: "partial" };
    } else if (daysUntilCheckIn >= 1) {
      return { percentage: 50, amount: booking.total * 0.5, type: "partial" };
    } else {
      return { percentage: 100, amount: booking.total, type: "full" };
    }
  };

  const cancellationFee = getCancellationFee();
  const refundAmount = booking.total - cancellationFee.amount;
  const daysUntilCheckIn = calculateDaysUntilCheckIn();

  const handleConfirm = () => {
    if (agreeToPolicy) {
      onConfirmCancel();
      onClose();
      setAgreeToPolicy(false);
    }
  };

  const handleClose = () => {
    onClose();
    setAgreeToPolicy(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
            Kebijakan Pembatalan Pemesanan
          </DialogTitle>
          <DialogDescription>
            Mohon baca dengan teliti kebijakan pembatalan sebelum melanjutkan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              Detail Pemesanan
            </h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>• Hotel: {booking.hotel}</p>
              <p>• Check-in: {formatDate(booking.checkIn)}</p>
              <p>• Total Pembayaran: {formatPrice(booking.total)}</p>
              <p>• Waktu tersisa: {daysUntilCheckIn} hari hingga check-in</p>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Kebijakan Pembatalan
            </h4>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">
                    Pembatalan Gratis
                  </p>
                  <p className="text-sm text-green-800">
                    7+ hari sebelum check-in - Tidak ada biaya pembatalan
                  </p>
                </div>
              </div>

              <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-900">
                    Pembatalan Sebagian
                  </p>
                  <p className="text-sm text-yellow-800">
                    3-6 hari sebelum check-in - Biaya 25% dari total
                  </p>
                  <p className="text-sm text-yellow-800">
                    1-2 hari sebelum check-in - Biaya 50% dari total
                  </p>
                </div>
              </div>

              <div className="flex items-start p-3 bg-red-50 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">Tidak Ada Refund</p>
                  <p className="text-sm text-red-800">
                    Hari check-in atau setelahnya - Tidak ada pengembalian dana
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Cancellation Impact */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Rincian Pembatalan Anda
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Pembayaran</span>
                <span className="font-medium">
                  {formatPrice(booking.total)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  Biaya Pembatalan ({cancellationFee.percentage}%)
                </span>
                <span
                  className={`font-medium ${
                    cancellationFee.type === "free"
                      ? "text-green-600"
                      : cancellationFee.type === "partial"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {cancellationFee.amount === 0
                    ? "Gratis"
                    : `- ${formatPrice(cancellationFee.amount)}`}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Jumlah Refund</span>
                <span
                  className={`text-lg font-bold ${
                    refundAmount === booking.total
                      ? "text-green-600"
                      : refundAmount > 0
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {formatPrice(refundAmount)}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              <Badge
                className={
                  cancellationFee.type === "free"
                    ? "bg-green-100 text-green-800"
                    : cancellationFee.type === "partial"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {cancellationFee.type === "free"
                  ? "Pembatalan Gratis"
                  : cancellationFee.type === "partial"
                  ? "Pembatalan Berbayar"
                  : "Tidak Ada Refund"}
              </Badge>
            </div>
          </div>

          {/* Additional Terms */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">
              Ketentuan Tambahan
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Refund akan diproses dalam 3-7 hari kerja</li>
              <li>• Refund akan dikembalikan ke metode pembayaran yang sama</li>
              <li>• Pembatalan tidak dapat dibatalkan setelah dikonfirmasi</li>
              <li>• Untuk force majeure, kebijakan khusus dapat diterapkan</li>
            </ul>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
            <input
              type="checkbox"
              id="agree-policy"
              checked={agreeToPolicy}
              onChange={(e) => setAgreeToPolicy(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="agree-policy" className="text-sm text-orange-900">
              Saya telah membaca dan memahami kebijakan pembatalan di atas. Saya
              setuju untuk melanjutkan pembatalan dengan rincian biaya yang
              tertera.
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!agreeToPolicy}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Konfirmasi Pembatalan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancellationPolicyModal;
