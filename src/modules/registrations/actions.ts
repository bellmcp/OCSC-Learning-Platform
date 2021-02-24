// @ts-nocheck
import axios from "axios";
import { push } from "connected-react-router";
import * as coursesActions from "modules/courses/actions";
import * as curriculumsActions from "modules/curriculums/actions";
import * as uiActions from "modules/ui/actions";
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
const CURRICULUM_REGISTRATION_REQUEST =
  "learning-platform/registrations/CURRICULUM_REGISTRATION_REQUEST";
const CURRICULUM_REGISTRATION_SUCCESS =
  "learning-platform/registrations/CURRICULUM_REGISTRATION_SUCCESS";
const CURRICULUM_REGISTRATION_FAILURE =
  "learning-platform/registrations/CURRICULUM_REGISTRATION_FAILURE";

const path = "/learning-platform";

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

function registerCurriculum(curriculumId) {
  return async (dispatch, getState) => {
    const {
      user: { items },
      login: { users },
    } = getState();

    try {
      const { data } = await axios.post(
        `/Users/${items.id}/CurriculumRegistrations`,
        {
          curriculumId: parseInt(curriculumId),
        },
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
          headers: { Authorization: `Bearer ${users.token}` },
        }
      );
      dispatch({
        type: CURRICULUM_REGISTRATION_SUCCESS,
        payload: { curriculumRegister: data },
      });
      dispatch(uiActions.setFlashMessage("ลงทะเบียนหลักสูตรเรียบร้อยแล้ว"));
      dispatch(push(`${path}/learn`));
    } catch (err) {
      dispatch({ type: LOAD_CURRICULUM_REGISTRATIONS_FAILURE });
      dispatch(
        uiActions.setFlashMessage(`ลงทะเบียนหลักสูตรไม่สำเร็จ ${err.message}`)
      );
    }
  };
}

export {
  LOAD_COURSE_REGISTRATIONS_REQUEST,
  LOAD_COURSE_REGISTRATIONS_SUCCESS,
  LOAD_COURSE_REGISTRATIONS_FAILURE,
  LOAD_CURRICULUM_REGISTRATIONS_REQUEST,
  LOAD_CURRICULUM_REGISTRATIONS_SUCCESS,
  LOAD_CURRICULUM_REGISTRATIONS_FAILURE,
  CURRICULUM_REGISTRATION_REQUEST,
  CURRICULUM_REGISTRATION_SUCCESS,
  CURRICULUM_REGISTRATION_FAILURE,
  loadCourseRegistrations,
  loadCurriculumRegistrations,
  registerCurriculum,
};
