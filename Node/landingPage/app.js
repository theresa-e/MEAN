var http = require('http');
var fs = require('fs');
var server = http.createServer(function (request, response) {
    console.log('client request URL: ', request.url);
    if (request.url === '/') {
        fs.readFile('content/index.html', 'utf8', function (errors, contents) {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/dojos/new") {
        fs.readFile('content/dojos.html', 'utf8', function (errors, contents) {
            response.writeHead(200, {
                'Content-type': 'text/html'
            });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/ninjas") {
        fs.readFile('content/ninjas.html', 'utf8', function (errors, contents) {
            response.writeHead(200, {
                'Content-type': 'text/html'
            });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/static/css/styles.css") {
            fs.readFile('static/css/styles.css', 'utf8', function (errors, contents) {
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });
                response.write(contents);
                response.end();
            });
    } else {
        response.end('File not found!!!');
    }
});
server.listen(6789);
console.log("Running in localhost at port 6789");
