import React, { useState } from 'react';
import { Folder, File, Upload, Download, Plus, Search, ChevronLeft, ChevronRight, Trash2, Edit3, FileText, FileSpreadsheet, FileCode, Image, FileArchive } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  folder: string;
  uploadDate: string;
  uploadedBy: string;
};

type FolderType = {
  id: string;
  name: string;
  count: number;
  color: string;
};

const SchoolDocuments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [editFolder, setEditFolder] = useState<FolderType | null>(null);
  const [folderName, setFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [deleteDoc, setDeleteDoc] = useState<Document | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: '1', 
      name: 'Kurikulum 2024-2025.pdf', 
      type: 'pdf', 
      size: '2.4 MB', 
      folder: 'academic',
      uploadDate: '15 Des 2024',
      uploadedBy: 'Admin Sekolah'
    },
    { 
      id: '2', 
      name: 'Kalender Akademik.xlsx', 
      type: 'xlsx', 
      size: '856 KB', 
      folder: 'academic',
      uploadDate: '10 Des 2024',
      uploadedBy: 'Admin Sekolah'
    },
    { 
      id: '3', 
      name: 'SOP Ujian Online.docx', 
      type: 'docx', 
      size: '1.2 MB', 
      folder: 'policies',
      uploadDate: '8 Des 2024',
      uploadedBy: 'Kepala Sekolah'
    },
    { 
      id: '4', 
      name: 'Laporan Semester Ganjil.pdf', 
      type: 'pdf', 
      size: '5.8 MB', 
      folder: 'reports',
      uploadDate: '20 Des 2024',
      uploadedBy: 'Admin Sekolah'
    },
    { 
      id: '5', 
      name: 'Foto Kegiatan Sekolah.jpg', 
      type: 'jpg', 
      size: '3.2 MB', 
      folder: 'media',
      uploadDate: '18 Des 2024',
      uploadedBy: 'Guru Seni'
    },
    { 
      id: '6', 
      name: 'Template RPP.zip', 
      type: 'zip', 
      size: '8.5 MB', 
      folder: 'templates',
      uploadDate: '5 Des 2024',
      uploadedBy: 'Wakil Kurikulum'
    }
  ]);

  const [folders, setFolders] = useState<FolderType[]>([
    { id: 'academic', name: 'Akademik', count: 12, color: 'blue' },
    { id: 'policies', name: 'Kebijakan', count: 8, color: 'green' },
    { id: 'reports', name: 'Laporan', count: 15, color: 'purple' },
    { id: 'forms', name: 'Formulir', count: 6, color: 'orange' },
    { id: 'media', name: 'Media', count: 23, color: 'pink' },
    { id: 'templates', name: 'Template', count: 9, color: 'indigo' }
  ]);

  const handleDeleteDocument = (doc: Document | null) => {
    if (!doc) return;
    setDocuments(docs => docs.filter(d => d.id !== doc.id));
    setDeleteDoc(null);
  };

  // Folder CRUD
  const openAddFolderModal = () => {
    setEditFolder(null);
    setFolderName('');
    setIsFolderModalOpen(true);
  };

  const openEditFolderModal = (folder: FolderType) => {
    setEditFolder(folder);
    setFolderName(folder.name);
    setIsFolderModalOpen(true);
  };

  const handleFolderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editFolder) {
      setFolders(folders.map(f => f.id === editFolder.id ? { ...f, name: folderName } : f));
    } else {
      const newId = folderName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '-' + Date.now();
      setFolders([...folders, { id: newId, name: folderName, count: 0, color: 'gray' }]);
    }
    setIsFolderModalOpen(false);
    setFolderName('');
    setEditFolder(null);
  };

  const handleDeleteFolder = (folder: FolderType) => {
    if (window.confirm(`Hapus folder "${folder.name}" beserta semua dokumen di dalamnya?`)) {
      setFolders(folders.filter(f => f.id !== folder.id));
      if (selectedFolder === folder.id) setSelectedFolder('all');
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'docx': return File;
      case 'xlsx': return FileSpreadsheet;
      case 'jpg': case 'png': return Image;
      case 'zip': case 'rar': return FileArchive;
      default: return FileCode;
    }
  };

  const getFolderColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
      orange: 'bg-orange-100 text-orange-700',
      pink: 'bg-pink-100 text-pink-700',
      indigo: 'bg-indigo-100 text-indigo-700',
      gray: 'bg-gray-100 text-gray-700'
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Folder className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manajemen Dokumen</h1>
          </div>
          <p className="text-gray-600">Kelola dokumen dan file sekolah dengan mudah</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Folder Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-5 bg-white rounded-xl shadow-sm border-0 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Folder</h3>
                <Button size="sm" variant="outline" onClick={openAddFolderModal} className="rounded-xl">
                  <Plus className="h-4 w-4 mr-1" /> Baru
                </Button>
              </div>
              
              <div className="space-y-2">
                <button
                  className={`w-full text-left p-3 rounded-xl transition-colors flex items-center justify-between ${
                    selectedFolder === 'all' 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => setSelectedFolder('all')}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Folder className="h-4 w-4 text-gray-500" />
                    </div>
                    <span>Semua Dokumen</span>
                  </div>
                  <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                    {documents.length}
                  </Badge>
                </button>
                
                {folders.map((folder) => (
                  <div key={folder.id} className="group flex items-center relative overflow-hidden min-h-[44px]">
                    <button
                      className={`flex-1 text-left p-3 rounded-xl transition-colors flex items-center justify-between ${
                        selectedFolder === folder.id 
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                      onClick={() => setSelectedFolder(folder.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getFolderColor(folder.color)}`}>
                          <Folder className="h-4 w-4" />
                        </div>
                        <span>{folder.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                        {folder.count}
                      </Badge>
                    </button>
                    
                    <div className="ml-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity h-full absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow z-10">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => openEditFolderModal(folder)} 
                        className="flex items-center justify-center h-9 w-9 p-0 rounded-full"
                        title="Edit Folder"
                      >
                        <Edit3 className="h-6 w-6" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteFolder(folder)} 
                        className="flex items-center justify-center h-9 w-9 p-0 rounded-full text-red-600 hover:bg-red-50"
                        title="Hapus Folder"
                      >
                        <Trash2 className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Documents Content */}
          <div className="lg:col-span-3">
            <Card className="p-5 md:p-6 bg-white rounded-xl shadow-sm border-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Cari dokumen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                      title="Tampilan Grid"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                      title="Tampilan List"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <select
                    value={itemsPerPage}
                    onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    style={{ minWidth: '120px' }}
                  >
                    {[5, 10, 20, 50].map(n => (
                      <option key={n} value={n}>{n} / halaman</option>
                    ))}
                  </select>
                  
                  <Button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 whitespace-nowrap"
                  >
                    <Upload className="h-4 w-4" /> Unggah
                  </Button>
                </div>
              </div>

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="mb-6">
                  {filteredDocuments.length === 0 ? (
                    <div className="text-center py-12">
                      <File className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500">Tidak ada dokumen ditemukan</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Unggah dokumen pertama Anda'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {paginatedDocuments.map((doc) => {
                        const FileIcon = getFileIcon(doc.type);
                        const folder = folders.find(f => f.id === doc.folder);
                        
                        return (
                          <div key={doc.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                              <div className={`p-3 rounded-lg ${getFolderColor(folder?.color || 'gray')}`}>
                                <FileIcon className="h-6 w-6" />
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setDeleteDoc(doc)} 
                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Hapus"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                              <p className="text-sm text-gray-500 mt-1">{doc.size}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {doc.type.toUpperCase()}
                              </Badge>
                              <Button variant="ghost" size="sm" className="rounded-lg" title="Download">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama File</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ukuran</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Folder</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedDocuments.map((doc) => {
                        const FileIcon = getFileIcon(doc.type);
                        const folder = folders.find(f => f.id === doc.folder);
                        
                        return (
                          <tr key={doc.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${getFolderColor(folder?.color || 'gray')}`}>
                                  <FileIcon className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{doc.name}</div>
                                  <div className="text-sm text-gray-500">{doc.uploadedBy}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="secondary">{doc.type.toUpperCase()}</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{doc.size}</td>
                            <td className="px-4 py-3">
                              {folder && (
                                <Badge className={`text-xs ${getFolderColor(folder.color)}`}>
                                  {folder.name}
                                </Badge>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{doc.uploadDate}</td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="sm" title="Download" className="rounded-lg">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setDeleteDoc(doc)} 
                                  className="text-red-600 hover:bg-red-50 rounded-lg"
                                  title="Hapus"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      
                      {paginatedDocuments.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center text-gray-500 py-12">
                            <File className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                            <p>Tidak ada dokumen ditemukan</p>
                            <p className="text-sm text-gray-400 mt-1">
                              {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Unggah dokumen pertama Anda'}
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-2 py-4 bg-gray-50 rounded-xl mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-700">
                    Menampilkan <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredDocuments.length)}</span> dari{' '}
                    <span className="font-medium">{filteredDocuments.length}</span> dokumen
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                      disabled={currentPage === 1}
                      className="rounded-lg"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors duration-150 ${
                            currentPage === page
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                      disabled={currentPage === totalPages}
                      className="rounded-lg"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Modal Konfirmasi Hapus Dokumen */}
        <Modal
          isOpen={!!deleteDoc}
          onClose={() => setDeleteDoc(null)}
          title="Hapus Dokumen"
          size="sm"
        >
          <div className="space-y-4 py-2">
            <p className="text-gray-600">
              Yakin ingin menghapus dokumen <span className="font-semibold text-gray-800">{deleteDoc?.name}</span>?
            </p>
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setDeleteDoc(null)} 
                className="flex-1 rounded-xl"
              >
                Batal
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleDeleteDocument(deleteDoc)} 
                className="flex-1 rounded-xl"
              >
                Hapus
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal Tambah/Edit Folder */}
        <Modal
          isOpen={isFolderModalOpen}
          onClose={() => { setIsFolderModalOpen(false); setEditFolder(null); setFolderName(''); }}
          title={editFolder ? 'Edit Folder' : 'Tambah Folder Baru'}
          size="sm"
        >
          <form className="space-y-4 py-2" onSubmit={handleFolderSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Folder</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={editFolder ? 'Edit nama folder' : 'Masukkan nama folder'}
                value={folderName}
                onChange={e => setFolderName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                type="submit" 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!folderName.trim() || (editFolder ? folderName === editFolder.name : false)}
              >
                {editFolder ? 'Simpan Perubahan' : 'Tambah Folder'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => { setIsFolderModalOpen(false); setEditFolder(null); setFolderName(''); }} 
                className="flex-1 rounded-xl"
              >
                Batal
              </Button>
            </div>
          </form>
        </Modal>

        {/* Modal Upload Document */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Unggah Dokumen"
          size="md"
        >
          <form className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Dokumen</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan nama dokumen"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Folder</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>{folder.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Deskripsi singkat dokumen"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Klik untuk mengunggah atau drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOC, XLS, PPT (maks. 50MB)</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              >
                Unggah Dokumen
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)} 
                className="flex-1 rounded-xl"
              >
                Batal
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default SchoolDocuments;