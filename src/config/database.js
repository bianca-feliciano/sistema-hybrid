const{Pool} = require('pg');

//inicializando conexão reutilizável com o banco de dados, para não ter a necessidade de carregamento em toda requisição
//uso de arquivo .env para esconder variáveis de ambiente
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;