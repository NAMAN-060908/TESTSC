
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Logic to detect admin for demo purposes
      const role = email.includes('admin') ? 'admin' : 'student';
      login(email, role);
    } else {
      signup(name, email);
    }
    navigate('/courses');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4 bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Rocket size={24} />
            </div>
          </Link>
          <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">
            {isLogin ? 'Welcome back' : 'Join the Circuit'}
          </h1>
          <p className="text-slate-400 font-medium">Elevate your performance today.</p>
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Performer" 
                    className="w-full bg-slate-50 border-0 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-primary outline-none text-sm transition-all" 
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-4 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-primary outline-none text-sm transition-all" 
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-4 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-primary outline-none text-sm transition-all" 
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-10 flex items-center gap-4 text-slate-200">
            <div className="h-[1px] flex-grow bg-slate-100"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">or</span>
            <div className="h-[1px] flex-grow bg-slate-100"></div>
          </div>

          <p className="text-center mt-10 text-sm font-bold text-slate-400">
            {isLogin ? "Don't have an account?" : "Already a member?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>

          <div className="mt-8 p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
            <ShieldCheck size={20} className="text-primary" />
            <p className="text-[10px] font-bold text-slate-400 leading-relaxed">
              For demo: use <span className="text-secondary">admin@sc.io</span> to access the Admin Dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
