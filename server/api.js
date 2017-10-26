// @flow

import { rulebooksRoute } from './constants';
import {
  getAllRulebooks,
  getGithubContent,
  getFromCache,
  hydrateRulebook,
} from './utils';

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

// Includes file extension!
export const getConfig = async ({ req, res, redis }) => {
  // TODO pull this out into a helper func to reduce duplicated code
  const configName = req.params.configName;

  const configUrl = `/config/${configName}`;

  let configData = await getFromCache({
    key: 'config-' + configName,
    redis,
  });

  // Nothing was found in the cache for this rulebook
  if (!configData) {
    const githubData = await getGithubContent({
      urlSuffix: configUrl,
      json: true,
    });

    const content = githubData.content.replace(/\n/g, '');
    configData = content;
    redis.setex('config-' + configName, 3600, JSON.stringify(configData));
  }

  return res.json({
    data: configData,
  });
};

export const getPage = async ({ req, res, redis }) => {
  const pageName = req.params.pageName;

  const pageUrl = `/pages/${pageName}.md`;

  let pageData = await getFromCache({
    key: 'page-' + pageName,
    redis,
  });

  // Nothing was found in the cache for this rulebook
  if (!pageData) {
    const githubData = await getGithubContent({
      urlSuffix: pageUrl,
      json: true,
    });
    const content = githubData.content.replace(/\n/g, '');
    pageData = content;
    redis.setex('page-' + pageName, 3600, JSON.stringify(pageData));
  }

  return res.json({
    data: pageData,
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

  let matchingRulebooks = [];

  matchingRulebooks = rulebooksArray.filter(rulebook => {
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
