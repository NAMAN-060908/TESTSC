
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Zap, Target, BarChart3, GraduationCap, 
  ChevronDown, Star, CheckCircle2, Building2, Globe2, Trophy, Quote
} from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="font-bold text-slate-800">{question}</span>
        <ChevronDown className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} size={20} />
      </button>
      {isOpen && (
        <div className="mt-4 text-slate-500 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-[11px] font-black uppercase tracking-widest mb-10 animate-bounce">
              <Zap size={14} />
              <span>Elite Performance Training</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-secondary tracking-tighter leading-[0.95] mb-10 max-w-5xl">
              Don't just upskill. <br />
              <span className="bg-gradient-to-r from-primary via-blue-400 to-indigo-500 bg-clip-text text-transparent">Transform.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-12 font-medium leading-relaxed">
              The only platform that builds elite technical skills through the lens of behavioral performance. Built for the modern workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link
                to="/courses"
                className="group relative bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-primary/40 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                Browse Circuits <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="bg-white border-2 border-slate-100 text-secondary px-10 py-5 rounded-2xl font-bold text-lg hover:border-primary/20 hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                See the Science
              </Link>
            </div>

            {/* Floating Stats */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              {[
                { label: 'Active Learners', val: '14k+' },
                { label: 'Placement Rate', val: '98%' },
                { label: 'Avg Salary Hike', val: '40%' },
                { label: 'Fortune 500 Partners', val: '120+' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-black text-secondary mb-2">{stat.val}</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Hiring Partners Ticker */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">Our Grads Work At</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center gap-2 font-black text-2xl">
                <Building2 size={24} /> <span>BRAND_{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behavioral Edge / Science Section */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="w-16 h-1 bg-primary mb-10"></div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">The Behavioral Performance Engine</h2>
              <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed font-medium">
                Traditional edtech only checks if you watched the video. We track your cognitive consistency, decision-speed, and artifact quality. 
                Our pedagogy is rooted in behavioral economics and neuroplasticity.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: 'Decision Simulation', desc: 'AI-driven workplace scenarios that test your ability to execute under pressure.' },
                  { title: 'Artifact Mastery', desc: 'Move beyond quizzes. Build real production-ready deliverables.' },
                  { title: 'Consistency Scoring', desc: 'A behavior-based grading system that recruiters actually trust.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-slate-800 border-8 border-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                 <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop" alt="The Science" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-[40px] shadow-2xl animate-pulse-slow">
                <Trophy size={48} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent)]"></div>
      </section>

      {/* Bento Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tighter mb-4">Proof in the Circuit</h2>
            <p className="text-slate-500 font-medium">Hear from the performers who broke through.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            <div className="md:col-span-2 md:row-span-1 bg-slate-50 rounded-3xl p-10 flex flex-col justify-between group hover:bg-primary transition-all duration-500 hover:text-white">
              <Quote className="text-primary group-hover:text-white opacity-20" size={48} />
              <p className="text-xl font-bold leading-relaxed mb-6">"Skill Circuit didn't just teach me Python. It taught me how to manage a 14-person engineering team's output. The behavioral tracking is a game-changer."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div>
                  <p className="font-black text-sm uppercase">Sarah Jenkins</p>
                  <p className="text-xs opacity-60">Lead Architect @ TechCorp</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded-3xl p-8 text-white flex flex-col justify-between">
              <div className="flex text-accent gap-1"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              <p className="font-bold text-lg">98% of graduates find a role within 90 days.</p>
              <ArrowRight className="text-primary" />
            </div>
            <div className="bg-primary/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
               <Globe2 className="text-primary mb-4" size={40} />
               <h3 className="font-black text-2xl text-secondary">Global Alumni</h3>
               <p className="text-sm text-slate-500">Mentors from Google, Meta, and OpenAI.</p>
            </div>
            <div className="md:col-span-2 bg-slate-50 rounded-3xl p-10 flex items-center gap-8 group">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-24 h-24 rounded-2xl object-cover" />
              <div>
                <p className="text-lg font-bold mb-4 italic">"The Launchpad program literally changed my life. I went from unemployed to Senior BA in 4 months."</p>
                <p className="font-black text-sm">Marcus V.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-secondary tracking-tighter mb-4">Common Questions</h2>
            <p className="text-slate-500">Everything you need to know about the Circuit.</p>
          </div>
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100">
            <FAQItem 
              question="How is this different from Coursera or Proficiency?" 
              answer="Most platforms are content libraries. We are a performance engine. We don't just provide videos; we track your behavioral consistency, artifact production quality, and offer live industry-led sprints." 
            />
            <FAQItem 
              question="Does the Job Guarantee really work?" 
              answer="Yes. Our Launchpad program is so rigorous that we back it with a 100% refund policy if you aren't placed within 6 months, provided you meet the behavioral thresholds." 
            />
            <FAQItem 
              question="What is a 'Circuit Path'?" 
              answer="A Path is a curated journey of courses, simulations, and real-world assignments mapped to a specific career outcome, from beginner (Nano) to expert (Pathway)." 
            />
            <FAQItem 
              question="Can my company sponsor my enrollment?" 
              answer="Absolutely. Over 40% of our students are corporate-sponsored. We provide detailed performance reporting for HR/L&D teams." 
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10">Ready to break the <br /> status quo?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/courses" className="bg-white text-primary px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">Start Now</Link>
            <Link to="/contact" className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">Talk to an Advisor</Link>
          </div>
          <p className="mt-12 text-white/60 text-sm font-bold uppercase tracking-widest">Enrollment ends in 3 days for the Spring Cohort</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
