// @flow

import { rulebooksRoute } from './constants';
import { getAllRulebooks, getFromCache, hydrateRulebook } from './utils';

export const getRulebooks = ({ req, res, redis }) => {
  getAllRulebooks({ redis }).then(githubResponse => {
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

export const searchByTitle = async ({ req, res, redis }) => {
  let query = req.query.q;

  if (!query) {
    return res.status(400).json({
      message: "Query 'q' is required for this action.",
    });
  }

  query = query.toLowerCase().trim();

  let rulebooksArray = await getFromCache({ redis, key: rulebooksRoute });

  if (!rulebooksArray) {
    const githubResponse = await getAllRulebooks({ redis });
    rulebooksArray = githubResponse.rulebooksArray;
    redis.setex(rulebooksRoute, 3600, JSON.stringify(rulebooksArray));
  }

  const hydratedRulebooksArray = await Promise.all(
    rulebooksArray.map(rulebookName => hydrateRulebook({ rulebookName, redis }))
  );

  let matchingRulebooks = [];

  matchingRulebooks = hydratedRulebooksArray.filter(rulebook => {
    return (
      rulebook.title
        .toLowerCase()
        .trim()
        .replace('/rulebooks/', '')
        .indexOf(query) > -1
    );
  });

  redis.setex(req.url, 10, JSON.stringify(matchingRulebooks));

  return res.json({
    data: matchingRulebooks,
  });
};
