# 05 - Headers e CORS

Dessa vez o front e a API ficam em **origens diferentes**, e é isso que dispara o CORS.

- **API**: seu `server.js`, na porta `3000`.
- **Front**: o `index.html` desta pasta, servido por outro processo na porta `5500`:
  `python3 -m http.server 5500` (dentro desta pasta) e abra `http://localhost:5500`.

Seu server só tem rotas de API, então não serve o HTML.

| Método | Rota | Resposta |
|--------|------|----------|
| GET | `/echo` | 200 JSON `{ metodo, url, query, headers }` |
| POST, PUT | `/echo` | igual, mais `body` (o JSON enviado, já parseado) |
| qualquer | outra rota | 404 `{ "erro": "..." }` |

Todas as respostas (incluindo erros) devem ter:
- `X-Request-Id: <crypto.randomUUID()>`
- `Access-Control-Allow-Origin: http://localhost:5500`
- `Access-Control-Expose-Headers: X-Request-Id` (sem isso o JS do navegador **não consegue ler** o `X-Request-Id`)

Preflight: o navegador manda um `OPTIONS` antes de requests "não simples" (por exemplo `PUT`, ou com `Content-Type: application/json`, ou com header customizado). Responda `OPTIONS` para qualquer rota com:
- status 204, sem body
- `Access-Control-Allow-Origin: http://localhost:5500`
- `Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, X-Meu-Header`
- `Access-Control-Max-Age: 600`

## O que observar
1. Rode o front **antes** de configurar o CORS e leia o erro no console. Entenda por que o request chegou no server, mas o navegador bloqueou a resposta.
2. Configure só o `Allow-Origin`. O `GET` simples funciona, mas o `POST` com JSON falha no preflight.
3. Aba Rede do DevTools: veja o `OPTIONS` e depois o request real, como duas linhas separadas.
4. Tire o `Expose-Headers` e veja o front mostrar o `X-Request-Id` como inacessível.
5. `req.headers` do Node vem **sempre em minúsculas** (`x-meu-header`).

## Checklist
- [ ] Função `aplicarCors(res)` chamada em toda resposta
- [ ] `Vary: Origin` quando o Allow-Origin depender da origem do request
- [ ] Extra: em vez de fixar `5500`, aceite uma lista de origens permitidas e devolva a que bater com o header `Origin`
