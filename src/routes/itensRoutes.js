const express = require('express');
const router = express.Router();

const itensController = require('../controllers/itensController');
const authMiddleware = require('../middlewares/authMiddleware');
const admin = require('../middlewares/admin');

router.post('/', authMiddleware, itensController.criarItem);

router.get('/', itensController.listarItem);
router.get('/:id', itensController.buscarItem);

router.put('/:id', authMiddleware, itensController.atualizarItem);

router.delete('/:id', authMiddleware, admin, itensController.deletarItem);

module.exports = router;