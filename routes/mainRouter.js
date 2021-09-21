const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController');

router.route('/').get(mainController.mainPage);
router.route('/upload/:id').get(mainController.uploadPage).post(mainController.uploadFile);

module.exports = router;
