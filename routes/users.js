const express = require('express');
const router = express.Router();
//user login/register routes
router.get('/login', (req, res) => {
    res.render('users/login');
});
router.get('/register', (req, res) => {
    res.render('users/register');

});

module.exports = router;