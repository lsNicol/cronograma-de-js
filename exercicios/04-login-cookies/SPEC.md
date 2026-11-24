# 04 - Login com formulário e cookies

Aqui o login é um `<form>` HTML de verdade, sem `fetch`. O navegador envia `application/x-www-form-urlencoded` e segue os redirects sozinho.

Usuário fixo no server: `admin` / `1234`.
Sessões: um objeto `{ [token]: { usuario } }` em memória. O token pode ser `crypto.randomUUID()`.

| Método | Rota | Comportamento |
|--------|------|---------------|
| GET | `/` | 302 para `/painel` se logado, senão 302 para `/login` |
| GET | `/login` | 200 `login.html` |
| POST | `/login` | lê `usuario` e `senha` do body urlencoded. **Certo:** 302 `Location: /painel` + `Set-Cookie: sessao=<token>; HttpOnly; Path=/; SameSite=Lax`. **Errado:** 302 `Location: /login?erro=1` |
| GET | `/painel` | 200 `painel.html` se logado, senão 302 `/login` |
| GET | `/api/eu` | 200 `{ "usuario": "admin" }` se logado, senão 401 `{ "erro": "nao autenticado" }` |
| POST | `/logout` | apaga a sessão no server, manda `Set-Cookie: sessao=; Max-Age=0; Path=/` e 302 para `/login` |

Detalhes:
- O body urlencoded vem como `usuario=admin&senha=1234`. O `URLSearchParams` parseia isso: `new URLSearchParams(body).get('usuario')`.
- O cookie chega no header `Cookie: sessao=abc; outro=xyz`. Escreva uma função `lerCookies(req)` que devolve um objeto.
- "Logado" quer dizer: o cookie `sessao` existe **e** o token está no objeto de sessões.
- Em `writeHead` você pode passar um array para repetir um header: `'Set-Cookie': [a, b]`.

## Checklist
- [ ] Abra o DevTools → aba Rede e veja o 302, o `Location` e o `Set-Cookie`
- [ ] Aba Aplicativo → Cookies: confira que `HttpOnly` impede o JS de ler (`document.cookie` não mostra a sessão)
- [ ] Reinicie o server: as sessões somem (estão em memória) e o painel manda você de volta ao login
- [ ] Teste com curl: `curl -i -c jar.txt -d 'usuario=admin&senha=1234' localhost:8080/login` e depois `curl -i -b jar.txt localhost:8080/api/eu`
