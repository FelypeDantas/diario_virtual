if (!sessionStorage.getItem("auth")) {
  window.location.href = "login.html";
}

async function salvar() {
  const texto = document.getElementById("texto").value;
  const tag = document.getElementById("tag").value;
  const senha = sessionStorage.getItem("senha");

  if (!texto.trim()) return;

  const criptografado = await criptografarTexto(texto, senha);

  const entradas = JSON.parse(localStorage.getItem("diario")) || [];
  entradas.push({
    id: Date.now(),
    texto: criptografado,
    tag,
    data: new Date().toLocaleString()
  });

  localStorage.setItem("diario", JSON.stringify(entradas));
  document.getElementById("texto").value = "";
  mostrar();
}


async function mostrar() {
  const senha = sessionStorage.getItem("senha");
  const container = document.getElementById("entradas");
  container.innerHTML = "";

  const entradas = JSON.parse(localStorage.getItem("diario")) || [];

  for (const e of entradas.reverse()) {
    const texto = await descriptografarTexto(e.texto, senha);
    const div = document.createElement("div");
    div.className = `entrada tag-${e.tag}`;
    div.innerHTML = `<strong>${e.data}</strong><p>${texto}</p>`;
    container.appendChild(div);
  }
}


mostrar();

function trocarCapa(capa) {
  document.body.className = capa;
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

function abrirSenha() {
  document.getElementById("modalSenha").classList.toggle("hidden");
}

function trocarSenha() {
  const nova = document.getElementById("novaSenha").value;
  if (nova.length < 4) {
    alert("Senha muito curta");
    return;
  }
  localStorage.setItem("senha", btoa(nova));
  alert("Senha alterada");
}

function uploadCapa(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    localStorage.setItem("capaPersonalizada", reader.result);
    aplicarCapa();
  };

  reader.readAsDataURL(file);
}

function aplicarCapa() {
  const capa = localStorage.getItem("capaPersonalizada");
  if (capa) {
    document.body.style.backgroundImage = `url(${capa})`;
    document.body.style.backgroundSize = "cover";
  }
}

aplicarCapa();


