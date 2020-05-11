const express = require('express');
const router = express.Router();

router.get('/v1/stores/:storeId', (req, res) => {
    let data = require('../samples/storeid');
    if (req.params.storeId == '1237') {
        data = require('../samples/storeidHidden');
        res.statusCode = 404;
    }
    res.send(data);
});

router.get('/v1/products/:skip/:top/:count', (req, res) => {
    let data = require('../samples/products');
    let result = {
        count: data.length,
    }
    var skip = req.params.skip;
    var top = req.params.top;
    totalCount = data.length;
    var citrus = data.slice(skip, skip + top);
    // console.log(citrus.length);
    result.data = citrus;
    res.send(result);
});

module.exports = router;
