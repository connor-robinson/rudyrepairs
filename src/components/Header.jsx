import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdBuild, MdMenu } from 'react-icons/md';

function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleOrder = () => {
    navigate('/checkout');
    closeMenu();
  };

  return (
    <header className="fixed w-full z-50 bg-[#121212]/20 border-b border-[#362b2b]/20 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="flex justify-between items-center py-3 md:py-4">
          <div className="flex items-center gap-0.5 text-white">
            <img 
              src="/logo.png" 
              alt="Rudy's Repair" 
              className="h-12 md:h-20 w-auto object-contain -ml-2 md:-ml-3"
            />
            <span className="text-white text-lg md:text-xl font-bold leading-tight tracking-tight uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Rudy's Repair
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-[#b5a1a1] hover:text-white text-sm font-medium leading-normal transition-colors uppercase tracking-[0.1em]" href="#why-us">
              Why Us
            </a>
            <a className="text-[#b5a1a1] hover:text-white text-sm font-medium leading-normal transition-colors uppercase tracking-[0.1em]" href="#pricing">
              Pricing
            </a>
            <a className="text-[#b5a1a1] hover:text-white text-sm font-medium leading-normal transition-colors uppercase tracking-[0.1em]" href="#reviews">
              Reviews
            </a>
            <a className="text-[#b5a1a1] hover:text-white text-sm font-medium leading-normal transition-colors uppercase tracking-[0.1em]" href="#faq">
              FAQ
            </a>
            <button
              onClick={handleOrder}
              className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-5 py-2 text-xs font-bold tracking-[0.25em] uppercase transition-all"
            >
              Order Now
            </button>
          </nav>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <MdMenu className="text-2xl" />
          </button>
        </div>
      </div>
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#121212]/95 backdrop-blur-md border-t border-[#362b2b]/50 px-6 py-4 space-y-3`}>
        <a className="block text-[#b5a1a1] hover:text-white text-sm font-medium uppercase tracking-[0.1em] transition-colors" href="#why-us" onClick={closeMenu}>
          Why Us
        </a>
        <a className="block text-[#b5a1a1] hover:text-white text-sm font-medium uppercase tracking-[0.1em] transition-colors" href="#pricing" onClick={closeMenu}>
          Pricing
        </a>
        <a className="block text-[#b5a1a1] hover:text-white text-sm font-medium uppercase tracking-[0.1em] transition-colors" href="#reviews" onClick={closeMenu}>
          Reviews
        </a>
        <a className="block text-[#b5a1a1] hover:text-white text-sm font-medium uppercase tracking-[0.1em] transition-colors" href="#faq" onClick={closeMenu}>
          FAQ
        </a>
        <button
          onClick={handleOrder}
          className="w-full bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white py-4 text-xs font-bold tracking-[0.25em] uppercase transition-all"
        >
          Order Now
        </button>
      </div>
    </header>
  );
}

export default Header;

