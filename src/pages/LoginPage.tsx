import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { GraduationCap, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user, isLoading } = useAuth();

  if (user) {
    const redirectPaths: Record<string, string> = {
      super_admin: "/super-admin/dashboard",
      school_admin: "/school/dashboard",
      teacher: "/teacher/dashboard",
      student: "/student/dashboard",
      parent: "/parent/dashboard",
    };
    return <Navigate to={redirectPaths[user.role]} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (!success) {
      setError("Email atau password salah");
    }
  };

  const demoAccounts = [
    { role: "Super Admin", email: "super@lms.com" },
    { role: "Admin Sekolah", email: "admin@school.com" },
    { role: "Guru", email: "guru@school.com" },
    { role: "Siswa", email: "siswa@school.com" },
    { role: "Orang Tua", email: "ortu@school.com" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-white to-accent-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-3 rounded-full bg-primary-100 shadow-lg"
            >
              <GraduationCap className="h-12 w-12 text-primary-600" />
            </motion.div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-900 tracking-tight">
            Pangestu LMS
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Masuk ke platform pembelajaran modern
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm md:text-base"
                  placeholder="Masukkan email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm md:text-base"
                  placeholder="Masukkan password"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Button */}
            <Button
              type="submit"
              className="w-full py-2.5 text-base rounded-xl shadow-md hover:shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Masuk..." : "Masuk"}
            </Button>
          </form>
        </Card>

        {/* Demo Account Card */}
        <Card className="mt-6 shadow-md rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Demo Accounts:
          </h3>
          <div className="space-y-2">
            {demoAccounts.map((account, index) => (
              <div
                key={index}
                className="flex justify-between text-xs md:text-sm"
              >
                <span className="font-medium text-gray-600">{account.role}:</span>
                <span
                  className="text-primary-600 cursor-pointer hover:underline"
                  onClick={() => setEmail(account.email)}
                >
                  {account.email}
                </span>
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-2">
              Password default: <span className="font-semibold">123456</span>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
