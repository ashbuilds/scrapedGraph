var Stock = require('../models/stock');

module.exports = function(app, router) {

    var path = "/";

    router.use(function(req, res, next) {
        console.log(__filename, __dirname);
        console.log('new Request..');
        next();
    });

    router.get(path, function(req, res) {
        res.json({
            message: 'Test api on azure'
        });
    });

    router.route('/stock')
        .post(function(req, res) {
            var stock = new Stock();

            Object.keys(req.body).forEach(function(key) {
                stock[key] = req.body[key];
            });

            stock.save(function(err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Stock created!'
                });
            });

        })
        .get(function(req, res) {
            Stock.find(function(err, stock) {
                if (err)
                    res.send(err);

                res.json(stock);
            });
        });

    router.route('/stock/:stock_id')
        .get(function(req, res) {
            Stock.findById(req.params.stock_id, function(err, stock) {
                if (err)
                    res.send(err);
                res.json(stock);
            });
        })
        .put(function(req, res) {
            Stock.findById(req.params.stock_id, function(err, stock) {

                if (err)
                    res.send(err);

                Object.keys(req.body).forEach(function(key) {
                    stock[key] = req.body[key];
                });

                stock.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({
                        message: 'Stock updated!'
                    });
                });

            });
        })
        .delete(function(req, res) {
            Stock.remove({
                _id: req.params.stock_id
            }, function(err, stock) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Stock deleted'
                });
            });
        });

    router.route('/stock/filter')
        .post(function(req, res) {
            var sortBy = "sortBy" in req.body ? req.body.sortBy : null;
            delete req.body.sortBy;

            Stock.find(req.body).sort(sortBy).exec(function(err, result) {
                err ? res.send(err) : res.json(result);
            })
        });

    app.use(path, router);

}