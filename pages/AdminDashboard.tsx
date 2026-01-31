
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  BarChart3, Users, DollarSign, TrendingUp, Search, 
  MoreVertical, Filter, Download, ArrowUpRight, ArrowDownRight,
  Database, GraduationCap, Mail, Plus, Trash2, X, Check, Edit2, Edit3
} from 'lucide-react';
import { Course, FacultyMember, ProgramTier } from '../types';

const AdminDashboard: React.FC = () => {
  const { 
    isAuthenticated, isAdmin, courses, faculty, leads, students, 
    addCourse, addFaculty, updateFaculty, deleteFaculty 
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'analytics' | 'cms' | 'faculty' | 'leads' | 'students'>('analytics');
  
  // Modals State
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddFaculty, setShowAddFaculty] = useState(false);
  const [showEditFaculty, setShowEditFaculty] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);

  // Forms State
  const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({
    title: '', description: '', duration: '', tier: ProgramTier.NANO, outcomes: [], image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', price: 0
  });
  const [newFaculty, setNewFaculty] = useState<Omit<FacultyMember, 'id' | 'joinedDate'>>({
    name: '', email: '', specialty: ''
  });

  if (!isAuthenticated || !isAdmin) return <Navigate to="/" />;

  // Excel compatible CSV Export
  const handleExport = () => {
    const headers = ["Category", "Name/Title", "Email/ID", "Details/Tier", "Joined Date/Progress"];
    const rows: string[][] = [];
    
    courses.forEach(c => rows.push(["Course", c.title, c.id, c.tier, c.duration]));
    faculty.forEach(f => rows.push(["Faculty Member", f.name, f.email, f.specialty, f.joinedDate]));
    leads.forEach(l => rows.push(["Lead Submission", l.name, l.email, `"${l.message.replace(/"/g, '""')}"`, l.date]));
    students.forEach(s => rows.push(["Student User", s.name, s.email, s.enrolledProgram || "None", `${s.progress || 0}%`]));

    const csvContent = "\uFEFF" + [headers, ...rows].map(row => 
      row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")
    ).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SkillCircuit_Platform_Export_${new Date().toISOString().split('T')[0]}.csv`);
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
  
  const handleUpdateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;
    updateFaculty(editingFaculty);
    setShowEditFaculty(false);
    setEditingFaculty(null);
  }

  const handleDeleteFaculty = (facultyId: string) => {
    if (window.confirm('Are you sure you want to remove this faculty member? This action cannot be undone.')) {
      deleteFaculty(facultyId);
    }
  }

  const openEditFacultyModal = (fac: FacultyMember) => {
    setEditingFaculty(fac);
    setShowEditFaculty(true);
  }

  const stats = [
    { label: 'Total Revenue', val: '$142,400', trend: '+12.5%', isUp: true, icon: DollarSign },
    { label: 'Registered Students', val: students.length, trend: '+4.2%', isUp: true, icon: Users },
    { label: 'Course Completion', val: '74%', trend: '-1.5%', isUp: false, icon: BarChart3 },
    { label: 'Unread Leads', val: leads.filter(l => l.status === 'new').length, trend: '+0.5%', isUp: true, icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modals */}
        {showAddCourse && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-secondary/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 animate-in zoom-in-95 shadow-2xl overflow-hidden relative">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-secondary uppercase tracking-tight">Create New Circuit</h3>
                <button onClick={() => setShowAddCourse(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
              </div>
              <form onSubmit={submitCourse} className="space-y-5">
                <input required value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} placeholder="Circuit Title" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm font-bold" />
                <textarea required value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} placeholder="Summary" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm font-medium min-h-[100px]" />
                <div className="grid grid-cols-2 gap-4">
                  <input required value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} placeholder="e.g. 6 Hours" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm" />
                  <input type="number" required value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: parseInt(e.target.value) || 0})} placeholder="e.g. 99" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm" />
                </div>
                <select value={newCourse.tier} onChange={e => setNewCourse({...newCourse, tier: e.target.value as ProgramTier})} className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm font-bold">
                  {Object.values(ProgramTier).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 mt-4 uppercase">Publish Circuit</button>
              </form>
            </div>
          </div>
        )}
        
        {showAddFaculty && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-secondary/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 animate-in zoom-in-95 shadow-2xl relative">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-secondary uppercase tracking-tight">Onboard Faculty</h3>
                <button onClick={() => setShowAddFaculty(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
              </div>
              <form onSubmit={submitFaculty} className="space-y-5">
                <input required value={newFaculty.name} onChange={e => setNewFaculty({...newFaculty, name: e.target.value})} placeholder="Full Name" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm font-bold" />
                <input type="email" required value={newFaculty.email} onChange={e => setNewFaculty({...newFaculty, email: e.target.value})} placeholder="Institutional Email" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm" />
                <input required value={newFaculty.specialty} onChange={e => setNewFaculty({...newFaculty, specialty: e.target.value})} placeholder="Core Specialty" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm font-bold" />
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 mt-4 uppercase">Confirm Enrollment</button>
              </form>
            </div>
          </div>
        )}
        
        {showEditFaculty && editingFaculty && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-secondary/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 animate-in zoom-in-95 shadow-2xl relative">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-secondary uppercase tracking-tight">Edit Faculty Profile</h3>
                <button onClick={() => setShowEditFaculty(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
              </div>
              <form onSubmit={handleUpdateFaculty} className="space-y-5">
                <input required value={editingFaculty.name} onChange={e => setEditingFaculty({...editingFaculty, name: e.target.value})} placeholder="Full Name" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm font-bold" />
                <input type="email" required value={editingFaculty.email} onChange={e => setEditingFaculty({...editingFaculty, email: e.target.value})} placeholder="Institutional Email" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm" />
                <input required value={editingFaculty.specialty} onChange={e => setEditingFaculty({...editingFaculty, specialty: e.target.value})} placeholder="Core Specialty" className="w-full bg-slate-50 p-4 rounded-2xl outline-none border border-transparent focus:border-primary focus:bg-white transition-all text-sm font-bold" />
                <button type="submit" className="w-full bg-accent text-white py-5 rounded-2xl font-black text-lg hover:bg-amber-500 transition-all shadow-xl shadow-accent/20 mt-4 uppercase">Save Changes</button>
              </form>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2 uppercase">Circuit OS Command</h1>
            <p className="text-slate-500 font-medium">Enterprise Management Hub • Live Platform Sync</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleExport} className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all">
              <Download size={16} /> Export All Data
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                <div className="bg-slate-50 p-2 rounded-lg text-slate-500"><stat.icon size={16}/></div>
              </div>
              <p className="text-4xl font-black text-secondary tracking-tighter mb-2">{stat.val}</p>
              <div className={`flex items-center gap-1 font-bold text-xs ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend} vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Navigation & Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 px-4">Management Areas</h3>
              <div className="space-y-2">
                {[
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { id: 'cms', label: 'Course CMS', icon: Database },
                  { id: 'faculty', label: 'Faculty Roster', icon: GraduationCap },
                  { id: 'leads', label: 'Admissions Leads', icon: Mail },
                  { id: 'students', label: 'Student Database', icon: Users },
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${
                      activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <tab.icon size={18} /> {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 min-h-[600px]">
              {/* Conditional Content */}
              {activeTab === 'cms' && (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-secondary">Course CMS ({courses.length})</h2>
                    <button onClick={() => setShowAddCourse(true)} className="bg-primary text-white px-5 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Plus size={16}/> New Course</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left p-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Title</th>
                          <th className="text-left p-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Tier</th>
                          <th className="text-left p-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Price</th>
                          <th className="text-left p-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map(c => (
                          <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                            <td className="p-4 font-bold text-secondary">{c.title}</td>
                            <td className="p-4"><span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs font-bold">{c.tier}</span></td>
                            <td className="p-4 font-bold">${c.price}</td>
                            <td className="p-4 text-slate-400"><MoreVertical /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === 'faculty' && (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-secondary">Faculty Roster ({faculty.length})</h2>
                    <button onClick={() => setShowAddFaculty(true)} className="bg-primary text-white px-5 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Plus size={16}/> Add Faculty</button>
                  </div>
                   <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left p-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Name</th>
                          <th className="text-left p-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Specialty</th>
                          <th className="text-left p-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Joined</th>
                          <th className="text-left p-4 font-black uppercase text-[10px] text-slate-400 tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faculty.map(f => (
                          <tr key={f.id} className="border-b border-slate-50 hover:bg-slate-50">
                            <td className="p-4">
                              <p className="font-bold text-secondary">{f.name}</p>
                              <p className="text-xs text-slate-400">{f.email}</p>
                            </td>
                            <td className="p-4 font-medium text-slate-500">{f.specialty}</td>
                            <td className="p-4 font-medium text-slate-500">{f.joinedDate}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button onClick={() => openEditFacultyModal(f)} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-accent transition-colors"><Edit2 size={14} /></button>
                                <button onClick={() => handleDeleteFaculty(f.id)} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === 'leads' && (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-secondary">Admissions Leads ({leads.length})</h2>
                  </div>
                   <div className="space-y-4">
                     {leads.map(lead => (
                       <div key={lead.id} className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-start">
                             <div>
                               <p className="font-bold text-secondary">{lead.name} <span className="text-slate-400 font-medium text-sm ml-2">{lead.email}</span></p>
                               <p className="text-xs text-slate-400 mt-1">{new Date(lead.date).toLocaleString()}</p>
                             </div>
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                               lead.status === 'new' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                             }`}>{lead.status}</span>
                          </div>
                          <p className="mt-4 text-sm text-slate-500 italic">"{lead.message}"</p>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FIX: Add default export
export default AdminDashboard;
