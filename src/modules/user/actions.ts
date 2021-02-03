import axios from "axios";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
const LOAD_USER_REQUEST = "app/user/LOAD_USER_REQUEST";
const LOAD_USER_SUCCESS = "app/user/LOAD_USER_SUCCESS";
const LOAD_USER_FAILURE = "app/user/LOAD_USER_FAILURE";

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
          baseURL: "https://welearn.ocsc.go.th/learning-portal-api/",
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
