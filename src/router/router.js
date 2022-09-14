const express = require("express");
const router = express.Router();

const usersController = require("../modules/users/users.controller");
const coursesController = require("../modules/courses/courses.controller");
const groupsController = require("../modules/groups/groups.controller");
const verifyToken = require("../middlewares/verifyToken.middleware");

router
  .get("/user", verifyToken, usersController.USERS)
  .get("/teachers", usersController.GET_TEACHERS)
  .get("/students", usersController.GET_STUDENTS)
  .get("/archive", usersController.GET_ARCHIVE)
  .get("/courses", coursesController.GET_COURSES)
  .get("/courses", coursesController.GET_COURSES)
  .get("/groups", groupsController.GET_GROUPS)
  .post("/login", usersController.LOGIN)
  .post("/teachers", usersController.POST_TEACHER)
  .post("/students", usersController.POST_STUDENT)
  .post("/courses", coursesController.POST_COURSES)
  .post("/groups", groupsController.POST_GROUPS)
  .post("/studentgroups", groupsController.POST_STUDENT_GROUP)
  .put("/courses/:id", coursesController.PUT_COURSES)
  .delete("/teachers/:id", usersController.DELETE_TEACHER)
  .delete("/students/:id", usersController.DELETE_STUDENT)
  .delete("/courses/:id", coursesController.DELETE_COURSES);

module.exports = router;
