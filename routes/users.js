const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../controllers');

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

// router.get('/:status/:id', ctrl.getOneUser);

// router.patch('/:status/:id', ctrl.updateUser);

// router.delete('/:status/:id', ctrl.deleteUser);

module.exports = router;
