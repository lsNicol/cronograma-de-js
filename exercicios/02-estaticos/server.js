import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve("public");

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

const server = http.createServer( async (req, res) => {
  if (req.method === "GET" || req.method === "HEAD") {
    try {
      const urlDecodificada = decodeURIComponent(req.url.split("?")[0]);
      let urlFixed = path.resolve( publicDir,  "." + urlDecodificada );

      if (!urlFixed.startsWith(publicDir + path.sep) && urlFixed !== publicDir){
        const err = new Error("Permissão negada!");
        err.code = "EACCES";
        throw err;
      }

      const stats = await fs.stat(urlFixed)
      if (stats.isDirectory())
        urlFixed = path.join(urlFixed, "index.html");
      
      const header = getHeader(urlFixed);
      res.writeHead(200, header);

      const conteudo = await fs.readFile(urlFixed);
      res.end(conteudo);
      
    } catch (err){
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ "erro": "Arquivo Inexistente"}));
        return;
      }
      else if (err.code === "EACCES") {
        res.writeHead(403, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({"erro": "Permissao Negada"}));
        return;
      }
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ "erro": "Erro interno do servidor" }));
    }
  }
  else {
    res.writeHead(405, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ "erro": "Método não permitido" }));
    return;
  }
});

server.listen(8080, "localhost", () =>
  console.log(`Servidor está ativo em http://localhost:8080`),
);
