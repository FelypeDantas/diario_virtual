function calcularHumor() {
  const entradas = JSON.parse(localStorage.getItem("diario")) || [];
  const contagem = {};

  entradas.forEach(e => {
    contagem[e.tag] = (contagem[e.tag] || 0) + 1;
  });

  return contagem;
}

function mostrarStats() {
  const stats = calcularHumor();
  const div = document.getElementById("stats");
  div.innerHTML = "";

  for (const tag in stats) {
    div.innerHTML += `<p>${tag}: ${stats[tag]}</p>`;
  }
}

tags.push("exausto");
tags.push("esperançoso");

function escreverAnimado(texto, el) {
  el.innerHTML = "";
  let i = 0;
  const timer = setInterval(() => {
    el.innerHTML += texto[i++];
    if (i >= texto.length) clearInterval(timer);
  }, 18);
}
