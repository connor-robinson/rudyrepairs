import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Circle, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import { MdLocationOn, MdCheckCircle, MdCancel, MdSearch, MdMyLocation } from 'react-icons/md';

// Service center: Abingdon, Oxfordshire, UK
const DEFAULT_CENTER = {
  lat: 51.6711, // Abingdon coordinates
  lng: -1.2828
};

const SERVICE_RADIUS_MILES = 20;
const SERVICE_RADIUS_METERS = SERVICE_RADIUS_MILES * 1609.34; // Convert miles to meters

// Static libraries array for LoadScript (must be outside component to prevent reloads)
const LIBRARIES = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem'
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  draggable: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  gestureHandling: 'auto',
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#1a1a1a' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#b5a1a1' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#0f0f0f' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#2a2a2a' }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#1a1a1a' }]
    }
  ]
};

function ServiceArea() {
  const [address, setAddress] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [isInServiceArea, setIsInServiceArea] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState('');
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const geocoderRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const onMapLoad = useCallback((map) => {
    setMap(map);
    // Initialize geocoder when map loads
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, []);

  const onAutocompleteLoad = useCallback((autocomplete) => {
    setAutocomplete(autocomplete);
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (!autocomplete || !window.google || !window.google.maps) {
      return;
    }

    try {
      const place = autocomplete.getPlace();
      if (!place) {
        return;
      }

      if (place.formatted_address) {
        setAddress(place.formatted_address);
        // Automatically check coverage when a place is selected
        // Use the address directly for geocoding
        if (place.geometry && place.geometry.location) {
          const userLat = typeof place.geometry.location.lat === 'function' 
            ? place.geometry.location.lat() 
            : place.geometry.location.lat;
          const userLng = typeof place.geometry.location.lng === 'function' 
            ? place.geometry.location.lng() 
            : place.geometry.location.lng;
          
          if (!isNaN(userLat) && !isNaN(userLng)) {
            const calculatedDistance = calculateDistance(
              DEFAULT_CENTER.lat,
              DEFAULT_CENTER.lng,
              userLat,
              userLng
            );

            setUserLocation({ lat: userLat, lng: userLng });
            setDistance(calculatedDistance);
            setIsInServiceArea(calculatedDistance <= SERVICE_RADIUS_MILES);
            setLoading(false);

            // Center map on user location
            if (map) {
              map.setCenter({ lat: userLat, lng: userLng });
              map.setZoom(11);
            }
          } else {
            // Fallback to geocoding if coordinates are invalid
            setTimeout(() => {
              handleCheckAddress(place.formatted_address);
            }, 100);
          }
        } else {
          // Fallback to geocoding if geometry not available
          setTimeout(() => {
            handleCheckAddress(place.formatted_address);
          }, 100);
        }
      } else if (place.name) {
        setAddress(place.name);
        setTimeout(() => {
          handleCheckAddress(place.name);
        }, 100);
      }
    } catch (error) {
      console.error('Error processing place:', error);
      setError('Error processing selected location. Please try again.');
    }
  }, [autocomplete, map]);

  // Check if Google Maps geocoding is available
  const isGeocodingAvailable = () => {
    return (
      window.google &&
      window.google.maps &&
      window.google.maps.Geocoder &&
      (geocoderRef.current || window.google.maps.Geocoder)
    );
  };

  const handleCheckAddress = async (addressToCheck = null) => {
    const addressToUse = addressToCheck || address;
    if (!addressToUse.trim()) {
      setError('Please enter an address');
      return;
    }

    // Check if Google Maps geocoding is available
    if (!isGeocodingAvailable()) {
      setError('Google Maps is not loaded. Please wait a moment and try again.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    setUserLocation(null);
    setIsInServiceArea(null);
    setDistance(null);

    try {
      // Ensure geocoder is initialized
      if (!geocoderRef.current) {
        if (window.google && window.google.maps && window.google.maps.Geocoder) {
          geocoderRef.current = new window.google.maps.Geocoder();
        } else {
          setError('Google Maps geocoding is not available. Please check your API key.');
          setLoading(false);
          return;
        }
      }

      // Verify geocoder exists before using it
      if (!geocoderRef.current) {
        setError('Geocoding service is not available. Please refresh the page.');
        setLoading(false);
        return;
      }

      geocoderRef.current.geocode(
        { address: addressToUse },
        (results, status) => {
          setLoading(false);
          
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            
            // Verify location exists before proceeding
            if (!location) {
              setError('Could not determine coordinates for that address.');
              return;
            }

            const userLat = location.lat();
            const userLng = location.lng();

            // Verify coordinates are valid numbers
            if (isNaN(userLat) || isNaN(userLng)) {
              setError('Invalid location coordinates. Please try a different address.');
              return;
            }

            // Only calculate distance if geocoding was successful
            const calculatedDistance = calculateDistance(
              DEFAULT_CENTER.lat,
              DEFAULT_CENTER.lng,
              userLat,
              userLng
            );

            setUserLocation({ lat: userLat, lng: userLng });
            setDistance(calculatedDistance);
            setIsInServiceArea(calculatedDistance <= SERVICE_RADIUS_MILES);

            // Center map on user location
            if (map) {
              map.setCenter({ lat: userLat, lng: userLng });
              map.setZoom(11);
            }
          } else if (status === 'ZERO_RESULTS') {
            setError('Could not find that address. Please try a more specific address.');
          } else if (status === 'OVER_QUERY_LIMIT') {
            setError('Too many requests. Please try again in a moment.');
          } else if (status === 'REQUEST_DENIED') {
            setError('Geocoding request denied. Please check your Google Maps API key.');
          } else if (status === 'INVALID_REQUEST') {
            setError('Invalid address. Please check your input and try again.');
          } else {
            setError('Could not find that address. Please try a more specific address.');
          }
        }
      );
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('An error occurred while checking your address. Please try again.');
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheckAddress();
    }
  };

  // Get user's current location and auto-fill address
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    setError('');

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

          const finalAddress = formattedAddress || data.display_name || 'Location found';
          setAddress(finalAddress);
          setLocationLoading(false);
          
          // Automatically check coverage after getting location
          handleCheckAddress(finalAddress);
        } catch (error) {
          console.error('Geocoding error:', error);
          setError('Could not determine address. Please enter manually.');
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
        setError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // You'll need to add your Google Maps API key here
  // Create a .env file in the root directory and add: VITE_GOOGLE_MAPS_API_KEY=your_key_here
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const hasApiKey = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== '';

  return (
    <section className="py-16 bg-[#121212] border-b border-[#362b2b]/50" id="location">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="mb-12">
          <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.2em] uppercase mb-4">Service Area</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
            Our <span className="text-[#a12b2b]">Location</span>
          </h2>
          <p className="text-[#b5a1a1] text-sm font-light max-w-2xl">
            We service customers within a 20-mile radius of Abingdon, Oxfordshire. Explore the map to see our coverage area, or enter your address below to check if we cover your area.
          </p>
        </div>

        <div className="border border-[#362b2b] rounded-lg overflow-hidden mb-8">
          {!hasApiKey ? (
            <div className="h-[500px] flex items-center justify-center bg-[#1a1a1a]">
              <div className="text-center px-6">
                <p className="text-[#b5a1a1] mb-4">Google Maps API key required</p>
                <p className="text-sm text-[#b5a1a1] mb-2">
                  Add your Google Maps API key to <code className="bg-[#121212] px-2 py-1 rounded-lg text-xs border border-[#362b2b]">VITE_GOOGLE_MAPS_API_KEY</code> in your <code className="bg-[#121212] px-2 py-1 rounded-lg text-xs border border-[#362b2b]">.env</code> file
                </p>
                <p className="text-xs text-[#b5a1a1] mt-4">
                  Get your API key from{' '}
                  <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-[#a12b2b] hover:underline">
                    Google Cloud Console
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <LoadScript 
              googleMapsApiKey={GOOGLE_MAPS_API_KEY}
              libraries={LIBRARIES}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={DEFAULT_CENTER}
                zoom={11}
                options={mapOptions}
                onLoad={onMapLoad}
              >
                {/* Service area circle - 20 mile radius around Abingdon */}
                <Circle
                  center={DEFAULT_CENTER}
                  radius={SERVICE_RADIUS_METERS}
                  options={{
                    fillColor: '#E11D48',
                    fillOpacity: 0.15,
                    strokeColor: '#E11D48',
                    strokeOpacity: 0.9,
                    strokeWeight: 3,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    zIndex: 1
                  }}
                />

                {/* Service center marker - Abingdon */}
                {window.google?.maps && (
                  <Marker
                    position={DEFAULT_CENTER}
                    title="Rudy's Repair - Abingdon Service Center"
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="24" cy="24" r="20" fill="#E11D48" stroke="#fff" stroke-width="3"/>
                          <path d="M24 12 L24 36 M12 24 L36 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
                          <circle cx="24" cy="24" r="8" fill="white"/>
                        </svg>
                      `),
                      scaledSize: new window.google.maps.Size(48, 48),
                      anchor: new window.google.maps.Point(24, 24)
                    }}
                  />
                )}

                {/* User location marker */}
                {userLocation && window.google?.maps && (
                  <Marker
                    position={userLocation}
                    title={`Your Location - ${distance ? distance.toFixed(1) + ' miles from Abingdon' : ''}`}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="18" cy="18" r="16" fill="${isInServiceArea ? '#10b981' : '#E11D48'}" stroke="#fff" stroke-width="2"/>
                          <circle cx="18" cy="18" r="8" fill="white"/>
                        </svg>
                      `),
                      scaledSize: new window.google.maps.Size(36, 36),
                      anchor: new window.google.maps.Point(18, 18)
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          )}
        </div>

        <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-[#b5a1a1]">
            <span className="inline-block w-4 h-4 rounded-full bg-[#a12b2b]/20 border-2 border-[#a12b2b]"></span>
            <span>20-mile service radius</span>
          </div>
          <div className="flex items-center gap-2 text-[#b5a1a1]">
            <span className="inline-block w-4 h-4 rounded-full bg-[#a12b2b] mr-2"></span>
            <span>Abingdon Service Center</span>
          </div>
          {userLocation && (
            <div className="flex items-center gap-2 text-[#b5a1a1]">
              <span className={`inline-block w-4 h-4 rounded-full ${isInServiceArea ? 'bg-green-500' : 'bg-[#a12b2b]'} mr-2`}></span>
              <span>Your Location</span>
            </div>
          )}
        </div>

        <div className="border border-[#362b2b] rounded-lg p-8 md:p-12 bg-[#1a1a1a]">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              {hasApiKey && window.google?.maps?.places ? (
                <Autocomplete
                  onLoad={onAutocompleteLoad}
                  onPlaceChanged={onPlaceChanged}
                  options={{
                    componentRestrictions: { country: 'gb' }, // Restrict to UK
                    fields: ['formatted_address', 'geometry', 'name'],
                    types: ['address', 'establishment', 'geocode']
                  }}
                >
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your address (e.g., Abingdon, Oxfordshire)"
                    className="w-full bg-[#121212] border border-[#362b2b] text-white px-6 py-4 pr-24 rounded-lg focus:outline-none focus:border-[#a12b2b] transition-colors placeholder:text-[#362b2b]"
                  />
                </Autocomplete>
              ) : (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your address (e.g., Abingdon, Oxfordshire)"
                  className="w-full bg-[#121212] border border-[#362b2b] text-white px-6 py-4 pr-24 rounded-lg focus:outline-none focus:border-[#a12b2b] transition-colors placeholder:text-[#362b2b]"
                />
              )}
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={locationLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 border border-[#362b2b] hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-lg z-10"
                title="Use my current location"
              >
                {locationLoading ? (
                  <div className="w-5 h-5 border-2 border-[#a12b2b] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <MdMyLocation className="text-[#a12b2b] text-xl" />
                )}
              </button>
            </div>
            <button
              onClick={handleCheckAddress}
              disabled={loading || locationLoading}
              className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-8 py-4 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <MdSearch className="text-xl" />
                  <span>Check Coverage</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-[#a12b2b]/10 border border-[#a12b2b]/30 text-[#a12b2b] px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
              <MdCancel className="text-xl flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {isInServiceArea !== null && (
            <div className={`px-6 py-4 rounded-lg mb-6 flex items-center gap-3 ${
              isInServiceArea
                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                : 'bg-[#a12b2b]/10 border border-[#a12b2b]/30 text-[#a12b2b]'
            }`}>
              {isInServiceArea ? (
                <>
                  <MdCheckCircle className="text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg mb-1">We service your area!</p>
                    <p className="text-sm opacity-90">
                      You're {distance.toFixed(1)} miles away. We can come to you!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <MdCancel className="text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg mb-1">Outside service area</p>
                    <p className="text-sm opacity-90">
                      You're {distance.toFixed(1)} miles away. We currently service within 20 miles. Please contact us to discuss options.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ServiceArea;

