import axios from "axios";
const LOAD_SUPPORT_REQUEST = "app/support/LOAD_SUPPORT_REQUEST";
const LOAD_SUPPORT_SUCCESS = "app/support/LOAD_SUPPORT_SUCCESS";
const LOAD_SUPPORT_FAILURE = "app/support/LOAD_SUPPORT_FAILURE";

function loadSupports() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_SUPPORT_REQUEST });
    try {
      const { data } = await axios.get("/Supports");
      dispatch({
        type: LOAD_SUPPORT_SUCCESS,
        payload: {
          supports: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_SUPPORT_FAILURE });
    }
  };
}

export {
  LOAD_SUPPORT_REQUEST,
  LOAD_SUPPORT_SUCCESS,
  LOAD_SUPPORT_FAILURE,
  loadSupports,
};
