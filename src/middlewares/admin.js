module.exports = (req, res, next) => {

    if(req.usuario.role !== 'admin') {
        return res.status(403).json({erro: 'Acesso negado. Procure um administrador para executar esta tarefa.'});
    }

    next();
};