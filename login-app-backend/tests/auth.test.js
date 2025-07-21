const request = require('supertest');
const app = require('../server');

describe('POST /login', () => {
  it('should login successfully', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'hamda@mail.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
