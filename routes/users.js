const express = require('express');
const router = express.Router();
const useAuth = require('../services/useAuth');

const { users: ctrl } = require('../controllers');

router.patch('/changeboss', useAuth, ctrl.updateUser);

router.delete('/delete/:userId', useAuth, ctrl.deleteUser);

module.exports = router;
