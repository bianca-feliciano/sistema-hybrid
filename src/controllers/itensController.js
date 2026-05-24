const pool = require('../config/database');

exports.criarItem = async(req, res) => {

  try{
    const {nome, quantidade, patrocinador_id} = req.body;

    const result = await pool.query(
      `INSERT INTO itens
      (nome, quantidade, patrocinador_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [nome, quantidade, patrocinador_id]
    );

    res.status(201).json(result.rows[0]);

  } 

  catch(err){res.status(500).json({erro: err.message});}
};

exports.listarItem = async(req, res) => {

  try{
    const result = await pool.query('SELECT * FROM itens');

    res.json(result.rows);

  } 

  catch(err){res.status(500).json({erro: err.message});}
};

exports.buscarItem = async(req, res) => {

  try{
    const {id} = req.params;

    const result = await pool.query(
      'SELECT * FROM itens WHERE id = $1',
      [id]
    );

    res.json(result.rows[0]);

  } 
  
  catch(err){res.status(500).json({erro: err.message});}
};

exports.atualizarItem = async(req, res) => {

  try{
    const {id} = req.params;

    const {nome, quantidade} = req.body;

    const result = await pool.query(
      `UPDATE itens
      SET nome = $1, quantidade = $2
      WHERE id = $3
      RETURNING *`,
      [nome, quantidade, id]
    );

    res.json(result.rows[0]);

  } 
  
  catch(err){res.status(500).json({erro: err.message});}
};

exports.deletarItem = async(req, res) => {

  try{
    const {id} = req.params;

    await pool.query(
      'DELETE FROM itens WHERE id = $1',
      [id]
    );

    res.json({mensagem: 'Item excluído com sucesso!'});

  } 
  
  catch(err){res.status(500).json({erro: err.message});}
};