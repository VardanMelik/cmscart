const express = require('express');
const router = express.Router();

/*
* GET pages index
*/
router.get('/', (req, res) => {
    res.send('admin panel');
});

/*
* GET add page
*/
router.get('/add-page', (req, res) => {
    let title = "";
    let slug = "";
    let content = "";
    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    })
})


module.exports = router;