
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { 
  BookOpen, Clock, Award, PlayCircle, BarChart3, Bell, CheckCircle, Lock, Layout,
  Flame, Target, Zap, PlusSquare, Calendar, Video
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { isAuthenticated, user, canAccessLMS, isAdmin, isFaculty } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  
  if (!canAccessLMS) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-surface">
        <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl shadow-slate-200 text-center border border-slate-100">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-10">
            <Lock size={48} />
          </div>
          <h1 className="text-3xl font-black text-secondary tracking-tight mb-4">LMS Access Limited</h1>
          <p className="text-slate-500 mb-10 font-medium leading-relaxed">
            The Nano program provides email-delivered micro-modules. This dashboard is reserved for Sprint, Pathway, and Launchpad transformation journeys.
          </p>
          <Link to="/courses" className="inline-block w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
            Upgrade Your Circuit
          </Link>
        </div>
      </div>
    );
  }

  const isTeacher = isAdmin || isFaculty;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-20 pb-20">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-slate-100 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border-4 border-white shadow-xl">
                  <DashboardUserIcon size={32} />
               </div>
               <div>
                  <h1 className="text-4xl font-black text-secondary tracking-tighter mb-1 uppercase">Hi, {user?.name.split(' ')[0]}</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-secondary text-white px-2 py-0.5 rounded-md">
                      {isTeacher ? user?.role.toUpperCase() : `${user?.enrolledProgram} Path`}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-bold text-slate-400">ID: {user?.id}</span>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
               {[
                 { label: 'Progress', val: `${user?.progress}%`, icon: Target },
                 { label: 'Hours', val: user?.hoursLearned, icon: Clock },
                 { label: 'Badges', val: '4', icon: Award },
                 { label: 'Streak', val: '12d', icon: Flame },
               ].map((stat, i) => (
                 <div key={i} className="text-center md:text-left">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 flex items-center justify-center md:justify-start gap-1">
                      <stat.icon size={12} /> {stat.label}
                    </p>
                    <p className="text-2xl font-black text-secondary">{stat.val}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Teacher Controls */}
            {isTeacher && (
              <div className="bg-white border-2 border-primary/20 p-8 rounded-[40px] shadow-lg">
                <h3 className="text-xl font-black text-secondary mb-6 flex items-center gap-2">
                  <PlusSquare className="text-primary" /> Teacher Controls
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl font-bold transition-all text-sm border border-slate-200">
                    <Video size={18} className="text-primary" /> Upload Lecture
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl font-bold transition-all text-sm border border-slate-200">
                    <Calendar size={18} className="text-primary" /> Schedule Class
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl font-bold transition-all text-sm border border-slate-200">
                    <BookOpen size={18} className="text-primary" /> New Assignment
                  </button>
                </div>
              </div>
            )}

            {/* Featured Active Course */}
            <div className="bg-secondary rounded-[40px] p-10 md:p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                 <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-grow text-center md:text-left">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Current Module</p>
                    <h2 className="text-3xl font-black tracking-tight mb-6">Agile Performance & Behavioral KPIs</h2>
                    <div className="w-full bg-white/5 rounded-full h-2.5 mb-8 overflow-hidden">
                       <div className="bg-primary h-full rounded-full w-[65%]"></div>
                    </div>
                    <button className="bg-white text-secondary px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 transition-all w-full md:w-auto">
                       <PlayCircle size={22} className="text-primary" /> Resume Lesson
                    </button>
                 </div>
              </div>
            </div>

            {/* Circuit Modules */}
            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-secondary tracking-tight">Active Sprints</h3>
                  <button className="text-primary text-xs font-black uppercase tracking-widest">View Curriculum</button>
               </div>
               <div className="space-y-6">
                  {[
                    { title: 'The Science of Decision Speed', status: 'In Progress', icon: Zap, color: 'text-primary' },
                    { title: 'Mastering Stakeholder Bias', status: 'Completed', icon: CheckCircle, color: 'text-green-500' },
                    { title: 'Rapid Prototyping Artifacts', status: 'Locked', icon: Lock, color: 'text-slate-300' }
                  ].map((mod, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                       <div className="flex items-center gap-6">
                          <div className={`p-4 rounded-2xl bg-slate-50 ${mod.color}`}>
                             <mod.icon size={24} />
                          </div>
                          <div>
                             <h4 className="font-bold text-lg text-secondary">{mod.title}</h4>
                             <p className="text-xs text-slate-400 font-medium">Part {i+1} of the Path</p>
                          </div>
                       </div>
                       <button className="hidden sm:block text-slate-400 font-black text-[10px] uppercase tracking-widest group-hover:text-primary">{mod.status}</button>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="space-y-10">
             {/* Behavioral Performance Radar (Simplified) */}
             <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                   <BarChart3 size={20} className="text-primary" />
                   <h3 className="font-black text-secondary uppercase tracking-widest text-xs">Performance Radar</h3>
                </div>
                <div className="space-y-8">
                   {[
                     { label: 'Consistency', val: 92 },
                     { label: 'Decision Speed', val: 85 },
                     { label: 'Cognitive Load', val: 40 }
                   ].map(stat => (
                     <div key={stat.label}>
                        <div className="flex justify-between items-end mb-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                           <span className="text-sm font-black text-secondary">{stat.val}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                           <div className="bg-primary h-full" style={{ width: `${stat.val}%` }}></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Recent Activity */}
             <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                   <Bell size={20} className="text-primary" />
                   <h3 className="font-black text-secondary uppercase tracking-widest text-xs">Recent Activity</h3>
                </div>
                <div className="space-y-6">
                   {[
                     { msg: 'Artifact "Q1 Roadmap" approved', time: '2h ago' },
                     { msg: 'New behavioral milestone reached!', time: '1d ago' },
                     { msg: 'Upcoming Live Session: Tuesday', time: '2d ago' }
                   ].map((act, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="w-1 h-8 bg-slate-100 rounded-full"></div>
                        <div>
                           <p className="text-sm font-bold text-secondary">{act.msg}</p>
                           <p className="text-[10px] font-bold text-slate-300 uppercase">{act.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

const DashboardUserIcon = ({ size, className }: { size?: number, className?: string }) => {
  return <Layout size={size} className={className} />;
};

export default Dashboard;
