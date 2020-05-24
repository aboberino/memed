var app = require('./app');
var port = process.env.PORT || 4242;

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});