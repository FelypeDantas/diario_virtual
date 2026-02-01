function resumirSemana(textos) {
  return textos
    .join(" ")
    .split(".")
    .slice(0, 3)
    .join(".") + ".";
}
