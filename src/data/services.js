// Shared services data used across components
export const services = [
  {
    id: 1,
    name: "Engine Oil & Filter Change",
    description: "Premium synthetic oil and new filter replacement",
    price: 58,
    originalPrice: 80,
    orderable: true
  },
  {
    id: 2,
    name: "Brake Fluid Flush & Bleed",
    description: "Complete brake fluid system flush and bleed",
    price: 65,
    orderable: true
  },
  {
    id: 3,
    name: "Coolant System Flush",
    description: "Full cooling system flush and refill",
    price: 70,
    orderable: true
  },
  {
    id: 4,
    name: "Clutch Fluid Service",
    description: "Clutch fluid replacement and system check",
    price: 55,
    orderable: true
  },
  {
    id: 5,
    name: "Transmission Fluid Change",
    description: "Transmission fluid drain and refill",
    price: 95,
    orderable: true
  },
  {
    id: 6,
    name: "Brake Pad Fitting (per axle)",
    description: "Brake pad replacement for front or rear axle",
    price: 65,
    orderable: true
  },
  {
    id: 7,
    name: "Brake and Rotor Fitting (per axle)",
    description: "Brake pad and rotor replacement for front or rear axle",
    price: 110,
    orderable: true
  },
  {
    id: 8,
    name: "Windshield Washer Top-up",
    description: "FREE with any service",
    price: 0,
    orderable: false
  }
];

export const formatPrice = (price) => {
  if (price === 0) return 'FREE';
  return `£${Number(price).toFixed(2)}`;
};
