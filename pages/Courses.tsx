
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProgramTier, Course } from '../types';
import { TIER_INFO } from '../constants';
import { Clock, CheckCircle2, Star, Zap, ChevronRight, X, CreditCard, Lock, ShieldCheck, Info } from 'lucide-react';

const CheckoutModal = ({ course, onClose }: { course: Course, onClose: () => void }) => {
  const { enroll, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLoading(true);
    // Mock processing delay
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const handleFinish = () => {
    enroll(course.tier);
    navigate('/dashboard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-[40px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-secondary bg-slate-50 rounded-full transition-colors"><X size={20} /></button>
        
        <div className="p-8 md:p-12">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 text-primary p-3 rounded-2xl"><ShieldCheck size={28} /></div>
                <div>
                  <h2 className="text-2xl font-black text-secondary tracking-tight">Checkout</h2>
                  <p className="text-slate-400 text-sm font-medium">Secure enrollment for {course.title}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Item</span>
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Price</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-secondary text-lg">{course.title}</p>
                    <p className="text-xs text-slate-400">Full {course.tier} Access & Credentials</p>
                  </div>
                  <p className="font-black text-secondary text-xl">${course.price}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="relative">
                  <CreditCard size={18} className="absolute left-4 top-4 text-slate-400" />
                  <input type="text" placeholder="Card Number" className="w-full bg-slate-100 border-0 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-primary outline-none text-sm" defaultValue="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <input type="text" placeholder="MM/YY" className="w-full bg-slate-100 border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-sm" defaultValue="12/28" />
                   <input type="text" placeholder="CVC" className="w-full bg-slate-100 border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-sm" defaultValue="123" />
                </div>
              </div>

              <button 
                onClick={handlePayment} 
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <><Lock size={20} /> Complete Enrollment</>}
              </button>
              <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                <Lock size={12} /> SSL Secure Encrypted Payment
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-black text-secondary tracking-tight mb-4">Enrollment Success!</h2>
              <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                Welcome to the Circuit. Your transformation begins now. Check your dashboard for the first module.
              </p>
              <button 
                onClick={handleFinish}
                className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-secondary/90 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  const { courses } = useAuth();
  const [activeTier, setActiveTier] = useState<ProgramTier>(ProgramTier.NANO);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const tiers = Object.values(ProgramTier);

  return (
    <div className="pb-32 bg-surface min-h-screen pt-24">
      {selectedCourse && <CheckoutModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
         <h1 className="text-5xl md:text-7xl font-black text-secondary tracking-tighter mb-6">Circuit Paths</h1>
         <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
           Choose the intensity that matches your ambition. From foundational sprints to career-guaranteed transformations.
         </p>
      </div>

      {/* Filter Nav */}
      <div className="sticky top-[80px] z-50 bg-surface/80 backdrop-blur-md py-4 border-b border-slate-100 mb-16 overflow-x-auto no-scrollbar">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-2 rounded-2xl flex justify-between gap-2 shadow-sm border border-slate-100 min-w-[500px]">
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`flex-1 py-3 px-6 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all ${
                  activeTier === tier 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : 'text-slate-400 hover:text-secondary'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-secondary tracking-tight">{activeTier} Journeys</h2>
            <p className="text-slate-400 text-sm font-medium">{TIER_INFO[activeTier]?.description}</p>
          </div>
          <div className="bg-primary/5 text-primary px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold">
            <Info size={16} /> Best for {activeTier === ProgramTier.NANO ? 'Beginners' : 'Performers'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.filter(c => c.tier === activeTier).map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group flex flex-col"
            >
              <div className="h-64 relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary shadow-sm">
                  ${course.price}
                </div>
                <div className="absolute bottom-6 left-6 bg-secondary/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-2">
                  <Clock size={12} className="text-primary" /> {course.duration}
                </div>
              </div>

              <div className="p-10 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-secondary tracking-tight mb-4">{course.title}</h3>
                <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed line-clamp-2">
                  {course.description}
                </p>
                
                <div className="space-y-4 mb-10 flex-grow">
                  {course.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0"><CheckCircle2 size={12} /></div>
                      {outcome}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="w-full py-5 rounded-2xl bg-secondary text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-primary transition-all duration-300 shadow-xl shadow-secondary/10"
                >
                  Enroll Now <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
          
          {courses.filter(c => c.tier === activeTier).length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
               <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No courses found in this category yet.</p>
            </div>
          )}
          
          {/* CTA Card for specialized paths */}
          {activeTier === ProgramTier.LAUNCHPAD && (
            <div className="bg-gradient-to-br from-secondary to-slate-800 rounded-[40px] p-10 text-white flex flex-col justify-center text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Zap size={40} className="text-primary animate-pulse" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">Cohort 14 Enrollment</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Our Launchpad spots are strictly limited to ensure placement focus. Currently 4 slots remaining.</p>
              <button className="bg-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">Join Waitlist</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
