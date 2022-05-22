const Controller = require('../../controller');
const OriginalData = require('../../data');

// Unit Test
test('Expect to have same data array length',()=>{
  const dataSize = OriginalData.length;
  const allTodos = new Controller().getTodos()
    .then(data => data.length)
    .then(data => {
      expect(data).toBe(dataSize);
    });
})
