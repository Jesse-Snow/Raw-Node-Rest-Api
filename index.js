/*
  * Initialization and configuration of the server
  * Routes listening to the baryng http methods of a server
  * A port number to listen and set the server live
*/
const http = require('http');
const Todo = require("./controller");
const { getReqData } = require("./utils");
const port = process.env.PORT || 8080;

const server = http.createServer(async (req,res) => {
  // Route GET: /api/todos
  if(req.url === "/api/todos" && req.method === "GET"){
    const todos = await new Todo().getTodos();
    res.writeHead(200, { "Content-Type":"application/json"});
    res.end(JSON.stringify(todos));
  }

  // Route GET: /api/todos/:id
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[3];
      const todo = await new Todo().getTodo(id);
      res.writeHead(200,{"Content-Type":"application/json"});
      res.end(JSON.stringify(todo));
    } catch(error){
      res.writeHead(404,{"Content-Type":"application/json"});
      res.end(JSON.stringify({message:error}));
    }
  }

  // Route DELETE: /api/todos/:id
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE"){
    try{

      const id = req.url.split("/")[3];
      console.log(id);
      let message = await new Todo().deleteTodo(id);
      res.writeHead(200,{"Content-Type":"application/json"});
      res.end(JSON.stringify(message));
    }catch (error){
      res.writeHead(404,{"Content-Type":"application/json"});
      res.end(JSON.stringify({message:error}));
    }
  }

  // Route UPDATE: /api/todos/:id
  else if ( req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH"){
    try{
      const id = req.url.split("/")[3];
      let updated_todo = await new Todo().updateTodo(id);
      res.writeHead(200,{"Content-Type":"application/json"});
      res.end(JSON.stringify(updated_todo));
    }catch(error){
      res.writeHead(404,{"Content-Type":"application/json"});
      res.end(JSON.stringify({message:error}));
    }
  }

  // Route POST: /api/todos/
  else if ( req.url === "/api/todos" && req.method === "POST"){
    let todo_data = await getReqData(req);
    let todo = await new Todo().createTodo(JSON.parse(todo_data));
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(todo));
  }

  // No route present 
  else {
    res.writeHead(404,{"Content-Type":"application/json"});
    res.end(JSON.stringify({message:"Rota não encontrada"}));
  }
})

server.listen(port,()=> console.log(`Server running on Port:${port}`));
