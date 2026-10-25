const n = 10; //imutavel
for (let i=0; i < n; i++) //mutavel
  console.log(i);

const arr = [5, 5.5, '5', true, null, undefined, [], {}, function(){}]
arr.forEach(obj => {
  console.log(obj, ':', typeof obj);
});

/*Diff entre null e undefined:
* Undefined é o valor padrão q o js atribui a variaveis 
* declaradas q não foram iniadas. ex: let i; typeof i == undefined
*
* Null é um valor especial atribuido pelo progamador para mostrar q
* a variavel está "vazia" ou sem valor.
* 
* ps:
* (null == undefined) é true porém (null === undefined) é false
*/

console.log(typeof (Number.MAX_SAFE_INTEGER +2));
console.log(typeof (2n ** 64n));

//No desafio eu só errei o NaN === NaN, do qual aprendi q o por se 
//tratar de erros matemáticos, podem existir varios, por isso retornam diferente.
