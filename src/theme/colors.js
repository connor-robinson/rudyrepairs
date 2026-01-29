// Centralized color configuration
// Update these values to change colors across the entire application

export const colors = {
  primary: "#E11D48",        // Vibrant Red - main brand color
  accent: "#F43F5E",          // Lighter red for hover states
  "dark-matte": "#0F0F0F",    // Main dark background
  "dark-charcoal": "#1A1A1A", // Secondary dark background
};

// CSS variables for use in CSS files
export const cssVariables = {
  "--primary-red": colors.primary,
  "--dark-bg": colors["dark-matte"],
};

// Export for use in Tailwind config (already configured in tailwind.config.js)
export default colors;

