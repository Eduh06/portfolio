const express = require('express');
const router = express.Router();
const rendimentosController = require('../controllers/rendimentosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', rendimentosController.registrarRendimento);
router.get('/', rendimentosController.listarRendimentos);

module.exports = router;
