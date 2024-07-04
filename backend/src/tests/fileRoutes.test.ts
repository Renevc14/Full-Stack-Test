import request from 'supertest';
import server from '../index';

afterAll(async () => {
  await server.close();
});

describe('POST /api/files', () => {
  it('should upload a CSV file', async () => {
    
    const res = await request(server)
      .post('/api/files')
      .attach('file', './data/data.csv');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('The file was uploaded successfully');
  });
});

describe('GET /api/users', () => {
  it('should search through CSV data', async () => {
    
    const res = await request(server)
      .get('/api/users?q=John');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
