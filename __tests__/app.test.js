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


describe('GET /api/articles', () => {
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
test('check endpoint responds with the data inside comment', () => {
  return request(app)
  .get('/api/articles/1/comments').then(({body}) => 
  {
    expect(typeof body).toEqual('object')
    expect(body.comments[0].comment_id).toBe(5)
    expect(body.comments[0].body).toBe('I hate streaming noses')
    expect(body.comments[0].article_id).toBe(1)
    expect(body.comments[0].author).toBe('icellusedkars')
    expect(body.comments[0].votes).toBe(0)
    expect(body.comments[0].created_at).toBe('2020-11-03T21:00:00.000Z')
    
  })
})
for(let i = 0; i < 11; i++)
{
  test('Check endpoint responds with the correct comments', () => 
{
      return request(app)
  .get('/api/articles/1/comments').then(({body}) => 
    {
      expect(body.comments[i].article_id).toBe(1)
    })
})
}

test('status:404, responds with correct status', () => {
  return request(app)
  .get('/api/articles/500/comments')
  .expect(404)
})

test('checks correct error message is sent when article not found', () => {
  return request(app)
  .get('/api/articles/500/comments').then(({body}) => 
  {

  })

})

})


describe('POST /api/articles/:article_id/comments', () => 
{
  const newComment = {
    username: 'butter_bridge', 
    body: 'This is my amazing new comment',
   
  };
  const wrongComment = {
    username: 'butter_bridge', 
  };
  test('status:201, responds with correct status after posting a comment', () => {
    return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(201); 
  });

  test('Checks correct data is inserted into database', () => {
    return request(app)
    .post('/api/articles/1/comments')
    .send(newComment).then(({body}) => {
      expect(typeof body).toBe('object')
      expect(body[0].article_id).toBe(1)
      expect(body[0].body).toBe('This is my amazing new comment')
      expect(body[0].author).toBe('butter_bridge')
      expect(body[0].votes).toBe(0)
      expect(typeof body[0].created_at).toBe('string')
    })
  })

  test('status:404, responds with correct status', () => {
    return request(app)
    .post('/api/articles/500/comments')
    .send(newComment)
    .expect(404)
  })

  test('Checks error message is correct on 404 status', () => {
    return request(app)
    .post('/api/articles/500/comments')
    .send(newComment).then(({text}) => {
      expect(text).toBe('status: 404, article does not exisit')
    })
  })
  test('Status: 400, responds with correct status', () => {
    return request(app)
    .post('/api/articles/1/comments')
    .send(wrongComment)
    .expect(400)
  })
  test('Checks error message is correct on 400 status (no body)', () => {
    return request(app)
    .post('/api/articles/1/comments')
    .send(wrongComment).then(({text}) => {
      expect(text).toBe('status: 400, missing content')
  })
  })
  test('Status: 404, responds with correct status code. (invalid user)', () => {
  const invalidUsername = {
    username: 'jam_bridge', 
    body: 'This is my amazing new comment'
  };
    return request(app)
    .post('/api/articles/1/comments')
    .send(invalidUsername)
    .expect(404)
  })
  test('responds with correct error message when user in invalid', () => {
    const invalidUsername = {
      username: 'jam_bridge', 
      body: 'This is my amazing new comment'
    };
    return request(app)
    .post('/api/articles/1/comments')
    .send(invalidUsername).then(({text}) => {
      expect(text).toBe('status: 404, username does not exisit')
    })
  })
})






describe('GET /api/articles/:article_id', () => 
{
  test('status:200, responds wth correct status', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes : 1 })
      .expect(200);    
})
test('Checks endpoint updates the correct information (increment)', () => {
  const updateVote = { inc_votes : 1 }
  return request(app)
  .patch('/api/articles/1')
  .send(updateVote).then(({body}) => {
    expect(typeof body).toBe('object')
    expect(body[0].article_id).toBe(1)
    expect(body[0].title).toBe('Living in the shadow of a great man')
    expect(body[0].topic).toBe('mitch')
    expect(body[0].author).toBe('butter_bridge')
    expect(body[0].body).toBe('I find this existence challenging')
    expect(body[0].created_at).toBe('2020-07-09T20:11:00.000Z')
    expect(body[0].votes).toBe(101)
    expect(body[0].article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
  }) 
})

test('Checks endpoint updates the correct information (decrement)', () => {
  const updateVote = { inc_votes : -100 }
  return request(app)
  .patch('/api/articles/1')
  .send(updateVote).then(({body}) => {
    expect(typeof body).toBe('object')
    expect(body[0].article_id).toBe(1)
    expect(body[0].title).toBe('Living in the shadow of a great man')
    expect(body[0].topic).toBe('mitch')
    expect(body[0].author).toBe('butter_bridge')
    expect(body[0].body).toBe('I find this existence challenging')
    expect(body[0].created_at).toBe('2020-07-09T20:11:00.000Z')
    expect(body[0].votes).toBe(0)
    expect(body[0].article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
  }) 
})
test('status:404, returns correct status code', () => {
  const updateVote = { inc_votes : 1 }
  return request(app)
  .patch('/api/articles/500')
  .send(updateVote)
  .expect(404)

})
test('returns correct error message on invalid article_id', () => {
  const updateVote = { inc_votes : 1 }
  return request(app)
  .patch('/api/articles/500')
  .send(updateVote).then(({text}) => {
    expect(text).toBe('status: 404, article does not exist')
  })
})
test('status:400, returns correct status code', () => {
  const updateVote = { total_nonsense : 1 }
  return request(app)
  .patch('/api/articles/1')
  .send(updateVote)
  .expect(400)
})
test('Checks correct error message is sent when wrong patch given', () => {
  const updateVote = { total_nonsense : 1 }
  return request(app)
  .patch('/api/articles/1')
  .send(updateVote).then(({text}) => {
    expect(text).toBe('status: 400, incorrect vote information given')
  })
})
})

