import { MdVerified, MdHistoryEdu, MdCheckCircle } from 'react-icons/md';

function WhyUs() {
  return (
    <section className="pt-8 pb-16 bg-[#121212] border-b border-[#362b2b]/50" id="why-us">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="mb-16">
          <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-4">Why Choose Us</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-12">
            Why <span className="text-[#a12b2b]">Us</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-[#362b2b] rounded-lg p-8 hover:bg-white/5 transition-all">
            <div className="mb-6">
              <div className="w-12 h-12 border border-[#362b2b] rounded-lg flex items-center justify-center mb-4">
                <MdVerified className="text-[#a12b2b] text-2xl" />
              </div>
              <h3 className="text-white text-xl font-medium mb-4">Free 25-point Inspection</h3>
              <p className="text-[#b5a1a1] text-sm leading-relaxed mb-6">
                Every service comes with a comprehensive vehicle health check, to identify potential issues before they can become expensive problems.
              </p>
            </div>
            <div className="space-y-3 border-t border-[#362b2b] pt-6">
              <div className="flex items-center gap-3 text-[#b5a1a1] text-xs font-bold tracking-[0.15em] uppercase">
                <MdCheckCircle className="text-[#a12b2b] text-base" />
                Brake Pad Inspection
              </div>
              <div className="flex items-center gap-3 text-[#b5a1a1] text-xs font-bold tracking-[0.15em] uppercase">
                <MdCheckCircle className="text-[#a12b2b] text-base" />
                Fluid Level Top-ups
              </div>
            </div>
          </div>
          <div className="border border-[#362b2b] rounded-lg p-8 hover:bg-white/5 transition-all">
            <div className="mb-6">
              <div className="w-12 h-12 border border-[#362b2b] rounded-lg flex items-center justify-center mb-4">
                <MdHistoryEdu className="text-[#a12b2b] text-2xl" />
              </div>
              <h3 className="text-white text-xl font-medium mb-4">12-month Labour Guarantee</h3>
              <p className="text-[#b5a1a1] text-sm leading-relaxed mb-6">
                We stand by our craftsmanship. Enjoy peace of mind with our standard 12-month or 12,000-mile warranty on all labor.
              </p>
            </div>
            <div className="space-y-3 border-t border-[#362b2b] pt-6">
              <div className="flex items-center gap-3 text-[#b5a1a1] text-xs font-bold tracking-[0.15em] uppercase">
                <MdCheckCircle className="text-[#a12b2b] text-base" />
                Certified Technicians
              </div>
              <div className="flex items-center gap-3 text-[#b5a1a1] text-xs font-bold tracking-[0.15em] uppercase">
                <MdCheckCircle className="text-[#a12b2b] text-base" />
                No-hassle Claims
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;

