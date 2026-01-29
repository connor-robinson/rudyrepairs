import { MdBuild, MdShare, MdAlternateEmail, MdPhone, MdMail, MdLocationOn } from 'react-icons/md';

function Footer() {
  return (
    <footer className="bg-dark-matte text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <MdBuild className="text-primary text-3xl" />
              <span className="font-display text-3xl font-black tracking-tighter uppercase italic">RUDY'S REPAIR</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-10 text-lg font-light leading-relaxed">
              Bringing the garage to your driveway. Professional, convenient, and reliable mechanic services for drivers in Oxfordshire who value their time.
            </p>
            <div className="flex gap-6">
              <a className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" href="#">
                <MdShare className="text-xl" />
              </a>
              <a className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" href="#">
                <MdAlternateEmail className="text-xl" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase mb-8 tracking-widest text-sm text-slate-300">Services</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">Oil Changes</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Tyre Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Brake Repair</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Diagnostics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase mb-8 tracking-widest text-sm text-slate-300">Contact</h4>
            <ul className="space-y-5 text-slate-500 font-medium">
              <li className="flex items-center gap-3">
                <MdPhone className="text-primary text-xl" /> 1-800-RUDY-FIX
              </li>
              <li className="flex items-center gap-3">
                <MdMail className="text-primary text-xl" /> hello@rudysrepair.com
              </li>
              <li className="flex items-center gap-3">
                <MdLocationOn className="text-primary text-xl" /> Mobile Service HQ
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-600">
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

