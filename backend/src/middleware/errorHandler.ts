import { Request, Response, NextFunction } from 'express';

export function errorHandler(
	  err: unknown,
	  req: Request,
	  res: Response,
	  next: NextFunction
	) {
	  const error = err instanceof Error ? err : new Error('Unknown error');

	  console.error('=== ERROR HANDLER ===');
	  console.error('Error name:', error.name);
	  console.error('Error message:', error.message);
	  console.error('Error stack:', error.stack);
	  console.error('Request path:', req.path);
	  console.error('Request method:', req.method);
	  if (process.env.NODE_ENV !== 'production') {
	    console.error('Request body:', req.body);
	  }
	  console.error('=== END ERROR ===');

	  // Validation errors
	  if (error.name === 'ValidationError') {
	    return res.status(400).json({
	      success: false,
	      error: error.message
	    });
	  }

	  const isProduction = process.env.NODE_ENV === 'production';

	  // Default error - include message in development
	  res.status(500).json({
	    success: false,
	    error: isProduction ? 'Internal server error' : error.message || 'Internal server error'
	  });
	}

