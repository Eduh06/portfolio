const express = require('express');
const router = express.Router();
const painelController = require('../controllers/painelController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', painelController.obterDadosPainel);

module.exports = router;
