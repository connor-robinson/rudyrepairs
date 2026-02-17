import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';

function Hero() {
  const navigate = useNavigate();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const handleOrder = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-x-hidden bg-[#121212]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="Happy customer with repaired car"
          className="w-full h-full object-cover object-top opacity-60 hero-image-filter"
          src="/example_1.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/40 to-[#121212]"></div>
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-20 py-24 w-full pt-32">
        <div className="max-w-2xl">
          <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
            Need <span className="text-[#a12b2b]">repairs?</span>
          </h1>
          <p className="text-[#b5a1a1] text-lg md:text-xl font-light mb-12 leading-relaxed">
            Effortless tyre and oil change in Oxfordshire.
            <br />
            <span className="text-white">We come to you, wherever you are.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <button
              onClick={handleOrder}
              className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-10 py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all h-[60px] flex items-center justify-center"
            >
              Order Now
            </button>
            <div className="flex items-center gap-4 bg-[#181818] px-6 py-5 h-[60px]">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#121212] bg-[#121212]">
                  <img
                    alt="Happy customer 1"
                    className="w-full h-full object-cover object-top"
                    src="/customer1.png"
                  />
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#121212] bg-[#121212]">
                  <img
                    alt="Happy customer 2"
                    className="w-full h-full object-cover object-top transform -scale-x-100 opacity-70"
                    src="/customer2.png"
                  />
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#121212] bg-[#121212]">
                  <img
                    alt="Happy customer 3"
                    className="w-full h-full object-cover object-top transform scale-125"
                    src="/customer3.png"
                  />
                </div>
              </div>
              <div>
                <p className="text-white text-base font-medium leading-tight">100+</p>
                <p className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-0 right-0 z-20 flex justify-center transition-opacity duration-500 ${
          showScrollIndicator ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase">Scroll</span>
          <MdKeyboardArrowDown className="text-[#b5a1a1] text-2xl" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

