import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "../store/authStore";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const AuthModal = () => {
  const {
    isAuthModalOpen,
    setAuthModalOpen,
    login,
    register,
    error,
    setError,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isAuthModalOpen) {
      setLoginData({ email: "", password: "" });
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setValidationErrors({});
      setError(null);
      setIsLoading(false);
    }
  }, [isAuthModalOpen, setError]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    const errors: Record<string, string> = {};

    if (!loginData.email) {
      errors.email = "Email wajib diisi";
    } else if (!validateEmail(loginData.email)) {
      errors.email = "Format email tidak valid";
    }

    if (!loginData.password) {
      errors.password = "Password wajib diisi";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    const result = await login(loginData.email, loginData.password);
    setIsLoading(false);

    if (!result.success && result.error) {
      setError({ message: result.error });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    const errors: Record<string, string> = {};

    if (!registerData.name.trim()) {
      errors.name = "Nama lengkap wajib diisi";
    } else if (registerData.name.trim().length < 2) {
      errors.name = "Nama minimal 2 karakter";
    }

    if (!registerData.email) {
      errors.email = "Email wajib diisi";
    } else if (!validateEmail(registerData.email)) {
      errors.email = "Format email tidak valid";
    }

    if (!registerData.password) {
      errors.password = "Password wajib diisi";
    } else if (!validatePassword(registerData.password)) {
      errors.password = "Password minimal 6 karakter";
    }

    if (!registerData.confirmPassword) {
      errors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "Password tidak cocok";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    const result = await register(
      registerData.name,
      registerData.email,
      registerData.password
    );
    setIsLoading(false);

    if (!result.success && result.error) {
      setError({ message: result.error });
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setAuthModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {activeTab === "login"
              ? "Selamat Datang Kembali!"
              : "Bergabung dengan Kami"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {activeTab === "login"
              ? "Masuk ke akun Anda untuk melanjutkan pemesanan"
              : "Buat akun baru untuk pengalaman terbaik"}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error.message}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Masuk
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Daftar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className={`pl-10 ${
                      validationErrors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-sm text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className={`pl-10 pr-10 ${
                      validationErrors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-red-600">
                    {validationErrors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sedang masuk...
                  </div>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <button
                onClick={() => setActiveTab("register")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Daftar sekarang
              </button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-sm font-medium">
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Nama lengkap Anda"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                    className={`pl-10 ${
                      validationErrors.name ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {validationErrors.name && (
                  <p className="text-sm text-red-600">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    className={`pl-10 ${
                      validationErrors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-sm text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="register-password"
                  className="text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 6 karakter"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    className={`pl-10 pr-10 ${
                      validationErrors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-red-600">
                    {validationErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="register-confirm-password"
                  className="text-sm font-medium"
                >
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ketik ulang password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`pl-10 pr-10 ${
                      validationErrors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {validationErrors.confirmPassword}
                  </p>
                )}
                {registerData.password &&
                  registerData.confirmPassword &&
                  registerData.password === registerData.confirmPassword && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="h-3 w-3" />
                      Password cocok
                    </div>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Mendaftarkan akun...
                  </div>
                ) : (
                  "Buat Akun"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <button
                onClick={() => setActiveTab("login")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Masuk di sini
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
