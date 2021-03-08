//@ts-nocheck
import axios from "axios";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
import * as uiActions from "modules/ui/actions";

const LOAD_USER_REQUEST = "learning-platform/user/LOAD_USER_REQUEST";
const LOAD_USER_SUCCESS = "learning-platform/user/LOAD_USER_SUCCESS";
const LOAD_USER_FAILURE = "learning-platform/user/LOAD_USER_FAILURE";

function loadUser() {
  return async (dispatch: any) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_USER_REQUEST });
    try {
      const token = getCookie("token");
      var { data } = await axios.get(`/Users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: {
          users: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_USER_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลผู้ใช้ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

export { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, loadUser };
