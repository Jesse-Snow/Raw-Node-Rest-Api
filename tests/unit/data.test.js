const todos = require('../../data');

test('Confirm data', () => {
  const firstIndex = todos[0];
  expect(firstIndex.title).toBe('Buy an apple');
});
