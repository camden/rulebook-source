// @flow

import { getRulebookContent } from './utils';

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

      redis.setex(req.url, 3600, markdownResponse.encodedContent);

      return res.json({
        data: markdownResponse.encodedContent,
      });
    });
  });
};
