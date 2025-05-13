import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const clave = "AIzaSyBYLJzaR-RwWbAMemUjdCdeuY4PCcvUEZo"; // Substitua pela sua chave
const genAI = new GoogleGenerativeAI(clave);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-exp-0801",
  systemInstruction: "",
});

// Captura os elementos necessários
const enviarBtn = document.querySelector("#enviar");
const perguntaInput = document.querySelector("#pergunta");
const conversaElement = document.querySelector("#conversa");

// Função para exibir mensagens no chat
function exibirMensagem(texto, tipo) {
  const mensagemDiv = document.createElement("div");
  mensagemDiv.classList.add("mensagem", tipo);
  mensagemDiv.textContent = texto;
  conversaElement.appendChild(mensagemDiv);

  // Rola o chat para baixo automaticamente
  conversaElement.scrollTop = conversaElement.scrollHeight;
}

// Adiciona evento ao botão enviar
enviarBtn.addEventListener("click", async () => {
  const perguntaTexto = perguntaInput.value.trim();

  if (!perguntaTexto) return; // Não faz nada se a entrada estiver vazia

  // Exibe a pergunta no chat
  exibirMensagem(perguntaTexto, "pergunta");

  // Limpa o campo de entrada
  perguntaInput.value = "";

  try {
    // Chama a IA para obter a resposta
    const result = await model.generateContent(perguntaTexto);
    const response = await result.response;
    const respostaTexto = response.text();

    // Exibe a resposta no chat
    exibirMensagem(respostaTexto, "resposta");
  } catch (error) {
    console.error("Erro ao obter resposta da IA:", error);
    exibirMensagem("Houve um erro ao processar sua pergunta.", "resposta");
  }
});
