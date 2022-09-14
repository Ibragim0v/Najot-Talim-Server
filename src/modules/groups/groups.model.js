const { fetchData, fetchRow } = require("../../utils/postgres");

const SELECT_GROUPS = `
    SELECT * FROM groups
`;

const INSERT_GROUP = `
  INSERT INTO groups(title, course_id, teacher_id) VALUES($1, $2, $3)
`;

const SELECT_TEACHER_GROUP = `
  SELECT * FROM groups WHERE teacher_id = $1
`;

const SELECT_STUDENT_GROUP = `
  SELECT * FROM student_groups WHERE student_id = $1
`;

const INSERT_STUDENT_GROUP = `
  INSERT INTO student_groups(group_id, student_id) VALUES($1, $2)
`;

const allGroups = () => fetchData(SELECT_GROUPS);

const addGroups = (title, course_id, teacher_id) =>
  fetchRow(INSERT_GROUP, title, course_id, teacher_id);

const addStudentGroup = (group_id, student_id) =>
  fetchRow(INSERT_STUDENT_GROUP, group_id, student_id);

module.exports = {
  allGroups,
  addGroups,
  addStudentGroup,
};
