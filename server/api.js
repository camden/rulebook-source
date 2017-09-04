// @flow

import { getAllRulebooks } from './utils';

export const getRulebooks = ({ req, res, redis }) => {
  getAllRulebooks().then(githubResponse => {
    if (githubResponse.status !== 200) {
      return res.status(githubResponse.status).json({
        message: 'Unknown error.',
      });
    }

    redis.setex(req.url, 3600, JSON.stringify(githubResponse.rulebooksArray));

    return res.json({
      data: githubResponse.rulebooksArray,
    });
  });
};
