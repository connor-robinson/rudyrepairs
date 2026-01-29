import { MdVerified, MdHistoryEdu, MdCheckCircle } from 'react-icons/md';

function WhyUs() {
  return (
    <section className="py-32 bg-dark-matte" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
          <div>
            <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
              Why Choose <span className="text-primary">Us</span>
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass-card p-10 group hover:border-primary/30 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 border border-primary/20 bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all flex-shrink-0">
                <MdVerified className="text-primary group-hover:text-white text-4xl" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white">Free 25-point Inspection</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Every service comes with a comprehensive vehicle health check, to identify potential issues before they can become expensive problems.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                <MdCheckCircle className="text-primary text-xl" />
                BRAKE PAD INSPECTION
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                <MdCheckCircle className="text-primary text-xl" />
                FLUID LEVEL TOP-UPS
              </div>
            </div>
          </div>
          <div className="glass-card p-10 group hover:border-primary/30 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 border border-primary/20 bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all flex-shrink-0">
                <MdHistoryEdu className="text-primary group-hover:text-white text-4xl" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white">12-month Labour Guarantee</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              We stand by our craftsmanship. Enjoy peace of mind with our standard 12-month or 12,000-mile warranty on all labor.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                <MdCheckCircle className="text-primary text-xl" />
                CERTIFIED TECHNICIANS
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                <MdCheckCircle className="text-primary text-xl" />
                NO-HASSLE CLAIMS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;

