// @flow

import { getRulebookContent, getAllRulebooks } from './utils';

export const addRoutes = ({ router, redis }) => {
  if (!redis) {
    throw new Error('Redis client must be provided.');
  }

  router.route('/rulebooks/:rulebookName').get((req, res) => {
    const rulebookName = req.params.rulebookName;

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

  router.route('/*').get((req, res) => {
    return res.status(404).send();
  });
};
