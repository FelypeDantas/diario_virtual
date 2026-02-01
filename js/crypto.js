async function gerarChave(senha) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(senha),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("diario-secreto"),
      iterations: 100000,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function criptografarTexto(texto, senha) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const chave = await gerarChave(senha);

  const cifrado = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    chave,
    new TextEncoder().encode(texto)
  );

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(cifrado))
  };
}

async function descriptografarTexto(obj, senha) {
  const chave = await gerarChave(senha);

  const texto = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(obj.iv) },
    chave,
    new Uint8Array(obj.data)
  );

  return new TextDecoder().decode(texto);
}
