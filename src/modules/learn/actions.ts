// @ts-nocheck
import axios from "axios";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
import * as uiActions from "modules/ui/actions";

const CREATE_SESSION_REQUEST = "learning-platform/learn/CREATE_SESSION_REQUEST";
const CREATE_SESSION_SUCCESS = "learning-platform/learn/CREATE_SESSION_SUCCESS";
const CREATE_SESSION_FAILURE = "learning-platform/learn/CREATE_SESSION_FAILURE";

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
          "สร้างเซสชันสำเร็จ เริ่มจับเวลาเข้าเรียนของคุณแล้ว",
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

export {
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  createSession,
};
