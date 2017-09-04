// @flow

import { getRulebookContent, getAllRulebooks, getFromCache } from './utils';

export const addRoutes = ({ router, redis }) => {
  if (!redis) {
    throw new Error('Redis client must be provided.');
  }

  router.route('/rulebooks/:rulebookName').get((req, res) => {
    const rulebookName = req.params.rulebookName + '.md';

    getRulebookContent(rulebookName).then(markdownResponse => {
      if (markdownResponse.status === 404) {
        return res.status(markdownResponse.status).json({
          message: `Rulebook ${rulebookName} not found.`,
        });
      }

      if (markdownResponse.status !== 200) {
        return res.status(markdownResponse.status).json({
          message: 'Unknown error.',
        });
      }

      if (!markdownResponse.encodedContent) {
        return res.status(500).json({
          message: 'markdownResponse must have encodedContent attribute.',
        });
      }

      const content = markdownResponse.encodedContent.replace(/\n/g, '');

      redis.setex(req.url, 3600, JSON.stringify(content));

      return res.json({
        data: content,
      });
    });
  });

  router.route('/rulebooks').get((req, res) => {
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
  });

  // For now, just search by name
  router.route('/search').get((req, res) => {
    let query = req.query.q;

    if (!query) {
      return res.status(400).json({
        message: "Query 'q' is required for this action.",
      });
    }

    query = query.toLowerCase().trim();

    // TODO Make this not a 'magic route'
    getFromCache({ redis, key: '/rulebooks' }).then(data => {
      let matchingRulebooks = [];

      if (data && Array.isArray(data)) {
        matchingRulebooks = data.filter(rulebook => {
          return (
            rulebook
              .toLowerCase()
              .trim()
              .replace('/rulebooks/', '')
              .indexOf(query) > -1
          );
        });
      }

      redis.setex(req.url, 5, JSON.stringify(matchingRulebooks));

      return res.json({
        data: matchingRulebooks,
      });
    });
  });

  router.route('/*').get((req, res) => {
    return res.status(404).send();
  });
};
