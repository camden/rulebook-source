// @flow

import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { addRoutes } from './routes';

process.title = process.argv[2];

const PORT = 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = express.Router();

addRoutes(apiRouter);

app.use('/api', apiRouter);

app.use(
  '/static',
  express.static(path.resolve(__dirname, '../../', 'dist/client/static'))
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'dist/client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
