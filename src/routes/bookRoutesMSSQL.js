var express = require('express');
var bookRouter = express.Router();

//returns same instance as app.js
var sql = require('mssql');

//setup books router
bookRouter.route('/')
    .get(function (req, res) {
        //res.send('hello books');
        //res.render('books');
        var request = new sql.Request();
        //recordset comes back in json
        request.query('select * from books', function (err, recordset) {
            console.log(recordset);
            res.send(recordset);
        });
    });

bookRouter.route('/:id')
    .all(function (req, res, next) {
        var id = req.params.id;
        var ps = new sql.PreparedStatement();
        ps.input('id', sql.Int);
        ps.prepare('select * from books where id = @id',
            function (err) {
                ps.execute({ id: req.params.id },
                    function (err, recordset) {
                        //res.send(recordset);
                        if (recordset.length === 0) {
                            res.status(404).send('Not Found');
                        }
                        else {
                            req.book = recordset[0];
                            next();
                        }
                    });
            });
    })
    .get(function (req, res) {
        res.send(req.book);
        //res.send('hello single book');
    });

bookRouter.route('/single')
    .get(function (req, res) {
        res.send('hello single book');
    });


module.exports = bookRouter;