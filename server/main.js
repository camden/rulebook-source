// @flow

import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import redis from 'redis';

import { cacheHandler } from './utils';
import { addRoutes } from './routes';

process.title = process.argv[2];

const PORT = process.env.PORT || 8080;
const REDIS_URL = process.env.REDIS_URL || null;

const app = express();
const redisClient = redis.createClient({
  url: REDIS_URL,
});

redisClient.on('connect', () => {
  console.log('Connected to redis.');
  main();
});

const main = () => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const apiRouter = express.Router();

  const cache = cacheHandler({ redis: redisClient });
  apiRouter.use(cache);

  addRoutes({
    router: apiRouter,
    redis: redisClient,
  });

  app.use('/api', apiRouter);

  app.use(
    '/static',
    express.static(path.resolve(__dirname, '../../', 'dist/client/static'))
  );

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../', 'dist/client', 'index.html')
    );
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};
