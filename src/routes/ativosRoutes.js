const express = require('express');
const router = express.Router();
const ativosController = require('../controllers/ativosController');

router.post('/', ativosController.cadastrarAtivo);
router.get('/', ativosController.listarAtivos);

module.exports = router;
