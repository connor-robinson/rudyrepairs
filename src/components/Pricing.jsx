import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward, MdAdd, MdCheck } from 'react-icons/md';
import { services } from '../data/services';

function Pricing() {
  const navigate = useNavigate();
  const [bundleMode, setBundleMode] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleServiceSelection = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const bundleTotal = selectedServices.reduce((total, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return total + (service ? service.price : 0);
  }, 0);

  const handleOrder = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      navigate('/checkout', {
        state: {
          orderType: 'single',
          items: [service]
        }
      });
    }
  };

  const handleBundleOrder = () => {
    if (selectedServices.length > 0) {
      const bundleItems = services.filter(s => selectedServices.includes(s.id));
      navigate('/checkout', {
        state: {
          orderType: 'bundle',
          items: bundleItems
        }
      });
    }
  };

  const orderableServices = services.filter(s => s.orderable);

  return (
    <section className="py-16 bg-[#121212] border-b border-[#362b2b]/50" id="pricing">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="mb-12">
          <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-4">Pricing</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            Transparent <span className="text-[#a12b2b]">Pricing</span>
          </h2>
          <p className="text-[#b5a1a1] text-sm font-light">No hidden fees, no surprises.</p>
        </div>

        {/* Bundle Mode Toggle */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              setBundleMode(!bundleMode);
              setSelectedServices([]);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all ${
              bundleMode
                ? 'bg-[#a12b2b] text-white'
                : 'border border-[#362b2b] text-[#b5a1a1] hover:bg-white/5 hover:text-white'
            }`}
          >
            <MdAdd className="text-lg" />
            Click here to create a bundle
          </button>
          {bundleMode && selectedServices.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="text-white text-sm font-medium">
                Bundle Total: <span className="text-[#a12b2b] text-xl font-bold">£{bundleTotal}</span>
              </div>
              <button
                onClick={handleBundleOrder}
                className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-6 py-3 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2"
              >
                Order Bundle <MdArrowForward />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {orderableServices.map((service) => (
            <div key={service.id} className="border border-[#362b2b] rounded-lg p-6 hover:bg-white/5 transition-all">
              <div className="mb-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-white text-lg font-medium flex-1">{service.name}</h3>
                  {bundleMode && (
                <button
                  onClick={() => toggleServiceSelection(service.id)}
                  className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                        selectedServices.includes(service.id)
                          ? 'bg-[#a12b2b] border-[#a12b2b] text-white'
                          : 'border-[#362b2b] text-transparent hover:border-[#a12b2b]/50'
                      }`}
                    >
                      {selectedServices.includes(service.id) && <MdCheck className="text-lg" />}
                    </button>
                  )}
                </div>
                <p className="text-[#b5a1a1] text-sm mb-4">{service.description}</p>
                <div className="text-[#a12b2b] text-2xl font-bold mb-4">
                  {service.price === 0 ? 'FREE' : `£${service.price}`}
                </div>
              </div>
              {!bundleMode && (
                <button
                  onClick={() => handleOrder(service.id)}
                  className="w-full bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-6 py-3 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2"
                >
                  Order Now <MdArrowForward />
                </button>
              )}
            </div>
          ))}
          {/* Windshield Washer - Info only */}
          <div className="border border-[#362b2b] rounded-lg p-6 opacity-60">
            <div className="mb-4">
              <h3 className="text-white text-lg font-medium mb-2">{services.find(s => s.id === 8)?.name}</h3>
              <p className="text-[#b5a1a1] text-sm mb-4">{services.find(s => s.id === 8)?.description}</p>
              <div className="text-[#a12b2b] text-2xl font-bold mb-4">FREE</div>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-hidden border border-[#362b2b] rounded-lg bg-[#1a1a1a]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#362b2b] uppercase text-xs tracking-[0.2em] font-bold text-[#b5a1a1]">
                {bundleMode && <th className="px-6 lg:px-10 py-6 lg:py-8 w-16"></th>}
                <th className="px-6 lg:px-10 py-6 lg:py-8">Service Type</th>
                <th className="px-6 lg:px-10 py-6 lg:py-8">What's Included</th>
                <th className="px-6 lg:px-10 py-6 lg:py-8 text-right">Investment</th>
                {!bundleMode && <th className="px-6 lg:px-10 py-6 lg:py-8 w-40"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#362b2b]">
              {orderableServices.map((service) => (
                <tr key={service.id} className="hover:bg-white/5 transition-colors">
                  {bundleMode && (
                    <td className="px-6 lg:px-10 py-6 lg:py-10">
                      <button
                        onClick={() => toggleServiceSelection(service.id)}
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                          selectedServices.includes(service.id)
                            ? 'bg-[#a12b2b] border-[#a12b2b] text-white'
                            : 'border-[#362b2b] text-transparent hover:border-[#a12b2b]/50'
                        }`}
                      >
                        {selectedServices.includes(service.id) && <MdCheck className="text-lg" />}
                      </button>
                    </td>
                  )}
                  <td className="px-6 lg:px-10 py-6 lg:py-10 text-lg font-medium text-white">{service.name}</td>
                  <td className="px-6 lg:px-10 py-6 lg:py-10 text-[#b5a1a1] text-sm">{service.description}</td>
                  <td className="px-6 lg:px-10 py-6 lg:py-10 text-right text-xl font-bold text-[#a12b2b]">
                    {service.price === 0 ? 'FREE' : `£${service.price}`}
                  </td>
                  {!bundleMode && (
                    <td className="px-6 lg:px-10 py-6 lg:py-10">
                      <button
                        onClick={() => handleOrder(service.id)}
                        className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-6 py-3 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 w-full"
                      >
                        Order <MdArrowForward className="hidden lg:inline" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {/* Windshield Washer - Info only row */}
              <tr className="opacity-60">
                {bundleMode && <td className="px-6 lg:px-10 py-6 lg:py-10"></td>}
                <td className="px-6 lg:px-10 py-6 lg:py-10 text-lg font-medium text-white">
                  {services.find(s => s.id === 8)?.name}
                </td>
                <td className="px-6 lg:px-10 py-6 lg:py-10 text-[#b5a1a1] text-sm">
                  {services.find(s => s.id === 8)?.description}
                </td>
                <td className="px-6 lg:px-10 py-6 lg:py-10 text-right text-xl font-bold text-[#a12b2b]">
                  FREE
                </td>
                {!bundleMode && <td className="px-6 lg:px-10 py-6 lg:py-10"></td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

