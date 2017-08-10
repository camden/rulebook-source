// @flow

import { getMarkdownForRulebook } from './utils';

export const addRoutes = router => {
  router.route('/rulebooks/:rulebookName').get((req, res) => {
    const rulebookName = req.params.rulebookName;

    getMarkdownForRulebook(rulebookName).then(markdownResponse => {
      if (markdownResponse.status !== 200) {
        return res.status(markdownResponse.status).json({
          message: `Rulebook ${rulebookName} not found.`,
        });
      }

      return res.json({
        markdownData: markdownResponse.data,
      });
    });
  });
};
