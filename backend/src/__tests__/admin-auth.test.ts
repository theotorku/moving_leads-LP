import { test } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import type { AddressInfo } from 'node:net';

// Lazily import the app after configuring env so that config/adminApiKey is set correctly
async function getApp() {
	  process.env.NODE_ENV = 'test';
	  process.env.ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'test-admin-key';
	  const { app } = await import('../index');
	  return app;
}

// Helper to start the app on an ephemeral port and run a request
async function withServer<T>(
	  handler: (baseUrl: string) => Promise<T>
): Promise<T> {
	  const app = await getApp();
	  const server = app.listen(0);
	  const address = server.address() as AddressInfo;
	  const baseUrl = `http://127.0.0.1:${address.port}`;

	  try {
	    return await handler(baseUrl);
	  } finally {
	    server.close();
	  }
}

test('GET /api/leads without API key returns 401', async () => {
  await withServer((baseUrl) => {
    return new Promise<void>((resolve, reject) => {
      http
        .get(`${baseUrl}/api/leads`, (res) => {
          try {
            assert.strictEqual(res.statusCode, 401);
            resolve();
          } catch (err) {
            reject(err);
          }
        })
        .on('error', reject);
    });
  });
});

test('GET /api/leads with invalid API key returns 403', async () => {
  await withServer((baseUrl) => {
    return new Promise<void>((resolve, reject) => {
      const req = http.request(
        `${baseUrl}/api/leads`,
        {
          method: 'GET',
          headers: {
            'X-API-Key': 'wrong-key',
          },
        },
        (res) => {
          try {
            assert.strictEqual(res.statusCode, 403);
            resolve();
          } catch (err) {
            reject(err);
          }
        }
      );

      req.on('error', reject);
      req.end();
    });
  });
});

test('GET /api/leads/stats without API key returns 401', async () => {
  await withServer((baseUrl) => {
    return new Promise<void>((resolve, reject) => {
      http
        .get(`${baseUrl}/api/leads/stats`, (res) => {
          try {
            assert.strictEqual(res.statusCode, 401);
            resolve();
          } catch (err) {
            reject(err);
          }
        })
        .on('error', reject);
    });
  });
});

