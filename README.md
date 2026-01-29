# Rudy's Repair

A React application built with Vite, Tailwind CSS, and React Icons.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

- `src/components/` - React components (Header, Hero, WhyUs, Pricing, Reviews, FAQ, Footer, etc.)
- `src/theme/colors.js` - Centralized color configuration
- `tailwind.config.js` - Tailwind CSS configuration with custom colors
- `src/index.css` - Global styles and Tailwind directives

## Customization

### Colors

Colors are centralized in two locations for easy updates:

1. **`src/theme/colors.js`** - JavaScript/React color values
2. **`tailwind.config.js`** - Tailwind CSS color classes

To change colors across the entire site, update these files:
- Primary Red: `#E11D48`
- Accent: `#F43F5E`
- Dark Matte: `#0F0F0F`
- Dark Charcoal: `#1A1A1A`

### Icons

Icons are imported from `react-icons/md` (Material Design). To change icons, update the imports in each component file.

## Deployment

This project is configured to deploy to Vercel. Simply push to your repository and connect it to Vercel, or use the Vercel CLI:

```bash
vercel
```

