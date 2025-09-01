import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileText, Image, Video, Volume2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

type MediaType = 'text' | 'image' | 'audio' | 'video' | 'multiple_choice';

interface Question {
  id: string;
  type: MediaType;
  content: string;
  mediaUrl?: string;
  answer: string;
  options?: string[];
  correctOption?: number;
}

const initialQuestions: Question[] = [
  { id: '1', type: 'text', content: 'Apa hasil dari 2 + 2?', answer: '4' },
  { id: '2', type: 'image', content: 'Identifikasi gambar berikut', mediaUrl: 'https://via.placeholder.com/150', answer: 'Gambar persegi' },
  { id: '3', type: 'audio', content: 'Dengarkan audio berikut dan jawab pertanyaannya', mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', answer: 'Judul lagu: SoundHelix Song 1' },
  { id: '4', type: 'video', content: 'Tonton video berikut dan jawab pertanyaannya', mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', answer: 'Video tentang Big Buck Bunny' },
  {
    id: '5',
    type: 'multiple_choice',
    content: 'Manakah hasil dari 3 x 3?',
    options: ['6', '9', '12', '3'],
    correctOption: 1,
    answer: '9'
  }
];

const ManageQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<{ type: MediaType; content: string; mediaUrl: string; answer: string; options: string[]; correctOption: number }>(
    { type: 'text', content: '', mediaUrl: '', answer: '', options: [''], correctOption: 0 }
  );

  const handleOpenModal = (question?: Question) => {
    if (question) {
      setEditId(question.id);
      setForm({
        type: question.type,
        content: question.content,
        mediaUrl: question.mediaUrl || '',
        answer: question.answer,
        options: question.options || [''],
        correctOption: question.correctOption ?? 0
      });
    } else {
      setEditId(null);
      setForm({ type: 'text', content: '', mediaUrl: '', answer: '', options: [''], correctOption: 0 });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setQuestions(qs => qs.filter(q => q.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setQuestions(qs => qs.map(q => q.id === editId ? { ...q, ...form } : q));
    } else {
      setQuestions(qs => [...qs, { id: Date.now().toString(), ...form }]);
    }
    setIsModalOpen(false);
  };

  const handleOptionChange = (idx: number, value: string) => {
    setForm(f => {
      const newOptions = [...f.options];
      newOptions[idx] = value;
      return { ...f, options: newOptions };
    });
  };

  const handleAddOption = () => {
    setForm(f => ({ ...f, options: [...f.options, ''] }));
  };

  const handleRemoveOption = (idx: number) => {
    setForm(f => {
      const newOptions = f.options.filter((_, i) => i !== idx);
      return { ...f, options: newOptions };
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kelola Soal</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Soal
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">No</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Tipe</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Soal</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Media/Opsi</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Jawaban</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map((q, idx) => (
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{idx + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {q.type === 'text' && <span className="inline-flex items-center gap-1"><FileText className="h-4 w-4 inline" />Text</span>}
                  {q.type === 'image' && <span className="inline-flex items-center gap-1"><Image className="h-4 w-4 inline" />Image</span>}
                  {q.type === 'audio' && <span className="inline-flex items-center gap-1"><Volume2 className="h-4 w-4 inline" />Audio</span>}
                  {q.type === 'video' && <span className="inline-flex items-center gap-1"><Video className="h-4 w-4 inline" />Video</span>}
                  {q.type === 'multiple_choice' && <span className="inline-flex items-center gap-1"><FileText className="h-4 w-4 inline" />Pilihan Ganda</span>}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">{q.content}</td>
                <td className="px-4 py-2 text-sm">
                  {q.type === 'image' && q.mediaUrl && (
                    <img src={q.mediaUrl} alt="Soal Gambar" className="max-w-[120px] rounded" />
                  )}
                  {q.type === 'audio' && q.mediaUrl && (
                    <audio controls src={q.mediaUrl} className="w-full" />
                  )}
                  {q.type === 'video' && q.mediaUrl && (
                    <video controls src={q.mediaUrl} className="max-w-[120px]" />
                  )}
                  {q.type === 'multiple_choice' && q.options && (
                    <ul className="list-decimal ml-5">
                      {q.options.map((opt, i) => (
                        <li key={i} className={q.correctOption === i ? 'text-green-700 font-semibold' : ''}>
                          {opt} {q.correctOption === i && <span className="ml-2 text-xs">(Benar)</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                  {q.type === 'text' && <span className="text-gray-500">-</span>}
                </td>
                <td className="px-4 py-2 text-sm text-green-700">
                  {q.type === 'multiple_choice' && q.options ? q.options[q.correctOption ?? 0] : q.answer}
                </td>
                <td className="px-4 py-2 text-sm">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(q)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(q.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-12">Tidak ada soal.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? 'Edit Soal' : 'Tambah Soal'}
        size="md"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Soal</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value as MediaType }))}
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="multiple_choice">Pilihan Ganda</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Isi Soal</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Tulis pertanyaan atau instruksi"
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              required
            />
          </div>
          {form.type === 'multiple_choice' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pilihan Jawaban</label>
                {form.options.map((opt, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={`Pilihan ${idx + 1}`}
                      value={opt}
                      onChange={e => handleOptionChange(idx, e.target.value)}
                      required
                    />
                    <Button variant="outline" size="sm" onClick={() => handleRemoveOption(idx)} disabled={form.options.length <= 1}>
                      Hapus
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" size="sm" onClick={handleAddOption} type="button">Tambah Pilihan</Button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jawaban Benar</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.correctOption}
                  onChange={e => setForm(f => ({ ...f, correctOption: Number(e.target.value) }))}
                  required
                >
                  {form.options.map((opt, idx) => (
                    <option key={idx} value={idx}>{opt || `Pilihan ${idx + 1}`}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jawaban</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Jawaban soal"
                value={form.answer}
                onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
                required
              />
            </div>
          )}
          {(form.type === 'image' || form.type === 'audio' || form.type === 'video') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL Media</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Link gambar/audio/video"
                value={form.mediaUrl}
                onChange={e => setForm(f => ({ ...f, mediaUrl: e.target.value }))}
                required
              />
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">{editId ? 'Simpan Perubahan' : 'Tambah Soal'}</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageQuestions;
