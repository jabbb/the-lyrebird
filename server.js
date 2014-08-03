// module dependencies
var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  fs = require('fs');

// create express app  
var app = express();

// configure openshift
//var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.post('/search', routes.search);
app.get('/search0', routes.search0);
app.post('/postTweet', routes.postTweet);

// create server
/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/

server.listen(app.get('port'), app.get('ipaddr'), function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port );
});