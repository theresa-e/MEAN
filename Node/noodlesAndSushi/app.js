var http = require('http');
var fs = require('fs');
var server = http.createServer(function (request, response) {
    console.log('client request URL: ', request.url);
    // route to sushi page
    if (request.url === '/sushi') { 
        fs.readFile('views/sushi.html', 'utf8', function (errors, contents) {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(contents);
            response.end();
        });
    //  route to noodle page
    } else if (request.url === '/noodles') { 
       fs.readFile('views/noodles.html', 'utf8', function (errors, contents) {
           response.writeHead(200, {
               'Content-Type': 'text/html'
           });
           response.write(contents);
           response.end();
       });
    } else if (request.url === '/sushi/new') { 
       fs.readFile('views/add-sushi.html', 'utf8', function (errors, contents) {
           response.writeHead(200, {
               'Content-Type': 'text/html'
           });
           response.write(contents);
           response.end();
       });
    // images
    } else if (request.url === "/images/sushi1.jpg") {
        fs.readFile('images/sushi1.jpg', function (errors, contents) {
            response.writeHead(200, {
                'Content-type': 'image/jpg'
            });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/images/sushi2.jpg") {
        fs.readFile('images/sushi2.jpg', function (errors, contents) {
            response.writeHead(200, {
                'Content-type': 'image/jpg'
            });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/images/sushi3.jpg") {
        fs.readFile('images/sushi3.jpg', function (errors, contents) {
            response.writeHead(200, {
                'Content-type': 'image/jpg'
            });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/images/noodles1.jpg") {
        fs.readFile('images/noodles1.jpg', function (errors, contents) {
            response.writeHead(200, {
                'Content-type': 'image/jpg'
            });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/images/noodles2.jpg") {
        fs.readFile('images/noodles2.jpg', function (errors, contents) {
            response.writeHead(200, {
                'Content-type': 'image/jpg'
            });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/images/noodles3.jpeg") {
        fs.readFile('images/noodles3.jpeg', function (errors, contents) {
            response.writeHead(200, {
                'Content-type': 'image/jpeg'
            });
            response.write(contents);
            response.end();
        });
    // link to CSS
    } else if (request.url === "/stylesheets/styles.css") {
        fs.readFile('stylesheets/styles.css', 'utf8', function (errors, contents) {
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
