# 01 - Tarefas (CRUD)

Guarde as tarefas num array em memória. Cada tarefa tem o formato `{ id, titulo, feita }`.

| Método | Rota | Body | Sucesso | Erros |
|--------|------|------|---------|-------|
| GET | `/` | | 200 `index.html` | |
| GET | `/api/tarefas` | | 200 `[tarefa, ...]` | |
| POST | `/api/tarefas` | `{titulo}` | 201 + a tarefa criada | 400 se `titulo` não for string ou estiver vazio |
| PATCH | `/api/tarefas/:id` | `{feita: boolean}` | 200 + a tarefa atualizada | 400 se `feita` não for boolean, 404 se o id não existe |
| DELETE | `/api/tarefas/:id` | | 204 sem body | 404 se o id não existe |

Regras gerais:
- Toda resposta de erro é JSON: `{ "erro": "mensagem" }`.
- Rota que não existe: 404.
- Rota que existe com método errado (ex.: `PUT /api/tarefas`): 405 com o header `Allow` listando os métodos válidos.
- JSON inválido no body: 400, e o server não pode cair.
- `id` vem da URL como string e precisa virar número. Se não for número, 400.

## Checklist
- [ ] `Content-Type: application/json; charset=utf-8` nas respostas JSON
- [ ] Função `lerBody(req)` que devolve uma Promise com o JSON já parseado
- [ ] Função `enviarJson(res, status, obj)` para não repetir `writeHead` + `end`
- [ ] Extrair o `:id` da URL sem biblioteca (`url.split('/')` ou regex)
- [ ] Testar também com `curl -i -X PATCH localhost:8080/api/tarefas/1 -d '{"feita":true}'`
