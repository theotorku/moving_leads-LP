import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { leads } from '../db/schema';
import { eq } from 'drizzle-orm';
import { validateEmail } from '../utils/validation';
import { sendWelcomeEmail } from '../services/emailService';
import { requireApiKey } from '../middleware/authMiddleware';

const router = Router();

// Create a new lead (from landing page signup)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received POST request to /api/leads');
    console.log('Request body:', req.body);

    const { email, name, company, phone } = req.body;

    // Validate email
    if (!email || !validateEmail(email)) {
      console.log('Email validation failed');
      return res.status(400).json({
        success: false,
        error: 'Valid email is required'
      });
    }

    console.log('Checking for existing lead...');
    // Check if lead already exists
    const existingLeads = await db.select().from(leads).where(eq(leads.email, email));
    const existingLead = existingLeads[0];

    if (existingLead) {
      console.log('Lead already exists');
      return res.status(409).json({
        success: false,
        error: 'This email is already registered'
      });
    }

    console.log('Creating new lead...');
    // Create new lead
    const [lead] = await db.insert(leads).values({
      email,
      name: name || null,
      company: company || null,
      phone: phone || null,
      source: 'landing_page',
      status: 'new'
    }).returning();

    console.log('Lead created:', lead);

    // Send welcome email (async, don't wait)
    sendWelcomeEmail(email, name).catch(err => {
      console.error('Failed to send welcome email:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Successfully registered for free trial!',
      data: {
        id: lead.id,
        email: lead.email
      }
    });
	  } catch (error) {
	    console.error('Error creating lead:', error);
	    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
	    return next(error);
	  }
});

// Get all leads (admin endpoint - protected)
router.get('/', requireApiKey, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const limitNum = Number(limit);

    let allLeads;

    if (status) {
      allLeads = await db.select().from(leads).where(eq(leads.status, String(status)));
    } else {
      allLeads = await db.select().from(leads);
    }

    const total = allLeads.length;
    const paginatedLeads = allLeads.slice(offset, offset + limitNum);

    res.json({
      success: true,
      data: paginatedLeads,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
	  } catch (error) {
	    console.error('Error fetching leads:', error);
	    return next(error);
	  }
});

// Get lead stats (protected)
router.get('/stats', requireApiKey, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gte, count, sql } = await import('drizzle-orm');

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Get total leads
    const [totalResult] = await db.select({ value: count() }).from(leads);
    const total = totalResult.value;

    // Get today's leads
    const [todayResult] = await db.select({ value: count() })
      .from(leads)
      .where(gte(leads.createdAt, todayStart));
    const today = todayResult.value;

    // Get this week's leads
    const [weekResult] = await db.select({ value: count() })
      .from(leads)
      .where(gte(leads.createdAt, weekAgo));
    const thisWeek = weekResult.value;

    res.json({
      success: true,
      data: {
        total,
        today,
        thisWeek
      }
    });
	  } catch (error) {
	    console.error('Error fetching stats:', error);
	    return next(error);
	  }
});

export default router;

