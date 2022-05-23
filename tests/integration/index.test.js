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
  test('Should return 404 to wrong route',()=> {
    return request(url)
      .get('/todos/asdf')
      .expect(404)
      .then(response => {
        expect(response.body.message).toBe("Rota não encontrada");
      })
  })
});

describe('GET BY ID /todos/{id}',() => {
  test('Shoud return 200 and title:Wash the dishes', () => {
    return request(url)
      .get('/todos/2')
      .expect(200)
      .then( response => {
        expect(response.body.title).toBe('Wash the dishes');
      });
  });
})

describe('POST /todos',() => {
  test('Shoud return 200 and check todo with title "Make dinner" exists',()=>{
    return request(url)
      .post('/todos')
      .send({title:'Make dinner',description:'Vegan food for preference',completed:false})
      .expect(200)
      .then((res)=>{
        expect(res.body).toMatchObject({title:'Make dinner'});
      })
      });
  });

describe('PUT /todos/{id}',()=>{
  test('Should return 200 and check todo "completed" of todo 1 was updated to "true"',()=>{
    return request(url)
      .put('/todos/1')
      .expect(200)
      .then((res)=>{
        expect(res.body).toMatchObject({completed:true})
      })
  })
})

describe('DELETE /todos/{id}',()=>{
  test('Shoud return 200 and Todo com id nao foi encontrado',()=>{
    return request(url)
      .delete('/todos/3')
      .then(()=>{
        return request(url)
          .del('/todos/3')
          .expect(404)
      })
  })
})
