// @ts-nocheck
import axios from "axios";
import { push } from "connected-react-router";
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
const LOAD_EVALUATION_REQUEST =
  "learning-platform/learn/LOAD_EVALUATION_REQUEST";
const LOAD_EVALUATION_SUCCESS =
  "learning-platform/learn/LOAD_EVALUATION_SUCCESS";
const LOAD_EVALUATION_FAILURE =
  "learning-platform/learn/LOAD_EVALUATION_FAILURE";
const LOAD_EVALUATION_ITEMS_REQUEST =
  "learning-platform/learn/LOAD_EVALUATION_ITEMS_REQUEST";
const LOAD_EVALUATION_ITEMS_SUCCESS =
  "learning-platform/learn/LOAD_EVALUATION_ITEMS_SUCCESS";
const LOAD_EVALUATION_ITEMS_FAILURE =
  "learning-platform/learn/LOAD_EVALUATION_ITEMS_FAILURE";
const UPDATE_EVALUATION_REQUEST =
  "learning-platform/learn/UPDATE_EVALUATION_REQUEST";
const UPDATE_EVALUATION_SUCCESS =
  "learning-platform/learn/UPDATE_EVALUATION_SUCCESS";
const UPDATE_EVALUATION_FAILURE =
  "learning-platform/learn/UPDATE_EVALUATION_FAILURE";

const path = "/learning-platform";

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
        `/Users/${userId}/CourseRegistrations/${registrationId}/ContentViews`
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
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลการเข้าเรียนไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

function updateContentView(registrationId, contentViewId, contentSeconds) {
  return async (dispatch, getState) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    const {
      learn: { sessions },
    } = getState();
    dispatch({ type: UPDATE_CONTENT_VIEW_REQUEST });
    try {
      var { data } = await axios.put(
        `/Users/${userId}/CourseRegistrations/${registrationId}/ContentViews/${contentViewId}`,
        {
          contentSeconds: contentSeconds,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            sessionId: sessions.id,
            key: sessions.key,
          },
        }
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: UPDATE_CONTENT_VIEW_SUCCESS,
        payload: { contentSeconds: data },
      });
      dispatch(uiActions.setFlashMessage("เวลาเรียนสะสม +1 นาที", "info"));
    } catch (err) {
      dispatch({ type: UPDATE_CONTENT_VIEW_FAILURE });
      if (err?.response?.status === 401) {
        dispatch(push(`${path}/learn`));
        dispatch(
          uiActions.setFlashMessage(
            `ตรวจพบการเข้าเรียนจากหลายอุปกรณ์ โปรดตรวจสอบและลองใหม่อีกครั้ง`,
            "error"
          )
        );
      } else {
        dispatch(
          uiActions.setFlashMessage(
            `บันทึกเวลาเรียนสะสมไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            "error"
          )
        );
      }
    }
  };
}

function loadEvaluation(evaluationId) {
  return async (dispatch: any, getState) => {
    dispatch({ type: LOAD_EVALUATION_REQUEST });
    try {
      var { data } = await axios.get(`/Evaluations/${evaluationId}`);
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_EVALUATION_SUCCESS,
        payload: {
          evaluation: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_EVALUATION_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลแบบประเมิน ${evaluationId} ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

function loadEvaluationItems(evaluationId) {
  return async (dispatch: any, getState) => {
    dispatch({ type: LOAD_EVALUATION_ITEMS_REQUEST });
    try {
      var { data } = await axios.get(
        `/Evaluations/${evaluationId}/EvaluationItems`
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_EVALUATION_ITEMS_SUCCESS,
        payload: {
          evaluationItems: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_EVALUATION_ITEMS_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดแบบประเมิน ${evaluationId} ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

function updateEvaluation(
  registrationId,
  contentViewId,
  evaluationAnswer,
  evaluationOpinion
) {
  return async (dispatch, getState) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    const {
      learn: { sessions },
    } = getState();
    dispatch({ type: UPDATE_EVALUATION_REQUEST });
    try {
      var { data } = await axios.put(
        `/Users/${userId}/CourseRegistrations/${registrationId}/ContentViews/${contentViewId}`,
        {
          evaluationAnswer: evaluationAnswer,
          evaluationOpinion: evaluationOpinion,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            sessionId: sessions.id,
            key: sessions.key,
          },
        }
      );
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: UPDATE_EVALUATION_SUCCESS,
        payload: { evaluationAnswer: data },
      });
      dispatch(
        uiActions.setFlashMessage("บันทึกแบบประเมินเรียบร้อยแล้ว", "success")
      );
    } catch (err) {
      dispatch({ type: UPDATE_EVALUATION_FAILURE });
      if (err?.response?.status === 401) {
        dispatch(push(`${path}/learn`));
        dispatch(
          uiActions.setFlashMessage(
            `ตรวจพบการเข้าเรียนจากหลายอุปกรณ์ โปรดตรวจสอบและลองใหม่อีกครั้ง`,
            "error"
          )
        );
      } else {
        dispatch(
          uiActions.setFlashMessage(
            `บันทึกแบบประเมินไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            "error"
          )
        );
      }
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
  LOAD_EVALUATION_REQUEST,
  LOAD_EVALUATION_SUCCESS,
  LOAD_EVALUATION_FAILURE,
  LOAD_EVALUATION_ITEMS_REQUEST,
  LOAD_EVALUATION_ITEMS_SUCCESS,
  LOAD_EVALUATION_ITEMS_FAILURE,
  UPDATE_EVALUATION_REQUEST,
  UPDATE_EVALUATION_SUCCESS,
  UPDATE_EVALUATION_FAILURE,
  createSession,
  loadContentViews,
  updateContentView,
  loadEvaluation,
  loadEvaluationItems,
  updateEvaluation,
};
