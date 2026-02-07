import { MdStar, MdStarHalf, MdFormatQuote } from 'react-icons/md';

function Reviews() {
  return (
    <section className="py-16 bg-[#121212] border-b border-[#362b2b]/50" id="reviews">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="mb-12">
          <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-4">Reviews</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
            Our <span className="text-[#a12b2b]">Reviews</span>
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-[10px] font-bold text-[#b5a1a1] uppercase tracking-[0.15em] mt-1">Orders</div>
              </div>
              <div className="w-px h-12 bg-[#362b2b]"></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#a12b2b] mb-1">
                  <MdStar className="text-xl fill-current" />
                  <MdStar className="text-xl fill-current" />
                  <MdStar className="text-xl fill-current" />
                  <MdStar className="text-xl fill-current" />
                  <MdStarHalf className="text-xl fill-current" />
                </div>
                <div className="text-[10px] font-bold text-[#b5a1a1] uppercase tracking-[0.15em]">4.6 Stars</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-[#362b2b] rounded-lg p-8 relative overflow-hidden hover:bg-white/5 transition-all">
            <div className="absolute top-0 right-0 p-6 text-white/5">
              <MdFormatQuote className="text-6xl" />
            </div>
            <div className="relative z-10">
              <div className="flex text-[#a12b2b] mb-4">
                <MdStar className="fill-current text-sm" />
                <MdStar className="fill-current text-sm" />
                <MdStar className="fill-current text-sm" />
                <MdStar className="fill-current text-sm" />
                <MdStar className="fill-current text-sm" />
              </div>
              <h4 className="text-lg font-medium text-white mb-3">"Outstanding Service"</h4>
              <p className="text-[#b5a1a1] text-sm leading-relaxed mb-8 italic">
                "Saved me so much time. Rudy arrived right on schedule and had my brakes sorted in under an hour. Truly professional and the price was exactly as quoted."
              </p>
              <div className="flex items-center gap-4 border-t border-[#362b2b] pt-6">
                <div className="w-10 h-10 rounded-full border border-[#362b2b] flex items-center justify-center font-bold text-[#a12b2b] text-sm">JS</div>
                <div>
                  <p className="font-medium text-white text-sm">James Sterling</p>
                  <p className="text-[10px] text-[#b5a1a1] font-bold uppercase tracking-[0.15em]">Abingdon, Oxfordshire</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-[#362b2b] rounded-lg p-8 relative overflow-hidden hover:bg-white/5 transition-all">
            <div className="absolute top-0 right-0 p-6 text-white/5">
              <MdFormatQuote className="text-6xl" />
            </div>
            <div className="relative z-10">
              <div className="flex text-[#a12b2b] mb-4">
                <MdStar className="fill-current text-sm" />
                <MdStar className="fill-current text-sm" />
                <MdStar className="fill-current text-sm" />
                <MdStar className="fill-current text-sm" />
                <MdStar className="text-sm" />
              </div>
              <h4 className="text-lg font-medium text-white mb-3">"Incredibly Convenient"</h4>
              <p className="text-[#b5a1a1] text-sm leading-relaxed mb-8 italic">
                "No more waiting at the garage for hours. I was able to work from home while my car got a full oil change and health check. Highly recommend to everyone."
              </p>
              <div className="flex items-center gap-4 border-t border-[#362b2b] pt-6">
                <div className="w-10 h-10 rounded-full border border-[#362b2b] flex items-center justify-center font-bold text-[#a12b2b] text-sm">CH</div>
                <div>
                  <p className="font-medium text-white text-sm">Claire Hughes</p>
                  <p className="text-[10px] text-[#b5a1a1] font-bold uppercase tracking-[0.15em]">Witney, Oxfordshire</p>
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

