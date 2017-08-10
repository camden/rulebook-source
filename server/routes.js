export const addRoutes = router => {
  router.route('/rulebooks/:rulebookName').get((req, res) => {
    res.json({
      rulebookName: req.params.rulebookName,
    });
  });
};
