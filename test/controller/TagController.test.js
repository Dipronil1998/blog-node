const request = require('supertest');
const app = require('../../config/app');

describe('POST /tag', () => {
  test('Create a Tag', async () => {
    const response = await request(app).post('/tag').send({
      name: 'testTag',
    });
    expect(response.status).toEqual(401);
    expect(response.status).not.toEqual(201);
  });
});
