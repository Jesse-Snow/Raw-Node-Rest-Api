/*
  * Initialization and configuration of the server
  * Routes listening to the baryng http methods of a server
  * A port number to listen and set the server live
*/
const http = require('http');

const port = process.env.PORT || 8080;

const server = http.createServer((req,res)=>{
  // Rota da requisição
  if( req.url === '/api' && req.method === 'GET'){
    // Response Header
    res.writeHead(200,{"Content-Type":"text/html"});
    // Response 
    res.write("<h1>Oi, o servidor funcionou</h1>");
    // Response end
    res.end();
  }
  // Caso não tenha rota
  else{
    res.writeHead(404,{"Content-Type":"application/json"});
    res.end(JSON.stringify({message:"Rota não encontrada"}))
  }
})

server.listen(port,()=> console.log(`Server running on Port:${port}`));
