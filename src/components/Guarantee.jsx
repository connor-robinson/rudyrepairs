import { MdVerifiedUser, MdCheck } from 'react-icons/md';

function Guarantee() {
  return (
    <section className="py-16 bg-[#121212] border-b border-[#362b2b]/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg border border-[#362b2b]">
            <MdVerifiedUser className="text-[#a12b2b] text-2xl" />
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight">Our Guarantee</h2>
        </div>
        <p className="text-[#b5a1a1] text-sm leading-relaxed font-light mb-10 max-w-2xl mx-auto">
          We are committed to excellence. If you're not satisfied with our workmanship, we'll return and fix it at no additional cost. Your vehicle's health and your safety are our top priorities.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-xs font-bold tracking-[0.15em] uppercase text-[#b5a1a1]">
          <div className="flex items-center gap-2">
            <MdCheck className="text-[#a12b2b]" /> 100% Satisfaction
          </div>
          <div className="flex items-center gap-2">
            <MdCheck className="text-[#a12b2b]" /> Insured Service
          </div>
          <div className="flex items-center gap-2">
            <MdCheck className="text-[#a12b2b]" /> Genuine Parts
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guarantee;

