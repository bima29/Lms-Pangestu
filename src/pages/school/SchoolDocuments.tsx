import React, { useState, useEffect, useMemo } from 'react';
import { 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Plus
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect, { Option } from '../../components/ui/SearchSelect';
import type { PaginationParams, PaginationResult } from '../../types';

interface Document {
  id: string;
  title: string;
  description?: string;
  file_name: string;
  file_size: number;
  file_type: string;
  category: 'curriculum' | 'policy' | 'form' | 'report' | 'media' | 'other';
  uploaded_by: string;
  uploaded_at: string;
  is_public: boolean;
  download_count: number;
}

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolDocuments() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [documents, setDocuments] = useState<PaginationResult<Document>>({
    data: [], total: 0, page: 1, limit: 10, total_pages: 0
  });
  const [editing, setEditing] = useState<Document | null>(null);
  const [form, setForm] = useState<Partial<Document>>({
    category: 'other',
    is_public: false
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);

  const loadDocuments = () => {
    // Mock implementation
    const mockDocuments: Document[] = [
      {
        id: 'doc-1',
        title: 'Kurikulum Matematika 2024',
        description: 'Kurikulum mata pelajaran Matematika untuk tahun ajaran 2024/2025',
        file_name: 'kurikulum-matematika-2024.pdf',
        file_size: 2048576,
        file_type: 'application/pdf',
        category: 'curriculum',
        uploaded_by: 'Admin Sekolah',
        uploaded_at: '2024-03-01T10:00:00Z',
        is_public: true,
        download_count: 45
      },
      {
        id: 'doc-2',
        title: 'Formulir Pendaftaran Siswa Baru',
        description: 'Formulir untuk pendaftaran siswa baru tahun ajaran 2024/2025',
        file_name: 'form-psb-2024.docx',
        file_size: 512000,
        file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        category: 'form',
        uploaded_by: 'Admin Sekolah',
        uploaded_at: '2024-02-15T14:30:00Z',
        is_public: true,
        download_count: 123
      },
      {
        id: 'doc-3',
        title: 'Laporan Semester Ganjil 2023',
        description: 'Laporan kegiatan dan prestasi semester ganjil tahun 2023',
        file_name: 'laporan-semester-ganjil-2023.pdf',
        file_size: 5242880,
        file_type: 'application/pdf',
        category: 'report',
        uploaded_by: 'Kepala Sekolah',
        uploaded_at: '2024-01-20T09:00:00Z',
        is_public: false,
        download_count: 12
      }
    ];

    const filtered = mockDocuments.filter(doc => {
      const matchesSearch = !pagination.search || 
        doc.title.toLowerCase().includes(pagination.search.toLowerCase()) ||
        doc.description?.toLowerCase().includes(pagination.search.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    const start = ((pagination.page || 1) - 1) * (pagination.limit || 10);
    const end = start + (pagination.limit || 10);
    const paginatedData = filtered.slice(start, end);

    setDocuments({
      data: paginatedData,
      total: filtered.length,
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total_pages: Math.ceil(filtered.length / (pagination.limit || 10))
    });
  };

  useEffect(() => {
    loadDocuments();
  }, [pagination.page, pagination.limit, pagination.search, selectedCategory]);

  const isValid = useMemo(() => {
    return !!form.title && !!form.file_name && !!form.category;
  }, [form]);

  const resetForm = () => {
    setEditing(null);
    setForm({ category: 'other', is_public: false });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    if (editing) {
      // Update document logic
      console.log('Updating document:', editing.id, form);
    } else {
      // Create document logic
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        title: form.title!,
        description: form.description,
        file_name: form.file_name!,
        file_size: form.file_size || 0,
        file_type: form.file_type || 'application/octet-stream',
        category: form.category as Document['category'],
        uploaded_by: 'Current User',
        uploaded_at: new Date().toISOString(),
        is_public: form.is_public || false,
        download_count: 0
      };
      console.log('Creating document:', newDocument);
    }
    resetForm();
    loadDocuments();
  };

  const onEdit = (doc: Document) => {
    setEditing(doc);
    setForm({
      title: doc.title,
      description: doc.description,
      category: doc.category,
      is_public: doc.is_public
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus dokumen ini?')) return;
    console.log('Deleting document:', id);
    loadDocuments();
  };

  const onDownload = (doc: Document) => {
    console.log('Downloading document:', doc.id);
    // Simulate download
    const element = document.createElement('a');
    element.href = '#';
    element.download = doc.file_name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setForm(f => ({
          ...f,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          title: f.title || file.name.split('.')[0]
        }));
        setUploading(false);
      }, 1000);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (fileType.startsWith('audio/')) return <Music className="h-4 w-4" />;
    if (fileType.includes('pdf')) return <FileText className="h-4 w-4" />;
    if (fileType.includes('zip') || fileType.includes('rar')) return <Archive className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const categoryOptions: Option<string>[] = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'curriculum', label: 'Kurikulum' },
    { value: 'policy', label: 'Kebijakan' },
    { value: 'form', label: 'Formulir' },
    { value: 'report', label: 'Laporan' },
    { value: 'media', label: 'Media' },
    { value: 'other', label: 'Lainnya' }
  ];

  const documentCategoryOptions: Option<Document['category']>[] = [
    { value: 'curriculum', label: 'Kurikulum' },
    { value: 'policy', label: 'Kebijakan' },
    { value: 'form', label: 'Formulir' },
    { value: 'report', label: 'Laporan' },
    { value: 'media', label: 'Media' },
    { value: 'other', label: 'Lainnya' }
  ];

  const getCategoryColor = (category: Document['category']) => {
    switch (category) {
      case 'curriculum': return 'bg-blue-100 text-blue-700';
      case 'policy': return 'bg-red-100 text-red-700';
      case 'form': return 'bg-green-100 text-green-700';
      case 'report': return 'bg-purple-100 text-purple-700';
      case 'media': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manajemen Dokumen</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Upload Dokumen
        </Button>
      </div>

      {/* Upload Form */}
      <Card>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Judul Dokumen</label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              value={form.title ?? ''}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Masukkan judul dokumen"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <SearchSelect
              options={documentCategoryOptions}
              value={form.category ?? 'other'}
              onChange={(v) => setForm(f => ({ ...f, category: v as Document['category'] }))}
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              value={form.description ?? ''}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Deskripsi dokumen (opsional)"
              rows={2}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Upload File</label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded-lg"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && <p className="text-sm text-blue-600 mt-1">Mengupload...</p>}
            {form.file_name && (
              <p className="text-sm text-gray-600 mt-1">
                File: {form.file_name} ({formatFileSize(form.file_size || 0)})
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              id="is_public"
              type="checkbox"
              checked={form.is_public ?? false}
              onChange={(e) => setForm(f => ({ ...f, is_public: e.target.checked }))}
            />
            <label htmlFor="is_public">Publik</label>
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit" disabled={!isValid || uploading}>
              {editing ? 'Update' : 'Upload'}
            </Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Batal
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              className="px-3 py-2 border rounded-lg"
              placeholder="Cari dokumen..."
              value={pagination.search ?? ''}
              onChange={(e) => setPagination(p => ({ ...p, search: e.target.value, page: 1 }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <SearchSelect
              options={categoryOptions}
              value={selectedCategory}
              onChange={(v) => setSelectedCategory(String(v))}
            />
          </div>
          <span className="text-sm text-gray-500">Total: {documents.total}</span>
        </div>
      </Card>

      {/* Documents List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2">Dokumen</th>
                <th className="px-3 py-2">Kategori</th>
                <th className="px-3 py-2">Ukuran</th>
                <th className="px-3 py-2">Upload</th>
                <th className="px-3 py-2">Download</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {documents.data.map((doc) => (
                <tr key={doc.id} className="border-t">
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(doc.file_type)}
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-xs text-gray-500">{doc.file_name}</div>
                        {doc.description && (
                          <div className="text-xs text-gray-400 mt-1">{doc.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(doc.category)}`}>
                      {documentCategoryOptions.find(opt => opt.value === doc.category)?.label}
                    </span>
                  </td>
                  <td className="px-3 py-2">{formatFileSize(doc.file_size)}</td>
                  <td className="px-3 py-2">
                    <div className="text-xs">
                      <div>{doc.uploaded_by}</div>
                      <div className="text-gray-500">
                        {new Date(doc.uploaded_at).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">{doc.download_count}x</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      doc.is_public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {doc.is_public ? 'Publik' : 'Privat'}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <Button size="sm" variant="secondary" onClick={() => onDownload(doc)}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => onEdit(doc)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => onDelete(doc.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Halaman {documents.page} dari {Math.max(1, documents.total_pages)}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={documents.page <= 1}
              onClick={() => setPagination(p => ({ ...p, page: Math.max(1, (p.page ?? 1) - 1) }))}
            >
              Prev
            </Button>
            <Button
              variant="secondary"
              disabled={documents.page >= documents.total_pages}
              onClick={() => setPagination(p => ({ ...p, page: Math.min(documents.total_pages, (p.page ?? 1) + 1) }))}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
