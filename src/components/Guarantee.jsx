import { MdVerifiedUser, MdCheck } from 'react-icons/md';

function Guarantee() {
  return (
    <section className="py-20 bg-dark-matte border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 mb-10">
          <MdVerifiedUser className="text-primary text-4xl" />
        </div>
        <h2 className="font-display text-5xl font-black uppercase text-white mb-6">Our Guarantee</h2>
        <p className="text-xl text-slate-400 leading-relaxed font-light mb-10">
          We are committed to excellence. If you're not satisfied with our workmanship, we'll return and fix it at no additional cost. Your vehicle's health and your safety are our top priorities.
        </p>
        <div className="flex flex-wrap justify-center gap-12 text-sm font-black uppercase tracking-widest text-white/40">
          <div className="flex items-center gap-2">
            <MdCheck className="text-primary" /> 100% Satisfaction
          </div>
          <div className="flex items-center gap-2">
            <MdCheck className="text-primary" /> Insured Service
          </div>
          <div className="flex items-center gap-2">
            <MdCheck className="text-primary" /> Genuine Parts
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guarantee;

