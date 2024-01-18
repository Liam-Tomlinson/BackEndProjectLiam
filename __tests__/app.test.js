const request = require("supertest");
const db = require("../db/connection");
const { app } = require("../app");
const data = require('../db/data/test-data')
const seed = require("../db/seeds/seed");
const endpoints = require('../endpoints.json');

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


describe('GET /api/articles/:article_id', () => {
  test('status:200, responds wth correct status', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200);    
  })
  test('Checks that endpoint responds with correct data', () => {
    return request(app)
    .get('/api/articles/1').then(({body}) => 
    {
      expect(typeof body).toEqual("object")
      expect(body.data[0].article_id).toBe(1)
      expect(body.data[0].title).toBe("Living in the shadow of a great man")
      expect(body.data[0].topic).toBe("mitch")
      expect(body.data[0].author).toBe("butter_bridge")
      expect(body.data[0].created_at).toBe("2020-07-09T20:11:00.000Z")    
      expect(body.data[0].votes).toBe(100) 
      expect(body.data[0].article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700') 
      
    })
  })
  test('Status:404, responds with correct status', () => {
    return request(app)
    .get('/api/articles/500')
    .expect(404)
  })
  test('Check correct 404 error message is sent', () => {
    return request(app)
    .get('/api/articles/500').then(({body}) =>
    {
      expect(body.data).toEqual("Status: 404, endpoint not found")
    })
  })
})


describe('CORE: GET /api/articles', () => {
  test('status:200, responds wth correct status', () => {
    return request(app)
      .get('/api/articles')
      .expect(200);    
})
test('Checks endpoint responds with the correct data', () => {
  return request(app)
  .get('/api/articles').then(({body}) => 
  {
    expect(typeof body).toEqual('object')
    expect(body.data[0].article_id).toBe(7)
    expect(body.data[0].title).toBe('Z')
    expect(body.data[0].topic).toBe('mitch')
    expect(body.data[0].author).toBe('icellusedkars')
    expect(body.data[0].created_at).toBe('2020-01-07T14:08:00.000Z')
    expect(body.data[0].votes).toBe(0)
    expect(body.data[0].article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',)
    expect(body.data[0].comment_count).toBe(0)
  })
})
test('status: 404, responds with the correct status', () => {
  return request(app)
  .get('/api/articlessss')
  .expect(404)
})
})


describe('GET /api/articles/:article_id/comments', () => 
{
  test('status:200, responds wth correct status', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200);    
})
test('check endpoint responds with the correct data', () => {
  return request(app)
  .get('/api/articles/1/comments').then(({body}) => 
  {
    console.log(body)
    expect(typeof body).toEqual('object')
    expect(body.data[0].comment_id).toBe(5)
    expect(body.data[0].body).toBe('I hate streaming noses')
    expect(body.data[0].article_id).toBe(1)
    expect(body.data[0].author).toBe('icellusedkars')
    expect(body.data[0].votes).toBe(0)
    expect(body.data[0].created_at).toBe('2020-11-03T21:00:00.000Z')
    
  })
})
test('status:404, responds with correct status', () => {
  return request(app)
  .get('/api/articles/500/comments')
  .expect(404)
})

})




