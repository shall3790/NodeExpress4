var express = require('express');
var sql = require('mssql');

var config = {
    user: 'books',
    password: 'books',
    server: 'LPCHL00437', // You can use 'localhost\\instance' to connect to named instance 
    database: 'Books',

    options: {
        encrypt: false // Use this if you're on Windows Azure 
    }
}

sql.connect(config, function (err) {
    console.error('error: '+ err);
});

var app = express();

var port = process.env.PORT || 5000;
var bookRouter = require('./src/routes/bookRoutesMSSQL');
var adminRouter = require('./src/routes/adminRoutes');

app.use(express.static('/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/admin', adminRouter);


app.get('/', function (req, res) {
    res.render('index', { title: 'Hello World from render', list: ['Books', 'Authors', 'c'] });
});


app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('running server on port: ' + port);
});