const express = require('express');
const router = express.Router();
const ativosController = require('../controllers/ativosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', ativosController.cadastrarAtivo);
router.get('/', ativosController.listarAtivos);

module.exports = router;
