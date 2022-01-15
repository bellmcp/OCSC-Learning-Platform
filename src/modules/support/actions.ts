// @ts-nocheck
import axios from 'axios';
import { getCookie } from 'utils/cookies';
import parseJwt from 'utils/parseJwt';
import * as uiActions from 'modules/ui/actions';

const LOAD_SUPPORT_REQUEST = 'learning-platform/support/LOAD_SUPPORT_REQUEST';
const LOAD_SUPPORT_SUCCESS = 'learning-platform/support/LOAD_SUPPORT_SUCCESS';
const LOAD_SUPPORT_FAILURE = 'learning-platform/support/LOAD_SUPPORT_FAILURE';
const SEND_SUPPORT_SUCCESS = 'learning-platform/support/SEND_SUPPORT_SUCCESS';
const MARK_SUPPORT_AS_READ_SUCCESS =
  'learning-platform/support/MARK_SUPPORT_AS_READ_SUCCESS';

function loadSupports() {
  return async (dispatch: any) => {
    const token = getCookie('token');
    const userId = parseJwt(token).unique_name;
    dispatch({ type: LOAD_SUPPORT_REQUEST });
    try {
      var { data } = await axios.get(`/Supports?userid=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_SUPPORT_SUCCESS,
        payload: {
          supports: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_SUPPORT_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดประวัติการติดต่อเจ้าหน้าที่ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      );
    }
  };
}

function sendSupport(supportInfo, attachedFile) {
  return async (dispatch) => {
    const token = getCookie('token');
    const userId = parseJwt(token).unique_name;

    var bodyFormData = new FormData();
    bodyFormData.append('userid', userId);
    bodyFormData.append('subject', supportInfo?.subject);
    bodyFormData.append('message', supportInfo?.message);
    bodyFormData.append('contact', supportInfo?.contact);
    bodyFormData.append('file', attachedFile);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}Supports`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        dispatch({
          type: SEND_SUPPORT_SUCCESS,
          payload: { support: response },
        });
        dispatch(uiActions.setFlashMessage('ได้รับข้อมูลเรียบร้อย', 'success'));
        window.location.reload();
      })
      .catch(function (err) {
        if (err?.response?.status === 413) {
          dispatch(
            uiActions.setFlashMessage(
              `ไฟล์แนบมีขนาดใหญ่เกิน 20 MB โปรดเลือกไฟล์ใหม่อีกครั้ง`,
              'error'
            )
          );
        } else if (err?.response?.status === 403) {
          dispatch(
            uiActions.setFlashMessage(
              `นามสกุลไฟล์ไม่รองรับ โปรดเลือกไฟล์ใหม่อีกครั้ง`,
              'error'
            )
          );
        } else {
          dispatch(
            uiActions.setFlashMessage(
              `บันทึกข้อมูลไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
              'error'
            )
          );
        }
      });
  };
}

function markSupportAsRead(supportId) {
  return async (dispatch) => {
    const token = getCookie('token');
    try {
      var { data } = await axios.patch(
        `/Supports/${supportId}`,
        {
          isAcknowledged: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (data.length === 0) {
        data = [];
      }
      window.location.reload();
      dispatch(uiActions.setFlashMessage('บันทึกข้อมูลเรียบร้อย', 'success'));
    } catch (err) {
      dispatch(
        uiActions.setFlashMessage(
          `บันทึกข้อมูลไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      );
    }
  };
}

export {
  LOAD_SUPPORT_REQUEST,
  LOAD_SUPPORT_SUCCESS,
  LOAD_SUPPORT_FAILURE,
  SEND_SUPPORT_SUCCESS,
  MARK_SUPPORT_AS_READ_SUCCESS,
  loadSupports,
  sendSupport,
  markSupportAsRead,
};
