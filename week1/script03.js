let a = 10, b = 2;
if (typeof document === "undefined"){
  const linha = require("fs").readFileSync(0, "utf8").trim().split("\n");
  const linha0 = linha[0].split(" ").map(Number);
  a = linha0[0], b = linha0[1];
}
function expo(a, b) {return a**b};
const expo2 = (a, b) => a**b;
const expo3 = function (a, b) {return a**b};
console.log(`${expo(a, b)}\n${expo2(a, b)}\n${expo3(a, b)}`);

//for of itera pelos valores, enq for in itera pelas chaves
