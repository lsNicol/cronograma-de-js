# 03 - Produtos (query string, filtro e paginação)

Os dados estão em `produtos.json`. Leia o arquivo uma vez, na hora que o server sobe (`JSON.parse(fs.readFileSync(...))`).

| Método | Rota | Resposta |
|--------|------|----------|
| GET | `/` | 200 `index.html` |
| GET | `/api/produtos` | 200 `{ total, page, limit, itens: [...] }` |
| GET | `/api/produtos/:id` | 200 o produto, ou 404 |

Parâmetros de `GET /api/produtos` (todos opcionais):

| Param | Significado | Padrão | Erro (400) |
|-------|-------------|--------|------------|
| `q` | busca no `nome`, sem diferenciar maiúscula/minúscula | | |
| `categoria` | igualdade exata com `categoria` | | |
| `ordem` | `preco`, `-preco`, `nome` ou `-nome` (o `-` inverte) | ordem original | qualquer outro valor |
| `page` | página, começando em 1 | 1 | não é inteiro ≥ 1 |
| `limit` | itens por página | 5 | não é inteiro entre 1 e 20 |

Detalhes:
- `total` é a quantidade de itens **depois dos filtros e antes da paginação**.
- Os filtros funcionam combinados: `?q=monitor&categoria=monitores&ordem=-preco&page=1&limit=2`.
- Página além do fim: 200 com `itens: []`, não é erro.
- Erros de validação: 400 `{ "erro": "..." }` dizendo qual parâmetro está errado.
- Query string vem **codificada** (`q=cadeira%20erg`). Use `new URL(req.url, 'http://localhost')` e `url.searchParams`, que decodifica por você.

## Checklist
- [ ] Separar `pathname` de `search` (não compare `req.url === '/api/produtos'`, porque ele vem com `?...`)
- [ ] Uma função `parseInteiro(valor, padrao, min, max)` que valida e converte
- [ ] Ordem das operações: filtrar → ordenar → contar o `total` → fatiar (`slice`)
- [ ] `ordem=nome` deve ordenar com `localeCompare`
