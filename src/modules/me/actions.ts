// @ts-nocheck
import axios from "axios";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
import * as uiActions from "modules/ui/actions";

const LOAD_COURSE_CERTIFICATES_REQUEST =
  "learning-platform/login/LOAD_COURSE_CERTIFICATES_REQUEST";
const LOAD_COURSE_CERTIFICATES_SUCCESS =
  "learning-platform/login/LOAD_COURSE_CERTIFICATES_SUCCESS";
const LOAD_COURSE_CERTIFICATES_FAILURE =
  "learning-platform/login/LOAD_COURSE_CERTIFICATES_FAILURE";
const LOAD_CURRICULUM_CERTIFICATES_REQUEST =
  "learning-platform/login/LOAD_CURRICULUM_CERTIFICATES_REQUEST";
const LOAD_CURRICULUM_CERTIFICATES_SUCCESS =
  "learning-platform/login/LOAD_CURRICULUM_CERTIFICATES_SUCCESS";
const LOAD_CURRICULUM_CERTIFICATES_FAILURE =
  "learning-platform/login/LOAD_CURRICULUM_CERTIFICATES_FAILURE";

function loadCourseCertificates() {
  return async (dispatch: any, getState) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_COURSE_CERTIFICATES_REQUEST });
    try {
      var { data } = await axios.get(`/Users/${userId}/CourseCertificates`, {
        baseURL: "https://welearn.ocsc.go.th/learning-portal-api/",
      });
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_COURSE_CERTIFICATES_SUCCESS,
        payload: {
          courseCertificates: data,
        },
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        dispatch({ type: LOAD_CURRICULUM_CERTIFICATES_FAILURE });
      } else {
        dispatch({ type: LOAD_COURSE_CERTIFICATES_FAILURE });
        dispatch(
          uiActions.setFlashMessage(
            `โหลดประกาศนียบัตรรายวิชาทั้งหมดไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            "error"
          )
        );
      }
    }
  };
}

function loadCurriculumCertificates() {
  return async (dispatch: any, getState) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_CURRICULUM_CERTIFICATES_REQUEST });
    try {
      var { data } = await axios.get(
        `/Users/${userId}/CurriculumCertificates`,
        {
          baseURL: "https://welearn.ocsc.go.th/learning-portal-api/",
        }
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_CURRICULUM_CERTIFICATES_SUCCESS,
        payload: {
          curriculumCertificates: data,
        },
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        dispatch({ type: LOAD_CURRICULUM_CERTIFICATES_FAILURE });
      } else {
        dispatch({ type: LOAD_CURRICULUM_CERTIFICATES_FAILURE });
        dispatch(
          uiActions.setFlashMessage(
            `โหลดประกาศนียบัตรหลักสูตรทั้งหมดไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            "error"
          )
        );
      }
    }
  };
}

export {
  LOAD_COURSE_CERTIFICATES_REQUEST,
  LOAD_COURSE_CERTIFICATES_SUCCESS,
  LOAD_COURSE_CERTIFICATES_FAILURE,
  LOAD_CURRICULUM_CERTIFICATES_REQUEST,
  LOAD_CURRICULUM_CERTIFICATES_SUCCESS,
  LOAD_CURRICULUM_CERTIFICATES_FAILURE,
  loadCourseCertificates,
  loadCurriculumCertificates,
};
