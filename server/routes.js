export const addRoutes = router => {
  router.route('/rulebook/:rulebookName').get((req, res) => {
    res.json({
      rulebookName: req.params.rulebookName,
    });
  });
};
