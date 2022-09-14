const model = require("./groups.model");

module.exports = {
  GET_GROUPS: async (_, res) => {
    res.json({
      data: await model.allGroups(),
    });
  },
  POST_GROUPS: async (req, res) => {
    const { title, course_id, teacher_id } = req.body;

    await model.addGroups(title, course_id, teacher_id);

    res.json({
      message: "Group has been created",
    });
  },
  POST_STUDENT_GROUP: async (req, res) => {
    const { group_id, student_id } = req.body;

    await model.addStudentGroup(group_id, student_id);

    res.json({
      message: "Group has been created",
    });
  },
};
