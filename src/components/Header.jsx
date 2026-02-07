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
    <header className="fixed w-full z-50 bg-[#121212] border-b border-[#362b2b]/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center gap-4 text-white">
            <div className="size-6 text-[#a12b2b]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-white text-xl font-bold leading-tight tracking-tight uppercase">
              Rudy's Repair
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
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
            <button onClick={handleOrder} className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all">
              Order Now
            </button>
          </nav>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <MdMenu className="text-2xl" />
          </button>
        </div>
      </div>
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#121212] border-t border-[#362b2b]/50 px-6 py-6 space-y-4`}>
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
        <button onClick={handleOrder} className="w-full bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white py-3 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all">
          Order Now
        </button>
      </div>
    </header>
  );
}

export default Header;

