import axios from "axios";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
const LOAD_USER_REQUEST = "learning-platform/user/LOAD_USER_REQUEST";
const LOAD_USER_SUCCESS = "learning-platform/user/LOAD_USER_SUCCESS";
const LOAD_USER_FAILURE = "learning-platform/user/LOAD_USER_FAILURE";

function loadUser() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_USER_REQUEST });
    try {
      const token = getCookie("token");
      const { data } = await axios.get(
        `/Users/${parseJwt(token).unique_name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          baseURL: "https://welearn.ocsc.go.th/learning-platform-api/",
        }
      );
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: {
          users: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_USER_FAILURE });
    }
  };
}

export { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, loadUser };
