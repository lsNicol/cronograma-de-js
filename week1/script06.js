//Sring methods:
const baseErr = "    I know someday u have a beautiful life..       ";
const base = baseErr.trim(); // remove excesso
const lista = base.split(" "); // separa
const hidden = base.slice(20).padStart(30, "*"); // completa a string até ela ter um tamanho especifico
const capsL = base.toUpperCase(); // passa a string para maiuscula
const eleSabe = base.includes("know"); // retorna um boolean se encontrar a substring dentro da string

// Escope e closures:
function criarCont(){
  let c = 0; // escopo local
  return { // retorna um objeto com os seguintes metodos
    incrementar(){ c++; },
    valor(){ console.log(c); }
  };
}
const cont = criarCont();
cont.incrementar();
cont.incrementar();
cont.valor();
// os metodos conseguem acessar a variavel c porque estão no mesmo escopo

for (var i = 0; i < 3; i++) { // o var cria uma UNICA variavel para o laço inteiro, diferente do let q cria uma pra cada iteração
  setTimeout(() => console.log(i), 0);
}
