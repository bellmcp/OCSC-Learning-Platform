// @ts-nocheck
import axios from 'axios';
import { getCookie } from 'utils/cookies';
import parseJwt from 'utils/parseJwt';
import * as uiActions from 'modules/ui/actions';

const LOAD_COURSE_CERTIFICATES_REQUEST =
  'learning-platform/login/LOAD_COURSE_CERTIFICATES_REQUEST';
const LOAD_COURSE_CERTIFICATES_SUCCESS =
  'learning-platform/login/LOAD_COURSE_CERTIFICATES_SUCCESS';
const LOAD_COURSE_CERTIFICATES_FAILURE =
  'learning-platform/login/LOAD_COURSE_CERTIFICATES_FAILURE';
const LOAD_CURRICULUM_CERTIFICATES_REQUEST =
  'learning-platform/login/LOAD_CURRICULUM_CERTIFICATES_REQUEST';
const LOAD_CURRICULUM_CERTIFICATES_SUCCESS =
  'learning-platform/login/LOAD_CURRICULUM_CERTIFICATES_SUCCESS';
const LOAD_CURRICULUM_CERTIFICATES_FAILURE =
  'learning-platform/login/LOAD_CURRICULUM_CERTIFICATES_FAILURE';
const LOAD_COURSE_CERTIFICATE_INFO_REQUEST =
  'learning-platform/login/LOAD_COURSE_CERTIFICATE_INFO_REQUEST';
const LOAD_COURSE_CERTIFICATE_INFO_SUCCESS =
  'learning-platform/login/LOAD_COURSE_CERTIFICATE_INFO_SUCCESS';
const LOAD_COURSE_CERTIFICATE_INFO_FAILURE =
  'learning-platform/login/LOAD_COURSE_CERTIFICATE_INFO_FAILURE';
const LOAD_CURRICULUM_CERTIFICATE_INFO_REQUEST =
  'learning-platform/login/LOAD_CURRICULUM_CERTIFICATE_INFO_REQUEST';
const LOAD_CURRICULUM_CERTIFICATE_INFO_SUCCESS =
  'learning-platform/login/LOAD_CURRICULUM_CERTIFICATE_INFO_SUCCESS';
const LOAD_CURRICULUM_CERTIFICATE_INFO_FAILURE =
  'learning-platform/login/LOAD_CURRICULUM_CERTIFICATE_INFO_FAILURE';
const LOAD_ORIENTATION_SCORE_REQUEST =
  'learning-platform/login/LOAD_ORIENTATION_SCORE_REQUEST';
const LOAD_ORIENTATION_SCORE_SUCCESS =
  'learning-platform/login/LOAD_ORIENTATION_SCORE_SUCCESS';
const LOAD_ORIENTATION_SCORE_FAILURE =
  'learning-platform/login/LOAD_ORIENTATION_SCORE_FAILURE';

function loadCourseCertificates() {
  return async (dispatch: any, getState) => {
    const token = getCookie('token');
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_COURSE_CERTIFICATES_REQUEST });
    try {
      var { data } = await axios.get(`/Users/${userId}/CourseCertificates`, {
        baseURL: `${process.env.REACT_APP_PORTAL_API_URL}`,
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
        dispatch({ type: LOAD_COURSE_CERTIFICATES_FAILURE });
      } else {
        dispatch({ type: LOAD_COURSE_CERTIFICATES_FAILURE });
        dispatch(
          uiActions.setFlashMessage(
            `โหลดประกาศนียบัตรรายวิชาทั้งหมดไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            'error'
          )
        );
      }
    }
  };
}

function loadCurriculumCertificates() {
  return async (dispatch: any, getState) => {
    const token = getCookie('token');
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_CURRICULUM_CERTIFICATES_REQUEST });
    try {
      var { data } = await axios.get(
        `/Users/${userId}/CurriculumCertificates`,
        {
          baseURL: `${process.env.REACT_APP_PORTAL_API_URL}`,
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
            'error'
          )
        );
      }
    }
  };
}

function loadCourseCertificateInfo(certificateId: string) {
  return async (dispatch: any, getState) => {
    const token = getCookie('token');
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_COURSE_CERTIFICATE_INFO_REQUEST });
    try {
      var { data } = await axios.get(
        `/Users/${userId}/CourseCertificates/${certificateId}?print=y`,
        {
          baseURL: `${process.env.REACT_APP_PORTAL_API_URL}`,
        }
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_COURSE_CERTIFICATE_INFO_SUCCESS,
        payload: {
          courseCertificateInfo: data,
        },
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        dispatch({ type: LOAD_COURSE_CERTIFICATE_INFO_FAILURE });
      } else {
        dispatch({ type: LOAD_COURSE_CERTIFICATE_INFO_FAILURE });
        dispatch(
          uiActions.setFlashMessage(
            `โหลดข้อมูลประกาศนียบัตรไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            'error'
          )
        );
      }
    }
  };
}

function loadCurriculumCertificateInfo(certificateId: string) {
  return async (dispatch: any, getState) => {
    const token = getCookie('token');
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_CURRICULUM_CERTIFICATE_INFO_REQUEST });
    try {
      var { data } = await axios.get(
        `/Users/${userId}/CurriculumCertificates/${certificateId}?print=y`,
        {
          baseURL: `${process.env.REACT_APP_PORTAL_API_URL}`,
        }
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_CURRICULUM_CERTIFICATE_INFO_SUCCESS,
        payload: {
          curriculumCertificateInfo: data,
        },
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        dispatch({ type: LOAD_CURRICULUM_CERTIFICATE_INFO_FAILURE });
      } else {
        dispatch({ type: LOAD_CURRICULUM_CERTIFICATE_INFO_FAILURE });
        dispatch(
          uiActions.setFlashMessage(
            `โหลดข้อมูลประกาศนียบัตรไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            'error'
          )
        );
      }
    }
  };
}

function loadOrientationScore() {
  return async (dispatch: any, getState) => {
    const token = getCookie('token');
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_ORIENTATION_SCORE_REQUEST });
    try {
      var { data } = await axios.get(`/Users/${userId}/OrientationScore`, {
        baseURL: `${process.env.REACT_APP_PLATFORM_API_URL}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_ORIENTATION_SCORE_SUCCESS,
        payload: {
          orientationScore: data,
        },
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        dispatch({ type: LOAD_ORIENTATION_SCORE_FAILURE });
      } else {
        dispatch({ type: LOAD_ORIENTATION_SCORE_FAILURE });
        dispatch(
          uiActions.setFlashMessage(
            `โหลดผลการเรียนรู้ด้วยตนเองไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            'error'
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
  LOAD_COURSE_CERTIFICATE_INFO_REQUEST,
  LOAD_COURSE_CERTIFICATE_INFO_SUCCESS,
  LOAD_COURSE_CERTIFICATE_INFO_FAILURE,
  LOAD_CURRICULUM_CERTIFICATE_INFO_REQUEST,
  LOAD_CURRICULUM_CERTIFICATE_INFO_SUCCESS,
  LOAD_CURRICULUM_CERTIFICATE_INFO_FAILURE,
  LOAD_ORIENTATION_SCORE_REQUEST,
  LOAD_ORIENTATION_SCORE_SUCCESS,
  LOAD_ORIENTATION_SCORE_FAILURE,
  loadCourseCertificates,
  loadCurriculumCertificates,
  loadCourseCertificateInfo,
  loadCurriculumCertificateInfo,
  loadOrientationScore,
};
