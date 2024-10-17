const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

app.post('/train', upload.single('nluData'), (req, res) => {
    console.log('Requisição recebida:', req.file);

    if (!req.file) {
        console.error('Nenhum arquivo de NLU enviado');
        return res.status(400).send('Nenhum arquivo de NLU enviado.');
    }

    const filePath = req.file.path;

    fs.readFile(filePath, 'utf8', (err, nluData) => {
        if (err) {
            console.error('Erro ao ler o arquivo de NLU:', err);
            return res.status(500).send('Erro ao ler o arquivo de NLU.');
        }

        const rasaFilePath = './data/nlu.yml';
        fs.writeFile(rasaFilePath, nluData, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo de NLU:', err);
                return res.status(500).send('Erro ao salvar o arquivo de NLU.');
            }

            const rasaTrainCommand = '/Users/diastorm/Desktop/desafio_vonix1/rasa/venv/bin/rasa train';

            exec(rasaTrainCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro no treinamento do Rasa: ${error.message}`);
                    return res.status(500).send(`Erro no treinamento do Rasa: ${error.message}`);
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return res.status(500).send(`Erro no treinamento: ${stderr}`);
                }
                console.log(`stdout: ${stdout}`);
                res.send('Treinamento concluído com sucesso!');
            });
        });
    });
});
