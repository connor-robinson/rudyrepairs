import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdArrowBack, MdExpandMore, MdMyLocation, MdCalendarToday } from 'react-icons/md';
import { services, formatPrice } from '../data/services';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [address, setAddress] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  
  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  
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
  
  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);
  const isBundle = orderItems.length > 1;

  const handleServiceSelect = (service) => {
    // If selecting a service, replace current order with single service
    setOrderItems([service]);
    setDropdownOpen(false);
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
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Get user's location and reverse geocode to address
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setAddressError('Geolocation is not supported by your browser');
      return;
    }

    setAddressLoading(true);
    setAddressError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'RudysRepair/1.0' // Required by Nominatim
              }
            }
          );

          if (!response.ok) {
            throw new Error('Failed to get address');
          }

          const data = await response.json();
          
          // Format the address nicely
          const addressData = data.address;
          let formattedAddress = '';
          
          if (addressData.road) formattedAddress += addressData.road;
          if (addressData.city || addressData.town || addressData.village) {
            if (formattedAddress) formattedAddress += ', ';
            formattedAddress += addressData.city || addressData.town || addressData.village;
          }
          if (addressData.county && !formattedAddress.includes(addressData.county)) {
            if (formattedAddress) formattedAddress += ', ';
            formattedAddress += addressData.county;
          }
          if (addressData.postcode) {
            if (formattedAddress) formattedAddress += ` ${addressData.postcode}`;
            else formattedAddress = addressData.postcode;
          }

          setAddress(formattedAddress || data.display_name || 'Location found');
          setAddressLoading(false);
        } catch (error) {
          console.error('Geocoding error:', error);
          setAddressError('Could not determine address. Please enter manually.');
          setAddressLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Could not get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        setAddressError(errorMessage);
        setAddressLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Calendly inline embed URL with pre-filled details
  const calendlyBaseUrl = 'https://calendly.com/ansonchanw/bookrepair';

  const calendlyParams = new URLSearchParams({
    background_color: '000000',
    text_color: 'ffffff',
    primary_color: '8b3838'
  });

  if (customerName) calendlyParams.set('name', customerName);
  if (customerEmail) calendlyParams.set('email', customerEmail);
  if (vehicleModel) calendlyParams.set('a1', vehicleModel);
  if (address) calendlyParams.set('a2', address);
  if (customerPhone) calendlyParams.set('a3', customerPhone);

  const calendlyUrl = `${calendlyBaseUrl}?${calendlyParams.toString()}`;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-white transition-colors duration-300 min-h-screen">
      <div className="layout-container flex h-full grow flex-col min-h-screen">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#362b2b]/50 px-6 md:px-20 py-6 max-w-[1200px] mx-auto w-full">
          <div className="flex items-center gap-4 text-white">
            <div className="size-6 text-[#a12b2b]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight uppercase">Rudy's Repair</h2>
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

        <main className="flex-1 flex justify-center py-12 md:py-24 px-6">
          <div className="layout-content-container flex flex-col max-w-[640px] flex-1 space-y-16">
            <section className="space-y-4 relative">
              <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase">The Order</p>
              <div className="relative group" ref={dropdownRef}>
                <button
                  className="dropdown-trigger w-full text-left flex items-center justify-between bg-[#1a1a1a] border-b border-[#362b2b] p-6 -mx-6 md:mx-0 md:rounded-lg transition-all duration-200 active:bg-[#252525] hover:bg-[#1e1e1e]"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="space-y-1 flex-1">
                    {isBundle ? (
                      <>
                        <h1 className="text-white text-3xl md:text-4xl font-light leading-tight tracking-tight">
                          Service Bundle ({orderItems.length} items)
                        </h1>
                        <p className="text-[#b5a1a1] text-sm font-light">
                          {orderItems.map(item => item.name).join(', ')}
                        </p>
                      </>
                    ) : (
                      <>
                        <h1 className="text-white text-3xl md:text-4xl font-light leading-tight tracking-tight">
                          {orderItems[0]?.name || 'Select a service'}
                        </h1>
                        <p className="text-[#b5a1a1] text-sm font-light">
                          {orderItems[0]?.description || ''}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-white text-2xl font-normal">{formatPrice(totalPrice)}</p>
                    <MdExpandMore className={`text-[#b5a1a1] group-hover:text-white transition-all transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 w-full z-20 bg-[#121212] border border-[#362b2b] rounded-b-lg overflow-hidden transition-all">
                    <div className="max-h-[400px] overflow-y-auto">
                      {orderableServices.map((service, index) => {
                        const isSelected = orderItems.some(item => item.id === service.id);
                        return (
                          <button
                            key={service.id}
                            className={`w-full text-left p-6 ${index < orderableServices.length - 1 ? 'border-b border-[#362b2b]/50' : ''} ${isSelected ? 'bg-[#a12b2b]/10' : 'hover:bg-white/5'} flex justify-between items-center group transition-all`}
                            onClick={() => handleServiceSelect(service)}
                          >
                            <div>
                              <p className="text-white text-lg font-medium">{service.name}</p>
                              <p className="text-[#b5a1a1] text-xs">{service.description}</p>
                            </div>
                            <p className="text-white font-bold">{formatPrice(service.price)}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Order Items List - Show all items in bundle */}
              {isBundle && (
                <div className="mt-4 space-y-3">
                  <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-3">Bundle Items</p>
                  <div className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg overflow-hidden">
                    {orderItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`p-4 ${index < orderItems.length - 1 ? 'border-b border-[#362b2b]/50' : ''} flex justify-between items-center`}
                      >
                        <div>
                          <p className="text-white text-sm font-medium">{item.name}</p>
                          <p className="text-[#b5a1a1] text-xs">{item.description}</p>
                        </div>
                        <p className="text-white font-bold">{formatPrice(item.price)}</p>
                      </div>
                    ))}
                    <div className="p-4 bg-[#121212] border-t border-[#362b2b] flex justify-between items-center">
                      <p className="text-white text-sm font-bold uppercase tracking-[0.1em]">Total</p>
                      <p className="text-[#a12b2b] text-xl font-bold">{formatPrice(totalPrice)}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="space-y-12">
              <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase border-b border-[#362b2b] pb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Name *</label>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="minimal-input w-full text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                    placeholder="Johnathan Doe"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Email *</label>
                  <input
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="minimal-input w-full text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                    placeholder="john@example.com"
                    type="email"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Vehicle Model</label>
                  <input
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="minimal-input w-full text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                    placeholder="e.g. Porsche 911 (992)"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Location</label>
                  <div className="flex items-center gap-2">
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="minimal-input flex-1 text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                      placeholder="Central London"
                      type="text"
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={addressLoading}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-[#362b2b] rounded-lg hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      title="Use my current location"
                    >
                      {addressLoading ? (
                        <div className="w-4 h-4 border-2 border-[#a12b2b] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <MdMyLocation className="text-[#a12b2b] group-hover:text-white transition-colors" />
                      )}
                      <span className="text-xs font-medium text-[#b5a1a1] group-hover:text-white transition-colors hidden sm:inline">
                        {addressLoading ? 'Locating...' : 'Auto-fill'}
                      </span>
                    </button>
                  </div>
                  {addressError && (
                    <p className="text-[#a12b2b] text-xs mt-1">{addressError}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Contact Number</label>
                  <input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="minimal-input w-full text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                    placeholder="+44 7000 000000"
                    type="tel"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="border-b border-[#362b2b] pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MdCalendarToday className="text-[#a12b2b]" />
                  <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Schedule Appointment</h3>
                </div>
                <p className="text-[#b5a1a1] text-xs font-light leading-relaxed ml-8">
                  Book your appointment now and pay on-site after service completion. No payment required upfront.
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg p-6">
                <p className="text-[#b5a1a1] text-xs mb-4">
                  Fill in your details above, then use the calendar below to pick a date and time that works for you.
                </p>
                <div
                  className="calendly-inline-widget"
                  data-url={calendlyUrl}
                  style={{ minWidth: '320px', height: '700px' }}
                />
                <p className="text-[#b5a1a1] text-[10px] mt-4 text-center">
                  Scheduling is handled securely by Calendly. You'll receive an email confirmation after booking.
                </p>
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

