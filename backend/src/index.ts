import express, { Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import leadRoutes from './routes/leads';
import { errorHandler } from './middleware/errorHandler';
import { config } from './lib/config';

export const app = express();
const PORT = config.port;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limit for lead submission
const createLeadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 account creations per hour
  message: 'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware
app.use(limiter);
app.use(cors({
	  origin: config.frontendUrl,
	  credentials: true
	}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply strict limit to lead creation
app.use('/api/leads', (req, res, next) => {
  if (req.method === 'POST') {
    createLeadLimiter(req, res, next);
  } else {
    next();
  }
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/leads', leadRoutes);

// Error handling
app.use(errorHandler);

// Start server only when this module is executed directly (not when imported by tests)
if (require.main === module) {
	  const server = app.listen(PORT, () => {
	    console.log(`🚀 Server running on http://localhost:${PORT}`);
	    console.log(`📊 Environment: ${config.nodeEnv}`);
	  });

	  // Graceful shutdown
	  process.on('SIGTERM', () => {
	    console.log('SIGTERM signal received: closing HTTP server');
	    server.close(() => {
	      console.log('HTTP server closed');
	      process.exit(0);
	    });
	  });
}

