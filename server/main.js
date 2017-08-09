import express from 'express';
import path from 'path';

const app = express();

app.use(
  '/static',
  express.static(path.resolve(__dirname, '../../', 'dist/client/static'))
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'dist/client', 'index.html'));
});

app.listen(8080, () => {});
