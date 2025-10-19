import http from 'node:http';

const port = Number(process.env.API_PORT ?? 8080);

const server = http.createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Yuna API running');
});

server.listen(port, () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});
