const express = require("express");
const multer = require("multer");

const FeedbackController = require("./controllers/FeedbackController");
const BoardController = require("./controllers/BoardController");
const JeController = require("./controllers/JeController");
const MemberController = require("./controllers/MemberController");
const DutyController = require("./controllers/DutyController");
const multerMiddleware = require("./middlewares/multer");
const LoginController = require("./controllers/LoginController");
const auth = require("./middlewares/auth");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ ok: false });
});

//login
routes.post("/login", LoginController.login);

//je
routes.get("/jes", JeController.index);
routes.post("/jes/signup", multer(multerMiddleware).single("file"), JeController.store);
routes.delete("/jes/delete", auth, JeController.delete);
routes.put("/jes/update", auth, multer(multerMiddleware).single("file"), JeController.update);

//member
routes.get("/jes/:jeId/members", MemberController.index);
routes.post("/jes/members/signup", auth, multer(multerMiddleware).single("file"), MemberController.store);
routes.delete("/jes/members/delete", auth, MemberController.delete);
routes.put("/jes/members/update", auth, multer(multerMiddleware).single("file"), MemberController.update);

//duty
routes.get("/duties/:memberId", DutyController.index);
routes.get("/duties/:jeId/today", DutyController.consult);
routes.post("/duties/register", auth, DutyController.store);
routes.put("/duties/finish", auth, DutyController.update);

//feedback
routes.get("/feedback", auth, FeedbackController.index);
routes.post("/duties/:dutyId/feedback", auth, FeedbackController.store);
routes.delete("/duties/feedback/delete", auth, FeedbackController.delete);
routes.put("/duties/feedback/update", auth, FeedbackController.update);
routes.put("/duties/feedback/monitoring", auth, FeedbackController.updateMonitoring);
routes.get("/duties/feedback/getId", auth, FeedbackController.getId);
routes.get('/member/:memberId/feedback', FeedbackController.getMemberDuties);

//board
routes.get("/boards", auth, BoardController.index)
routes.post("/boards/register", auth, BoardController.store)
routes.delete("/boards/delete", auth, BoardController.delete)
routes.put("/boards/update", auth, BoardController.update)


module.exports = routes;
