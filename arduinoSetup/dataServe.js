// dataServe.js
// accepts GET requests from arduino data collector
// and spits them to console.

var http = require('http');

var server = http.createServer(function (request, response) {
	console.log('Request: ');

	console.log(request.url);

	// respond
	response.writeHead(200);
//	response.write('OK');
	response.end();
})

server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
