/* eslint-disable no-console */

import request from 'supertest';
import mongoose from 'mongoose';
import server from '../api';

// As per #997 attempted unmocking modules
// but this has not addressed the issue either.
// https://github.com/facebook/jest/issues/977
jest
  .unmock('supertest')
  .unmock('mongoose')
  .unmock('../api');

describe('Looking for answers....', () => {
  test('Testing addTodo', async () => {
    try {
      // FYI: request(server) returns as an object
      // I await the promise of the request being made to the server.
      const { body, status } = await request(server).post('/api/v1/new-todo').send({ text: 'Figure this out!' });
      expect(status).toEqual(201);
      expect(body).toHaveProperty('text');
      expect(body).toHaveProperty('_id');
      expect(body.text).toEqual('Figure this out!');
    } catch (error) {
      console.log(`
        You did something wrong dummy!
        ${error}
      `);
      throw error;
    }
  });
  afterEach(async () => {
    try {
      const { todos } = mongoose.connection.collections;
      // Collection is being dropped.
      await todos.drop();
      // Definitely is closing the server.
      // Running ps | grep node there are no processes open
      // pertaining to the server.
      await server.close();
    } catch (error) {
      console.log(`
        You did something wrong dummy!
        ${error}
      `);
      throw error;
    }
  });
});

