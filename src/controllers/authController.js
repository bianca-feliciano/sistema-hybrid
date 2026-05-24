const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {

  try {
    const {nome, email, senha, role} = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    
    const result = await pool.query(
      `INSERT INTO usuarios
      (nome, email, senha, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nome, email, role`,
      [nome, email, senhaHash, role || 'membro']
    );

    res.status(201).json(result.rows[0]);

  }

  catch(err) {
    res.status(500).json({erro: err.message});
  }
};

exports.login = async(req, res) => {

  try {
    const {email, senha} = req.body;
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({erro: 'Usuário inexistente'});
    }

    const usuario = result.rows[0];

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({erro: 'Senha inválida'});
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.json({token});

  } 

  catch(err) {
    res.status(500).json({
      erro: err.message
    });
  }
};