import { CBTSession, CBTQuestion, CBTAttempt, CBTAnswer, PaginationParams, PaginationResult, CBTSessionQuestion } from '../types';
import { mockCBTSessions, mockCBTQuestions, mockCBTAttempts } from '../data/mockData';

// In-memory stores (simulate CRUD). In a real app, replace with API calls
let sessions = [...mockCBTSessions];
let questions = [...mockCBTQuestions];
let attempts = [...mockCBTAttempts];
let answers: CBTAnswer[] = [];

function paginate<T>(items: T[], params?: PaginationParams): PaginationResult<T> {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const search = (params?.search ?? '').toLowerCase();
  const filtered = search
    ? items.filter((it: any) =>
        Object.values(it).some(v => typeof v === 'string' && v.toLowerCase().includes(search))
      )
    : items;
  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  return { data, total, page, limit, total_pages: Math.ceil(total / limit) };
}

export const cbtService = {
  // Helper: resolve session questions; fallback to subject questions ordered by question id stable order
  getQuestionsForSession(session_id: string): CBTSessionQuestion[] {
    const session = sessions.find(s => s.id === session_id);
    if (!session) return [];
    // If explicit mapping existed (not in mock), could be session.questions
    if (session.questions && session.questions.length > 0) return session.questions;
    // Derive by subject_id
    let qs = mockCBTQuestions
      .filter(q => q.subject_id === session.subject_id && q.is_active)
      .slice(0, session.total_questions);
    // Fallback if subject ids in mock are not aligned: take any active questions
    if (qs.length === 0) {
      qs = mockCBTQuestions.filter(q => q.is_active).slice(0, session.total_questions);
    }
    return qs.map((q, idx) => ({
      id: `${session_id}-${q.id}`,
      session_id,
      question_id: q.id,
      question_order: idx + 1,
      points: q.points ?? 1,
      question: q
    }));
  },

  // Sessions
  listSessions(params?: PaginationParams) {
    return paginate<CBTSession>(sessions, params);
  },
  listSessionsByClass(class_id: string, params?: PaginationParams) {
    const items = sessions.filter(s => s.class_id === class_id);
    return paginate<CBTSession>(items, params);
  },
  listSessionsByTeacher(teacher_id: string, params?: PaginationParams) {
    const items = sessions.filter(s => s.teacher_id === teacher_id);
    return paginate<CBTSession>(items, params);
  },
  listActiveSessionsForStudent(class_id: string, nowISO: string, params?: PaginationParams) {
    const now = new Date(nowISO).getTime();
    const items = sessions.filter(s => s.class_id === class_id && s.is_active && new Date(s.start_time).getTime() <= now && new Date(s.end_time).getTime() >= now);
    return paginate<CBTSession>(items, params);
  },
  getSession(id: string) {
    return sessions.find(s => s.id === id) ?? null;
  },
  createSession(payload: CBTSession) {
    sessions.unshift(payload);
    return payload;
  },
  updateSession(id: string, patch: Partial<CBTSession>) {
    const idx = sessions.findIndex(s => s.id === id);
    if (idx >= 0) {
      sessions[idx] = { ...sessions[idx], ...patch };
      return sessions[idx];
    }
    return null;
  },
  deleteSession(id: string) {
    sessions = sessions.filter(s => s.id !== id);
    // Cascade delete attempts for that session
    attempts = attempts.filter(a => a.session_id !== id);
    answers = answers.filter(ans => attempts.some(a => a.id === ans.attempt_id));
    return true;
  },

  // Questions
  listQuestionsByTeacher(teacher_id: string, params?: PaginationParams) {
    const items = questions.filter(q => q.teacher_id === teacher_id);
    return paginate<CBTQuestion>(items, params);
  },
  listQuestionsBySubject(subject_id: string, params?: PaginationParams) {
    const items = questions.filter(q => q.subject_id === subject_id);
    return paginate<CBTQuestion>(items, params);
  },
  getQuestion(id: string) {
    return questions.find(q => q.id === id) ?? null;
  },
  createQuestion(payload: CBTQuestion) {
    questions.unshift(payload);
    return payload;
  },
  updateQuestion(id: string, patch: Partial<CBTQuestion>) {
    const idx = questions.findIndex(q => q.id === id);
    if (idx >= 0) {
      questions[idx] = { ...questions[idx], ...patch };
      return questions[idx];
    }
    return null;
  },
  deleteQuestion(id: string) {
    questions = questions.filter(q => q.id !== id);
    return true;
  },

  // Attempts & Answers
  listAttemptsBySession(session_id: string) {
    return attempts.filter(a => a.session_id === session_id);
  },
  listAttemptsByStudent(student_id: string) {
    return attempts.filter(a => a.student_id === student_id);
  },
  getAttempt(id: string) {
    return attempts.find(a => a.id === id) ?? null;
  },
  startAttempt(session_id: string, student_id: string): CBTAttempt {
    const session = sessions.find(s => s.id === session_id);
    const existing = attempts.find(a => a.session_id === session_id && a.student_id === student_id);
    const max_score = this.getQuestionsForSession(session_id).reduce((acc, sq) => acc + (sq.points || 0), 0);
    if (existing) return existing;
    const att: CBTAttempt = {
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      session_id,
      student_id,
      start_time: new Date().toISOString(),
      total_score: 0,
      max_score: max_score || (session?.total_questions || 0),
      percentage: 0,
      status: 'in_progress',
      created_at: new Date().toISOString()
    };
    attempts.unshift(att);
    return att;
  },
  createAttempt(payload: CBTAttempt) {
    attempts.unshift(payload);
    return payload;
  },
  updateAttempt(id: string, patch: Partial<CBTAttempt>) {
    const idx = attempts.findIndex(a => a.id === id);
    if (idx >= 0) {
      attempts[idx] = { ...attempts[idx], ...patch };
      return attempts[idx];
    }
    return null;
  },
  listAnswersByAttempt(attempt_id: string) {
    return answers.filter(ans => ans.attempt_id === attempt_id);
  },
  createAnswer(payload: CBTAnswer) {
    const exists = answers.find(a => a.attempt_id === payload.attempt_id && a.question_id === payload.question_id);
    if (exists) {
      Object.assign(exists, payload);
      return exists;
    }
    answers.push(payload);
    return payload;
  },
  finalizeAttempt(attempt_id: string) {
    const att = attempts.find(a => a.id === attempt_id);
    if (!att) return null;
    const sessQs = this.getQuestionsForSession(att.session_id);
    // Calculate score for multiple_choice automatically
    let total = 0;
    for (const sq of sessQs) {
      const q = mockCBTQuestions.find(qq => qq.id === sq.question_id);
      const ans = answers.find(a => a.attempt_id === att.id && a.question_id === sq.question_id);
      if (q?.question_type === 'multiple_choice') {
        const correct = q.options?.find(o => o.is_correct)?.id;
        const isCorrect = ans?.selected_option_id && correct && ans.selected_option_id === correct;
        if (ans) {
          ans.is_correct = !!isCorrect;
          ans.points_earned = isCorrect ? (sq.points || 0) : 0;
        }
        total += isCorrect ? (sq.points || 0) : 0;
      } else {
        // Non-MC type would be manually graded later
        total += ans?.points_earned || 0;
      }
    }
    att.total_score = total;
    att.percentage = att.max_score ? Number(((total / att.max_score) * 100).toFixed(2)) : 0;
    att.end_time = new Date().toISOString();
    att.status = 'completed';
    return att;
  }
};
