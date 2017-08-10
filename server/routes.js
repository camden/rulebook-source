export const addRoutes = router => {
  router.route('/rulebooks/:rulebookName').get((req, res) => {
    res.json({
      markdownData: 'this is data!',
    });
  });
};
