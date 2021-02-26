// @ts-nocheck
import axios from "axios";
import { getCookie } from "utils/cookies";
import { push } from "connected-react-router";
import parseJwt from "utils/parseJwt";
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
const COURSE_REGISTRATION_REQUEST =
  "learning-platform/registrations/COURSE_REGISTRATION_REQUEST";
const COURSE_REGISTRATION_SUCCESS =
  "learning-platform/registrations/COURSE_REGISTRATION_SUCCESS";
const COURSE_REGISTRATION_FAILURE =
  "learning-platform/registrations/COURSE_REGISTRATION_FAILURE";
const CURRICULUM_REGISTRATION_REQUEST =
  "learning-platform/registrations/CURRICULUM_REGISTRATION_REQUEST";
const CURRICULUM_REGISTRATION_SUCCESS =
  "learning-platform/registrations/CURRICULUM_REGISTRATION_SUCCESS";
const CURRICULUM_REGISTRATION_FAILURE =
  "learning-platform/registrations/CURRICULUM_REGISTRATION_FAILURE";
const UPDATE_COURSE_SATISFACTION_SCORE_REQUEST =
  "learning-platform/registrations/UPDATE_COURSE_SATISFACTION_SCORE_REQUEST";
const UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS =
  "learning-platform/registrations/UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS";
const UPDATE_COURSE_SATISFACTION_SCORE_FAILURE =
  "learning-platform/registrations/UPDATE_COURSE_SATISFACTION_SCORE_FAILURE";
const UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST =
  "learning-platform/registrations/UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST";
const UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS =
  "learning-platform/registrations/UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS";
const UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE =
  "learning-platform/registrations/UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE";

const path = "/learning-platform";

function loadCourseRegistrations() {
  return async (dispatch: any, getState) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_COURSE_REGISTRATIONS_REQUEST });
    try {
      const { data } = await axios.get(`/Users/${userId}/CourseRegistrations`, {
        baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
      });

      dispatch({
        type: LOAD_COURSE_REGISTRATIONS_SUCCESS,
        payload: {
          coursesRegistrations: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_COURSE_REGISTRATIONS_FAILURE });
    }
  };
}

function loadCurriculumRegistrations() {
  return async (dispatch: any) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_CURRICULUM_REGISTRATIONS_REQUEST });
    try {
      const { data } = await axios.get(
        `/Users/${userId}/CurriculumRegistrations`,
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
        }
      );

      dispatch({
        type: LOAD_CURRICULUM_REGISTRATIONS_SUCCESS,
        payload: {
          curriculumsRegistrations: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_CURRICULUM_REGISTRATIONS_FAILURE });
    }
  };
}

function registerCourse(courseRoundId) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState();
    const token = getCookie("token");
    dispatch({ type: CURRICULUM_REGISTRATION_REQUEST });
    try {
      const { data } = await axios.post(
        `/Users/${items.id}/CourseRegistrations`,
        {
          courseRoundId: parseInt(courseRoundId),
        },
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CURRICULUM_REGISTRATION_SUCCESS,
        payload: { courseRegister: data },
      });
      dispatch(
        uiActions.setFlashMessage("ลงทะเบียนรายวิชาเรียบร้อยแล้ว", "success")
      );
      dispatch(push(`${path}/learn`));
    } catch (err) {
      dispatch({ type: CURRICULUM_REGISTRATION_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `ลงทะเบียนรายวิชาไม่สำเร็จ เกิดข้อผิดพลาด ${err.response.status}`,
          "error"
        )
      );
    }
  };
}

function registerCurriculum(curriculumId) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState();
    const token = getCookie("token");

    try {
      const { data } = await axios.post(
        `/Users/${items.id}/CurriculumRegistrations`,
        {
          curriculumId: parseInt(curriculumId),
        },
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CURRICULUM_REGISTRATION_SUCCESS,
        payload: { curriculumRegister: data },
      });
      dispatch(
        uiActions.setFlashMessage("ลงทะเบียนหลักสูตรเรียบร้อยแล้ว", "success")
      );
      dispatch(push(`${path}/learn`));
    } catch (err) {
      dispatch({ type: CURRICULUM_REGISTRATION_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `ลงทะเบียนหลักสูตรไม่สำเร็จ เกิดข้อผิดพลาด ${err.response.status}`,
          "error"
        )
      );
    }
  };
}

function updateCourseSatisfactionScore(registrationId, satisfactionScore) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState();
    const token = getCookie("token");
    dispatch({ type: UPDATE_COURSE_SATISFACTION_SCORE_REQUEST });
    try {
      const { data } = await axios.put(
        `/Users/${items.id}/CourseRegistrations/${registrationId}/SatisfactionScore`,
        {
          satisfactionScore,
        },
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS,
        payload: { satisfactionScoreUpdate: data },
      });
      dispatch(
        uiActions.setFlashMessage(
          "บันทึกข้อมูลเรียบร้อย ขอบคุณที่ให้คะแนน",
          "success"
        )
      );
    } catch (err) {
      dispatch({ type: UPDATE_COURSE_SATISFACTION_SCORE_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `บันทึกข้อมูลไม่สำเร็จ เกิดข้อผิดพลาด ${err.response.status}`,
          "error"
        )
      );
    }
  };
}

function updateCurriculumSatisfactionScore(registrationId, satisfactionScore) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState();
    const token = getCookie("token");
    dispatch({ type: UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST });
    try {
      const { data } = await axios.put(
        `/Users/${items.id}/CurriculumRegistrations/${registrationId}/SatisfactionScore`,
        {
          satisfactionScore,
        },
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS,
        payload: { satisfactionScoreUpdate: data },
      });
      dispatch(
        uiActions.setFlashMessage(
          "บันทึกข้อมูลเรียบร้อย ขอบคุณที่ให้คะแนน",
          "success"
        )
      );
    } catch (err) {
      dispatch({ type: UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `บันทึกข้อมูลไม่สำเร็จ เกิดข้อผิดพลาด ${err.response.status}`,
          "error"
        )
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
  COURSE_REGISTRATION_REQUEST,
  COURSE_REGISTRATION_SUCCESS,
  COURSE_REGISTRATION_FAILURE,
  CURRICULUM_REGISTRATION_REQUEST,
  CURRICULUM_REGISTRATION_SUCCESS,
  CURRICULUM_REGISTRATION_FAILURE,
  UPDATE_COURSE_SATISFACTION_SCORE_REQUEST,
  UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS,
  UPDATE_COURSE_SATISFACTION_SCORE_FAILURE,
  UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST,
  UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS,
  UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE,
  loadCourseRegistrations,
  loadCurriculumRegistrations,
  registerCourse,
  registerCurriculum,
  updateCourseSatisfactionScore,
  updateCurriculumSatisfactionScore,
};
