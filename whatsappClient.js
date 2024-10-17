const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth()
});

let qrCodeImage = null;
let connectedNumber = null;

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    const qrImage = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}`;
    qrCodeImage = qrImage;
});

client.on('ready', async () => {
    console.log('WhatsApp Conectado!');
    connectedNumber = client.info.wid.user;
    console.log(`Número conectado: ${connectedNumber}`);
});

app.get('/qr', (req, res) => {
    if (qrCodeImage) {
        res.send({ qr: qrCodeImage });
    } else {
        res.status(404).send({ error: 'QR Code indisponível' });
    }
});

app.get('/status', (req, res) => {
    if (connectedNumber) {
        res.send({ status: 'conectado', number: connectedNumber });
    } else {
        res.send({ status: 'desconectado' });
    }
});

app.post('/disconnect', async (req, res) => {
    try {
        await client.logout();
        connectedNumber = null;
        qrCodeImage = null;
        res.send({ status: 'desconectado' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao desconectar o WhatsApp.' });
    }
});

async function sendMessageWithDelay(userId, message, delay) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            await client.sendMessage(userId, message);
            resolve();
        }, delay);
    });
}

client.on('message', async (message) => {
    console.log('Mensagem recebida:', message.body);

    try {
        const rasaResponse = await sendMessageToRasa(message);
        console.log('Resposta do Rasa:', rasaResponse);

        let replyMessage = null;

        if (rasaResponse.length > 0) {
            replyMessage = rasaResponse[0].text;
            await sendMessageWithDelay(message.from, replyMessage, 1000); 
        } else {
            replyMessage = 'Desculpe, não consegui entender a sua mensagem.';
            await sendMessageWithDelay(message.from, replyMessage, 1000); 
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem ao Rasa:', error);
        await client.sendMessage(message.from, 'Ocorreu um erro ao processar sua mensagem.');
    }
});

async function sendMessageToRasa(message) {
    const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sender: message.from,
            message: message.body,
        }),
    });

    return await response.json();
}

client.initialize();

app.listen(PORT, () => {
    console.log(`WhatsApp cliente está rodando no http://localhost:${PORT}`);
});