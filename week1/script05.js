function Aluno(nome, idade = 29) {
  this.nome = nome;
  this.idade = idade;
}
function info(matricula, data = 202610) {
  this.matricula = matricula;
  this.data = data;
}

const nomes = ["Potat", "abai", "asda", "bababas", "saido", "raagueinn", "siadai", "aivia", "Joage"];
const idades = [
  13, 14, 15, 14, 13, 15, 13, 15, 13
]
const sala = [];

nomes.forEach((nome, id) => {
  sala.push(new Aluno(nome, idades[id]));
});

console.log(`São ao todo ${sala.length} alunos:`);
sala.forEach(obj => {
  console.log(obj.nome, obj.idade);
});

const media = sala.reduce((R, A) => R + A.idade, 0) / sala.length;
console.log(media);

const melhoresAlunos = sala.toSorted((a, b) => (b.idade - a.idade) || b.nome.localeCompare(a.nome)).slice(0, 5);
console.log(melhoresAlunos);
const melhorAluno = melhoresAlunos[0];
const infoMelhorAluno = new info(202611, 201010);
const melhorAlunoCompleto = {...melhorAluno, ...infoMelhorAluno};
console.log(melhorAlunoCompleto);

const jsao = JSON.stringify(sala, null, 2);
console.log(jsao);

const lista = JSON.parse(jsao);
console.log(typeof lista[0] === typeof sala[0]);
console.log(sala[0] instanceof Aluno);
console.log(lista[0] instanceof Aluno);

const listaCorreta = lista.map(obj => new Aluno(obj.nome, obj.idade));
console.log(listaCorreta[0] instanceof Aluno);
