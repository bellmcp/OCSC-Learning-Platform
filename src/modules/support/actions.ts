// @ts-nocheck
import axios from "axios";
import moment from "moment";
import * as uiActions from "modules/ui/actions";
const LOAD_SUPPORT_REQUEST = "app/support/LOAD_SUPPORT_REQUEST";
const LOAD_SUPPORT_SUCCESS = "app/support/LOAD_SUPPORT_SUCCESS";
const LOAD_SUPPORT_FAILURE = "app/support/LOAD_SUPPORT_FAILURE";
const SEND_SUPPORT_REQUEST = "app/support/SEND_SUPPORT_REQUEST";
const SEND_SUPPORT_SUCCESS = "app/support/SEND_SUPPORT_SUCCESS";
const SEND_SUPPORT_FAILURE = "app/support/SEND_SUPPORT_FAILURE";

function loadSupports() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_SUPPORT_REQUEST });
    try {
      const { data } = await axios.get("/Supports2");
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

    const { data } = await axios.post("/Supports2", {
      id: Math.floor(Math.random() * 101),
      userId: id,
      ...supportInfo,
      AttachFile: null,
      ReplyMessage: null,
      ReplyDate: null,
      CreateDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      IsAcknowledged: false,
    });

    dispatch({ type: SEND_SUPPORT_SUCCESS, payload: { support: data } });
    dispatch(uiActions.setFlashMessage("ได้รับข้อมูลเรียบร้อย"));
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
