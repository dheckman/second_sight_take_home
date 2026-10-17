import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3001;

app.get('/api/hello', (_request, response) => {
  response.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
