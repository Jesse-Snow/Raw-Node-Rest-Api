const request = require('supertest');
const url = 'http://localhost:8080/api';

describe('GET /todos', ()=> {
  test("Shoud return 200 and Confirm the true data",()=>{
    return request(url)
      .get('/todos')
      .expect(200)
      .then( response => {
        expect(response.body[0].title).toBe("Buy an apple");
      });
  });
});
