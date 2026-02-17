import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdArrowBack, MdExpandMore, MdCalendarToday } from 'react-icons/md';
import { services, formatPrice } from '../data/services';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [calendlyReady, setCalendlyReady] = useState(false);
  const [calendlyError, setCalendlyError] = useState('');
  
  // Get order data from location state, or default to empty
  const orderData = location.state || null;
  const [orderItems, setOrderItems] = useState(() => {
    if (orderData && orderData.items) {
      return orderData.items;
    }
    // Default to first orderable service if no order data
    const defaultService = services.find(s => s.orderable);
    return defaultService ? [defaultService] : [];
  });

  const orderableServices = services.filter(s => s.orderable);
  
  // Calculate prices - all rounded to 2 decimal places
  const itemsSubtotal = Number((orderItems.reduce((sum, item) => sum + (item.originalPrice || item.price), 0)).toFixed(2));
  const itemsTotal = Number((orderItems.reduce((sum, item) => sum + item.price, 0)).toFixed(2));
  const itemsDiscount = Number((itemsSubtotal - itemsTotal).toFixed(2));
  
  // Calculate bundle discount: 10% base + 2.5% per additional item, capped at 20%
  const calculateBundleDiscountPercent = () => {
    if (orderItems.length < 2) return 0;
    const baseDiscount = 10;
    const additionalItems = orderItems.length - 2;
    const additionalDiscount = additionalItems * 2.5;
    const totalDiscount = baseDiscount + additionalDiscount;
    return Number(Math.min(totalDiscount, 20).toFixed(2)); // Cap at 20%
  };

  const bundleDiscountPercent = calculateBundleDiscountPercent();
  const bundleDiscountAmount = Number(((itemsTotal * bundleDiscountPercent) / 100).toFixed(2));
  const bundleTotal = Number((itemsTotal - bundleDiscountAmount).toFixed(2));
  
  // Use bundle discount if applicable, otherwise use individual item discounts
  const subtotal = itemsSubtotal;
  const totalPrice = bundleDiscountPercent > 0 ? bundleTotal : itemsTotal;
  const discountAmount = Number((bundleDiscountPercent > 0 ? bundleDiscountAmount + itemsDiscount : itemsDiscount).toFixed(2));
  const discountPercent = bundleDiscountPercent > 0 ? bundleDiscountPercent : (itemsSubtotal > 0 ? Number(((itemsDiscount / itemsSubtotal) * 100).toFixed(2)) : 0);
  
  const isBundle = orderItems.length > 1;

  const handleServiceSelect = (service) => {
    // Toggle service - add if not selected, remove if already selected
    const isSelected = orderItems.some(item => item.id === service.id);
    if (isSelected) {
      setOrderItems(orderItems.filter(item => item.id !== service.id));
    } else {
      setOrderItems([...orderItems, service]);
    }
    // Don't close dropdown so user can select multiple items
  };

  const handleRemoveItem = (serviceId) => {
    setOrderItems(orderItems.filter(item => item.id !== serviceId));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Load Calendly widget script once
  useEffect(() => {
    const src = 'https://assets.calendly.com/assets/external/widget.js';
    const existingScript = document.querySelector(`script[src="${src}"]`);

    const initializeCalendly = () => {
      // Give Calendly a moment to process the widget
      setTimeout(() => {
        if (window.Calendly) {
          setCalendlyReady(true);
        } else {
          // If Calendly still isn't available, try again
          setTimeout(() => {
            if (window.Calendly) {
              setCalendlyReady(true);
            } else {
              setCalendlyError('Unable to initialize the scheduling calendar. Please refresh the page and try again.');
            }
          }, 1000);
        }
      }, 100);
    };

    if (existingScript) {
      if (existingScript.getAttribute('data-loaded') === 'true') {
        initializeCalendly();
      } else {
        existingScript.addEventListener('load', initializeCalendly);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      initializeCalendly();
    };
    script.onerror = () => {
      setCalendlyError('Unable to load the scheduling calendar. Please refresh the page and try again.');
    };
    document.body.appendChild(script);
  }, []);

  // Calendly inline embed URL with pre-filled details
  const calendlyBaseUrl = 'https://calendly.com/ansonchanw/bookrepair';

  const calendlyUrl = `${calendlyBaseUrl}?background_color=000000&text_color=ffffff&primary_color=8b3838`;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-white transition-colors duration-300 min-h-screen">
      <div className="layout-container flex h-full grow flex-col min-h-screen">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#362b2b]/50 px-6 md:px-20 py-3 md:py-4 max-w-[1200px] mx-auto w-full">
          <div className="flex items-center gap-0.5 text-white">
            <img 
              src="/logo.png" 
              alt="Rudy's Repair" 
              className="h-14 md:h-20 w-auto object-contain -ml-2 md:-ml-3"
            />
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>Rudy's Repair</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
              <MdArrowBack className="text-sm text-[#b5a1a1] group-hover:text-white transition-colors" />
              <a className="text-[#b5a1a1] group-hover:text-white text-sm font-medium leading-normal transition-colors" href="#">
                Back to Home
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 flex justify-center pt-6 md:pt-8 pb-12 md:pb-24 px-6">
          <div className="layout-content-container flex flex-col max-w-[640px] flex-1 space-y-12">
            <section className="space-y-4">
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">Your Order</h1>
              <div className="relative group" ref={dropdownRef}>
                <button
                  className="dropdown-trigger w-full text-left flex items-center justify-between bg-[#1a1a1a] border border-[#362b2b] p-6 md:rounded-lg transition-all duration-200 active:bg-[#252525] hover:bg-[#1e1e1e]"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="space-y-1 flex-1">
                    {isBundle ? (
                      <>
                        <h2 className="text-white text-xl md:text-2xl font-medium">
                          Service Bundle ({orderItems.length} items)
                        </h2>
                        <p className="text-[#b5a1a1] text-sm">
                          {orderItems.map(item => item.name).join(', ')}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-white text-xl md:text-2xl font-medium">
                          {orderItems[0]?.name || 'Select a service'}
                        </h2>
                        <p className="text-[#b5a1a1] text-sm">
                          {orderItems[0]?.description || ''}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {discountPercent > 0 ? (
                      <div className="flex items-baseline gap-2 text-right">
                        <span className="text-[#b5a1a1] text-base line-through">{formatPrice(subtotal)}</span>
                        <p className="text-white text-xl font-bold">{formatPrice(totalPrice)}</p>
                      </div>
                    ) : (
                      <p className="text-white text-xl font-bold">{formatPrice(totalPrice)}</p>
                    )}
                    <MdExpandMore className={`text-[#b5a1a1] group-hover:text-white transition-transform duration-300 transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div 
                  className={`absolute top-full left-0 w-full z-20 bg-[#121212] border border-[#362b2b] rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
                    dropdownOpen 
                      ? 'max-h-[400px] opacity-100 translate-y-0' 
                      : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="max-h-[400px] overflow-y-auto">
                    {orderableServices.map((service, index) => {
                        const isSelected = orderItems.some(item => item.id === service.id);
                        return (
                          <button
                            key={service.id}
                            className={`w-full text-left p-6 ${index < orderableServices.length - 1 ? 'border-b border-[#362b2b]/50' : ''} ${isSelected ? 'bg-[#a12b2b]/10' : 'hover:bg-white/5'} flex justify-between items-center group transition-all`}
                            onClick={() => handleServiceSelect(service)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-sm flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'bg-[#a12b2b] text-white'
                                  : 'bg-[#2a2a2a] text-[#5a5a5a]'
                              }`}>
                                {isSelected && <span className="text-xs">✓</span>}
                              </div>
                              <div>
                                <p className="text-white text-lg font-medium">{service.name}</p>
                                <p className="text-[#b5a1a1] text-xs">{service.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              {service.originalPrice && service.originalPrice > service.price ? (
                                <div className="flex flex-col items-end gap-0.5">
                                  <span className="text-[#b5a1a1] text-xs line-through">{formatPrice(service.originalPrice)}</span>
                                  <p className="text-white font-bold">{formatPrice(service.price)}</p>
                                  <span className="text-[#a12b2b] text-[10px] font-medium">
                                    {Number((((service.originalPrice - service.price) / service.originalPrice) * 100).toFixed(2))}% off
                                  </span>
                                </div>
                              ) : (
                                <p className="text-white font-bold">{formatPrice(service.price)}</p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                </div>
              </div>
              
              {/* Order Items List - Show all items */}
              {orderItems.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                    {isBundle ? 'Bundle Items' : 'Selected Items'}
                  </p>
                  <div className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg overflow-hidden">
                    {orderItems.map((item, index) => {
                      const itemOriginalPrice = item.originalPrice || item.price;
                      const itemHasDiscount = item.originalPrice && item.originalPrice > item.price;
                      return (
                        <div
                          key={item.id}
                          className={`p-4 ${index < orderItems.length - 1 ? 'border-b border-[#362b2b]/50' : ''} flex justify-between items-center group`}
                        >
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">{item.name}</p>
                            <p className="text-[#b5a1a1] text-xs">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              {itemHasDiscount ? (
                                <div className="flex flex-col items-end gap-0.5">
                                  <span className="text-[#b5a1a1] text-xs line-through">{formatPrice(itemOriginalPrice)}</span>
                                  <p className="text-white font-bold">{formatPrice(item.price)}</p>
                                  <span className="text-[#a12b2b] text-[10px] font-medium">
                                    {Number((((itemOriginalPrice - item.price) / itemOriginalPrice) * 100).toFixed(2))}% off
                                  </span>
                                </div>
                              ) : (
                                <p className="text-white font-bold">{formatPrice(item.price)}</p>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveItem(item.id);
                              }}
                              className="text-[#b5a1a1] hover:text-[#a12b2b] transition-colors opacity-0 group-hover:opacity-100 text-lg font-bold"
                              title="Remove item"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="p-4 bg-[#121212] border-t border-[#362b2b] space-y-2">
                      {discountPercent > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <p className="text-[#b5a1a1]">Subtotal</p>
                          <p className="text-[#b5a1a1] line-through">{formatPrice(subtotal)}</p>
                        </div>
                      )}
                      {discountPercent > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <p className="text-[#b5a1a1]">
                            {bundleDiscountPercent > 0 ? 'Bundle Discount' : 'Discount'}
                            {discountPercent > 0 && ` (${discountPercent}% off)`}
                          </p>
                          <p className="text-[#a12b2b] font-medium">-{formatPrice(discountAmount)}</p>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2 border-t border-[#362b2b]">
                        <p className="text-white text-sm font-bold uppercase tracking-[0.1em]">Total</p>
                        <p className="text-[#a12b2b] text-xl font-bold">{formatPrice(totalPrice)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="space-y-6">
              <div>
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Book Your Appointment</h2>
                <p className="text-[#b5a1a1] text-sm">
                  No payment required upfront. Pay after your repair is completed.
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg p-6">
                <div className="relative min-h-[700px]">
                  {!calendlyReady && !calendlyError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                      <div className="w-8 h-8 border-2 border-[#a12b2b] border-t-transparent rounded-full animate-spin" />
                      <p className="text-[#b5a1a1] text-xs">Loading calendar…</p>
                    </div>
                  )}
                  <div
                    className="calendly-inline-widget"
                    data-url={calendlyUrl}
                    style={{ minWidth: '320px', height: '700px', display: calendlyReady ? 'block' : 'none' }}
                  />
                </div>
                {calendlyError && (
                  <p className="text-red-400 text-xs mt-3 text-center">
                    {calendlyError}
                  </p>
                )}
              </div>
            </section>
          </div>
        </main>

        <footer className="py-12 px-6 border-t border-[#362b2b]/30">
          <div className="max-w-[640px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
            <p className="text-[10px] tracking-widest uppercase">© 2024 Rudy's Repair Ltd.</p>
            <div className="flex gap-6">
              <a className="text-[10px] tracking-widest uppercase hover:text-[#a12b2b] transition-colors" href="#">Help</a>
              <a className="text-[10px] tracking-widest uppercase hover:text-[#a12b2b] transition-colors" href="#">Status</a>
              <a className="text-[10px] tracking-widest uppercase hover:text-[#a12b2b] transition-colors" href="#">Legal</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Checkout;

