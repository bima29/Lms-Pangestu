import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Calendar,
  FileText,
} from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Manajemen Kelas",
      description:
        "Kelola kelas dan materi pembelajaran dengan mudah, terstruktur, dan efisien.",
      color: "bg-primary-500",
    },
    {
      icon: FileText,
      title: "CBT System",
      description:
        "Sistem ujian online dengan timer, keamanan, dan monitoring real-time.",
      color: "bg-green-500",
    },
    {
      icon: Users,
      title: "Multi Role Access",
      description:
        "Akses berbeda untuk admin, guru, siswa, dan orang tua sesuai kebutuhan.",
      color: "bg-yellow-500",
    },
    {
      icon: Award,
      title: "Tracking Nilai",
      description:
        "Pantau perkembangan akademik siswa dengan laporan komprehensif.",
      color: "bg-red-500",
    },
    {
      icon: Calendar,
      title: "Jadwal Terintegrasi",
      description:
        "Jadwal pelajaran dan kegiatan sekolah yang terorganisir dalam satu tempat.",
      color: "bg-blue-500",
    },
    {
      icon: GraduationCap,
      title: "Dashboard Analytics",
      description:
        "Lihat analitik performa sekolah dalam tampilan grafik interaktif.",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-xl font-bold text-primary-900">
                Pangestu LMS
              </h1>
            </div>
            <div className="space-x-4">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-100 to-accent-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-900 mb-6 leading-tight">
              Platform Pembelajaran Digital <span className="text-primary-600">Terdepan</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Pangestu LMS menghadirkan solusi lengkap untuk manajemen
              pembelajaran sekolah dengan teknologi modern dan antarmuka yang
              ramah pengguna.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg">Mulai Sekarang</Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline">
                  Lihat Demo
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1"
              alt="Students learning"
              className="rounded-xl shadow-xl w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-primary-900 mb-4">
            Fitur Unggulan
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fitur-fitur yang dirancang khusus untuk mendukung sekolah, guru,
            siswa, dan orang tua agar pembelajaran lebih efektif.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="text-center p-6 h-full">
                  <div
                    className={`w-14 h-14 rounded-xl mx-auto mb-6 flex items-center justify-center ${feature.color}`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-primary-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-accent-400" />
            <h1 className="ml-2 text-xl font-bold">Pangestu LMS</h1>
          </div>
          <p className="text-primary-200 mb-4">
            Memajukan pendidikan Indonesia melalui teknologi pembelajaran digital
          </p>
          <p className="text-primary-300 text-sm">
            © {new Date().getFullYear()} Pangestu LMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
