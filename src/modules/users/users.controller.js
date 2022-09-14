const model = require("./users.model");
const sign = require("../../utils/jwt");
const moment = require("moment");

module.exports = {
  LOGIN: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await model.login(username, password);

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const role =
        user.status == 1 ? "admin" : user.status == 2 ? "teacher" : "student";

      res.json({
        message: "Authorized",
        access_token: sign({
          id: user.id,
          role,
        }),
        role,
      });
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  },
  USERS: async (req, res) => {
    try {
      const { verifiedID } = req;

      res.json({
        data: await model.user(verifiedID),
      });
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  },
  GET_TEACHERS: async (_, res) => {
    res.json(
      await (
        await model.allTeachers()
      ).filter((e) => (e.registered_at = moment(e.registered_at).format("L")))
    );
  },
  POST_TEACHER: async (req, res) => {
    const { username, password, phone } = req.body;

    const isUserAvailable = await model.checkingUser(username);

    if (isUserAvailable) {
      return res.json({
        message: "User is available",
      });
    }

    await model.createTeacher(username, password, phone);

    res.status(201).json({
      message: "Teacher has been created",
    });
  },
  DELETE_TEACHER: async (req, res) => {
    try {
      const { id } = req.params;

      await model.removeTeacher(id);

      res.json({
        message: "Teacher has been removed",
      });
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  },
  GET_STUDENTS: async (_, res) => {
    res.json(
      await (
        await model.allStudents()
      ).filter((e) => (e.registered_at = moment(e.registered_at).format("L")))
    );
  },
  POST_STUDENT: async (req, res) => {
    const { username, password, phone } = req.body;

    const isUserAvailable = await model.checkingUser(username);

    if (isUserAvailable) {
      return res.json({
        message: "User is available",
      });
    }

    await model.createStudent(username, password, phone);

    res.status(201).json({
      message: "Student has been created",
    });
  },
  DELETE_STUDENT: async (req, res) => {
    try {
      const { id } = req.params;

      await model.removeStudent(id);

      res.json({
        message: "Student has been removed",
      });
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  },
  GET_ARCHIVE: async (_, res) => {
    res.json(
      await (
        await model.allArchives()
      ).filter((e) => (e.registered_at = moment(e.registered_at).format("L")))
    );
  },
};
