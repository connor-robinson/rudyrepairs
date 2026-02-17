import { MdBuild, MdShare, MdAlternateEmail, MdPhone, MdMail, MdLocationOn } from 'react-icons/md';

function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-20 border-t border-[#362b2b]/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <img 
                src="/logo.png" 
                alt="Rudy's Repair" 
                className="h-12 md:h-16 w-auto"
              />
              <span className="text-white text-xl font-bold leading-tight tracking-tight uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>Rudy's Repair</span>
            </div>
            <p className="text-[#b5a1a1] max-w-sm mb-10 text-sm font-light leading-relaxed">
              Bringing the garage to your driveway. Professional, convenient, and reliable mechanic services for drivers in Oxfordshire who value their time.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 flex items-center justify-center hover:bg-[#181818] transition-all" href="#">
                <MdShare className="text-lg text-[#b5a1a1] hover:text-white" />
              </a>
              <a className="w-10 h-10 flex items-center justify-center hover:bg-[#181818] transition-all" href="#">
                <MdAlternateEmail className="text-lg text-[#b5a1a1] hover:text-white" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-6 tracking-[0.15em] text-xs text-[#b5a1a1]">Services</h4>
            <ul className="space-y-3 text-[#b5a1a1] text-sm">
              <li><a className="hover:text-white transition-colors" href="#">Oil Changes</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Tyre Service</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Brake Repair</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Diagnostics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-6 tracking-[0.15em] text-xs text-[#b5a1a1]">Contact</h4>
            <ul className="space-y-4 text-[#b5a1a1] text-sm">
              <li className="flex items-center gap-3">
                <MdPhone className="text-[#a12b2b] text-lg" /> 77474-848890
              </li>
              <li className="flex items-center gap-3">
                <MdMail className="text-[#a12b2b] text-lg" /> alex.rudnitskyi@abingdon.org.uk
              </li>
              <li className="flex items-center gap-3">
                <MdLocationOn className="text-[#a12b2b] text-lg" /> Abingdon, Oxfordshire
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#362b2b]/50 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[#b5a1a1]">
          <div>© 2024 Rudy's Repair Mobile Mechanic</div>
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


