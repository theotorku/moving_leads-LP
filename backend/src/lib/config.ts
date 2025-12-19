import dotenv from 'dotenv';

dotenv.config();

type NodeEnv = 'development' | 'test' | 'production';

type EnvVarOptions = {
  required?: boolean;
  defaultValue?: string;
};

function getEnvVar(name: string, options: EnvVarOptions = {}): string {
  const value = process.env[name] ?? options.defaultValue;

  if (options.required && (value === undefined || value === '')) {
    throw new Error(`Environment variable ${name} is required but was not provided`);
  }

  return value ?? '';
}

const rawNodeEnv = process.env.NODE_ENV ?? 'development';
const allowedEnvs: NodeEnv[] = ['development', 'test', 'production'];
const nodeEnv: NodeEnv = (allowedEnvs.includes(rawNodeEnv as NodeEnv)
  ? (rawNodeEnv as NodeEnv)
  : 'development');

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3001;

export const config = {
	  nodeEnv,
	  isProduction: nodeEnv === 'production',
	  port: Number.isFinite(port) ? port : 3001,
	  // In production we require a valid DATABASE_URL. In development/test, allow it to be unset
	  // so the app can run without a DB (e.g. for /health checks).
	  databaseUrl: getEnvVar('DATABASE_URL', { required: nodeEnv === 'production' }),
	  // ADMIN_API_KEY is required in production for admin endpoints, but tests and local
	  // development can run without it.
	  adminApiKey: getEnvVar('ADMIN_API_KEY', { required: nodeEnv === 'production' }),
	  frontendUrl: getEnvVar('FRONTEND_URL', { defaultValue: 'http://localhost:5174' }),
	  emailFrom: getEnvVar('EMAIL_FROM', { defaultValue: 'MovingLead <noreply@movinglead.com>' }),
	  adminEmail: process.env.ADMIN_EMAIL,
	  smtp: {
	    host: process.env.SMTP_HOST,
	    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
	    secure: process.env.SMTP_SECURE === 'true',
	    user: process.env.SMTP_USER,
	    pass: process.env.SMTP_PASS,
	  },
	} as const;

