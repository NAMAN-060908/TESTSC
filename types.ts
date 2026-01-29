
export enum ProgramTier {
  NANO = 'Nano',
  SPRINT = 'Sprint',
  PATHWAY = 'Pathway',
  LAUNCHPAD = 'Launchpad'
}

export type UserRole = 'student' | 'admin' | 'faculty';

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  tier: ProgramTier;
  outcomes: string[];
  image: string;
  price: number;
}

export interface FacultyMember {
  id: string;
  name: string;
  email: string;
  specialty: string;
  joinedDate: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'archived';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enrolledProgram?: ProgramTier;
  progress?: number;
  hoursLearned?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
