import axios from "axios";
import { push } from "connected-react-router";
import { setCookie } from "utils/cookies";
const LOAD_LOGIN_REQUEST = "app/login/LOAD_LOGIN_REQUEST";
const LOAD_LOGIN_SUCCESS = "app/login/LOAD_LOGIN_SUCCESS";
const LOAD_LOGIN_FAILURE = "app/login/LOAD_LOGIN_FAILURE";
const CLEAR_MESSAGE_LOGIN = "app/login/CLEAR_MESSAGE_LOGIN";

function clearMessageLogin() {
  return {
    type: CLEAR_MESSAGE_LOGIN,
  };
}

function loadLogin(userInfo: any) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_LOGIN_REQUEST });
    try {
      const result = await axios.post("/Tokens", userInfo, {
        baseURL: "https://welearn.ocsc.go.th/learning-portal-api/",
      });
      dispatch({
        type: LOAD_LOGIN_SUCCESS,
        payload: {
          user: result.data,
          status: result.status,
          messageLogin: null,
        },
      });
      setCookie("token", result.data.token, 3);
      dispatch(push("/"));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({
          type: LOAD_LOGIN_FAILURE,
          payload: {
            status: err.response.status,
            messageLogin: `รหัสผ่านไม่ถูกต้อง`,
          },
        });
      }
      if (err.response.status === 404) {
        dispatch({
          type: LOAD_LOGIN_FAILURE,
          payload: {
            status: err.response.status,
            messageLogin: `ไม่พบบัญชีผู้ใช้งานนี้ โปรดลองใหม่อีกครั้ง`,
          },
        });
      }
      if (err.response.status === 500) {
        dispatch({
          type: LOAD_LOGIN_FAILURE,
          payload: {
            status: err.response.status,
            messageLogin: `เกิดข้อผิดพลาดบางอย่าง โปรดลองใหม่อีกครั้ง ${err.response.status}`,
          },
        });
      }
    }
  };
}

export {
  LOAD_LOGIN_REQUEST,
  LOAD_LOGIN_SUCCESS,
  LOAD_LOGIN_FAILURE,
  CLEAR_MESSAGE_LOGIN,
  loadLogin,
  clearMessageLogin,
};
