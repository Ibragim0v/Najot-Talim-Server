const { fetchData, fetchRow } = require("../../utils/postgres");

const LOGIN = `
  SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)
`;

const USER = `
  SELECT * FROM users WHERE id = $1
`;

const isUserAvailable = `
  SELECT * FROM users WHERE username = $1
`;

const selectTeachers = `
  SELECT * FROM users WHERE status = 2
`;

const insertTeacher = `
  INSERT INTO users(username, password, status, phone) VALUES($1, crypt($2, gen_salt('bf')), 2, $3)
`;

const deleteTeacher = `
  DELETE FROM users WHERE status = 2 AND id = $1
`;

const selectStudents = `
  SELECT * FROM users WHERE status = 3
`;

const insertStudent = `
  INSERT INTO users(username, password, status, phone) VALUES($1, crypt($2, gen_salt('bf')), 3, $3)
`;

const deleteStudent = `
  DELETE FROM users WHERE status = 3 AND id = $1
`;

const selectArchive = `
  SELECT * FROM archive_users
`;

const login = (username, password) => fetchRow(LOGIN, username, password);

const user = (id) => fetchRow(USER, id);

const checkingUser = (username) => fetchRow(isUserAvailable, username);

const allTeachers = () => fetchData(selectTeachers);

const createTeacher = (username, password, phone) =>
  fetchRow(insertTeacher, username, password, phone);

const removeTeacher = (id) => fetchRow(deleteTeacher, id);

const allStudents = () => fetchData(selectStudents);

const createStudent = (username, password, phone) =>
  fetchRow(insertStudent, username, password, phone);

const removeStudent = (id) => fetchRow(deleteStudent, id);

const allArchives = () => fetchData(selectArchive);

module.exports = {
  login,
  user,
  checkingUser,
  allTeachers,
  createTeacher,
  removeTeacher,
  allStudents,
  createStudent,
  removeStudent,
  allArchives,
};
