const model = require("./courses.model");

module.exports = {
  GET_COURSES: async (_, res) => {
    res.json({
      data: await model.allCourses(),
    });
  },
  POST_COURSES: async (req, res) => {
    const { title, price, body } = req.body;

    await model.addCourse(title, price, body);

    res.json({
      message: "Course has been created",
    });
  },
  PUT_COURSES: async (req, res) => {
    const { id } = req.params;

    const { title, price, body } = req.body;

    await model.editCourse(title, price, body, id);

    res.json({
      message: "Course has been updated",
    });
  },
  DELETE_COURSES: async (req, res) => {
    const { id } = req.params;

    await model.removeCourse(id);

    res.json({
      message: "Course has been removed",
    });
  },
};
