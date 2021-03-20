const { response } = require('express');
const request = require('supertest');
const server = require('../app');


test('It should respond', async () => {
  await request(server.app).get('/api/product/1').then((response) => {
    expect(response.body).toBeDefined();
  });
});

test('It should respond properly to an invalid query', async () => {
  await request(server.app).get('/api/product/101').then((response) => {
    expect(response.status).toBe(404);
  });
  await request(server.app).get('/api/product/-1').then((response) => {
    expect(response.status).toBe(404);
  });
});