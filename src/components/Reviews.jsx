import { MdFormatQuote } from 'react-icons/md';

// Trustpilot-style star component (square with white star on green background)
const TrustpilotStar = ({ filled = true, half = false, className = "" }) => {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  // Desaturated green to match the color scheme
  const starColor = "#4a7c59"; // More desaturated green
  
  if (half) {
    return (
      <svg 
        className={className}
        width="24" 
        height="24" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="20" fill={starColor} rx="2"/>
        <defs>
          <mask id={`half-mask-${uniqueId}`}>
            <rect x="0" y="0" width="10" height="20" fill="white"/>
            <rect x="10" y="0" width="10" height="20" fill="black"/>
          </mask>
        </defs>
        <path
          d="M10 2L11.5 6.5L16 7L13 10L13.8 14.2L10 12.5L6.2 14.2L7 10L4 7L8.5 6.5L10 2Z"
          fill="white"
          mask={`url(#half-mask-${uniqueId})`}
        />
        {/* Cut-out notch */}
        <path
          d="M13.8 14.2L15.2 15.8L17.5 16.5L15.2 15.8L13.8 14.2Z"
          fill="white"
          mask={`url(#half-mask-${uniqueId})`}
        />
      </svg>
    );
  }
  
  return (
    <svg 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" fill={filled ? starColor : "#2a2a2a"} rx="2"/>
      {filled && (
        <path
          d="M10 2L11.5 6.5L16 7L13 10L13.8 14.2L10 12.5L6.2 14.2L7 10L4 7L8.5 6.5L10 2Z M13.8 14.2L15.2 15.8L17.5 16.5L15.2 15.8L13.8 14.2Z"
          fill="white"
          fillRule="evenodd"
        />
      )}
    </svg>
  );
};

function Reviews() {
  return (
    <section className="py-16 md:py-24 bg-[#121212] border-b border-[#362b2b]/50" id="reviews">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="mb-12">
          <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-4">Reviews</p>
          <h2 className="font-display text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
            Our <span className="text-[#a12b2b]">Reviews</span>
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="flex-shrink-0">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-[10px] font-bold text-[#b5a1a1] uppercase tracking-[0.15em] mt-1">Orders</div>
            </div>
            <div className="w-px h-12 bg-[#362b2b] hidden sm:block flex-shrink-0"></div>
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrustpilotStar filled={true} className="w-6 h-6" />
                <TrustpilotStar filled={true} className="w-6 h-6" />
                <TrustpilotStar filled={true} className="w-6 h-6" />
                <TrustpilotStar filled={true} className="w-6 h-6" />
                <TrustpilotStar half={true} className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-bold text-[#b5a1a1] uppercase tracking-[0.15em]">4.6 Stars</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#181818] p-8 relative overflow-hidden hover:bg-[#1f1f1f] transition-all w-full">
            <div className="absolute top-0 right-0 p-6 text-white/5">
              <MdFormatQuote className="text-6xl" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-3">
                <TrustpilotStar filled={true} className="w-5 h-5" />
                <TrustpilotStar filled={true} className="w-5 h-5" />
                <TrustpilotStar filled={true} className="w-5 h-5" />
                <TrustpilotStar filled={true} className="w-5 h-5" />
                <TrustpilotStar filled={true} className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-medium text-white mb-3">"Professional & Reliable"</h4>
              <p className="text-[#b5a1a1] text-sm leading-relaxed mb-8 italic">
                "Rudy was very punctual and got the job done very quickly, which saved us lots of time. Will definitely come back to him whenever I need an oil change."
              </p>
              <div className="flex items-center gap-4 border-t border-[#362b2b] pt-6">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#121212] bg-[#121212]">
                  <img
                    alt="Mr Marcus Bennett"
                    className="w-full h-full object-cover object-top"
                    src="/customer4.png"
                  />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Mr Marcus Bennet</p>
                  <p className="text-[10px] text-[#b5a1a1] font-bold uppercase tracking-[0.15em]">Abingdon, Oxfordshire</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#181818] p-8 relative overflow-hidden hover:bg-[#1f1f1f] transition-all w-full">
            <div className="absolute top-0 right-0 p-6 text-white/5">
              <MdFormatQuote className="text-6xl" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-3">
                <TrustpilotStar filled={true} className="w-5 h-5" />
                <TrustpilotStar filled={true} className="w-5 h-5" />
                <TrustpilotStar filled={true} className="w-5 h-5" />
                <TrustpilotStar filled={true} className="w-5 h-5" />
                <TrustpilotStar half={true} className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-medium text-white mb-3">"Great Value for Money"</h4>
              <p className="text-[#b5a1a1] text-sm leading-relaxed mb-8 italic">
                "Very happy with the service. Rudy came to my workplace and sorted everything while I was working, so that I did not even have to be there at all. Would recommend!"
              </p>
              <div className="flex items-center gap-4 border-t border-[#362b2b] pt-6">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#121212] bg-[#121212]">
                  <img
                    alt="Mrs Claire Hughes"
                    className="w-full h-full object-cover object-top"
                    src="/customer5.png"
                  />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Mrs Claire Hughes</p>
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
