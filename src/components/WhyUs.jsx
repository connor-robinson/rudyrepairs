import { MdCheckCircle, MdKeyboardArrowDown } from 'react-icons/md';

function WhyUs() {
  return (
    <section className="py-24 bg-[#121212] border-b border-[#362b2b]/50 relative overflow-hidden" id="why-us">
      {/* Animated background design suggesting scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none overflow-hidden">
        {/* Animated flowing lines suggesting downward movement */}
        <div className="absolute bottom-0 left-0 right-0 h-full">
          <svg className="absolute bottom-0 left-0 right-0 h-full w-full" viewBox="0 0 1200 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Flowing curved lines */}
            <path 
              d="M0 200 Q300 150, 600 200 T1200 200" 
              stroke="#362b2b" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.4"
              className="animate-pulse"
            />
            <path 
              d="M0 250 Q400 200, 800 250 T1200 250" 
              stroke="#362b2b" 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.3"
              style={{ animationDelay: '0.5s' }}
              className="animate-pulse"
            />
            <path 
              d="M0 300 Q200 250, 400 300 T1200 300" 
              stroke="#362b2b" 
              strokeWidth="1" 
              fill="none" 
              opacity="0.25"
              style={{ animationDelay: '1s' }}
              className="animate-pulse"
            />
          </svg>
          
          {/* Animated dots flowing downward */}
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-[#362b2b] rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-24 left-1/3 w-1.5 h-1.5 bg-[#362b2b] rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-40 left-1/2 w-2 h-2 bg-[#362b2b] rounded-full opacity-35 animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute bottom-20 left-2/3 w-1.5 h-1.5 bg-[#362b2b] rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.9s' }}></div>
          <div className="absolute bottom-36 right-1/4 w-2 h-2 bg-[#362b2b] rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute bottom-28 right-1/3 w-1.5 h-1.5 bg-[#362b2b] rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        {/* Gradient fade at the top */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent pointer-events-none"></div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-20 relative z-10">
        <div className="mb-8 relative">
          <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-4">Why Choose Us</p>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
              Why <span className="text-[#a12b2b]">Us</span>
            </h2>
            {/* Scroll down animation on the right */}
            <div className="hidden lg:flex items-center gap-3 mb-6">
              <a 
                href="#pricing" 
                className="flex items-center gap-2 text-[#b5a1a1] hover:text-[#a12b2b] transition-colors group"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                  View Pricing
                </span>
                <MdKeyboardArrowDown className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity animate-bounce" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#181818] p-8 hover:bg-[#1f1f1f] transition-all">
            <div className="mb-6">
              <h3 className="font-display text-white text-xl font-medium mb-4">Free 25-point Inspection</h3>
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
          <div className="bg-[#181818] p-8 hover:bg-[#1f1f1f] transition-all">
            <div className="mb-6">
              <h3 className="font-display text-white text-xl font-medium mb-4">12-month Labour Guarantee</h3>
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

