const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/greet'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, welcome to Node.js!');
  }
  else{
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found');
  }
});

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
