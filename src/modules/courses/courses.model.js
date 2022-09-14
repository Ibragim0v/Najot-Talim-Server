const { fetchData, fetchRow } = require("../../utils/postgres");

const SELECT_COURSES = `
    SELECT * FROM courses
`;

const INSERT_COURSE = `
  INSERT INTO courses(title, price, body) VALUES($1, $2, $3)
`;

const UPDATE_COURSE = `
  UPDATE
    courses
  SET
    title = (
      CASE
        WHEN LENGTH($1) > 0 THEN $1 ELSE title
      END
    ),
    price = (
      CASE 
        WHEN $2 > 0 THEN $2 ELSE price
      END
    ),
    body = (
      CASE
        WHEN LENGTH($3) > 0 THEN $3 ELSE body 
      END
    )
    WHERE 
      id = $4
`;

const DELETE_COURSE = `
  DELETE FROM courses WHERE id = $1
`;

const allCourses = () => fetchData(SELECT_COURSES);

const addCourse = (title, price, body) =>
  fetchRow(INSERT_COURSE, title, price, body);

const editCourse = (title, price, body, id) =>
  fetchRow(UPDATE_COURSE, title, price, body, id);

const removeCourse = (id) => fetchRow(DELETE_COURSE, id);

module.exports = {
  allCourses,
  addCourse,
  editCourse,
  removeCourse,
};
