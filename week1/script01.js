console.log("Olá do JS");
console.log("typeof document: ", typeof document);

function tabuada(n){
  for (let i = 1; i <= 10; i++){
    console.log(`${n} * ${i} = ${n*i}`);
  }
}
tabuada(7);
