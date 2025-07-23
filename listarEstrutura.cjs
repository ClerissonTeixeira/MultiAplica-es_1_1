const fs = require("fs");
const path = require("path");

function listarPastas(dir, prefixo = "") {
  const itens = fs.readdirSync(dir);
  for (let item of itens) {
    const caminho = path.join(dir, item);
    const estat = fs.statSync(caminho);
    console.log(prefixo + "|-- " + item);
    if (estat.isDirectory() && item !== "node_modules") {
      listarPastas(caminho, prefixo + "   ");
    }
  }
}

listarPastas(".");
