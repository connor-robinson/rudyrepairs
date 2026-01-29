import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdExpandMore, MdLock, MdContactless, MdCreditCard, MdLocationOn, MdMyLocation } from 'react-icons/md';

function Checkout() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [location, setLocation] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [selectedService, setSelectedService] = useState({
    name: "Oil Change & Filter",
    description: "Premium Synthetic Oil & Filter",
    price: "£89.00"
  });

  const services = [
    {
      name: "Oil Change & Filter",
      description: "Premium synthetic service",
      price: "£89.00"
    },
    {
      name: "Full Vehicle Diagnostics",
      description: "Comprehensive ECU scan",
      price: "£120.00"
    },
    {
      name: "Brake Pad Replacement",
      description: "Front or rear ceramic pads",
      price: "£145.00"
    },
    {
      name: "Annual Performance Tune",
      description: "Full system optimization",
      price: "£299.00"
    }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService({
      name: service.name,
      description: service.description === "Premium synthetic service" ? "Premium Synthetic Oil & Filter" : service.description,
      price: service.price
    });
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

  // Get user's location and reverse geocode to address
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    setLocationError('');

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
          const address = data.address;
          let formattedAddress = '';
          
          if (address.road) formattedAddress += address.road;
          if (address.city || address.town || address.village) {
            if (formattedAddress) formattedAddress += ', ';
            formattedAddress += address.city || address.town || address.village;
          }
          if (address.county && !formattedAddress.includes(address.county)) {
            if (formattedAddress) formattedAddress += ', ';
            formattedAddress += address.county;
          }
          if (address.postcode) {
            if (formattedAddress) formattedAddress += ` ${address.postcode}`;
            else formattedAddress = address.postcode;
          }

          setLocation(formattedAddress || data.display_name || 'Location found');
          setLocationLoading(false);
        } catch (error) {
          console.error('Geocoding error:', error);
          setLocationError('Could not determine address. Please enter manually.');
          setLocationLoading(false);
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
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

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
                  <div className="space-y-1">
                    <h1 className="text-white text-3xl md:text-4xl font-light leading-tight tracking-tight">{selectedService.name}</h1>
                    <p className="text-[#b5a1a1] text-sm font-light">{selectedService.description}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-white text-2xl font-normal">{selectedService.price}</p>
                    <MdExpandMore className={`text-[#b5a1a1] group-hover:text-white transition-all transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 w-full z-20 bg-[#121212] border border-[#362b2b] rounded-b-lg shadow-2xl overflow-hidden transition-all">
                    <div className="max-h-[400px] overflow-y-auto">
                      {services.map((service, index) => (
                        <button
                          key={index}
                          className={`w-full text-left p-6 ${index < services.length - 1 ? 'border-b border-[#362b2b]/50' : ''} ${selectedService.name === service.name ? 'bg-[#a12b2b]/10' : 'hover:bg-white/5'} flex justify-between items-center group transition-all`}
                          onClick={() => handleServiceSelect(service)}
                        >
                          <div>
                            <p className="text-white text-lg font-medium">{service.name}</p>
                            <p className="text-[#b5a1a1] text-xs">{service.description}</p>
                          </div>
                          <p className="text-white font-bold">{service.price}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-12">
              <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase border-b border-[#362b2b] pb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Name</label>
                  <input
                    className="minimal-input w-full text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                    placeholder="Johnathan Doe"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Vehicle Model</label>
                  <input
                    className="minimal-input w-full text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                    placeholder="e.g. Porsche 911 (992)"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Location</label>
                  <div className="flex items-center gap-2">
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="minimal-input flex-1 text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                      placeholder="Central London"
                      type="text"
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={locationLoading}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-[#362b2b] rounded-lg hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      title="Use my current location"
                    >
                      {locationLoading ? (
                        <div className="w-4 h-4 border-2 border-[#a12b2b] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <MdMyLocation className="text-[#a12b2b] group-hover:text-white transition-colors" />
                      )}
                      <span className="text-xs font-medium text-[#b5a1a1] group-hover:text-white transition-colors hidden sm:inline">
                        {locationLoading ? 'Locating...' : 'Auto-fill'}
                      </span>
                    </button>
                  </div>
                  {locationError && (
                    <p className="text-[#a12b2b] text-xs mt-1">{locationError}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Contact Number</label>
                  <input
                    className="minimal-input w-full text-white placeholder:text-[#362b2b] py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b border-[#362b2b] rounded-none px-0 focus:outline-none focus:border-[#a12b2b] transition-colors"
                    placeholder="+44 7000 000000"
                    type="tel"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex justify-between items-center border-b border-[#362b2b] pb-4">
                <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Payment Method</h3>
                <div className="flex items-center gap-2 text-[#b5a1a1]">
                  <MdLock className="text-sm" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Secure Encryption</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 border border-[#362b2b] rounded-lg py-4 hover:bg-white/5 transition-all group">
                  <MdContactless className="text-white group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Apple Pay</span>
                </button>
                <button className="flex items-center justify-center gap-3 border border-[#362b2b] rounded-lg py-4 hover:bg-white/5 transition-all group">
                  <MdCreditCard className="text-white group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Credit Card</span>
                </button>
              </div>
            </section>

            <section className="pt-8 space-y-6">
              <button className="w-full bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white py-5 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all shadow-lg shadow-[#a12b2b]/20 active:scale-[0.98]">
                Confirm Order
              </button>
              <p className="text-center text-[#b5a1a1] text-[10px] font-light leading-relaxed">
                By confirming this order, you agree to Rudy's Repair{' '}
                <a className="underline hover:text-white transition-colors" href="#">Terms of Service</a> and{' '}
                <a className="underline hover:text-white transition-colors" href="#">Privacy Policy</a>. Payment will be processed securely.
              </p>
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

