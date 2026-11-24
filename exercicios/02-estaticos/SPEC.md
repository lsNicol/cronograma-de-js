# 02 - Servidor de arquivos estáticos

A pasta `public/` tem `index.html`, `style.css`, `app.js` e `logo.svg`. Seu `server.js` fica **fora** de `public/` (na pasta `02-estaticos/`) e serve o conteúdo dela.

Contrato:
- `GET /` serve `public/index.html`.
- `GET /<caminho>` serve `public/<caminho>`.
- O `Content-Type` sai da extensão do arquivo: `.html`, `.css`, `.js`, `.svg`, `.png`, `.json`, `.ico`. Use um objeto `{ '.css': 'text/css; charset=utf-8', ... }`.
- Arquivo inexistente: 404.
- Método diferente de GET/HEAD: 405.
- `HEAD` responde com os mesmos headers do GET, mas sem body.
- Tentativa de sair da pasta: `GET /..%2fserver.js` **não** pode devolver o seu código. Responda 403 ou 404.
- Diretório (ex.: `/` ou `/sub/`) serve o `index.html` dele, se existir.

A página `index.html` tem um botão **Rodar diagnóstico** que testa tudo isso e mostra ✓ ou ✗ para cada caso.

## Checklist
- [ ] Use `fs.createReadStream(arquivo).pipe(res)` em vez de `readFileSync`. Assim arquivo grande não ocupa memória.
- [ ] Trate o evento `'error'` do stream, para não derrubar o server quando o arquivo some no meio.
- [ ] `path.join` + `decodeURIComponent` + checar se o caminho final começa com a pasta `public` (`path.resolve`).
- [ ] Ignore a query string na hora de achar o arquivo (`/style.css?v=2`). Use `new URL(req.url, 'http://x').pathname`.
- [ ] Extra: header `Content-Length` (via `fs.stat`) e `Cache-Control`.
