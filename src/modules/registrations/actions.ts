// @ts-nocheck
import axios from "axios";
import * as coursesActions from "modules/courses/actions";
import * as curriculumsActions from "modules/curriculums/actions";
const LOAD_COURSE_REGISTRATIONS_REQUEST =
  "learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_REQUEST";
const LOAD_COURSE_REGISTRATIONS_SUCCESS =
  "learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_SUCCESS";
const LOAD_COURSE_REGISTRATIONS_FAILURE =
  "learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_FAILURE";
const LOAD_CURRICULUM_REGISTRATIONS_REQUEST =
  "learning-platform/registrations/LOAD_CURRICULUM_REGISTRATIONS_REQUEST";
const LOAD_CURRICULUM_REGISTRATIONS_SUCCESS =
  "learning-platform/registrations/LOAD_CURRICULUM_REGISTRATIONS_SUCCESS";
const LOAD_CURRICULUM_REGISTRATIONS_FAILURE =
  "learning-platform/registrations/LOAD_CURRICULUM_REGISTRATIONS_FAILURE";

function loadCourseRegistrations() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COURSE_REGISTRATIONS_REQUEST });
    try {
      const { data } = await axios.get("/CourseRegistrations");
      const courseIds = data.map((item) => item.courseId);
      const query = courseIds.map((id) => `id=${id}`).join("&");

      dispatch({
        type: LOAD_COURSE_REGISTRATIONS_SUCCESS,
        payload: {
          coursesRegistrations: data,
        },
      });

      dispatch(coursesActions.loadCourses(`?${query}`));
    } catch (err) {
      dispatch({ type: LOAD_COURSE_REGISTRATIONS_FAILURE });
    }
  };
}

function loadCurriculumRegistrations() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CURRICULUM_REGISTRATIONS_REQUEST });
    try {
      const { data } = await axios.get("/CurriculumRegistrations");
      const curriculumIds = data.map((item) => item.curriculumId);
      const query = curriculumIds.map((id) => `id=${id}`).join("&");

      dispatch({
        type: LOAD_CURRICULUM_REGISTRATIONS_SUCCESS,
        payload: {
          curriculumsRegistrations: data,
        },
      });

      dispatch(curriculumsActions.loadCurriculums(`?${query}`));
    } catch (err) {
      dispatch({ type: LOAD_CURRICULUM_REGISTRATIONS_FAILURE });
    }
  };
}

export {
  LOAD_COURSE_REGISTRATIONS_REQUEST,
  LOAD_COURSE_REGISTRATIONS_SUCCESS,
  LOAD_COURSE_REGISTRATIONS_FAILURE,
  loadCourseRegistrations,
  LOAD_CURRICULUM_REGISTRATIONS_REQUEST,
  LOAD_CURRICULUM_REGISTRATIONS_SUCCESS,
  LOAD_CURRICULUM_REGISTRATIONS_FAILURE,
  loadCurriculumRegistrations,
};
