/* Prática guiada:
* push -> insere no final; pop -> remove do final;
* shift -> remove no inicio; unshift -> insere no inicio;
* slice -> fatia um array sem modificar o original; splice -> fatia um array modificando o original;
* map -> itera por cada elem do arr; filter -> filtra o arr por uma condição; reduce -> percorre um arr e "reduz" a um valor final (soma, media, etc..)
* find -> procura um termo e retorna a primeira aparição dentro de um array; some -> retorna soma dos elem de um array;
* every -> retorna se todos os elem de um arr aceitam uma condição; includes -> retorna se uma substring pertence a uma string maior;
* */
const nums = [10, 9, 1, 25, 3, 100];

console.log(nums.map(x => x * 2)); 
console.log(nums.filter(x => x % 2 === 0)); 
console.log(nums.reduce((a, b) => a + b, 0)); 
console.log([...nums].sort()); 
console.log([...nums].sort((a, b) => a - b)); 

//Desafio:
const notas = [7.5, 4, 9, 6, 3.5, 8];
console.log("media:", notas.reduce((a, b) => a+b, 0)/notas.length);
console.log("aprovados:", notas.filter(x => x >= 6));
console.log("maior:", Math.max(...notas));
