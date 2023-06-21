var moedasImagens = {
  USD: "./assets/estados-unidos.png",
  EUR: "./assets/euro.png",
  ARS: "./assets/argentina.png",
  CLP: "./assets/chile.png",
  INR: "./assets/india.png",
  JPY: "./assets/japao.png",
  PYG: "./assets/paraguai.png",
};

function atualizarImagemMoeda() {
  var moedaAlvo = document.getElementById("currency-select").value;
  var imgMoeda = document.getElementById("currency-img");

  if (moedaAlvo in moedasImagens) {
    imgMoeda.src = moedasImagens[moedaAlvo];
    imgMoeda.alt = "bandeira da moeda selecionada";
  } else {
    imgMoeda.src = "./assets/sem-imagem.png";
    imgMoeda.alt = "imagem não disponível";
  }
}

function converterMoeda() {
  var valorReal = document.getElementById("value-real").value;
  var moedaAlvo = document.getElementById("currency-select").value;

  if (valorReal !== "" && moedaAlvo !== "") {
    var url = "https://api.exchangerate-api.com/v4/latest/BRL";
    var request = new XMLHttpRequest();

    request.open("GET", url, true);
    request.onload = function () {
      if (request.status === 200) {
        var data = JSON.parse(request.responseText);
        var taxaConversao = data.rates[moedaAlvo];
        var valorConvertido = (valorReal * taxaConversao).toFixed(2);

        document.getElementById("real-value-text").innerText =
          "R$ " + valorReal;
        document.getElementById("currency-value-text").innerText =
          moedaAlvo + " " + valorConvertido;
        document.getElementById("currency-name").innerText =
          obterNomeMoeda(moedaAlvo);
      }
    };

    request.send();
  }
}

function obterNomeMoeda(moeda) {
  switch (moeda) {
    case "USD":
      return "Dólar americano";
    case "EUR":
      return "Euro";
    case "ARS":
      return "Peso argentino";
    case "CLP":
      return "Peso chileno";
    case "INR":
      return "Rupia indiana";
    case "JPY":
      return "Iene japonês";
    case "PYG":
      return "Guarani paraguaio";
    default:
      return "";
  }
}
