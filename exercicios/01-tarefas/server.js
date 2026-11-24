import http from "node:http";
import fs from "node:fs";

let id = 1000;
let tarefas = [];

const index = fs.readFileSync("index.html");
const server = http.createServer((req, res) => {
  const resJSON = (conteudo, status = 200, allow = []) => {
    let header = {'Content-Type': 'application/json; charset=utf-8'};
    if (allow.length > 0){
      header['Allow'] = allow.join(", ");
    }
    res.writeHead(status, header);
    res.end(JSON.stringify(conteudo));
  }


  if (req.method === "GET") {
    if (req.url === "/"){
      res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
      res.end(index);
    }
    else if (req.url === "/api/tarefas"){
      resJSON(tarefas, 200);
    }
  }
  else if (req.method === "POST") {
    if (req.url === "/api/tarefas"){
      let body = "";
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        let dados;
        try {
          dados = JSON.parse(body);
        } catch {
          resJSON({ "erro": "JSON inválido" }, 400);
          return;
        }

        const titulo = dados.titulo;
        if (typeof titulo !== "string" || titulo.trim() === "") {
          resJSON({ "erro": "Titulo inválido" }, 400);
          return;
        }

        const task = { id: id++, titulo: titulo.trim(), feita: false };
        tarefas.push(task);
        resJSON(task, 201);
      })
    }
  }
  else if (req.method === "PATCH"){
    if (req.url.includes("/api/tarefas/")){
      const idF = Number(req.url.slice(-4));
      if (Number.isNaN(idF)){
        resJSON({"erro": "ID inválido"}, 400);
        return;
      }
      const task = tarefas.find(task => task.id === idF);
      if (task){
        task.feita = task.feita? false : true;
        resJSON(task, 200);
      } else{
        resJSON({"erro": "ID não encontrado"}, 404);
        return;
      }
    }
  }
  else if (req.method === "DELETE"){
    if (req.url.includes("/api/tarefas/")){
      const idF = Number(req.url.slice(-4));
      if (Number.isNaN(idF)){
        resJSON({"erro": "ID inválido"}, 400);
        return;
      }
      const task = tarefas.find(task => task.id === idF);
      if (task){
        tarefas = tarefas.filter(obj => obj != task);
        resJSON(null, 204);
      } else{
        resJSON({"erro": "ID não encontrado"}, 404);
        return;
      }
    }
  }
  else {
    resJSON({"erro": "Rota não encontrada"}, 404, ["GET", "POST", "PATCH", "DELETE"]);
    return;
  }
});
server.listen(8080, 'localhost', () => console.log(`Servidor está ativo em http://localhost/8080`));
