# Exercícios de `node:http`

Em cada pasta o front já está pronto. Você escreve só o `server.js`, usando apenas `node:http` e `node:fs`, sem nenhuma dependência.
Leia o `SPEC.md` da pasta, que é o contrato que o server precisa cumprir. Em todas as pastas, `GET /` deve servir o `index.html` (ou o arquivo indicado no SPEC).

Rode de dentro da pasta do exercício: `node server.js`

| # | Pasta | O que você pratica | Vira o quê no Express |
|---|-------|--------------------|------------------------|
| 1 | `01-tarefas` | CRUD, métodos, status codes, parâmetro na rota (`/:id`), ler o body, 404/405 | `app.get/post/patch/delete`, `req.params`, `express.json()` |
| 2 | `02-estaticos` | Servir arquivos, Content-Type por extensão, streams, path traversal | `express.static()` |
| 3 | `03-produtos` | Query string, filtro, ordenação, paginação, validação de parâmetros | `req.query` |
| 4 | `04-login-cookies` | Form urlencoded, redirect 302, `Set-Cookie`, ler cookie, 401 | `res.redirect`, `cookie-parser`, `express-session` |
| 5 | `05-cors-headers` | Headers de request/response, CORS, preflight `OPTIONS` | `cors()`, `res.set()`, `req.headers` |
| 6 | `06-tempo-real` | Resposta que não termina (SSE), vários clientes, limpeza no `close` | `res.write` em stream, `res.flush` |

## Bônus: construa um mini-Express

Quando terminar o 1, refatore o server dele para ter a sua própria camada. Foi isso que o Express fez em cima do `node:http`.

```js
const app = criarApp();
app.use(logger);                 // middleware: (req, res, next) => ...
app.use(jsonBody);               // preenche req.body
app.get('/api/tarefas', listar);
app.patch('/api/tarefas/:id', atualizar);   // req.params.id
app.listen(8080);
```

Os helpers que você vai querer: `res.status(n)`, `res.json(obj)`, `req.params`, `req.query`, `req.body`, e um handler de erro que captura exceções.
Se você sabe construir isso, o Express vai parecer familiar.
