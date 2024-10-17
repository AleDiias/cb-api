const WebSocket = require('ws');
const fetch = require('node-fetch');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Servidor WebSocket rodando na porta 8080');

wss.on('connection', ws => {
  console.log('Novo cliente conectado');
  
  ws.on('message', async message => {
    console.log('Mensagem recebida do cliente:', message);
    
    const userMessage = JSON.parse(message).message;

    try {
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'user', message: userMessage }),
      });

      const rasaResponse = await response.json();
      console.log('Resposta do Rasa:', rasaResponse);
      
      rasaResponse.forEach(res => {
        ws.send(JSON.stringify(res));
      });
    } catch (error) {
      console.error('Erro ao se comunicar com o Rasa:', error);
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});