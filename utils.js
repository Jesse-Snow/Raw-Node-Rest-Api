// Retrive data from the client (in the server)

function getReqData(req){
  return new Promise((resolve,reject)=>{
    try {
      let body = '';
      // escutar os dados enviados pelo cliente
      req.on("data",(chunk)=>{
        // acrescenta a versao da string para o body
        body += chunk.toString();
      });
      // Escuta até o fim
      req.on("end",()=>{
        // envia os dados
        resolve(body);
      });
    } catch (error){
      reject(error);
    }
  });
}

module.exports = { getReqData };
