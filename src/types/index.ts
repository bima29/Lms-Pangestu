export interface User {
  phone: string;
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent';
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  email: string;
  avatar?: string;
  grades: Grade[];
}

export interface Grade {
  subject: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface CBTQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CBTSession {
  id: string;
  title: string;
  duration: number; // in minutes
  questions: CBTQuestion[];
  startTime?: Date;
}