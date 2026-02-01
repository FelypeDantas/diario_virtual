function gerarBackup() {
  const dados = localStorage.getItem("diario");
  const blob = new Blob([dados], { type: "application/json" });
  return blob;
}
async function restaurarBackup(arquivo) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();        
    reader.onload = () => {
      try {
        const dados = JSON.parse(reader.result);
        localStorage.setItem("diario", JSON.stringify(dados));
        resolve();
      } catch (e) {
        reject("Arquivo inválido");
      } 
    };
    reader.onerror = () => reject("Erro ao ler o arquivo");
    reader.readAsText(arquivo);
  });
}