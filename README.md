# MovingLead Landing Page

A modern, responsive landing page for AI-Scored Moving Leads built with React and Vite.

## Features

### 🎯 Hero Section
- Compelling headline: "AI-Scored Moving Leads That Actually Convert"
- Interactive dashboard preview showing lead scoring
- Key statistics (3.5x conversion, 60% time saved, $12K savings)
- Dual CTAs for trial signup and ROI calculation

### 💬 Social Proof
- 4 testimonials from beta testers
- Real results and metrics from actual users
- Trust badges showing platform statistics
- 5-star ratings and company information

### 🧮 ROI Calculator
- Interactive sliders for customization:
  - Monthly leads (20-500)
  - Average time per lead (5-60 minutes)
  - Hourly labor rate ($20-$150)
  - Current conversion rate (5-50%)
- Real-time calculation of:
  - Time saved
  - Labor cost savings
  - Additional revenue potential
  - Total monthly ROI

### 📢 Call-to-Action
- Email capture form for free trial
- Pricing card with feature list
- Trust indicators (14-day trial, no credit card, 24/7 support)
- 30-day money-back guarantee

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Smooth animations and transitions
- Modern gradient design system

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **TypeScript** - Type safety
- **CSS3** - Custom styling with CSS variables

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
movinglead-LP/
├── src/
│   ├── components/
│   │   ├── Hero.tsx          # Hero section with dashboard preview
│   │   ├── Testimonials.tsx  # Beta tester testimonials
│   │   ├── ROICalculator.tsx # Interactive ROI calculator
│   │   ├── CTA.tsx           # Call-to-action section
│   │   └── Footer.tsx        # Footer with links
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App entry point
│   └── style.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.ts            # Vite configuration
```

## Design System

### Colors
- Primary: Indigo (#6366f1)
- Secondary: Pink (#ec4899)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Background: Dark slate (#0f172a)

### Typography
- Font: Inter, system fonts
- Headings: 700 weight
- Body: 400 weight

## Customization

To customize the landing page:

1. **Update testimonials**: Edit `src/components/Testimonials.tsx`
2. **Modify ROI calculations**: Adjust formulas in `src/components/ROICalculator.tsx`
3. **Change colors**: Update CSS variables in `src/style.css`
4. **Update pricing**: Edit `src/components/CTA.tsx`

## License

MIT License - feel free to use this for your own projects!

