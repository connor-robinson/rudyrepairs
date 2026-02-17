import { MdInfo, MdVerified } from 'react-icons/md';

function PartsPolicy() {
  return (
    <section className="py-24 bg-[#121212] border-b border-[#362b2b]/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">Policy</p>
          <h2 className="font-display text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-10 text-center">Parts Buying Policy</h2>
          <div className="p-8 bg-[#181818] text-left">
            <p className="text-[#b5a1a1] text-sm leading-relaxed mb-8">
              You are encouraged to provide their own parts to ensure quality. We can also source parts for you if you prefer at an additional cost.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MdInfo className="text-[#a12b2b] flex-shrink-0 text-lg" />
                <p className="text-[#b5a1a1] text-sm">
                  Customers should provide their own parts, but please note that our 12-month labor guarantee will only cover the installation work, not the part itself.
                </p>
              </div>
              <div className="flex gap-4">
                <MdVerified className="text-[#a12b2b] flex-shrink-0 text-lg" />
                <p className="text-[#b5a1a1] text-sm">
                  All parts provided by Rudy's Repair carry their full manufacturer warranty alongside our labor guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartsPolicy;

