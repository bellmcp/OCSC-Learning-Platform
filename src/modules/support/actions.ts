// @ts-nocheck
import axios from "axios";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
import * as uiActions from "modules/ui/actions";
const LOAD_SUPPORT_REQUEST = "learning-platform/support/LOAD_SUPPORT_REQUEST";
const LOAD_SUPPORT_SUCCESS = "learning-platform/support/LOAD_SUPPORT_SUCCESS";
const LOAD_SUPPORT_FAILURE = "learning-platform/support/LOAD_SUPPORT_FAILURE";
const SEND_SUPPORT_SUCCESS = "learning-platform/support/SEND_SUPPORT_SUCCESS";

function loadSupports() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_SUPPORT_REQUEST });
    try {
      const { data } = await axios.get("/Supports", {
        baseURL: "https://welearn.ocsc.go.th/learning-platform-api/",
      });
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
  return async (dispatch) => {
    const token = getCookie("token");
    const userId = parseJwt(token).unique_name;

    var bodyFormData = new FormData();
    bodyFormData.append("userid", userId);
    bodyFormData.append("subject", supportInfo?.subject);
    bodyFormData.append("message", supportInfo?.message);
    bodyFormData.append("contact", supportInfo?.contact);
    // bodyFormData.append("file", supportInfo.attachment);

    axios({
      method: "post",
      url: "https://welearn.ocsc.go.th/learning-platform-api/Supports",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        dispatch({
          type: SEND_SUPPORT_SUCCESS,
          payload: { support: response },
        });
        dispatch(
          uiActions.setFlashMessage(
            "ได้รับข้อมูลเรียบร้อย โปรดรอการติดต่อกลับจากเจ้าหน้าที่",
            "success"
          )
        );
      })
      .catch(function (err) {
        dispatch(
          uiActions.setFlashMessage(
            `บันทึกข้อมูลไม่สำเร็จ เกิดข้อผิดพลาด ${err.response.status}`,
            "error"
          )
        );
      });
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
