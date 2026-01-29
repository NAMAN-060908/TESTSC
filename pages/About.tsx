
import React from 'react';
import { Target, ShieldCheck, Zap, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-secondary py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-8">Mission over Marketing.</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            We exist to close the gap between academic theory and workplace reality. No fluff. Just transformation.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Who we are</h2>
            <p className="text-secondary/70 leading-relaxed mb-6">
              The Skill Circuit isn't just an LMS. It's a performance engine. We are a team of industry veterans, psychologists, and tech leaders who noticed that skills alone aren't enough to succeed.
            </p>
            <p className="text-secondary/70 leading-relaxed">
              Success requires behavior. It requires discipline. It requires the ability to execute under pressure. We build these traits into every course we design.
            </p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Target className="text-primary mb-4" />
              <h4 className="font-bold mb-2">Outcome First</h4>
              <p className="text-xs text-secondary/50">Every lesson leads to a real-world artifact.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <ShieldCheck className="text-primary mb-4" />
              <h4 className="font-bold mb-2">High Trust</h4>
              <p className="text-xs text-secondary/50">Credentialed by industry giants.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Zap className="text-primary mb-4" />
              <h4 className="font-bold mb-2">Zero Fluff</h4>
              <p className="text-xs text-secondary/50">Fast, intensive, and results-oriented.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Users className="text-primary mb-4" />
              <h4 className="font-bold mb-2">Student Centric</h4>
              <p className="text-xs text-secondary/50">Designed around your schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Difference */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-6">What makes us different?</h2>
            <p className="text-secondary/60">
              Most platforms sell you video content. We sell you a transformation journey. 
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold mb-3">Behavioral Integration</h3>
                <p className="text-secondary/60">We track your consistency, speed, and quality of work—not just if you watched a video.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold mb-3">Real-World Readiness</h3>
                <p className="text-secondary/60">All assessments are simulated workplace tasks. You don't take tests; you solve problems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
