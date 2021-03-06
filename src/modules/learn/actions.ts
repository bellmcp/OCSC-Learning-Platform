// @ts-nocheck
import axios from "axios";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
import * as uiActions from "modules/ui/actions";
const CREATE_SESSION_REQUEST = "learning-platform/learn/CREATE_SESSION_REQUEST";
const CREATE_SESSION_SUCCESS = "learning-platform/learn/CREATE_SESSION_SUCCESS";
const CREATE_SESSION_FAILURE = "learning-platform/learn/CREATE_SESSION_FAILURE";
const LOAD_CONTENT_VIEWS_REQUEST =
  "learning-platform/learn/LOAD_CONTENT_VIEWS_REQUEST";
const LOAD_CONTENT_VIEWS_SUCCESS =
  "learning-platform/learn/LOAD_CONTENT_VIEWS_SUCCESS";
const LOAD_CONTENT_VIEWS_FAILURE =
  "learning-platform/learn/LOAD_CONTENT_VIEWS_FAILURE";
const UPDATE_CONTENT_VIEW_REQUEST =
  "learning-platform/learn/UPDATE_CONTENT_VIEW_REQUEST";
const UPDATE_CONTENT_VIEW_SUCCESS =
  "learning-platform/learn/UPDATE_CONTENT_VIEW_SUCCESS";
const UPDATE_CONTENT_VIEW_FAILURE =
  "learning-platform/learn/UPDATE_CONTENT_VIEW_FAILURE";

function createSession() {
  return async (dispatch) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    dispatch({ type: CREATE_SESSION_REQUEST });
    try {
      var { data } = await axios.post(
        `/Users/${userId}/Sessions`,
        {},
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: CREATE_SESSION_SUCCESS,
        payload: { session: data },
      });
      dispatch(
        uiActions.setFlashMessage(
          "สร้างเซสชันสำเร็จ เริ่มจับเวลาเข้าเรียนแล้ว",
          "success"
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({ type: CREATE_SESSION_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `สร้างเซสชันไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

function loadContentViews(registrationId) {
  return async (dispatch: any, getState) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_CONTENT_VIEWS_REQUEST });
    try {
      var { data } = await axios.get(
        `/Users/${userId}/CourseRegistrations/${registrationId}/ContentViews`,
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
        }
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_CONTENT_VIEWS_SUCCESS,
        payload: {
          contentViews: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_CONTENT_VIEWS_FAILURE });
    }
  };
}

function updateContentView(
  registrationId,
  contentId,
  sessionId,
  sessionKey,
  contentSeconds
) {
  return async (dispatch) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    dispatch({ type: UPDATE_CONTENT_VIEW_REQUEST });
    try {
      var { data } = await axios.put(
        `/Users/${userId}/CourseRegistrations/${registrationId}/ContentViews/${contentId}?sessionId=${sessionId}&key=${sessionKey}`,
        {
          contentSeconds: contentSeconds,
        },
        {
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: UPDATE_CONTENT_VIEW_SUCCESS,
        payload: { contentSeconds: data },
      });
      dispatch(
        uiActions.setFlashMessage(
          "FOR DEV: Successfully updated contentSeconds +60",
          "info"
        )
      );
    } catch (err) {
      dispatch({ type: UPDATE_CONTENT_VIEW_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `บันทึกเวลาเข้าเรียนไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

export {
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  LOAD_CONTENT_VIEWS_REQUEST,
  LOAD_CONTENT_VIEWS_SUCCESS,
  LOAD_CONTENT_VIEWS_FAILURE,
  UPDATE_CONTENT_VIEW_REQUEST,
  UPDATE_CONTENT_VIEW_SUCCESS,
  UPDATE_CONTENT_VIEW_FAILURE,
  createSession,
  loadContentViews,
  updateContentView,
};
