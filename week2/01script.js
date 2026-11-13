const num = document.querySelector("#num");
const mais = document.querySelector("#mais");
const menos = document.querySelector("#menos");
const zerar = document.querySelector("#zerar");
let valor = 0;
mais.addEventListener("click", () => {
  valor++;
  num.textContent = valor;
  if (valor >= 0) num.style.color = "";
});
menos.addEventListener("click", () => {
  valor--;
  num.textContent = valor;
  if (valor < 0) num.style.color = "var(--redDark)";
});
zerar.addEventListener("click", () => {
  valor = 0;
  num.textContent = valor;
  num.style.color = "";
});

const entrada = document.getElementById("nome");
entrada.addEventListener('keydown', function(event){
  if (event.key == 'Enter'){
    const valDig = entrada.value;
    alert(`Nome salvo ${valDig}`);
    entrada.value = "";
  }
});
