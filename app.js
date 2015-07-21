var express = require('express');
var app = express();
var path = require('path');

var server = app.listen(5555, function() {
	console.log('Program running on port : 5555');
});
var io = require('socket.io').listen(server);

app.use(express.static('/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/index2.html', function(req, res) {
    res.sendFile(path.join(__dirname+'/index2.html'));
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('startdot', function(data) {
		//console.log('begin X: ', data.beginx);
		//console.log('begin Y: ', data.beginy);
		socket.broadcast.emit('draw', {beginx: data.beginx, beginy: data.beginy});
	});
	socket.on('movedot', function(data) {
		//console.log('move X: ', data.movex);
		//console.log('move Y: ', data.movey);
		socket.broadcast.emit('draw', {movex: data.movex, movey: data.movey});
	});
	socket.on('finishdot', function(data) {
		//console.log('end X: ', data.endx);
		//console.log('end Y: ', data.endy);
		socket.broadcast.emit('draw', {endx: data.endx, endy: data.endy});
	});
});