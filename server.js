require('dotenv').config();

const app = require('./src/app');

app.listen(3000, () => {console.log('Servidor sendo executado na porta 3000 com sucesso!');});