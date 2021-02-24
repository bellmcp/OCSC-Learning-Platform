// @ts-nocheck
import axios from "axios";
import moment from "moment";
import * as uiActions from "modules/ui/actions";
const LOAD_SUPPORT_REQUEST = "learning-platform/support/LOAD_SUPPORT_REQUEST";
const LOAD_SUPPORT_SUCCESS = "learning-platform/support/LOAD_SUPPORT_SUCCESS";
const LOAD_SUPPORT_FAILURE = "learning-platform/support/LOAD_SUPPORT_FAILURE";
const SEND_SUPPORT_SUCCESS = "learning-platform/support/SEND_SUPPORT_SUCCESS";

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

function sendSupport(supportInfo) {
  return async (dispatch, getState) => {
    const {
      user: {
        items: { id },
      },
    } = getState();

    const { data } = await axios.post("/Supports", {
      id: Math.floor(Math.random() * 101),
      userId: id,
      ...supportInfo,
      attachFile: null,
      replyMessage: null,
      replyDate: null,
      createDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      isAcknowledged: false,
    });

    dispatch({ type: SEND_SUPPORT_SUCCESS, payload: { support: data } });
    dispatch(uiActions.setFlashMessage("ได้รับข้อมูลเรียบร้อย", "success"));
  };
}

export {
  LOAD_SUPPORT_REQUEST,
  LOAD_SUPPORT_SUCCESS,
  LOAD_SUPPORT_FAILURE,
  SEND_SUPPORT_SUCCESS,
  loadSupports,
  sendSupport,
};
