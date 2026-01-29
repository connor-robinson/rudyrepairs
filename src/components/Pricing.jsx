import { useNavigate } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';

function Pricing() {
  const navigate = useNavigate();
  
  const services = [
    {
      name: "Standard Oil Change",
      description: "Up to 5L Synthetic Oil, New Filter, 25-pt Check",
      price: "$89"
    },
    {
      name: "Full Brake Service",
      description: "Pad replacement, Fluid flush, Rotor inspection",
      price: "$199"
    },
    {
      name: "Tyre Replacement",
      description: "Fitting, Balancing, Disposal (Price per tyre)",
      price: "$120"
    },
    {
      name: "Battery Install",
      description: "Testing, Installation, Terminal cleaning",
      price: "$149"
    }
  ];

  const handleOrder = (serviceName) => {
    navigate('/checkout');
  };

  return (
    <section className="py-32 bg-dark-charcoal" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="max-w-xl">
            <h2 className="font-display text-5xl font-black uppercase mb-4 text-white whitespace-nowrap">
              Transparent <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-slate-400 text-lg font-light">No hidden fees, no surprises.</p>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {services.map((service, index) => (
            <div key={index} className="glass-card p-6 border border-white/10 rounded-sm">
              <div className="mb-4">
                <h3 className="font-bold text-xl text-white mb-2">{service.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                <div className="font-display text-3xl font-black text-primary mb-4">{service.price}</div>
              </div>
              <button
                onClick={() => handleOrder(service.name)}
                className="w-full bg-primary text-white px-6 py-4 rounded-sm font-black uppercase tracking-tighter hover:bg-accent transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-base min-h-[48px]"
              >
                Order Now <MdArrowForward />
              </button>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-hidden border border-white/5 bg-dark-matte">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/5 uppercase text-xs tracking-[0.2em] font-black text-slate-400">
                <th className="px-6 lg:px-10 py-6 lg:py-8">Service Type</th>
                <th className="px-6 lg:px-10 py-6 lg:py-8">What's Included</th>
                <th className="px-6 lg:px-10 py-6 lg:py-8 text-right">Investment</th>
                <th className="px-6 lg:px-10 py-6 lg:py-8 w-40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((service, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 lg:px-10 py-6 lg:py-10 font-bold text-lg lg:text-xl text-white">{service.name}</td>
                  <td className="px-6 lg:px-10 py-6 lg:py-10 text-slate-400 text-sm lg:text-base">{service.description}</td>
                  <td className="px-6 lg:px-10 py-6 lg:py-10 text-right font-display text-2xl lg:text-3xl font-black text-primary">{service.price}</td>
                  <td className="px-6 lg:px-10 py-6 lg:py-10">
                    <button
                      onClick={() => handleOrder(service.name)}
                      className="bg-primary text-white px-6 py-3 lg:px-8 lg:py-4 rounded-sm font-black uppercase tracking-tighter hover:bg-accent transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-sm lg:text-base min-h-[44px] w-full"
                    >
                      Order <MdArrowForward className="hidden lg:inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

