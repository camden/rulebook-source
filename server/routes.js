// @flow

import { getMarkdownForRulebook } from './utils';

export const addRoutes = router => {
  router.route('/rulebooks/:rulebookName').get((req, res) => {
    const rulebookName = req.params.rulebookName;

    getMarkdownForRulebook(rulebookName).then(markdown => {
      return res.json({
        markdownData: markdown,
      });
    });
  });
};
