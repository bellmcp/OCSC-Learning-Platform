import axios from "axios";
import { getCookie } from "cookies/cookies";
import { parseJwt } from "utils/getDataJWT";
const LOAD_PROFILE_REQUEST = "learning-portal/src/ui/LOAD_PROFILE_REQUEST";
const LOAD_PROFILE_SUCCESS = "learning-portal/src/ui/LOAD_PROFILE_SUCCESS";
const LOAD_PROFILE_FAILURE = "learning-portal/src/ui/LOAD_EDIT_FAILURE";

function loadGetProfile() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_PROFILE_REQUEST });
    try {
      const token = getCookie("token");
      const data = await axios.get(`/Users/${parseJwt(token).unique_name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL: 'https://welearn.ocsc.go.th/learning-portal-api/',
      });
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: {
          message: "แก้ไขเรียบร้อยเเล้ว",
          data: data.data,
          status: data.status,
        },
      });
    } catch (err) {
      dispatch({
        type: LOAD_PROFILE_FAILURE,
        payload: {
          message: "เกิดข้อผิดพลาด",
          status: err.response.status,
          isErrorProfile: err.response.status,
        },
      });
    }
  };
}

export {
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  loadGetProfile,
};
