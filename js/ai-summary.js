
/* =========================================
   MEU DIÁRIO
   Funções de processamento textual
========================================= */

/**
 * Gera um resumo simples a partir dos registros.
 *
 * @param {string[]} textos - Registros da semana.
 * @param {number} limite - Quantidade máxima de frases.
 * @returns {string} Resumo gerado.
 */
function resumirSemana(textos, limite = 3) {

  // Validar os dados recebidos
  if (!Array.isArray(textos) || textos.length === 0) {
    return "Ainda não existem registros suficientes para criar um resumo.";
  }

  // Unificar e limpar os textos
  const textoCompleto = textos
    .filter(texto => typeof texto === "string")
    .map(texto => texto.trim())
    .filter(texto => texto.length > 0)
    .join(" ");

  if (!textoCompleto) {
    return "Ainda não existem registros suficientes para criar um resumo.";
  }

  // Separar frases considerando diferentes pontuações
  const frases = textoCompleto
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];

  // Selecionar as primeiras frases
  const resumo = frases
    .map(frase => frase.trim())
    .filter(Boolean)
    .slice(0, Math.max(1, Math.floor(limite)));

  return resumo.join(" ");
}


/* =========================================
   ESTATÍSTICAS DO DIÁRIO
========================================= */

/**
 * Calcula estatísticas básicas dos registros.
 */
function calcularEstatisticas(textos) {

  if (!Array.isArray(textos)) {
    return {
      totalRegistros: 0,
      totalPalavras: 0,
      mediaPalavras: 0
    };
  }

  const registros = textos.filter(
    texto => typeof texto === "string" && texto.trim()
  );

  const palavras = registros
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    totalRegistros: registros.length,
    totalPalavras: palavras.length,
    mediaPalavras: registros.length
      ? Math.round(palavras.length / registros.length)
      : 0
  };
}


/* =========================================
   CONTAGEM DE PALAVRAS
========================================= */

function contarPalavras(texto) {

  if (typeof texto !== "string" || !texto.trim()) {
    return 0;
  }

  return texto.trim().split(/\s+/).length;
}
