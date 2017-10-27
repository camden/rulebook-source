// @flow

import 'babel-polyfill';

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import prerender from 'prerender-node';
import path from 'path';
import redis from 'redis';

import { cacheHandler } from './utils';
import { addRoutes } from './routes';

// Setup env vars
dotenv.config();
if (!process.env.PRERENDER_TOKEN) {
  throw new Error('Prerender token must be set.');
}

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
  app.use(prerender.set('prerenderToken', process.env.PRERENDER_TOKEN));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const apiRouter = express.Router();

  const cache = cacheHandler({ redis: redisClient });
  apiRouter.use(cache);

  addRoutes({
    router: apiRouter,
    redis: redisClient,
  });

  const cacheClient = options => {
    return (req, res, next) => {
      if (!options) {
        options = {};
      }

      if (options.match && req.url.indexOf(options.match) === -1) {
        return next();
      }

      // 14 days default
      let expiryTime = 1209600;

      if (options.expiryDays) {
        expiryTime = options.expiryDays * 86400;
      }

      res.setHeader('Cache-Control', `public, max-age=${expiryTime}`);
      res.setHeader(
        'Expires',
        new Date(Date.now() + expiryTime * 1000).toUTCString()
      );
      next();
    };
  };

  app.use(
    '/api',
    cacheClient({ match: '/rulebooks', expiryDays: 0.5 }),
    cacheClient({ match: '/assets', expiryDays: 14 }),
    apiRouter
  );

  app.use(
    '/static',
    cacheClient(),
    express.static(path.resolve(__dirname, '../../', 'dist/client/static'))
  );

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../', 'dist/client/', 'index.html')
    );
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};
