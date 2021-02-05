import axios from "axios";
const LOAD_COURSES_REQUEST = "learning-platform/courses/LOAD_COURSES_REQUEST";
const LOAD_COURSES_SUCCESS = "learning-platform/courses/LOAD_COURSES_SUCCESS";
const LOAD_COURSES_FAILURE = "learning-platform/courses/LOAD_COURSES_FAILURE";
const LOAD_COURSE_REQUEST = "learning-platform/courses/LOAD_COURSE_REQUEST";
const LOAD_COURSE_SUCCESS = "learning-platform/courses/LOAD_COURSE_SUCCESS";
const LOAD_COURSE_FAILURE = "learning-platform/courses/LOAD_COURSE_FAILURE";
const CLEAR_COURSES = "learning-platform/courses/CLEAR_COURSES";

function loadCourses(query: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COURSES_REQUEST });
    try {
      const { data } = await axios.get(`/Courses${query}`);
      dispatch({
        type: LOAD_COURSES_SUCCESS,
        payload: {
          courses: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_COURSES_FAILURE });
    }
  };
}

function loadCourse(id: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COURSE_REQUEST });
    try {
      const { data } = await axios.get(`/Courses/${id}`);
      dispatch({
        type: LOAD_COURSE_SUCCESS,
        payload: {
          course: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_COURSE_FAILURE });
    }
  };
}

function clearCourses() {
  return {
    type: CLEAR_COURSES,
  };
}

export {
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILURE,
  LOAD_COURSE_REQUEST,
  LOAD_COURSE_SUCCESS,
  LOAD_COURSE_FAILURE,
  CLEAR_COURSES,
  loadCourses,
  loadCourse,
  clearCourses,
};
