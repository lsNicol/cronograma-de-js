document.getElementById('js-status').textContent = 'JS carregou ✓';

// [url, método, status esperado, trecho esperado do Content-Type (ou null)]
const casos = [
  ['/',                   'GET',  [200], 'text/html'],
  ['/index.html',         'GET',  [200], 'text/html'],
  ['/style.css',          'GET',  [200], 'text/css'],
  ['/style.css?v=2',      'GET',  [200], 'text/css'],
  ['/app.js',             'GET',  [200], 'javascript'],
  ['/logo.svg',           'GET',  [200], 'image/svg+xml'],
  ['/nao-existe.png',     'GET',  [404], null],
  ['/..%2fserver.js',     'GET',  [403, 404], null],
  ['/%2e%2e%2f%2e%2e%2fREADME.md', 'GET', [403, 404], null],
  ['/style.css',          'HEAD', [200], 'text/css'],
  ['/style.css',          'POST', [405], null],
];

document.getElementById('diag').addEventListener('click', async () => {
  const tabela = document.getElementById('tabela');
  const corpo = tabela.querySelector('tbody');
  corpo.innerHTML = '';
  tabela.hidden = false;

  for (const [url, metodo, esperados, tipo] of casos) {
    let status, ct, ok;
    try {
      const res = await fetch(url, { method: metodo });
      status = res.status;
      ct = res.headers.get('content-type') ?? '(sem header)';
      ok = esperados.includes(status) && (!tipo || ct.includes(tipo));
    } catch (e) {
      status = 'erro de rede';
      ct = '';
      ok = false;
    }
    const tr = document.createElement('tr');
    const celulas = [
      ok ? '✓' : '✗',
      `${metodo} ${url}`,
      `${status} (${esperados.join(' ou ')})`,
      ct,
    ];
    celulas.forEach((txt, i) => {
      const td = document.createElement('td');
      td.textContent = txt;
      if (i === 0) td.className = ok ? 'ok' : 'fail';
      tr.append(td);
    });
    corpo.append(tr);
  }
});
