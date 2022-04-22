const http = require('http');
const fs = require('fs');
const os = require('os');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
  const path = req.url;
  if (path === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./pages/index.html', 'utf8', (err, data) => {
      if (err) {
        res.write('<p style="color:red;"><strong>Sorry</strong>, something went wrong. Try again.</p>');
      } else {
        res.write(data);
      }
      res.end();
    });

  } else if (path === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./pages/about.html', 'utf8', (err, html) => {
      if (err) {
        res.write('<p style="color:red;"><strong>Sorry</strong>, something went wrong. Try again.</p>');
      } else {
        res.write(html);
      }
      res.end();
    });

  } else if (path === '/sys') {
    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain');

    let osinfo = {
    };

    osinfo.hostname = os.hostname();
    osinfo.platform = os.platform();
    osinfo.architecture=os.arch();
    osinfo.numberOfCPUS = os.cpus().length;
    osinfo.networkInterfaces = os.networkInterfaces();
    osinfo.uptime = os.uptime();

    fs.writeFile('./osinfo.json', JSON.stringify(osinfo, null, 4), (err) => {
      if (err) {
        res.end('Sorry, something went wrong. Try again.');
      }
      res.end('Your OS info has been saved successfully!');
    });

  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./pages/404.html', null, (err, html) => {
      res.write(html);
      res.end();
    });
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});