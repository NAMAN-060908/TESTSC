
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  BarChart3, Users, DollarSign, TrendingUp, Search, 
  MoreVertical, Filter, Download, ArrowUpRight, ArrowDownRight,
  Database, GraduationCap, Mail, Plus, Trash2, X, Check, Edit2, ExternalLink
} from 'lucide-react';
import { Course, FacultyMember, ProgramTier } from '../types';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isAdmin, courses, faculty, leads, students, addCourse, addFaculty } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'cms' | 'faculty' | 'leads' | 'students'>('analytics');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddFaculty, setShowAddFaculty] = useState(false);

  // Modal forms states
  const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({
    title: '', description: '', duration: '', tier: ProgramTier.NANO, outcomes: [], image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', price: 0
  });
  const [newFaculty, setNewFaculty] = useState<Omit<FacultyMember, 'id' | 'joinedDate'>>({
    name: '', email: '', specialty: ''
  });

  if (!isAuthenticated || !isAdmin) return <Navigate to="/" />;

  // Export as CSV (Excel compatible)
  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Header
    csvContent += "Type,Name,Email,Info/Tier,Date/Progress\r\n";
    
    // Courses
    courses.forEach(c => {
      csvContent += `Course,${c.title},N/A,${c.tier},${c.duration}\r\n`;
    });
    
    // Faculty
    faculty.forEach(f => {
      csvContent += `Faculty,${f.name},${f.email},${f.specialty},${f.joinedDate}\r\n`;
    });
    
    // Leads
    leads.forEach(l => {
      csvContent += `Lead,${l.name},${l.email},"${l.message.replace(/"/g, '""')}",${l.date}\r\n`;
    });

    // Students
    students.forEach(s => {
      csvContent += `Student,${s.name},${s.email},${s.enrolledProgram || 'None'},${s.progress}%\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `skill_circuit_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const submitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description) return;
    addCourse({ ...newCourse, id: 'c-' + Math.random().toString(36).substr(2, 5) });
    setNewCourse({
      title: '', description: '', duration: '', tier: ProgramTier.NANO, outcomes: [], image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', price: 0
    });
    setShowAddCourse(false);
  };

  const submitFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.email) return;
    addFaculty({ ...newFaculty, id: 'f-' + Math.random().toString(36).substr(2, 5), joinedDate: new Date().toISOString().split('T')[0] });
    setNewFaculty({ name: '', email: '', specialty: '' });
    setShowAddFaculty(false);
  };

  const stats = [
    { label: 'Total Revenue', val: '$142,400', trend: '+12.5%', isUp: true, icon: DollarSign },
    { label: 'Active Students', val: students.length, trend: '+4.2%', isUp: true, icon: Users },
    { label: 'Course Completion', val: '74%', trend: '-1.5%', isUp: false, icon: BarChart3 },
    { label: 'Active Leads', val: leads.filter(l => l.status === 'new').length, trend: '+0.5%', isUp: true, icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modals */}
        {showAddCourse && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-secondary/80 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 animate-in zoom-in-95 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-secondary">New Circuit Course</h3>
                <button onClick={() => setShowAddCourse(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X /></button>
              </div>
              <form onSubmit={submitCourse} className="space-y-4">
                <input required value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} placeholder="Course Title" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                <textarea required value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} placeholder="Description" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all min-h-[100px]" />
                <div className="grid grid-cols-2 gap-4">
                  <input required value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} placeholder="Duration (e.g. 4 Hours)" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                  <input type="number" required value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: parseInt(e.target.value)})} placeholder="Price" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Program Tier</label>
                  <select value={newCourse.tier} onChange={e => setNewCourse({...newCourse, tier: e.target.value as ProgramTier})} className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all">
                    {Object.values(ProgramTier).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 mt-4">Add to Platform</button>
              </form>
            </div>
          </div>
        )}

        {showAddFaculty && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-secondary/80 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 animate-in zoom-in-95 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-secondary">Recruit Faculty</h3>
                <button onClick={() => setShowAddFaculty(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X /></button>
              </div>
              <form onSubmit={submitFaculty} className="space-y-4">
                <input required value={newFaculty.name} onChange={e => setNewFaculty({...newFaculty, name: e.target.value})} placeholder="Full Name" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                <input type="email" required value={newFaculty.email} onChange={e => setNewFaculty({...newFaculty, email: e.target.value})} placeholder="Email" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                <input required value={newFaculty.specialty} onChange={e => setNewFaculty({...newFaculty, specialty: e.target.value})} placeholder="Specialty (e.g. UX Arch)" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 mt-4">Send Offer</button>
              </form>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2 uppercase">Circuit OS Admin</h1>
            <p className="text-slate-500 font-medium">Control center for all platform operations.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleExport} className="bg-white border border-slate-200 text-secondary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
              <Download size={18} /> Export Data (Excel)
            </button>
            <button onClick={() => setShowAddCourse(true)} className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
              New Course
            </button>
          </div>
        </div>

        {/* Tabs Nav */}
        <div className="flex gap-4 mb-10 border-b border-slate-100 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'cms', label: 'CMS / Courses', icon: Database },
            { id: 'faculty', label: 'Faculty', icon: GraduationCap },
            { id: 'leads', label: 'Incoming Leads', icon: Mail },
            { id: 'students', label: 'Students', icon: Users },
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-secondary text-white shadow-lg' : 'text-slate-400 hover:text-secondary'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'analytics' && (
          <div className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-slate-50 text-secondary"><stat.icon size={24} /></div>
                    <div className={`flex items-center gap-1 text-xs font-black ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.trend} {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                  </div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-secondary">{stat.val}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden p-8">
              <h3 className="text-xl font-black text-secondary mb-6">Platform Performance Metrics</h3>
              <div className="aspect-[21/9] bg-slate-50 rounded-[30px] flex items-center justify-center text-slate-300 font-bold italic">
                Platform graph visualizations would render here.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-black text-secondary">Active Circuits</h3>
              <p className="text-sm text-slate-400 font-medium">Showing {courses.length} courses</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 hover:shadow-xl transition-shadow group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg text-secondary">{course.title}</h4>
                      <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-md uppercase tracking-wider">{course.tier}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">{course.description}</p>
                    <div className="mt-4 flex gap-2">
                       <button className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-secondary px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-1">
                        <Edit2 size={12}/> Edit
                       </button>
                       <button className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-1">
                        <Trash2 size={12} /> Delete
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faculty' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-300">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-black text-secondary">Expert Faculty</h3>
                <button onClick={() => setShowAddFaculty(true)} className="bg-secondary text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-secondary-dark transition-all"><Plus size={14}/> Add Faculty</button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                    <tr>
                      {['Name', 'Email', 'Specialty', 'Joined', 'Actions'].map(h => <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {faculty.map(f => (
                      <tr key={f.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-5 text-sm font-bold text-secondary">{f.name}</td>
                        <td className="px-8 py-5 text-sm text-slate-500">{f.email}</td>
                        <td className="px-8 py-5 text-sm font-medium text-primary uppercase tracking-wide text-xs">{f.specialty}</td>
                        <td className="px-8 py-5 text-xs text-slate-400">{f.joinedDate}</td>
                        <td className="px-8 py-5 text-right">
                          <button className="text-slate-300 hover:text-secondary"><MoreVertical size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {faculty.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest">No faculty found</td>
                      </tr>
                    )}
                  </tbody>
               </table>
             </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-300">
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-xl font-black text-secondary">Incoming Leads (Inbox)</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {leads.map(lead => (
                <div key={lead.id} className="p-8 hover:bg-slate-50 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">{lead.name[0]}</div>
                      <div>
                        <p className="font-bold text-secondary">{lead.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{lead.email} • {lead.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 bg-green-50 text-green-500 rounded-lg hover:bg-green-100 opacity-0 group-hover:opacity-100 transition-all"><Check size={16} /></button>
                       <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mt-4 leading-relaxed bg-slate-50/50 p-4 rounded-2xl italic font-medium">"{lead.message}"</p>
                </div>
              ))}
              {leads.length === 0 && <div className="p-20 text-center text-slate-300 font-bold">No leads found.</div>}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-right-4 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-secondary">Registered Students</h3>
                <p className="text-sm text-slate-400 font-medium mt-1">Platform-wide login and enrollment data</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                 <Users size={18} className="text-slate-400" />
                 <span className="text-sm font-black text-secondary">{students.length} Total</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    {['Student', 'Email', 'Enrollment', 'Progress', 'Status'].map(h => <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {students.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold text-xs">{s.name[0]}</div>
                           <span className="text-sm font-bold text-secondary">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500 font-medium">{s.email}</td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${s.enrolledProgram ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                          {s.enrolledProgram || 'N/A'}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                           <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: `${s.progress}%` }}></div>
                           </div>
                           <span className="text-[10px] font-bold text-slate-400">{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                           <span className="text-[10px] font-black uppercase text-slate-400">Online</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest">No students found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
