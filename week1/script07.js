//  estruturas de dados
class Pilha{
  constructor(arr = []){
    this.arr = arr;
  }
  push(x){this.arr.push(x)}
  pop(){return this.arr.pop()}
  top(){return this.arr.at(-1)}
  empty(){return this.arr.length === 0}
  size(){return this.arr.length}
  show(){console.log(this.arr)}
}
class Fila{
  constructor(arr = []){
    this.arr = arr;
  }
  push(x){this.arr.push(x)}
  pop(){return this.arr.shift()}
  front(){return this.arr.at(0)}
  empty(){return this.arr.length === 0}
  size(){return this.arr.length}
  show(){console.log(this.arr)}
}

const pilha = new Pilha(1, 5, 2);
const fila = new Fila([10, 15]);

// minigit
let lastCommit = null;
class Commit{
  constructor(msg = "", data = "2026/11/05", pai = lastCommit){
    this.msg = msg;
    this.data = data;
    this.pai = pai;
    lastCommit = this;
  }
  resumo(){
    console.log(this.msg.slice(0, 8)+"..", this.data, (this.pai === null ? null : this.pai.msg.slice(0, 8)+".."));
  }
}
const log = [
  new Commit("Commit inicial, criei as ferramentas basicas do site"),
  new Commit("fix: correção de falhas no backend"),
  new Commit("docs: criei um README com instruções sobre o projeto")
]
let ultimo = log.at(-1);
while (ultimo != null){
  ultimo.resumo();
  ultimo = ultimo.pai;
}
