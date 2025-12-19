import { Request, Response, NextFunction } from 'express';
import { config } from '../lib/config';

export const requireApiKey = (req: Request, res: Response, next: NextFunction) => {
	    const apiKeyHeader = req.headers['x-api-key'];
	    const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

	    if (!config.adminApiKey) {
	        console.error('ADMIN_API_KEY not configured in environment variables');
	        return res.status(500).json({
	            success: false,
	            error: 'Server configuration error'
	        });
	    }

	    if (!apiKey) {
	        return res.status(401).json({
	            success: false,
	            error: 'API key required. Include X-API-Key header.'
	        });
	    }

	    if (apiKey !== config.adminApiKey) {
	        return res.status(403).json({
	            success: false,
	            error: 'Invalid API key'
	        });
	    }

	    next();
	};
