import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

describe('Swagger UI Integration Tests', () => {
  it('should redirect /api-docs to /api-docs/ (with trailing slash)', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.status).toBe(301);
    expect(response.headers.location).toBe('/api-docs/');
  });

  it('should serve Swagger UI HTML on /api-docs/', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('html');
    expect(response.text).toContain('swagger-ui');
  });

  it('should return 404 for missing static assets on /api-docs/', async () => {
    const response = await request(app).get('/api-docs/non-existent-file.js');
    expect(response.status).toBe(404);
  });
});
