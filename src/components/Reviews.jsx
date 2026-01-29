import { MdStar, MdStarHalf, MdFormatQuote } from 'react-icons/md';

function Reviews() {
  return (
    <section className="py-32 bg-dark-charcoal" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="font-display text-5xl font-black uppercase text-white mb-8">
            Our <span className="text-primary">REviews</span>
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-4xl font-black text-white">100+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Orders</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <MdStar className="text-2xl fill-current" />
                  <MdStar className="text-2xl fill-current" />
                  <MdStar className="text-2xl fill-current" />
                  <MdStar className="text-2xl fill-current" />
                  <MdStarHalf className="text-2xl fill-current" />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">4.6 Stars</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass-card p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5">
              <MdFormatQuote className="text-8xl" />
            </div>
            <div className="relative z-10">
              <div className="flex text-primary mb-6">
                <MdStar className="fill-current" />
                <MdStar className="fill-current" />
                <MdStar className="fill-current" />
                <MdStar className="fill-current" />
                <MdStar className="fill-current" />
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4">"Outstanding Service"</h4>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 italic">
                "Saved me so much time. Rudy arrived right on schedule and had my brakes sorted in under an hour. Truly professional and the price was exactly as quoted."
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary">JS</div>
                <div>
                  <p className="font-bold text-white uppercase tracking-tight">James Sterling</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Abingdon, Oxfordshire</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5">
              <MdFormatQuote className="text-8xl" />
            </div>
            <div className="relative z-10">
              <div className="flex text-primary mb-6">
                <MdStar className="fill-current" />
                <MdStar className="fill-current" />
                <MdStar className="fill-current" />
                <MdStar className="fill-current" />
                <MdStar />
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4">"Incredibly Convenient"</h4>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 italic">
                "No more waiting at the garage for hours. I was able to work from home while my car got a full oil change and health check. Highly recommend to everyone."
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary">CH</div>
                <div>
                  <p className="font-bold text-white uppercase tracking-tight">Claire Hughes</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Witney, Oxfordshire</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;

