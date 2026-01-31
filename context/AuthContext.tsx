
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ProgramTier, AuthState, UserRole, Course, FacultyMember, Lead } from '../types';
import { INITIAL_COURSES } from '../constants';

interface AuthContextType extends AuthState {
  login: (email: string, role?: UserRole) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  enroll: (tier: ProgramTier) => void;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  addCourse: (course: Course) => void;
  addFaculty: (faculty: FacultyMember) => void;
  updateFaculty: (updatedFaculty: FacultyMember) => void;
  deleteFaculty: (facultyId: string) => void;
  courses: Course[];
  faculty: FacultyMember[];
  leads: Lead[];
  students: User[];
  canAccessLMS: boolean;
  isAdmin: boolean;
  isFaculty: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('sc_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('sc_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [faculty, setFaculty] = useState<FacultyMember[]>(() => {
    const saved = localStorage.getItem('sc_faculty');
    return saved ? JSON.parse(saved) : [
      { id: 'f1', name: 'Dr. Aris Thorne', email: 'aris@sc.io', specialty: 'Behavioral Science', joinedDate: '2024-01-10' }
    ];
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('sc_leads');
    return saved ? JSON.parse(saved) : [
      { id: 'l1', name: 'James Wilson', email: 'james@example.com', message: 'Interested in Launchpad cohort 14.', date: '2024-10-25', status: 'new' }
    ];
  });

  const [students, setStudents] = useState<User[]>(() => {
    const saved = localStorage.getItem('sc_students');
    return saved ? JSON.parse(saved) : [
      { id: 'u-1', name: 'Alex Rivera', email: 'alex@student.com', role: 'student', enrolledProgram: ProgramTier.SPRINT, progress: 45, hoursLearned: 12 },
      { id: 'u-2', name: 'Sarah Chen', email: 'sarah@student.com', role: 'student', enrolledProgram: ProgramTier.PATHWAY, progress: 10, hoursLearned: 2 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('sc_auth', JSON.stringify(authState));
    localStorage.setItem('sc_courses', JSON.stringify(courses));
    localStorage.setItem('sc_faculty', JSON.stringify(faculty));
    localStorage.setItem('sc_leads', JSON.stringify(leads));
    localStorage.setItem('sc_students', JSON.stringify(students));
  }, [authState, courses, faculty, leads, students]);

  const login = (email: string, role: UserRole = 'student') => {
    const mockUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: role,
      progress: role === 'student' ? 45 : 0,
      hoursLearned: role === 'student' ? 12 : 0
    };
    setAuthState({ user: mockUser, isAuthenticated: true });
    
    // Add to student list if not already there and is a student
    if (role === 'student' && !students.find(s => s.email === email)) {
      setStudents(prev => [...prev, mockUser]);
    }
  };

  const signup = (name: string, email: string) => {
    const mockUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'student',
      progress: 0,
      hoursLearned: 0
    };
    setAuthState({ user: mockUser, isAuthenticated: true });
    setStudents(prev => [...prev, mockUser]);
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('sc_auth');
  };

  const enroll = (tier: ProgramTier) => {
    if (!authState.user) return;
    const updatedUser = { ...authState.user, enrolledProgram: tier };
    setAuthState(prev => ({ ...prev, user: updatedUser }));
    setStudents(prev => prev.map(s => s.email === authState.user?.email ? updatedUser : s));
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const newLead: Lead = {
      ...leadData,
      id: 'l-' + Math.random().toString(36).substr(2, 5),
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  const addFaculty = (fac: FacultyMember) => {
    setFaculty(prev => [...prev, fac]);
  };

  const updateFaculty = (updatedFaculty: FacultyMember) => {
    setFaculty(prev => prev.map(f => f.id === updatedFaculty.id ? updatedFaculty : f));
  };

  const deleteFaculty = (facultyId: string) => {
    setFaculty(prev => prev.filter(f => f.id !== facultyId));
  };

  const isAdmin = authState.user?.role === 'admin';
  const isFaculty = authState.user?.role === 'faculty';

  // Admin and Faculty always have access to LMS. Students need an enrollment beyond Nano.
  const canAccessLMS = authState.isAuthenticated && (
    isAdmin || 
    isFaculty || 
    (authState.user?.enrolledProgram && authState.user.enrolledProgram !== ProgramTier.NANO)
  );

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      signup, 
      logout, 
      enroll, 
      addLead, 
      addCourse, 
      addFaculty,
      updateFaculty,
      deleteFaculty,
      courses, 
      faculty, 
      leads, 
      students,
      canAccessLMS, 
      isAdmin, 
      isFaculty 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
