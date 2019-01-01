module.exports.controller = (app) => {

  // register page
  app.get('/', (req, res) => {
    console.log(req.session);
    res.send('Homepage');
  });

  app.get('/service_status', (req, res) => {
    res.send('All Good');
  });
};
