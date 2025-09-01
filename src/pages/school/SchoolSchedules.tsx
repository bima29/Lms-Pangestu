// ...existing code...
import React, { useState } from 'react';
import { Calendar, Clock, Plus, Search, BookOpen, Users, X, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Select from 'react-select';

const SchoolSchedules: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([
    '07:00-07:45',
    '07:45-08:30',
    '08:30-09:15',
    '09:15-10:00',
    '10:15-11:00',
    '11:00-11:45',
  ]);
  const [newSlot, setNewSlot] = useState('');
  // (hapus, tidak dipakai)
  // Dummy data for select
  const allSubjects: { value: string; label: string }[] = [
    'Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Indonesia', 'Bahasa Inggris',
    'Sejarah', 'Geografi', 'Ekonomi', 'Sosiologi', 'Seni Budaya', 'PJOK', 'Prakarya', 'Informatika',
    'Agama', 'PKN', 'Teknologi', 'Kewirausahaan', 'Multimedia', 'TKJ', 'RPL', 'Akuntansi', 'Bahasa Jepang', 'Bahasa Arab'
  ].map(s => ({ value: s, label: s }));
  const allClasses: { value: string; label: string }[] = [
    'XII IPA 1', 'XII IPA 2', 'XI IPA 1', 'XI IPA 2', 'X MIPA 1', 'X MIPA 2', 'XI IPS 1', 'XI IPS 2', 'XI IPS 3', 'XII IPS 1', 'XII IPS 2'
  ].map(s => ({ value: s, label: s }));
  const allTeachers: { value: string; label: string }[] = [
    'Budi Santoso', 'Siti Rahayu', 'Ahmad Wijaya', 'Dewi Lestari', 'Rina Kurnia', 'Agus Prabowo', 'Yuni Astuti', 'Fajar Hidayat', 'Dian Permata'
  ].map(s => ({ value: s, label: s }));
  // State for add/edit form
  const [formSubject, setFormSubject] = useState<{ value: string; label: string } | null>(null);
  const [formClass, setFormClass] = useState<{ value: string; label: string } | null>(null);
  const [formTeacher, setFormTeacher] = useState<{ value: string; label: string } | null>(null);
  const [formDay, setFormDay] = useState<string>('monday');
  const [formTime, setFormTime] = useState<string>('');

  // Set formTime default ke slot waktu pertama jika ada slot waktu baru
  React.useEffect(() => {
    if (timeSlots.length > 0 && !formTime) {
      setFormTime(timeSlots[0]);
    }
  }, [timeSlots, formTime]);

  type ScheduleSlot = {
    time: string;
    [key: string]: string;
  };
  // Inisialisasi schedule dinamis berdasarkan timeSlots
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(() =>
    [
      '07:00-07:45',
      '07:45-08:30',
      '08:30-09:15',
      '09:15-10:00',
      '10:15-11:00',
      '11:00-11:45',
    ].map(time => ({
      time,
      monday: 'Free',
      tuesday: 'Free',
      wednesday: 'Free',
      thursday: 'Free',
      friday: 'Free',
      saturday: 'Free',
    }))
  );

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayNamesShort = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  // Filter schedule based on search term and selected day
  const filteredSchedule = schedule.filter((slot: ScheduleSlot) => {
    const matchesSearch = Object.values(slot).some((value: string) => 
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesSearch;
  });

  // Simpan jadwal baru ke state

  // Modal edit & delete jadwal
  // Info slot yang sedang diedit
  const [deleteSlotInfo, setDeleteSlotInfo] = useState<{slotTime: string, day: string, value: string} | null>(null);
  const openEditModal = (slotTime: string, day: string, value: string) => {
    if (value === 'Free' || value.includes('Ekstrakurikuler')) return;
    const [subject, className, teacher] = value.split(' - ');
    setFormSubject({ value: subject, label: subject });
    setFormClass({ value: className, label: className });
    setFormTeacher({ value: teacher, label: teacher });
    setFormDay(day);
    setFormTime(slotTime);
    setIsEditModalOpen(true);
  };

  // Function to open delete modal
  const openDeleteModal = (slotTime: string, day: string, value: string) => {
    setDeleteSlotInfo({ slotTime, day, value });
  };
  const handleEditSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSubject || !formClass || !formTeacher || !formDay || !formTime) return;
    setSchedule((prev: ScheduleSlot[]) => prev.map((slot: ScheduleSlot) => {
      if (slot.time === formTime) {
        return {
          ...slot,
          [formDay]: `${formSubject.label} - ${formClass.label} - ${formTeacher.label}`
        };
      }
      return slot;
    }));
    setIsEditModalOpen(false);
    setFormSubject(null);
    setFormClass(null);
    setFormTeacher(null);
    setFormDay('monday');
    setFormTime('07:00-07:45');
  };
  const handleDeleteSchedule = () => {
    if (!deleteSlotInfo) return;
    setSchedule((prev: ScheduleSlot[]) => prev.map((slot: ScheduleSlot) => {
      if (slot.time === deleteSlotInfo.slotTime) {
        return {
          ...slot,
          [deleteSlotInfo.day]: 'Free'
        };
      }
      return slot;
    }));
    setDeleteSlotInfo(null);
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manajemen Jadwal</h1>
          </div>
          <p className="text-gray-600">Kelola jadwal pelajaran sekolah dengan mudah</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <Card className="p-5 bg-white rounded-xl shadow-sm border-0">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Total Kelas</h3>
                <p className="text-2xl font-bold text-blue-700">36</p>
                <p className="text-xs text-gray-500">Per minggu</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 bg-white rounded-xl shadow-sm border-0">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Jam Mengajar</h3>
                <p className="text-2xl font-bold text-green-700">27</p>
                <p className="text-xs text-gray-500">Per minggu</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 bg-white rounded-xl shadow-sm border-0">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Jam Kosong</h3>
                <p className="text-2xl font-bold text-purple-700">9</p>
                <p className="text-xs text-gray-500">Tersedia</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Schedule Card */}
        <Card className="p-5 md:p-6 bg-white rounded-xl shadow-sm border-0">
          {/* Slot Waktu Dinamis */}
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="font-semibold text-gray-700">Slot Waktu:</span>
            {timeSlots.map((slot: string) => (
              <span key={slot} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 mr-2">
                {slot}
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  title="Hapus slot waktu"
                  onClick={() => {
                    setTimeSlots((prev: string[]) => prev.filter((t: string) => t !== slot));
                    setSchedule((prev: ScheduleSlot[]) => prev.filter((s: ScheduleSlot) => s.time !== slot));
                  }}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
            <Button
              onClick={() => setIsSlotModalOpen(true)}
              className="ml-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-full text-sm"
            >
              <Plus className="h-4 w-4 inline" /> Tambah Slot
            </Button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Jadwal Mingguan</h3>
              <p className="text-sm text-gray-500 mt-1">Mengelola jadwal pelajaran sekolah</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Cari mata pelajaran atau kelas..."
                />
              </div>
              
              {/* Filter minggu dan hari dihapus, hanya search */}
              
              <Button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="h-4 w-4" /> Tambah Jadwal
              </Button>
            </div>
          </div>

          {filteredSchedule.length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">Tidak ada jadwal</h3>
              <p className="text-sm text-gray-500 mt-1">
                {searchTerm
                  ? 'Coba ubah pencarian'
                  : 'Mulai dengan menambahkan jadwal pertama'}
              </p>
            </div>
          ) : (
            <>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {filteredSchedule.map((slot, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4">
                    <div className="font-medium text-gray-900 mb-3">{slot.time}</div>
                    <div className="space-y-2">
                      {days.map((day, dayIndex) => {
                        const classInfo = slot[day as keyof typeof slot] as string;
                        const isFree = classInfo === 'Free';
                        const isExtracurricular = classInfo.includes('Ekstrakurikuler');
                        
                        return !isFree ? (
                          <div key={dayIndex} className="flex items-start gap-3">
                            <div className="min-w-[60px]">
                              <Badge 
                                className={`text-xs ${isExtracurricular ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}
                              >
                                {dayNamesShort[dayIndex]}
                              </Badge>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{classInfo.split(' - ')[0]}</div>
                              <div className="text-xs text-gray-500">{classInfo.split(' - ')[1]}</div>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Waktu</th>
                      {dayNames.map((day, index) => (
                        <th key={index} className="px-4 py-3 text-center text-sm font-medium text-gray-700 whitespace-nowrap">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedule.map((slot, index) => (
                      <tr key={index} className="hover:bg-gray-50 even:bg-gray-50/50">
                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50 whitespace-nowrap">
                          {slot.time}
                        </td>
                        {days.map((day, dayIndex) => {
                          const classInfo = slot[day as keyof typeof slot] as string;
                          const isFree = classInfo === 'Free';
                          const isExtracurricular = classInfo.includes('Ekstrakurikuler');
                          return (
                            <td key={dayIndex} className="px-2 py-3 relative group">
                              {isFree ? (
                                <div className="text-center text-gray-400 text-sm">-</div>
                              ) : (
                                <div className={`p-3 rounded-lg text-center ${isExtracurricular ? 'bg-purple-100' : 'bg-blue-100'} relative`}>
                                  <div className="font-medium text-sm">{classInfo.split(' - ')[0]}</div>
                                  <div className="text-xs text-gray-600 mt-1">{classInfo.split(' - ')[1]}</div>
                                  <div className="text-xs text-gray-400 mt-1">{classInfo.split(' - ')[2]}</div>
                                  {!isExtracurricular && (
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        type="button"
                                        className="text-indigo-600 hover:text-indigo-800"
                                        title="Edit Jadwal"
                                        onClick={() => openEditModal(slot.time, day, classInfo)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </button>
                                      <button
                                        type="button"
                                        className="text-red-600 hover:text-red-800"
                                        title="Hapus Jadwal"
                                        onClick={() => openDeleteModal(slot.time, day, classInfo)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  )}
        {/* Modal Edit Jadwal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Jadwal"
          size="lg"
        >
          <form className="space-y-4 py-2" onSubmit={handleEditSchedule}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
                <Select
                  options={allSubjects}
                  value={formSubject}
                  onChange={opt => setFormSubject(opt)}
                  isSearchable
                  placeholder="Pilih atau cari mata pelajaran..."
                  classNamePrefix="react-select"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                <Select
                  options={allClasses}
                  value={formClass}
                  onChange={opt => setFormClass(opt)}
                  isSearchable
                  placeholder="Pilih atau cari kelas..."
                  classNamePrefix="react-select"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hari</label>
                <Select
                  options={days.map((d, i) => ({ value: d, label: dayNames[i] }))}
                  value={{ value: formDay, label: dayNames[days.indexOf(formDay)] }}
                  onChange={opt => opt && setFormDay(opt.value)}
                  isSearchable={false}
                  placeholder="Pilih hari..."
                  classNamePrefix="react-select"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slot Waktu</label>
                <Select
                  options={timeSlots.map(slot => ({ value: slot, label: slot }))}
                  value={formTime ? { value: formTime, label: formTime } : null}
                  onChange={opt => opt && setFormTime(opt.value)}
                  isSearchable={false}
                  placeholder="Pilih slot waktu..."
                  classNamePrefix="react-select"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guru</label>
              <Select
                options={allTeachers}
                value={formTeacher}
                onChange={opt => setFormTeacher(opt)}
                isSearchable
                placeholder="Pilih atau cari guru..."
                classNamePrefix="react-select"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)} 
                className="flex-1 rounded-xl"
                type="button"
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              >
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </Modal>

        {/* Modal Konfirmasi Hapus Jadwal */}
        <Modal
          isOpen={!!deleteSlotInfo}
          onClose={() => setDeleteSlotInfo(null)}
          title="Hapus Jadwal?"
          size="sm"
        >
          <div className="py-4">
            <p className="mb-4">Yakin ingin menghapus jadwal <span className="font-semibold">{deleteSlotInfo?.value}</span>?</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDeleteSlotInfo(null)} className="flex-1">Batal</Button>
              <Button onClick={handleDeleteSchedule} className="flex-1 bg-red-600 hover:bg-red-700 text-white">Hapus</Button>
            </div>
          </div>
        </Modal>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Card>

        {/* Modal Tambah Slot Waktu */}
        <Modal
          isOpen={isSlotModalOpen}
          onClose={() => setIsSlotModalOpen(false)}
          title="Tambah Slot Waktu"
          size="sm"
        >
          <form onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            if (!newSlot.trim() || timeSlots.includes(newSlot)) return;
            setTimeSlots((prev: string[]) => [...prev, newSlot]);
            setNewSlot('');
            setIsSlotModalOpen(false);
          }} className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slot Waktu (misal: 12:00-12:45)</label>
              <input
                type="text"
                value={newSlot}
                onChange={e => setNewSlot(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan slot waktu baru"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsSlotModalOpen(false)} className="flex-1 rounded-xl" type="button">Batal</Button>
              <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">Tambah Slot</Button>
            </div>
          </form>
        </Modal>

        {/* Add Schedule Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Tambah Jadwal Baru"
          size="lg"
        >
          <form className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
                <Select
                  options={allSubjects}
                  value={formSubject}
                  onChange={(opt: any) => setFormSubject(opt)}
                  isSearchable
                  placeholder="Pilih atau cari mata pelajaran..."
                  classNamePrefix="react-select"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                <Select
                  options={allClasses}
                  value={formClass}
                  onChange={(opt: any) => setFormClass(opt)}
                  isSearchable
                  placeholder="Pilih atau cari kelas..."
                  classNamePrefix="react-select"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hari</label>
                <Select
                  options={days.map((d, i) => ({ value: d, label: dayNames[i] }))}
                  value={{ value: formDay, label: dayNames[days.indexOf(formDay)] }}
                  onChange={(opt: any) => opt && setFormDay(opt.value)}
                  isSearchable={false}
                  placeholder="Pilih hari..."
                  classNamePrefix="react-select"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slot Waktu</label>
                <Select
                  options={timeSlots.map((slot: string) => ({ value: slot, label: slot }))}
                  value={formTime ? { value: formTime, label: formTime } : null}
                  onChange={(opt: any) => opt && setFormTime(opt.value)}
                  isSearchable={false}
                  placeholder="Pilih slot waktu..."
                  classNamePrefix="react-select"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guru</label>
              <Select
                options={allTeachers}
                value={formTeacher}
                onChange={(opt: any) => setFormTeacher(opt)}
                isSearchable
                placeholder="Pilih atau cari guru..."
                classNamePrefix="react-select"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)} 
                className="flex-1 rounded-xl"
                type="button"
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              >
                Tambah Jadwal
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
export default SchoolSchedules;