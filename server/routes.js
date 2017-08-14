// @flow

import { getMarkdownForRulebook } from './utils';

export const addRoutes = ({ router, redis }) => {
  if (!redis) {
    throw new Error('Redis client must be provided.');
  }

  router.route('/rulebooks/:rulebookName').get((req, res) => {
    const rulebookName = req.params.rulebookName;

    getMarkdownForRulebook(rulebookName).then(markdownResponse => {
      if (markdownResponse.status === 404) {
        return res.status(markdownResponse.status).json({
          message: `Rulebook ${rulebookName} not found.`,
        });
      }

      res.status(markdownResponse.status);

      redis.set(req.url, markdownResponse.data.content);

      return res.json({
        data: markdownResponse.data.content,
      });
    });
  });
};
