import React, { useState } from 'react';
import { BookOpen, Upload, File, Download, Plus } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

const TeacherMaterials: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('XII IPA 1');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialMaterials = [
    { 
      id: '1', 
      title: 'Integral Tak Tentu', 
      type: 'pdf', 
      size: '2.4 MB', 
      uploadDate: '2025-01-08',
      downloads: 28,
      class: 'XII IPA 1'
    },
    { 
      id: '2', 
      title: 'Rumus Trigonometri', 
      type: 'pdf', 
      size: '1.8 MB', 
      uploadDate: '2025-01-05',
      downloads: 32,
      class: 'XII IPA 1'
    },
    { 
      id: '3', 
      title: 'Video Penjelasan Limit', 
      type: 'mp4', 
      size: '45.2 MB', 
      uploadDate: '2025-01-03',
      downloads: 30,
      class: 'XII IPA 1'
    },
    // Tambahkan data dummy lain jika perlu
  ];

  // Persistent page state using localStorage
  const getInitialPage = () => {
    const saved = window.localStorage.getItem('teacherMaterialsPage');
    return saved ? parseInt(saved) : 1;
  };
  const getInitialShow = () => {
    const saved = window.localStorage.getItem('teacherMaterialsShow');
    return saved ? parseInt(saved) : 5;
  };

  const [materials, setMaterials] = useState(initialMaterials);
  const [page, setPage] = useState<number>(getInitialPage());
  const [show, setShow] = useState<number>(getInitialShow());

  // Save page/show to localStorage on change
  React.useEffect(() => {
    window.localStorage.setItem('teacherMaterialsPage', page.toString());
  }, [page]);
  React.useEffect(() => {
    window.localStorage.setItem('teacherMaterialsShow', show.toString());
  }, [show]);

  const classes = ['XII IPA 1', 'XI IPA 2', 'X MIPA 1'];

  const filteredMaterials = materials.filter(material => material.class === selectedClass);
  const totalPages = Math.ceil(filteredMaterials.length / show);
  const paginatedMaterials = filteredMaterials.slice((page - 1) * show, page * show);

  // Delete material
  const handleDeleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const getFileIcon = () => {
    return File;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Learning Materials</h1>
          <p className="text-gray-600 mt-2">Kelola materi pembelajaran untuk siswa</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Upload Material
        </Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
          <div className="flex gap-2 items-center">
            <span className="text-sm">Show</span>
            <select value={show} onChange={e => { setShow(Number(e.target.value)); setPage(1); }} className="border rounded px-2 py-1 focus:ring-primary-500 focus:border-primary-500">
              {[6, 12, 18, 24, 30, 36, 42, 48, 54, 60].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="text-sm">per page</span>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-2 py-1"
            >
              Previous
            </Button>
            <span className="text-sm">Page</span>
            <select value={page} onChange={e => setPage(Number(e.target.value))} className="border rounded px-2 py-1 focus:ring-primary-500 focus:border-primary-500">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <span className="text-sm">of {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="px-2 py-1"
            >
              Next
            </Button>
          </div>
        </div>

  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {paginatedMaterials.map((material) => {
            const FileIcon = getFileIcon();
            return (
              <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <FileIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{material.title}</h4>
                    <p className="text-sm text-gray-500">
                      {material.size} • Uploaded {material.uploadDate} • {material.downloads} downloads
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">
                    {material.type.toUpperCase()}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteMaterial(material.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p>No materials uploaded for this class yet</p>
            <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload First Material
            </Button>
          </div>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Learning Material"
        size="md"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Material title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Brief description of the material"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, DOC, PPT up to 50MB</p>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Upload Material</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherMaterials;