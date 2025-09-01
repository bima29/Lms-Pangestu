import React, { useState, useEffect } from 'react';
import { Search, Plus, UserCheck, UserX, Save, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../../components/ui/Pagination';
import Select from 'react-select';

const SchoolUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showFilters, setShowFilters] = useState(false);

  // Define schoolLevel here. You can set it to 'SD', 'SMP', 'SMA', or 'SMK' as needed.
  const schoolLevel = 'SMA';

  const users = [
    { id: '1', name: 'Budi Santoso', email: 'budi@school.com', role: 'teacher', class: 'XII IPA 1', status: 'active', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '2', name: 'Siti Rahayu', email: 'siti@school.com', role: 'teacher', class: 'XI IPS 2', status: 'active', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '3', name: 'Andi Pratama', email: 'andi@school.com', role: 'student', class: 'XII IPA 1', status: 'active', avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '4', name: 'Dewi Lestari', email: 'dewi@school.com', role: 'student', class: 'XI IPA 2', status: 'active', avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '5', name: 'Ahmad Wijaya', email: 'ahmad@school.com', role: 'parent', class: '-', status: 'active', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '6', name: 'Maya Sari', email: 'maya@school.com', role: 'student', class: 'X IPA 1', status: 'inactive', avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const { currentData, currentPage, totalPages, goToPage } = usePagination({
    data: filteredUsers,
    itemsPerPage
  });

  const columns = [
    { key: 'user', header: 'User' },
    { key: 'role', header: 'Role' },
    { key: 'class', header: 'Class' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Actions' }
  ];

  return (
    <div className="p-2 md:p-6 bg-gradient-to-br from-primary-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-700 drop-shadow-sm">School Users Management</h1>
          <p className="text-gray-500 mt-1">Manage all users in your school system</p>
        </div>
        <Card className="shadow-2xl rounded-2xl border-0 overflow-hidden bg-white/90 backdrop-blur-md">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 md:p-6 text-white rounded-t-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold drop-shadow">User Directory</h2>
                <p className="text-primary-100 mt-1">
                  {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setShowFilters(!showFilters)} 
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-lg shadow transition"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                  {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </Button>
                <Button 
                  onClick={() => setIsModalOpen(true)} 
                  className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow transition"
                >
                  <Plus className="h-4 w-4 mr-2" /> 
                  Add User
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">            
              <div className="relative flex-1 max-w-md">
                <Search className="h-4 w-4 text-white absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none transition"
                />
              </div>
            </div>
          </div>
          {/* Filters Section */}
          {showFilters && (
            <div className="p-4 md:p-6 bg-white/80 border-b border-gray-200 rounded-b-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  >
                    <option value="all">All Roles</option>
                    <option value="teacher">Teachers</option>
                    <option value="student">Students</option>
                    <option value="parent">Parents</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Items per page</label>
                  <select
                    value={itemsPerPage}
                    onChange={e => setItemsPerPage(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  >
                    {[5, 10, 20, 50, 100].map(n => (
                      <option key={n} value={n}>{n} per page</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          {/* TABEL USER */}
          <div className="p-2 md:p-6">
            <div className="rounded-lg border border-gray-200 bg-white/90 shadow-md overflow-x-auto">
              <Table
                columns={columns}
                data={currentData.map(user => ({
                  ...user,
                  user: (
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shadow-sm border-2 border-primary-100" />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ),
                  role: (
                    <Badge 
                      variant={
                        user.role === 'teacher' ? 'primary' : 
                        user.role === 'student' ? 'success' : 'secondary'
                      } 
                      className="capitalize px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {user.role}
                    </Badge>
                  ),
                  class: (
                    <span className="text-gray-700 font-medium text-xs md:text-sm px-2 py-1 rounded bg-gray-100">{user.class}</span>
                  ),
                  status: (
                    <Badge variant={user.status === 'active' ? 'success' : 'secondary'} className="px-3 py-1 rounded-full text-xs font-semibold">
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  ),
                  actions: (
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => { setSelectedUser(user); setEditModalOpen(true); }}
                        className="text-primary-600 hover:bg-primary-50 rounded-full transition"
                      >
                        <UserCheck className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:bg-red-50 rounded-full transition"
                      >
                        <UserX className="h-4 w-4" />
                        <span className="sr-only">Deactivate</span>
                      </Button>
                    </div>
                  )
                }))}
              />
            </div>
          </div>
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </div>
          )}
        </Card>

        {/* MODAL ADD USER */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New User"
          size="lg"
        >
          <UserFormModal 
            onCancel={() => setIsModalOpen(false)} 
            user={undefined} 
            isEdit={undefined} 
            schoolLevel={schoolLevel}
          />
        </Modal>

        {/* MODAL EDIT USER */}
        <Modal
          isOpen={editModalOpen}
          onClose={() => { setEditModalOpen(false); setSelectedUser(null); }}
          title="Edit User"
          size="lg"
        >
          {selectedUser && (
            <UserFormModal
              onCancel={() => { setEditModalOpen(false); setSelectedUser(null); }}
              user={selectedUser}
              isEdit={true}
              schoolLevel={schoolLevel}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default SchoolUsers;

// -------------------- FORM MODAL --------------------
type UserFormModalProps = {
  onCancel: () => void;
  user?: any;
  isEdit?: boolean;
  schoolLevel: string;
};

function UserFormModal({ onCancel, user, isEdit, schoolLevel }: UserFormModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student',
    status: 'active',
    class: '',
    major: '',
    subjects: [] as string[],
    child: '',
    schoolLevel: schoolLevel
  });

  const generateClassOptions = () => {
    const classes = [];
    
    if (schoolLevel === 'SD') {
      // SD: Grades 1-6
      for (let grade = 1; grade <= 6; grade++) {
        for (let section = 1; section <= 4; section++) {
          classes.push(`${grade} ${String.fromCharCode(64 + section)}`);
        }
      }
    } else if (schoolLevel === 'SMP') {
      // SMP: Grades 7-9
      for (let grade = 7; grade <= 9; grade++) {
        for (let section = 1; section <= 6; section++) {
          classes.push(`${grade} ${String.fromCharCode(64 + section)}`);
        }
      }
    } else {
      // SMA/SMK: Grades 10-12
      const prefixes = schoolLevel === 'SMA' ? ['MIPA', 'IPS', 'Bahasa'] : [];
      
      for (let grade = 10; grade <= 12; grade++) {
        if (schoolLevel === 'SMA') {
          for (const prefix of prefixes) {
            for (let section = 1; section <= 6; section++) {
              classes.push(`${grade} ${prefix} ${section}`);
            }
          }
        } else {
          // SMK: Various majors with sections
          for (let section = 1; section <= 6; section++) {
            classes.push(`${grade} RPL ${section}`);
            classes.push(`${grade} TKJ ${section}`);
            classes.push(`${grade} MM ${section}`);
            classes.push(`${grade} AK ${section}`);
            classes.push(`${grade} TKR ${section}`);
            classes.push(`${grade} TSM ${section}`);
          }
        }
      }
    }
    
    return classes;
  };

  const classOptions = generateClassOptions();
  const subjectOptions = [
    'Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Indonesia', 
    'Bahasa Inggris', 'Sejarah', 'Geografi', 'Ekonomi', 'Sosiologi',
    'Seni Budaya', 'Pendidikan Jasmani', 'Prakarya', 'Informatika',
    'Pendidikan Agama', 'PKN'
  ];

  const majorOptionsSMA = [
    { value: 'MIPA', label: 'Matematika dan Ilmu Pengetahuan Alam' },
    { value: 'IPS', label: 'Ilmu Pengetahuan Sosial' },
    { value: 'Bahasa', label: 'Bahasa dan Budaya' }
  ];

  const majorOptionsSMK = [
    { value: 'RPL', label: 'Rekayasa Perangkat Lunak' },
    { value: 'TKJ', label: 'Teknik Komputer dan Jaringan' },
    { value: 'MM', label: 'Multimedia' },
    { value: 'AK', label: 'Akuntansi' },
    { value: 'TKR', label: 'Teknik Kendaraan Ringan' },
    { value: 'TSM', label: 'Teknik Sepeda Motor' },
    { value: 'Tav', label: 'Teknik Audio Video' },
    { value: 'TITL', label: 'Teknik Instalasi Tenaga Listrik' },
    { value: 'TP', label: 'Tata Boga' },
    { value: 'TB', label: 'Tata Busana' },
    { value: 'APH', label: 'Akomodasi Perhotelan' },
    { value: 'UPW', label: 'Usaha Perjalanan Wisata' }
  ];

  // Dummy student options for parent form
  const studentOptions = [
    { id: '3', name: 'Andi Pratama' },
    { id: '4', name: 'Dewi Lestari' },
    { id: '6', name: 'Maya Sari' }
  ];

  // Jika edit, isi state dengan data user
  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        role: user.role || 'student',
        status: user.status || 'active',
        class: user.class || '',
        major: user.major || '',
        subjects: user.subjects || [],
        child: user.child || '',
        schoolLevel: user.schoolLevel || schoolLevel
      });
    }
  }, [isEdit, user, schoolLevel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (selectedOptions: any, field: string) => {
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleSingleSelectChange = (selectedOption: any, field: string) => {
    setFormData(prev => ({ ...prev, [field]: selectedOption ? selectedOption.value : '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onCancel();
  };

  // Konversi data ke format react-select
  const classSelectOptions = classOptions.map(cls => ({ value: cls, label: cls }));
  const subjectSelectOptions = subjectOptions.map(sub => ({ value: sub, label: sub }));
  const studentSelectOptions = studentOptions.map(stu => ({ value: stu.id, label: stu.name }));

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input 
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" 
            placeholder="John" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input 
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" 
            placeholder="Doe" 
            required 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" 
          placeholder="john.doe@school.com" 
          required 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select 
            name="role"
            value={formData.role} 
            onChange={handleInputChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select 
            name="status"
            value={formData.status} 
            onChange={handleInputChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* TEACHER FORM */}
      {formData.role === 'teacher' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
            <Select
              isMulti
              options={subjectSelectOptions}
              value={subjectSelectOptions.filter(opt => formData.subjects.includes(opt.value))}
              onChange={selected => handleMultiSelectChange(selected, 'subjects')}
              classNamePrefix="react-select"
              placeholder="Select subjects..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Classes</label>
            <Select
              isMulti
              options={classSelectOptions}
              value={classSelectOptions.filter(opt => formData.class.includes(opt.value))}
              onChange={selected => handleMultiSelectChange(selected, 'class')}
              classNamePrefix="react-select"
              placeholder="Select classes..."
            />
          </div>
        </>
      )}

      {/* STUDENT FORM */}
      {formData.role === 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <Select
              options={classSelectOptions}
              value={classSelectOptions.find(opt => opt.value === formData.class) || null}
              onChange={selected => handleSingleSelectChange(selected, 'class')}
              classNamePrefix="react-select"
              placeholder="Select class..."
            />
          </div>
          
          {(schoolLevel === 'SMA' || schoolLevel === 'SMK') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
              <Select
                options={schoolLevel === 'SMA' ? majorOptionsSMA : majorOptionsSMK}
                value={(schoolLevel === 'SMA' ? majorOptionsSMA : majorOptionsSMK).find(opt => opt.value === formData.major) || null}
                onChange={selected => handleSingleSelectChange(selected, 'major')}
                classNamePrefix="react-select"
                placeholder={`Select ${schoolLevel === 'SMA' ? 'major' : 'vocational program'}...`}
              />
            </div>
          )}
        </div>
      )}

      {/* PARENT FORM */}
      {formData.role === 'parent' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Child (Student)</label>
          <Select
            options={studentSelectOptions}
            value={studentSelectOptions.find(opt => opt.value === formData.child) || null}
            onChange={selected => handleSingleSelectChange(selected, 'child')}
            classNamePrefix="react-select"
            placeholder="Select child..."
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-3 pt-4">
        <Button type="submit" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {isEdit ? 'Update User' : 'Create User'}
        </Button>
        <Button variant="outline" type="button" onClick={onCancel} className="flex-1">
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
}