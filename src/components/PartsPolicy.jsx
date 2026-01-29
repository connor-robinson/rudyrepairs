import { MdInfo, MdVerified } from 'react-icons/md';

function PartsPolicy() {
  return (
    <section className="py-20 bg-dark-matte border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-black uppercase text-white mb-10">Parts Buying Policy</h2>
          <div className="p-12 border border-white/10 bg-white/5 rounded-sm text-left">
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              You are encouraged to provide their own parts to ensure quality.{' '} We can also source parts for you if you prefer at an additional cost.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MdInfo className="text-primary flex-shrink-0 text-xl" />
                <p className="text-slate-400 text-base">
                  Customers should provide their own parts, but please note that our 12-month labor guarantee will only cover the installation work, not the part itself.
                </p>
              </div>
              <div className="flex gap-4">
                <MdVerified className="text-primary flex-shrink-0 text-xl" />
                <p className="text-slate-400 text-base">
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

