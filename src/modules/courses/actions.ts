import axios from "axios";
import * as uiActions from "modules/ui/actions";

const LOAD_COURSES_REQUEST = "learning-platform/courses/LOAD_COURSES_REQUEST";
const LOAD_COURSES_SUCCESS = "learning-platform/courses/LOAD_COURSES_SUCCESS";
const LOAD_COURSES_FAILURE = "learning-platform/courses/LOAD_COURSES_FAILURE";
const LOAD_RECOMMENDED_COURSES_REQUEST =
  "learning-platform/courses/LOAD_RECOMMENDED_COURSES_REQUEST";
const LOAD_RECOMMENDED_COURSES_SUCCESS =
  "learning-platform/courses/LOAD_RECOMMENDED_COURSES_SUCCESS";
const LOAD_RECOMMENDED_COURSES_FAILURE =
  "learning-platform/courses/LOAD_RECOMMENDED_COURSES_FAILURE";
const LOAD_COURSE_REQUEST = "learning-platform/courses/LOAD_COURSE_REQUEST";
const LOAD_COURSE_SUCCESS = "learning-platform/courses/LOAD_COURSE_SUCCESS";
const LOAD_COURSE_FAILURE = "learning-platform/courses/LOAD_COURSE_FAILURE";
const LOAD_COURSE_ROUND_REQUEST =
  "learning-platform/courses/LOAD_COURSE_ROUND_REQUEST";
const LOAD_COURSE_ROUND_SUCCESS =
  "learning-platform/courses/LOAD_COURSE_ROUND_SUCCESS";
const LOAD_COURSE_ROUND_FAILURE =
  "learning-platform/courses/LOAD_COURSE_ROUND_FAILURE";
const LOAD_COURSE_CONTENT_REQUEST =
  "learning-platform/courses/LOAD_COURSE_CONTENT_REQUEST";
const LOAD_COURSE_CONTENT_SUCCESS =
  "learning-platform/courses/LOAD_COURSE_CONTENT_SUCCESS";
const LOAD_COURSE_CONTENT_FAILURE =
  "learning-platform/courses/LOAD_COURSE_CONTENT_FAILURE";
const CLEAR_COURSES = "learning-platform/courses/CLEAR_COURSES";

function loadCourses(courseCategoryId: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COURSES_REQUEST });
    try {
      var { data } = await axios.get(
        courseCategoryId === undefined
          ? `/Courses`
          : `/CourseCategories/${courseCategoryId}/Courses`
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_COURSES_SUCCESS,
        payload: {
          courses: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_COURSES_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายวิชาทั้งหมดไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

function loadRecommendedCourses() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_RECOMMENDED_COURSES_REQUEST });
    try {
      var { data } = await axios.get("/Courses/Recommended", {
        params: {
          max: 5,
        },
      });
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_RECOMMENDED_COURSES_SUCCESS,
        payload: {
          recommendedCourses: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_RECOMMENDED_COURSES_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายวิชาแนะนำไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

function loadCourse(id: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COURSE_REQUEST });
    try {
      var { data } = await axios.get(`/Courses/${id}`);
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_COURSE_SUCCESS,
        payload: {
          course: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_COURSE_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลรายวิชา ${id} ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

function loadCourseRounds(id: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COURSE_ROUND_REQUEST });
    try {
      var { data } = await axios.get(`/Courses/${id}/CourseRounds`);
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_COURSE_ROUND_SUCCESS,
        payload: {
          courseRounds: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_COURSE_ROUND_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลรอบของรายวิชา ${id} ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

function loadCourseContents(id: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COURSE_CONTENT_REQUEST });
    try {
      var { data } = await axios.get(`/Courses/${id}/CourseContents`);
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_COURSE_CONTENT_SUCCESS,
        payload: {
          courseContents: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_COURSE_CONTENT_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลเนื้อหาของรายวิชา ${id} ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
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
  LOAD_RECOMMENDED_COURSES_REQUEST,
  LOAD_RECOMMENDED_COURSES_SUCCESS,
  LOAD_RECOMMENDED_COURSES_FAILURE,
  LOAD_COURSE_REQUEST,
  LOAD_COURSE_SUCCESS,
  LOAD_COURSE_FAILURE,
  LOAD_COURSE_ROUND_REQUEST,
  LOAD_COURSE_ROUND_SUCCESS,
  LOAD_COURSE_ROUND_FAILURE,
  LOAD_COURSE_CONTENT_REQUEST,
  LOAD_COURSE_CONTENT_SUCCESS,
  LOAD_COURSE_CONTENT_FAILURE,
  CLEAR_COURSES,
  loadCourses,
  loadRecommendedCourses,
  loadCourse,
  loadCourseRounds,
  loadCourseContents,
  clearCourses,
};
