const express = require('express');
const router = express.Router();

const {users:ctrl} = require('../controllers/users')

 

router.post('/signup',  ctrl.createUser);

router.get('/', ctrl.getAllUsers);

router.get('/', () => console.log('get one'));

router.patch('/', () => console.log('router patch'));

router.delete('/', () => console.log('router delete'));

module.exports = router;
