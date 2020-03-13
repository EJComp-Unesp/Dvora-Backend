const express = require("express");
const JeController = require('./controllers/JeController');
const MemberController = require('./controllers/MemberController');
const DutyController = require('./controllers/DutyController');
const authMiddleware = require('./middlewares//auth');

const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ ok: true });
});

routes.get('/jes', authMiddleware, JeController.index);
routes.post('/jes/signup', JeController.store);
routes.post('/jes/login', JeController.login);
routes.delete('/jes/delete', authMiddleware, JeController.delete);
routes.put('/jes/update', authMiddleware, JeController.update);

routes.get('/jes/:jeId/members', MemberController.index);
routes.post('/jes/:jeId/members/signup', MemberController.store);
routes.post('/members/login', MemberController.login);
routes.delete('/jes/:jeId/members/delete', MemberController.delete);
routes.put('/jes/:jeId/members/update', MemberController.update);

// routes.get('/members/:memberId/duties', DutyController.index);
// routes.post('/members/:memberId/duties/create', DutyController.store);

module.exports = routes;