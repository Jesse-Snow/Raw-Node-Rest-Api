// Manage the logic for the routes
const data = require('./data');

class Controller {
  // obter todos os Todos
  async getTodos(){
    // retorna todos os Todos
    return new Promise((resolve,reject) => resolve(data))
  }
  // Obter um único todo 
  async getTodo(id){
    return new Promise((resolve,reject)=>{
      // obter o todo
      let todo = data.find((todo)=> todo.id === parseInt(id));
      if(todo){
        // Retorna um todo
        resolve(todo);
      }else{
        // retorna um erro
        reject(`Todo com id ${id} nao foi encontrado`);
      }
    });
  }

  // Cria todo
  async createTodo(todo){
    return new Promise((resolve,reject)=>{
      // cria todo com id aleatorio e dados do todo
      let newTodo = {
        id:Math.floor(4+Math.random()*10),
        ...todo,
      };
      // retorna um novo todo
      resolve(newTodo);
    });
  }

  // Atualiza todo
  async updateTodo(id){
    return new Promise((resolve,reject) => {
      // Obtem todo
      let todo = data.find((todo)=> todo.id === parseInt(id));
      // Se não tem todo, retorna erro
      if(!todo){
        reject(`Todo com id ${id} nao foi encontrado`);
      }
      // Senão atualiza setando completed para true
      todo['completed'] = true;
      // Retorna o todo atualizado
      resolve(todo)
    });
  }

  // deletando o todo
  async deleteTodo(id){
    return new Promise((resolve,reject)=>{
      // Retorna o todo
      let todo = data.find((todo)=>todo.id === parseInt(id));
      // Se não tiver todo, retorne um erro
      if(!todo){
        reject(`Todo com id ${id} nao foi encontrado`);
      } 
      // Senão, retorne uma messagem com sucesso
      resolve(`Todo deletado com sucesso`);
    });
  }
}


module.exports = Controller;
