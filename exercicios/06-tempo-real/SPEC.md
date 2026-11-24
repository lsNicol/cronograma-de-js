# 06 - Chat em tempo real com SSE

SSE (Server-Sent Events) é uma resposta HTTP que **nunca termina**: o server mantém o `res` aberto e vai escrevendo nele.

| Método | Rota | Comportamento |
|--------|------|---------------|
| GET | `/` | 200 `index.html` |
| GET | `/api/mensagens` | 200 `[{ id, autor, texto, hora }]` (histórico) |
| POST | `/api/mensagens` | body `{ autor, texto }` → 201 + a mensagem criada, e **envia a mensagem para todos os clientes conectados**. 400 se `autor` ou `texto` forem vazios ou não forem string. Limite de 500 caracteres no texto. |
| GET | `/api/eventos` | abre o stream SSE |

Stream SSE (`/api/eventos`):
- Headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.
- Guarde cada `res` num `Set` de clientes.
- Formato de cada evento (termina com **linha em branco**):
  ```
  event: mensagem
  data: {"id":3,"autor":"Ana","texto":"oi","hora":"..."}

  ```
- Quando alguém entra ou sai, envie para todos: `event: online` com `data: <número de clientes>`.
- `req.on('close', ...)` remove o cliente do `Set`. Sem isso o server vaza memória e escreve em conexões mortas.
- A cada 15s, envie um comentário `: ping\n\n` para as conexões não caírem por inatividade.

## Teste
- Abra a página em **duas abas**. Mande mensagem em uma e ela precisa aparecer nas duas, sem recarregar.
- Feche uma aba. O contador de online na outra deve cair.
- Pare o server e suba de novo. O `EventSource` reconecta sozinho e o front mostra o status.
- `curl -N localhost:8080/api/eventos` mostra o stream cru no terminal.

## Checklist
- [ ] Função `broadcast(evento, dados)` que percorre o `Set` e faz `res.write`
- [ ] Nenhum `res.end()` no `/api/eventos`
- [ ] `res.write` dentro de try/catch (ou cheque `res.writableEnded`)
- [ ] Extra: suporte ao header `Last-Event-ID`: reenvie o que o cliente perdeu enquanto estava desconectado
