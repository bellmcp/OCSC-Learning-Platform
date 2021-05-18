import axios from "axios";
import { push } from "connected-react-router";
import { setCookie } from "utils/cookies";
import * as uiActions from "modules/ui/actions";

const LOAD_LOGIN_REQUEST = "learning-platform/login/LOAD_LOGIN_REQUEST";
const LOAD_LOGIN_SUCCESS = "learning-platform/login/LOAD_LOGIN_SUCCESS";
const LOAD_LOGIN_FAILURE = "learning-platform/login/LOAD_LOGIN_FAILURE";
const CLEAR_MESSAGE_LOGIN = "learning-platform/login/CLEAR_MESSAGE_LOGIN";

const PATH = process.env.REACT_APP_BASE_PATH;

function clearMessageLogin() {
  return {
    type: CLEAR_MESSAGE_LOGIN,
  };
}

function loadLogin(userInfo: any) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_LOGIN_REQUEST });
    try {
      const result = await axios.post("/Tokens", userInfo);
      dispatch({
        type: LOAD_LOGIN_SUCCESS,
        payload: {
          user: result.data,
          status: result.status,
          messageLogin: null,
        },
      });
      setCookie("token", result.data.token, 3);
      dispatch(push(`${PATH}`));
      dispatch(
        uiActions.setFlashMessage("เข้าสู่ระบบเรียบร้อยแล้ว", "success")
      );
    } catch (err) {
      if (err?.response?.status === 401) {
        dispatch({
          type: LOAD_LOGIN_FAILURE,
          payload: {
            status: err?.response?.status,
            messageLogin: `รหัสผ่านไม่ถูกต้อง`,
          },
        });
      } else if (err?.response?.status === 404) {
        dispatch({
          type: LOAD_LOGIN_FAILURE,
          payload: {
            status: err?.response?.status,
            messageLogin: `ไม่พบบัญชีผู้ใช้งานนี้ โปรดลองใหม่อีกครั้ง`,
          },
        });
      } else if (err?.response?.status === 500) {
        dispatch({
          type: LOAD_LOGIN_FAILURE,
          payload: {
            status: err?.response?.status,
            messageLogin: `เกิดข้อผิดพลาด ${err?.response?.status} โปรดลองใหม่อีกครั้ง`,
          },
        });
      } else {
        dispatch({
          type: LOAD_LOGIN_FAILURE,
          payload: {
            status: err?.response?.status,
            messageLogin: `เกิดข้อผิดพลาด ${err?.response?.status} โปรดลองใหม่อีกครั้ง`,
          },
        });
        dispatch(
          uiActions.setFlashMessage(
            `เข้าสู่ระบบไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            "error"
          )
        );
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
