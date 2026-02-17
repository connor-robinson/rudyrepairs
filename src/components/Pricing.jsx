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

  const bundleSubtotal = selectedServices.reduce((total, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return total + (service ? service.price : 0);
  }, 0);

  // Calculate discount: 10% base + 2.5% per additional item, capped at 20%
  const calculateDiscountPercent = () => {
    if (selectedServices.length < 2) return 0;
    const baseDiscount = 10;
    const additionalItems = selectedServices.length - 2;
    const additionalDiscount = additionalItems * 2.5;
    const totalDiscount = baseDiscount + additionalDiscount;
    return Math.min(totalDiscount, 20); // Cap at 20%
  };

  const discountPercent = calculateDiscountPercent();
  const discountAmount = (bundleSubtotal * discountPercent) / 100;
  const bundleTotal = bundleSubtotal - discountAmount;

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
          items: bundleItems,
          subtotal: bundleSubtotal,
          discountPercent: discountPercent,
          discountAmount: discountAmount,
          total: bundleTotal
        }
      });
    }
  };

  const orderableServices = services.filter(s => s.orderable);

  return (
    <section className={`py-24 bg-[#121212] border-b border-[#362b2b]/50 ${bundleMode && selectedServices.length > 0 ? 'pb-32' : ''}`} id="pricing">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="mb-12">
          <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-4">Pricing</p>
          <h2 className="font-display text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            Transparent <span className="text-[#a12b2b]">Pricing</span>
          </h2>
          <p className="text-[#b5a1a1] text-sm font-light">No hidden fees, no surprises.</p>
        </div>

        {/* Bundle Mode Toggle */}
        <div className="mb-8 flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm text-[#b5a1a1] font-medium">Bundle Mode</span>
            <div
              onClick={() => {
                setBundleMode(!bundleMode);
                setSelectedServices([]);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#a12b2b] focus:ring-offset-2 focus:ring-offset-[#121212] ${
                bundleMode ? 'bg-[#a12b2b]' : 'bg-[#362b2b]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  bundleMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
          </label>
        </div>

        {/* Mobile Card View */}
        <div className={`block md:hidden ${bundleMode ? 'space-y-6' : 'space-y-4'}`}>
          {orderableServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => {
                if (bundleMode) {
                  toggleServiceSelection(service.id);
                } else {
                  handleOrder(service.id);
                }
              }}
              className={`bg-[#181818] p-6 hover:bg-[#1f1f1f] transition-all cursor-pointer ${
                bundleMode && selectedServices.includes(service.id) 
                  ? 'bg-white/5' 
                  : ''
              }`}
            >
              <div className="mb-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-white text-lg font-medium flex-1">{service.name}</h3>
                  {bundleMode && (
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center transition-all pointer-events-none ${
                        selectedServices.includes(service.id)
                          ? 'bg-[#a12b2b] text-white'
                          : 'bg-[#2a2a2a] text-[#5a5a5a]'
                      }`}
                    >
                      <MdCheck className={`text-lg ${selectedServices.includes(service.id) ? 'opacity-100' : 'opacity-30'}`} />
                    </div>
                  )}
                </div>
                <p className="text-[#b5a1a1] text-sm mb-4">{service.description}</p>
                <div className="mb-4">
                  {service.originalPrice && service.originalPrice > service.price ? (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[#b5a1a1] text-lg line-through">
                        £{service.originalPrice}
                      </span>
                      <span className="text-[#a12b2b] text-2xl font-bold">
                        £{service.price}
                      </span>
                      <span className="text-[#a12b2b] text-sm font-medium">
                        {Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}% off
                      </span>
                    </div>
                  ) : (
                    <div className="text-[#a12b2b] text-2xl font-bold">
                      {service.price === 0 ? 'FREE' : `£${service.price}`}
                    </div>
                  )}
                </div>
              </div>
              {!bundleMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrder(service.id);
                  }}
                  className="w-full bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-6 py-3 text-xs font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2"
                >
                  Order Now <MdArrowForward />
                </button>
              )}
            </div>
          ))}
          {/* Windshield Washer - Info only */}
          <div className="bg-[#181818] p-6 opacity-60">
            <div className="mb-4">
              <h3 className="text-white text-lg font-medium mb-2">{services.find(s => s.id === 8)?.name}</h3>
              <p className="text-[#b5a1a1] text-sm mb-4">{services.find(s => s.id === 8)?.description}</p>
              <div className="text-[#a12b2b] text-2xl font-bold mb-4">FREE</div>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-visible bg-[#1a1a1a]">
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
            <tbody className={`divide-y ${bundleMode ? 'divide-[#362b2b]/30' : 'divide-[#362b2b]'}`}>
              {orderableServices.map((service) => (
                <tr 
                  key={service.id} 
                  onClick={() => {
                    if (bundleMode) {
                      toggleServiceSelection(service.id);
                    } else {
                      handleOrder(service.id);
                    }
                  }}
                  className={`hover:bg-white/5 transition-colors cursor-pointer ${
                    bundleMode && selectedServices.includes(service.id) 
                      ? 'bg-white/5' 
                      : ''
                  }`}
                >
                  {bundleMode && (
                    <td className="px-6 lg:px-10 py-6 lg:py-10">
                      <div
                        className={`w-8 h-8 rounded-sm flex items-center justify-center transition-all pointer-events-none ${
                          selectedServices.includes(service.id)
                            ? 'bg-[#a12b2b] text-white'
                            : 'bg-[#2a2a2a] text-[#5a5a5a]'
                        }`}
                      >
                        <MdCheck className={`text-lg ${selectedServices.includes(service.id) ? 'opacity-100' : 'opacity-30'}`} />
                      </div>
                    </td>
                  )}
                  <td className="px-6 lg:px-10 py-6 lg:py-10 text-lg font-medium text-white">{service.name}</td>
                  <td className="px-6 lg:px-10 py-6 lg:py-10 text-[#b5a1a1] text-sm">{service.description}</td>
                  <td className="px-6 lg:px-10 py-6 lg:py-10 text-right">
                    {service.originalPrice && service.originalPrice > service.price ? (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#b5a1a1] text-sm line-through">
                            £{service.originalPrice}
                          </span>
                          <span className="text-[#a12b2b] text-xl font-bold">
                            £{service.price}
                          </span>
                        </div>
                        <span className="text-[#a12b2b] text-xs font-medium">
                          {Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}% off
                        </span>
                      </div>
                    ) : (
                      <div className="text-[#a12b2b] text-xl font-bold">
                        {service.price === 0 ? 'FREE' : `£${service.price}`}
                      </div>
                    )}
                  </td>
                  {!bundleMode && (
                    <td className="px-6 lg:px-10 py-6 lg:py-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrder(service.id);
                        }}
                        className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-6 py-3 text-xs font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 w-full"
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

      {/* Fixed Bottom Bundle Summary Popup (iPhone-style) */}
      {bundleMode && selectedServices.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#362b2b] shadow-2xl rounded-t-2xl md:rounded-t-none">
          {/* iPhone-style handle indicator */}
          <div className="w-12 h-1 bg-[#362b2b] rounded-full mx-auto mt-2 mb-3 md:hidden"></div>
          <div className="max-w-[1200px] mx-auto px-6 md:px-20 py-4 pb-6 md:pb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Price display */}
              <div className="flex items-baseline gap-3 flex-wrap">
                {discountPercent > 0 ? (
                  <>
                    <span className="text-[#b5a1a1] text-xl md:text-2xl line-through">
                      £{bundleSubtotal.toFixed(2)}
                    </span>
                    <span className="text-[#a12b2b] text-3xl md:text-4xl font-bold">
                      £{bundleTotal.toFixed(2)}
                    </span>
                    <span className="text-[#b5a1a1] text-sm font-medium">
                      ({discountPercent}% off, bundle discount)
                    </span>
                  </>
                ) : (
                  <span className="text-[#a12b2b] text-3xl md:text-4xl font-bold">
                    £{bundleTotal.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Order button */}
              <button
                onClick={handleBundleOrder}
                className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 active:bg-[#a12b2b]/80 text-white px-6 py-3 text-xs font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 w-full sm:w-auto flex-shrink-0"
              >
                Order Bundle <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Pricing;

