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
    <header className="fixed w-full z-50 bg-dark-matte/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center gap-3">
            <MdBuild className="text-primary text-3xl" />
            <span className="font-display text-2xl font-black tracking-tighter uppercase italic text-white">
              RUDY'S REPAIR
            </span>
          </div>
          <nav className="hidden md:flex space-x-10 items-center">
            <a className="text-sm font-medium hover:text-primary transition-colors tracking-wide uppercase" href="#why-us">
              Why Us
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors tracking-wide uppercase" href="#pricing">
              Pricing
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors tracking-wide uppercase" href="#reviews">
              Reviews
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors tracking-wide uppercase" href="#faq">
              FAQ
            </a>
            <button onClick={handleOrder} className="bg-primary hover:bg-accent text-white px-8 py-2.5 rounded-sm font-extrabold uppercase tracking-tighter transition-all shadow-lg shadow-primary/20">
              Order Now
            </button>
          </nav>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <MdMenu className="text-3xl" />
          </button>
        </div>
      </div>
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-dark-charcoal border-b border-white/5 px-4 py-6 space-y-4`}>
        <a className="block text-lg font-bold uppercase tracking-tight" href="#why-us" onClick={closeMenu}>
          Why Us
        </a>
        <a className="block text-lg font-bold uppercase tracking-tight" href="#pricing" onClick={closeMenu}>
          Pricing
        </a>
        <a className="block text-lg font-bold uppercase tracking-tight" href="#reviews" onClick={closeMenu}>
          Reviews
        </a>
        <a className="block text-lg font-bold uppercase tracking-tight" href="#faq" onClick={closeMenu}>
          FAQ
        </a>
        <button onClick={handleOrder} className="w-full bg-primary text-white py-4 rounded-sm font-black uppercase tracking-tighter">
          Order Now
        </button>
      </div>
    </header>
  );
}

export default Header;

