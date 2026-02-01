function gerarLinhaDoTempo() {
  const entradas = JSON.parse(localStorage.getItem("diario")) || [];

  const mapa = {};
  entradas.forEach(e => {
    const dia = e.data.split(",")[0];
    mapa[dia] = mapa[dia] || {};
    mapa[dia][e.tag] = (mapa[dia][e.tag] || 0) + 1;
  });

  return mapa;
}

function renderTimeline() {
  const dados = gerarLinhaDoTempo();
  const div = document.getElementById("timeline");
  div.innerHTML = "";

  for (const dia in dados) {
    const linha = document.createElement("div");
    linha.innerHTML = `<strong>${dia}</strong> ${JSON.stringify(dados[dia])}`;
    div.appendChild(linha);
  }
}

