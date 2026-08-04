const express = require('express');
const router = express.Router();
const rendimentosController = require('../controllers/rendimentosController');

router.post('/', rendimentosController.registrarRendimento);
router.get('/', rendimentosController.listarRendimentos);

module.exports = router;
