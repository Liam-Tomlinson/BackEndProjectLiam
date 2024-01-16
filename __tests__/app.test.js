const request = require("supertest");
const db = require("../db/connection");
const { app } = require("../app");
const data = require('../db/data/test-data')
const seed = require("../db/seeds/seed");
const endpoints = require('../endpoints.json')

 beforeEach(() => {
      return seed(data);
    });
    afterAll(() => {
      return db.end();
    });


describe('GET /api/topics', () => {
    test('status:200, responds wth correct status', () => {
        return request(app)
          .get('/api/topics')
          .expect(200);    
    })
    test('checks that endpoint responds with the correct data', () => {
      return request(app)
      .get('/api/topics').then(({body}) => 
      {
        expect(typeof body.data[0]).toBe('object')
        expect(body.data.length).toBe(3)
      })
    })
    })


describe('GET /api', () => {
  test('status:200, responds with correct status', () => {
    return request(app)
    .get('/api')
    .expect(200)
  })
  test('checks that endpoint responds with correct JSON file', () => {
    return request(app)
    .get('/api').then(({body}) =>
    {
      expect(body).toEqual(endpoints)
      expect(typeof body).toEqual("object")
    })
})
})
   