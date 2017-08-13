// @flow

import { getMarkdownForRulebook } from './utils';

export const addRoutes = router => {
  router.route('/rulebooks/:rulebookName').get((req, res) => {
    const rulebookName = req.params.rulebookName;

    getMarkdownForRulebook(rulebookName).then(markdownResponse => {
      if (markdownResponse.status === 404) {
        return res.status(markdownResponse.status).json({
          message: `Rulebook ${rulebookName} not found.`,
        });
      }

      res.status(markdownResponse.status);

      return res.json({
        rulebookData: markdownResponse.data,
      });
    });
  });
};
