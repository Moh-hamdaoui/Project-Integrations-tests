const request = require('supertest');
const app = require('../app');

describe('POST /login', () => {
  it('should login successfully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'hamda@gmail.com', password: '123456789' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
