const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  const target = 'https://sams-wifi.vercel.app' + req.url;
  https.get(target, (r) => {
    let body = '';
    r.on('data', c => body += c);
    r.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(body);
    });
  }).on('error', (e) => {
    res.writeHead(500);
    res.end(JSON.stringify({ ok: false, error: e.message }));
  });
}).listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('Proxy ready');
});
