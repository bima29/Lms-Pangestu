import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Edit, Trash2, FileText, Image as LucideImage, Video, Volume2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { mockCBTQuestions } from '../../data/mockData';
import { CBTQuestion } from '../../types';

type MediaType = 'text' | 'image' | 'audio' | 'video' | 'multiple_choice';

interface Question extends CBTQuestion {
  correctOption: number;
  content: string;
  answer?: string;
}

const initialQuestions: Question[] = mockCBTQuestions.map((q: CBTQuestion) => {
  let answer = '';
  if (q.type === 'multiple_choice' && q.options) {
    answer = q.options[q.correctAnswer ?? 0];
  } else if (q.type === 'text' && q.options) {
    answer = q.options[q.correctAnswer ?? 0];
  }
  // For compatibility with the UI, add 'content' property for display
  return { ...q, answer, content: q.question, correctOption: q.correctAnswer };
});

// Dummy CBT data (should be replaced with API or context)
const cbtSessions = [
  {
    id: '1',
    title: 'Ujian Tengah Semester - Matematika',
    class: 'XII IPA 1',
    duration: 90,
    questions: 25,
    status: 'active',
    participants: 28,
    totalStudents: 32,
    startDate: '2025-01-15',
    endDate: '2025-01-15'
  },
  {
    id: '2',
    title: 'Quiz Integral',
    class: 'XII IPA 1',
    duration: 30,
    questions: 10,
    status: 'completed',
    participants: 32,
    totalStudents: 32,
    startDate: '2025-01-10',
    endDate: '2025-01-10'
  },
  {
    id: '3',
    title: 'Latihan Soal Trigonometri',
    class: 'XI IPA 2',
    duration: 45,
    questions: 15,
    status: 'scheduled',
    participants: 0,
    totalStudents: 30,
    startDate: '2025-01-20',
    endDate: '2025-01-20'
  }
];

const ManageQuestions: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const cbtId = params.id || (window.location.pathname.split('/').pop());
  const cbtDetail = cbtSessions.find(cbt => cbt.id === cbtId);
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
        type: question.type ?? 'text',
        content: question.content ?? '',
        mediaUrl: question.mediaUrl || '',
        answer: question.answer ?? '',
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
      setQuestions(qs => qs.map(q => q.id === editId ? { ...q, ...form, type: 'multiple_choice', correctAnswer: form.correctOption } : q));
    } else {
      setQuestions(qs => [
        ...qs,
        {
          id: Date.now().toString(),
          type: 'multiple_choice',
          content: form.content,
          mediaUrl: form.mediaUrl,
          answer: form.answer,
          options: form.options,
          correctOption: form.correctOption,
          question: form.content,
          correctAnswer: form.correctOption
        }
      ]);
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
  <div className="space-y-6 max-w-7xl mx-auto">
    {/* CBT Detail & Back Button */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <div>
        <h1 className="text-2xl font-bold">Kelola Soal</h1>
        {cbtDetail && (
          <div className="mt-2">
            <span className="block text-lg font-semibold text-primary-700">CBT: {cbtDetail.title}</span>
            <span className="block text-sm text-gray-600">Kelas: {cbtDetail.class} &bull; {cbtDetail.questions} soal &bull; {cbtDetail.duration} menit</span>
            <span className="block text-sm text-gray-500">Tanggal: {cbtDetail.startDate}</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Kembali
        </Button>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Soal
        </Button>
      </div>
    </div>
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-primary-50 to-primary-100">
          <tr>
            <th className="px-2 sm:px-4 py-2 text-left text-xs font-semibold text-primary-700">No</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs font-semibold text-primary-700">Tipe</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs font-semibold text-primary-700">Soal</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs font-semibold text-primary-700">Media/Opsi</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs font-semibold text-primary-700">Jawaban</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs font-semibold text-primary-700">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {questions.map((q, idx) => (
            <tr key={q.id} className="hover:bg-primary-50 transition-all">
              <td className="px-2 sm:px-4 py-2 text-sm text-gray-900 font-semibold">{idx + 1}</td>
              <td className="px-2 sm:px-4 py-2 text-sm text-gray-900">
                {q.mediaUrl && q.type === 'multiple_choice' && (
                  <>
                    {q.mediaUrl.includes('.svg') || q.mediaUrl.includes('.jpg') || q.mediaUrl.includes('.jpeg') || q.mediaUrl.includes('.png') ? (
                      <span className="inline-flex items-center gap-1"><LucideImage className="h-4 w-4 inline text-primary-600" />Gambar</span>
                    ) : null}
                    {q.mediaUrl.includes('.mp3') ? (
                      <span className="inline-flex items-center gap-1"><Volume2 className="h-4 w-4 inline text-primary-600" />Audio</span>
                    ) : null}
                    {q.mediaUrl.includes('.mp4') ? (
                      <span className="inline-flex items-center gap-1"><Video className="h-4 w-4 inline text-primary-600" />Video</span>
                    ) : null}
                  </>
                )}
                {!q.mediaUrl && <span className="inline-flex items-center gap-1"><FileText className="h-4 w-4 inline text-primary-600" />Pilihan Ganda</span>}
              </td>
              <td className="px-2 sm:px-4 py-2 text-sm text-gray-900 max-w-xs truncate">{q.content}</td>
              <td className="px-2 sm:px-4 py-2 text-sm">
                {q.mediaUrl && q.mediaUrl.includes('.svg') || q.mediaUrl?.includes('.jpg') || q.mediaUrl?.includes('.jpeg') || q.mediaUrl?.includes('.png') ? (
                  <img src={q.mediaUrl} alt="Soal Gambar" className="max-w-[120px] rounded shadow" />
                ) : null}
                {q.mediaUrl && q.mediaUrl.includes('.mp3') ? (
                  <audio controls src={q.mediaUrl} className="w-full" />
                ) : null}
                {q.mediaUrl && q.mediaUrl.includes('.mp4') ? (
                  <video controls src={q.mediaUrl} className="max-w-[120px] rounded" />
                ) : null}
                <ul className="list-decimal ml-5">
                  {q.options.map((opt, i) => (
                    <li key={i} className={q.correctOption === i ? 'text-green-700 font-semibold' : ''}>
                      {opt} {q.correctOption === i && <span className="ml-2 text-xs">(Benar)</span>}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-2 sm:px-4 py-2 text-sm text-green-700 font-semibold">
                {q.options[q.correctOption ?? 0]}
              </td>
              <td className="px-2 sm:px-4 py-2 text-sm">
                <div className="flex gap-2 flex-wrap">
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
      <div className="flex flex-col sm:flex-row items-center gap-3 py-4 sm:pl-4">
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            window.localStorage.setItem('questionsArray', JSON.stringify(questions));
          }}
        >
          Simpan
        </Button>
      </div>
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
            onChange={e => setForm(f => ({ ...f, type: e.target.value as MediaType, mediaUrl: '' }))}
          >
            <option value="multiple_choice">Pilihan Ganda (Tanpa Media)</option>
            <option value="image">Pilihan Ganda + Gambar</option>
            <option value="audio">Pilihan Ganda + Audio</option>
            <option value="video">Pilihan Ganda + Video</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {form.type === 'image' ? 'Pertanyaan (dengan gambar)' : form.type === 'audio' ? 'Pertanyaan (dengan audio)' : form.type === 'video' ? 'Pertanyaan (dengan video)' : 'Isi Soal'}
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Tulis pertanyaan atau instruksi"
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            required
            rows={3}
          />
        </div>
        {(form.type === 'image' || form.type === 'audio' || form.type === 'video') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {form.type === 'image' ? 'URL Gambar' : form.type === 'audio' ? 'URL Audio' : 'URL Video'}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder={form.type === 'image' ? 'Link gambar (.jpg, .png, .jpeg, .svg)' : form.type === 'audio' ? 'Link audio (.mp3)' : 'Link video (.mp4)'}
              value={form.mediaUrl}
              onChange={e => setForm(f => ({ ...f, mediaUrl: e.target.value }))}
              required
            />
            {/* Media preview */}
            {form.mediaUrl && form.type === 'image' && (
              <img src={form.mediaUrl} alt="Preview Gambar" className="mt-2 max-w-[200px] rounded shadow" />
            )}
            {form.mediaUrl && form.type === 'audio' && (
              <audio controls src={form.mediaUrl} className="mt-2 w-full" />
            )}
            {form.mediaUrl && form.type === 'video' && (
              <video controls src={form.mediaUrl} className="mt-2 max-w-[200px] rounded" />
            )}
          </div>
        )}
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
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">{editId ? 'Simpan Perubahan' : 'Tambah Soal'}</Button>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
        </div>
      </form>
    </Modal>
  </div>
  );
}
export default ManageQuestions;
