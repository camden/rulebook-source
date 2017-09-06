// @flow

import { getAllRulebooks, getRulebookContent, getFromCache } from './utils';
import { getRulebooks, searchByTitle } from './api';
import { rulebooksRoute } from './constants';

export const addRoutes = ({ router, redis }) => {
  if (!redis) {
    throw new Error('Redis client must be provided.');
  }

  router.route('/rulebooks/:rulebookName').get((req, res) => {
    const rulebookName = req.params.rulebookName;

    getRulebookContent({ rulebookName, redis }).then(markdownResponse => {
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

      return res.json({
        data: content,
      });
    });
  });

  router.route(rulebooksRoute).get((req, res) => {
    return getRulebooks({ req, res, redis });
  });

  // For now, just search by name
  router.route('/search').get((req, res) => {
    return searchByTitle({ req, res, redis });
  });

  router.route('/*').get((req, res) => {
    return res.status(404).send();
  });
};
