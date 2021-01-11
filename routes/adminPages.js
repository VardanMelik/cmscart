const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'CMS Cart Admin'
    });
});


module.exports = router;