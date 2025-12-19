import { test } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import { app } from '../index';

test('GET /health returns ok status', async () => {
	  const server = app.listen(0);
	  const address = server.address() as AddressInfo;
	  const baseUrl = `http://127.0.0.1:${address.port}`;

	  try {
	    await new Promise<void>((resolve, reject) => {
	      http
	        .get(`${baseUrl}/health`, (res) => {
	          try {
	            assert.strictEqual(res.statusCode, 200);

	            let data = '';
	            res.on('data', (chunk) => {
	              data += chunk;
	            });

	            res.on('end', () => {
	              const body = JSON.parse(data);
	              assert.strictEqual(body.status, 'ok');
	              assert.ok(typeof body.timestamp === 'string');
	              resolve();
	            });
	          } catch (err) {
	            reject(err);
	          }
	        })
	        .on('error', reject);
	    });
	  } finally {
	    server.close();
	  }
});

