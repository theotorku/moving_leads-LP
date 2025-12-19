# MovingLead Landing Page

A modern, full-stack landing page for AI-Scored Moving Leads built with React, Vite, and Node.js/Express backend.

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

### Frontend

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **TypeScript** - Type safety
- **CSS3** - Custom styling with CSS variables

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Drizzle ORM** - TypeScript-first ORM
- **PostgreSQL** - Primary database (e.g. Supabase)
- **Nodemailer** - Email service

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Frontend Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Backend Installation

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:

```bash
npm run db:migrate
```

5. Start the backend server:

```bash
# Development mode with hot reload
npm run dev

# Or production mode
npm run build
npm start
```

6. Backend runs on `http://localhost:3001`

### Build for Production

**Frontend:**

```bash
npm run build
```

The optimized files will be in the `dist` folder.

**Backend:**

```bash
cd backend
npm run build
```

The compiled files will be in the `backend/dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
movinglead-LP/
├── src/                      # Frontend source
│   ├── components/
│   │   ├── Hero.tsx          # Hero section with dashboard preview
│   │   ├── Testimonials.tsx  # Beta tester testimonials
│   │   ├── ROICalculator.tsx # Interactive ROI calculator
│   │   ├── CTA.tsx           # Call-to-action with form
│   │   └── Footer.tsx        # Footer with links
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App entry point
│   └── style.css             # Global styles
├── backend/                  # Backend source
│   ├── src/
│   │   ├── db/
│   │   │   ├── index.ts      # Database connection
│   │   │   └── schema.ts     # Drizzle schema definitions
│   │   ├── routes/
│   │   │   └── leads.ts      # Lead API endpoints
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   ├── services/
│   │   │   └── emailService.ts
│   │   └── index.ts          # Express server entry
│   ├── drizzle/              # Database migrations
│   └── package.json
├── index.html                # HTML template
├── package.json              # Frontend dependencies
└── vite.config.ts            # Vite configuration
```

## API Endpoints

### Health Check

- `GET /health` - Returns server status

### Leads

- `POST /api/leads` - Create a new lead
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "company": "Company Name"
  }
  ```
- `GET /api/leads` - List all leads (with pagination)
- `GET /api/leads/stats` - Get lead statistics

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

## Environment Variables

### Backend (`backend/.env`)

```env
# Server configuration
NODE_ENV=development
PORT=3001

# Database - PostgreSQL (e.g. Supabase)
DATABASE_URL=postgresql://postgres:your-password@your-project-ref.supabase.co:5432/postgres

# Admin authentication
ADMIN_API_KEY=your-secure-api-key-here

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5174

# Email configuration (optional, mainly for production)
EMAIL_FROM="MovingLead <noreply@movinglead.com>"
ADMIN_EMAIL=admin@movinglead.com

# SMTP settings (optional)
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=apikey
# SMTP_PASS=your-sendgrid-api-key
```

### Frontend (`.env` at repo root)

```env
# URL of the backend API that the frontend should call
VITE_API_URL=http://localhost:3001
```

## Deployment & Docker

### Backend container

A production-ready Dockerfile is provided at `backend/Dockerfile`.

Build and run the backend image:

```bash
# From the repository root
cd backend
docker build -t movinglead-backend .

# Example run (configure env vars for your environment)
docker run -p 3001:3001 \
  -e NODE_ENV=production \
  -e DATABASE_URL="postgresql://..." \
  -e ADMIN_API_KEY="your-secure-api-key" \
  -e FRONTEND_URL="https://your-frontend-domain" \
  --name movinglead-backend \
  movinglead-backend
```

### Frontend container

A multi-stage Dockerfile for the Vite React frontend lives at `Dockerfile` in the repo root.

Build and run the frontend image (served via Nginx on port 80):

```bash
# From the repository root
docker build -t movinglead-frontend .

# Example run (serves static files on port 80 inside the container)
docker run -p 8080:80 --name movinglead-frontend movinglead-frontend
```

In production, set `VITE_API_URL` at build time to point to your deployed backend, e.g.:

```bash
VITE_API_URL="https://api.yourdomain.com" npm run build
```

Then build your frontend Docker image from the pre-built `dist` folder or by re-running `docker build`.

## License

MIT License - feel free to use this for your own projects!
