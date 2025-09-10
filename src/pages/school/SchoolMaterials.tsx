import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect from '../../components/ui/SearchSelect';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  FileText,
  Image,
  Video,
  Music,
  File,
  Search,
  Filter
} from 'lucide-react';
import type { 
  LearningMaterial, 
  ClassSubject,
  PaginationParams, 
  PaginationResult 
} from '../../types';
import { schoolService } from '../../services/schoolService';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolMaterials() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [materials, setMaterials] = useState<PaginationResult<LearningMaterial>>({ 
    data: [], total: 0, page: 1, limit: 10, total_pages: 0 
  });
  const [editingMaterial, setEditingMaterial] = useState<LearningMaterial | null>(null);
  const [materialForm, setMaterialForm] = useState<Partial<LearningMaterial>>({
    material_type: 'document',
    is_published: false
  });
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');

  const loadMaterials = () => {
    // Mock implementation - replace with actual API call
    const mockMaterials: LearningMaterial[] = [
      {
        id: 'mat-1',
        title: 'Materi Matematika - Fungsi Linear',
        description: 'Penjelasan lengkap tentang fungsi linear dan grafiknya',
        class_subject_id: 'cs-1',
        material_type: 'document',
        file_url: '/materials/matematika-fungsi-linear.pdf',
        file_size: 2048576,
        is_published: true,
        created_by: 'teacher-1',
        created_at: '2024-03-01T00:00:00Z'
      },
      {
        id: 'mat-2',
        title: 'Video Pembelajaran - Hukum Newton',
        description: 'Video demonstrasi hukum Newton dengan eksperimen',
        class_subject_id: 'cs-2',
        material_type: 'video',
        file_url: '/materials/fisika-hukum-newton.mp4',
        file_size: 52428800,
        is_published: true,
        created_by: 'teacher-2',
        created_at: '2024-03-02T00:00:00Z'
      },
      {
        id: 'mat-3',
        title: 'Presentasi Kimia - Tabel Periodik',
        description: 'Slide presentasi tentang tabel periodik unsur',
        class_subject_id: 'cs-3',
        material_type: 'presentation',
        file_url: '/materials/kimia-tabel-periodik.pptx',
        file_size: 5242880,
        is_published: false,
        created_by: 'teacher-3',
        created_at: '2024-03-03T00:00:00Z'
      }
    ];

    let filtered = mockMaterials.filter(m => 
      !pagination.search || 
      m.title.toLowerCase().includes(pagination.search.toLowerCase()) ||
      m.description?.toLowerCase().includes(pagination.search.toLowerCase())
    );

    if (selectedType !== 'all') {
      filtered = filtered.filter(m => m.material_type === selectedType);
    }

    const startIndex = ((pagination.page || 1) - 1) * (pagination.limit || 10);
    const paginatedData = filtered.slice(startIndex, startIndex + (pagination.limit || 10));

    setMaterials({
      data: paginatedData,
      total: filtered.length,
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total_pages: Math.ceil(filtered.length / (pagination.limit || 10))
    });
  };

  const loadClassSubjects = () => {
    setClassSubjects(schoolService.listClassSubjectsRaw());
  };

  useEffect(() => { loadClassSubjects(); }, []);
  useEffect(() => { loadMaterials(); }, [pagination, selectedType]);

  const resetForm = () => {
    setEditingMaterial(null);
    setMaterialForm({
      material_type: 'document',
      is_published: false
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMaterial) {
      console.log('Updating material:', editingMaterial.id, materialForm);
    } else {
      console.log('Creating material:', materialForm);
    }
    resetForm();
    loadMaterials();
  };

  const onEdit = (material: LearningMaterial) => {
    setEditingMaterial(material);
    setMaterialForm({
      title: material.title,
      description: material.description,
      class_subject_id: material.class_subject_id,
      material_type: material.material_type,
      is_published: material.is_published
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus materi ini?')) return;
    console.log('Deleting material:', id);
    loadMaterials();
  };

  const classSubjectOptions = classSubjects.map(cs => {
    const cls = schoolService.listClassesRaw().find(c => c.id === cs.class_id);
    const sub = schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id);
    return { 
      value: cs.id, 
      label: `${cls?.name ?? cs.class_id} - ${sub?.name ?? cs.subject_id}` 
    };
  });

  const typeOptions = [
    { value: 'document', label: 'Dokumen' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
    { value: 'presentation', label: 'Presentasi' },
    { value: 'image', label: 'Gambar' }
  ];

  const filterOptions = [
    { value: 'all', label: 'Semua Jenis' },
    ...typeOptions
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'video': return <Video className="w-5 h-5 text-red-600" />;
      case 'audio': return <Music className="w-5 h-5 text-green-600" />;
      case 'presentation': return <FileText className="w-5 h-5 text-orange-600" />;
      case 'image': return <Image className="w-5 h-5 text-purple-600" />;
      default: return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Materi Pembelajaran</h1>
        <Button onClick={() => setEditingMaterial({} as LearningMaterial)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Materi
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari materi..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={pagination.search || ''}
                onChange={(e) => setPagination(p => ({ ...p, search: e.target.value, page: 1 }))}
              />
            </div>
          </div>
          <div className="min-w-48">
            <SearchSelect
              options={filterOptions}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Filter jenis"
            />
          </div>
        </div>
      </Card>

      {/* Material Form */}
      {editingMaterial && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingMaterial.id ? 'Edit Materi' : 'Tambah Materi Baru'}
          </h2>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul Materi</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={materialForm.title ?? ''}
                onChange={(e) => setMaterialForm(f => ({ ...f, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Materi</label>
              <SearchSelect
                options={typeOptions}
                value={materialForm.material_type ?? 'document'}
                onChange={(v) => setMaterialForm(f => ({ ...f, material_type: String(v) as any }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Kelas & Mata Pelajaran</label>
              <SearchSelect
                options={classSubjectOptions}
                value={materialForm.class_subject_id ?? ''}
                onChange={(v) => setMaterialForm(f => ({ ...f, class_subject_id: String(v) }))}
                placeholder="Pilih kelas dan mapel"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                value={materialForm.description ?? ''}
                onChange={(e) => setMaterialForm(f => ({ ...f, description: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Upload File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag & drop file atau klik untuk browse
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.jpg,.jpeg,.png"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  Pilih File
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="is_published"
                type="checkbox"
                checked={materialForm.is_published ?? false}
                onChange={(e) => setMaterialForm(f => ({ ...f, is_published: e.target.checked }))}
              />
              <label htmlFor="is_published">Publikasikan</label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingMaterial.id ? 'Update' : 'Simpan'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Batal
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Materials List */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.data.map((material) => {
            const cs = classSubjects.find(cs => cs.id === material.class_subject_id);
            const cls = cs ? schoolService.listClassesRaw().find(c => c.id === cs.class_id) : null;
            const sub = cs ? schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id) : null;
            
            return (
              <Card key={material.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  {getFileIcon(material.material_type)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{material.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {cls?.name} - {sub?.name}
                    </p>
                    {material.description && (
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {material.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{formatFileSize(material.file_size || 0)}</span>
                      <span className={`px-2 py-1 rounded ${
                        material.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {material.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => onEdit(material)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => onDelete(material.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {materials.total === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Belum ada materi pembelajaran</p>
          </div>
        )}
      </Card>
    </div>
  );
}
