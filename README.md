
# CB-API

Esta API é parte integrante do projeto CB-Chatbot. Para rodar o projeto corretamente, siga os passos abaixo.

## Pré-requisitos

- **Docker**: Certifique-se de que o Docker está instalado em sua máquina. Você pode verificar isso com o comando:
  ```bash
  docker --version
  ```
  Caso o Docker não esteja instalado, siga as instruções de instalação no site oficial: [https://www.docker.com/get-started](https://www.docker.com/get-started)

- **Node.js**: É necessário utilizar a versão **v16.16.0** do Node.js. Para verificar a versão instalada:
  ```bash
  node --version
  ```
  Se você precisar alterar a versão do Node.js, recomendamos usar o [nvm](https://github.com/nvm-sh/nvm) para gerenciar diferentes versões de Node.js. Para instalar a versão correta, execute:
  ```bash
  nvm install 20.15.0
  nvm use 20.15.0
  ```

### Instruções para rodar o Docker

1. Navegue até o diretório onde está o arquivo `docker-compose.yml`.
2. Execute o seguinte comando para subir o banco de dados MySQL:
   ```bash
   docker-compose up -d
   ```

   Isso criará e iniciará o container do MySQL. O container será nomeado como `vnx-db-container`, e as credenciais do banco de dados serão configuradas conforme especificado no `docker-compose.yml`.

3. Para verificar se o container está rodando corretamente, use o comando:
   ```bash
   docker ps
   ```

4. Para acessar o banco pelo console:
   ```bash
   docker exec -it vnx-db-container mysql -u root -p

   use vnxdb_chatbot
   ```
   A senha esta no docker-compose.yml
   show tables para verificar se as tabelas foram criadas (utters e intents).


### Observação Importante

**Não altere as portas** configuradas no arquivo `docker-compose.yml` (a porta `3306` está mapeada para o MySQL). Alterações podem causar erros de comunicação entre o backend e o frontend.

## Rodando a API

Após configurar e subir o Docker, você pode rodar a API com o seguinte comando:

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```
2. Instale puppeteer para funcionar corretamente o QRCODE do WHATSAPP:
   ```bash
   npm install puppeteer
   ```

3. Execute a API em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

A API será iniciada e estará pronta para se comunicar com o banco de dados MySQL configurado.

## Estrutura do Projeto

- **Docker**: Contém a configuração do banco de dados.
- **MySQL**: Banco de dados usado para armazenar informações do chatbot.
- **Node.js**: Utilizado para rodar a API.

Siga os passos descritos para garantir a correta execução do projeto sem problemas de configuração entre as partes.
