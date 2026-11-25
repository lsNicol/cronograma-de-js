import http from "node:http";
import fs from "node:fs";
import path from "node:path";

function getHeader(caminho) {
  const tradutor = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml"
  };
  const ext = path.extname(caminho);
  const tipo = tradutor[ext] || "text/plain";
  return { "Content-type": `${tipo}; charset=utf-8` };
}

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    let urlFixed = path.join( "public", req.url.split("?")[0]);

    try {
      const stats = fs.statSync(urlFixed)
      if (stats.isDirectory())
        urlFixed = path.join(urlFixed, "index.html");
      

      const conteudo = fs.readFileSync(urlFixed);
      const header = getHeader(urlFixed);
      res.writeHead(200, header);
      res.end(conteudo);

    } catch (err){
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ erro: "Arquivo inexistente" }));
    }
  }
});
server.listen(8080, "localhost", () =>
  console.log(`Servidor está ativo em http://localhost:8080`),
);
