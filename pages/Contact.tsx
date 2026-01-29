
import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Contact: React.FC = () => {
  const { addLead } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pb-24 pt-16">
      <div className="bg-secondary py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black tracking-tighter mb-4">Let's Connect</h1>
          <p className="text-white/60 text-xl font-medium">Have questions about a circuit? Our advisors are ready.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100">
            {submitted ? (
              <div className="py-20 text-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-black text-secondary mb-2">Message Sent!</h2>
                <p className="text-slate-500 font-medium">Our team will get back to you within 4 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-primary font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-secondary mb-8">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com" 
                        className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all text-sm" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Your Message</label>
                    <textarea 
                      rows={5} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your career goals..." 
                      className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-sm"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-primary text-white w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">
                    Send Message <Send size={18} />
                  </button>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">We typically respond within 2-4 business hours.</p>
                </form>
              </>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
              <h3 className="font-black text-secondary text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                <MessageSquare className="text-primary" /> Quick Connect
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Us</p>
                    <p className="font-bold text-secondary">hello@skillcircuit.io</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Line</p>
                    <p className="font-bold text-secondary">+1 (800) SKILL-01</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-10 rounded-[40px] text-white shadow-xl shadow-secondary/20">
              <h3 className="font-black text-2xl mb-4 tracking-tighter leading-tight">Need Guidance?</h3>
              <p className="opacity-60 text-sm mb-8 leading-relaxed font-medium">Book a free 15-minute discovery call with our program advisors to find your path.</p>
              <button className="bg-primary text-white w-full py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-all">Schedule Call</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
