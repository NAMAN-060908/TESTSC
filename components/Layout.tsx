
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Rocket, User as UserIcon, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, canAccessLMS, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm py-3 border-b border-slate-100' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Rocket size={22} />
            </div>
            <span className="text-secondary font-extrabold text-xl tracking-tighter">Skill Circuit</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${
                  location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-[1px] bg-slate-200 mx-4"></div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link to="/admin" className="text-accent hover:text-accent/80 transition-colors mr-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck size={16} /> Admin
                  </Link>
                )}
                {canAccessLMS && (
                  <Link to="/dashboard" className="bg-secondary text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:shadow-lg transition-all flex items-center gap-2">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                )}
                <div className="group relative">
                  <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-secondary hover:bg-slate-200 transition-colors">
                    <UserIcon size={20} />
                  </button>
                  <div className="absolute right-0 top-12 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-3 py-2 border-b border-slate-50 mb-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Signed in as</p>
                      <p className="text-sm font-bold truncate">{user?.name}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium">
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-[13px] font-bold text-slate-600 hover:text-primary px-4 py-2">
                  Sign in
                </Link>
                <Link
                  to="/courses"
                  className="bg-primary text-white px-6 py-2.5 rounded-xl text-[13px] font-bold hover:bg-primary-dark shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all"
                >
                  Join the Circuit
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary p-2 z-[120] relative">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Fully Opaque White Background */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-[110] p-6 pt-24 flex flex-col gap-8 animate-in slide-in-from-right duration-300 shadow-2xl overflow-y-auto">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-black transition-colors ${
                  location.pathname === link.path ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-12 border-t border-slate-100 pt-10">
            {isAuthenticated ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl">
                  <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {user?.name?.[0]}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-black text-lg text-secondary truncate">{user?.name}</p>
                    <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                  </div>
                </div>
                {canAccessLMS && (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center bg-secondary text-white py-5 rounded-2xl font-black text-lg">
                    LMS Dashboard
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="block w-full text-center border-2 border-accent text-accent py-5 rounded-2xl font-black text-lg">
                    Admin Command Center
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full py-4 text-red-500 font-black text-lg uppercase tracking-widest">Sign out</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-5 rounded-2xl border-2 border-slate-100 font-black text-lg text-secondary">Sign in</Link>
                <Link to="/courses" onClick={() => setIsOpen(false)} className="w-full text-center bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="bg-primary text-white p-2 rounded-xl"><Rocket size={20} /></div>
              <span className="font-extrabold text-2xl tracking-tighter">Skill Circuit</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
              We bridge the gap between academic theory and elite workplace performance through behavioral transformation and hands-on sprints.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'YouTube'].map(social => (
                <div key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-sm font-bold">
                  {social[0]}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8">Learning Paths</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/courses" className="hover:text-primary transition-colors">Nano (Foundational)</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition-colors">Sprint (High Intensity)</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition-colors">Pathway (Structured)</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition-colors">Launchpad (Elite)</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/courses" className="hover:text-primary transition-colors">Browse Courses</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">For Enterprise</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Mentorship</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Get the latest workplace performance insights.</p>
            <div className="relative">
              <input type="email" placeholder="email@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-all text-sm" />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-4 rounded-lg text-xs font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs">© 2025 The Skill Circuit. Built for high-performers.</p>
          <div className="flex gap-8 text-slate-500 text-xs font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
