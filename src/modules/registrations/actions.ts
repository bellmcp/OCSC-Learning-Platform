// @ts-nocheck
import axios from "axios";
import * as coursesActions from "modules/courses/actions";
const LOAD_COURSE_REGISTRATIONS_REQUEST =
  "learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_REQUEST";
const LOAD_COURSE_REGISTRATIONS_SUCCESS =
  "learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_SUCCESS";
const LOAD_COURSE_REGISTRATIONS_FAILURE =
  "learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_FAILURE";

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
          registrations: data,
        },
      });

      dispatch(coursesActions.loadCourses(`?${query}`));
    } catch (err) {
      dispatch({ type: LOAD_COURSE_REGISTRATIONS_FAILURE });
    }
  };
}

export {
  LOAD_COURSE_REGISTRATIONS_REQUEST,
  LOAD_COURSE_REGISTRATIONS_SUCCESS,
  LOAD_COURSE_REGISTRATIONS_FAILURE,
  loadCourseRegistrations,
};
