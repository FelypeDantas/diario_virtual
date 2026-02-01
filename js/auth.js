function hashSenha(senha) {
  return btoa(senha); // simples, depois dá pra melhorar
}

function login() {
  const senha = document.getElementById("senha").value;
  const senhaSalva = localStorage.getItem("senha");

  if (!senhaSalva) {
    localStorage.setItem("senha", hashSenha(senha));
    sessionStorage.setItem("auth", "ok");
    window.location.href = "index.html";
    return;
  }

  if (hashSenha(senha) === senhaSalva) {
    sessionStorage.setItem("auth", "ok");
    window.location.href = "index.html";
  } else {
    alert("Senha incorreta");
  }
}

async function ativarBiometria() {
  if (!window.PublicKeyCredential) {
    alert("Biometria não suportada");
    return;
  }

  localStorage.setItem("biometriaAtiva", "true");
  alert("Biometria ativada com sucesso!");
}
async function autenticarBiometria() {
  if (!window.PublicKeyCredential) {
    alert("Biometria não suportada");
    return;
  }     
  try {
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: new Uint8Array([/* bytes aleatórios */]),
        timeout: 60000,
        userVerification: 'required'
      }
    });
    sessionStorage.setItem("auth", "ok");
    window.location.href = "index.html";
  } catch (e) {
    alert("Autenticação biométrica falhou");
  }
}

async function loginBiometrico() {
  const ativa = localStorage.getItem("biometriaAtiva");
  if (!ativa) return false;

  try {
    await navigator.credentials.get({
      publicKey: {
        challenge: new Uint8Array(32),
        timeout: 60000,
        userVerification: "required"
      }
    });

    return true;
  } catch {
    return false;
  }
}

window.onload = async () => {
  const ok = await loginBiometrico();
  if (ok) desbloquear();
};

function desbloquear() {
  const card = document.querySelector(".login-container");
  card.classList.add("unlock");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1100);
}

const humor = localStorage.getItem("ultimoHumor");

document.body.classList.add(humor || "neutro");
