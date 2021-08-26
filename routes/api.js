const express = require('express');
const router = express.Router();

router.get('/', () => console.log('router get'));

module.exports = router;
