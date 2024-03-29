// @ts-nocheck
import axios from 'axios'

const SET_FLASH_MESSAGE = 'learning-platform/ui/SET_FLASH_MESSAGE'
const CLEAR_FLASH_MESSAGE = 'learning-platform/ui/CLEAR_FLASH_MESSAGE'
const SET_LEARN_EXIT_DIALOG = 'learning-platform/ui/SET_LEARN_EXIT_DIALOG'
const OPEN_GLOBAL_MODAL = 'learning-platform/ui/OPEN_GLOBAL_MODAL'
const CLEAR_GLOBAL_MODAL = 'learning-platform/ui/CLEAR_GLOBAL_MODAL'
const LOAD_FOOTER_INFO_REQUEST = 'learning-platform/ui/LOAD_FOOTER_INFO_REQUEST'
const LOAD_FOOTER_INFO_SUCCESS = 'learning-platform/ui/LOAD_FOOTER_INFO_SUCCESS'
const LOAD_FOOTER_INFO_FAILURE = 'learning-platform/ui/LOAD_FOOTER_INFO_FAILURE'

function setFlashMessage(message: string, severity: string) {
  return {
    type: SET_FLASH_MESSAGE,
    payload: {
      message,
      severity,
    },
  }
}

function clearFlashMessage() {
  return {
    type: CLEAR_FLASH_MESSAGE,
  }
}

function setLearnExitDialog(isOpen: boolean) {
  return {
    type: SET_LEARN_EXIT_DIALOG,
    payload: {
      isOpen,
    },
  }
}

function openGlobalModal(title: string, message: string, action: any) {
  return {
    type: OPEN_GLOBAL_MODAL,
    payload: {
      globalModalTitle: title,
      globalModalMessage: message,
      globalModalCTAAction: action,
    },
  }
}

function clearGlobalModal() {
  return {
    type: CLEAR_GLOBAL_MODAL,
  }
}

function loadFooterInfo() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_FOOTER_INFO_REQUEST })
    try {
      var { data } = await axios.get('constants/phonenumber', {
        baseURL: `${process.env.REACT_APP_PORTAL_API_URL}`,
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_FOOTER_INFO_SUCCESS,
        payload: {
          footerInfo: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_FOOTER_INFO_FAILURE })
      dispatch(
        setFlashMessage(
          `โหลดช่องทางการติดต่อสำนักงาน ก.พ. ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

export {
  SET_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
  SET_LEARN_EXIT_DIALOG,
  LOAD_FOOTER_INFO_REQUEST,
  LOAD_FOOTER_INFO_SUCCESS,
  LOAD_FOOTER_INFO_FAILURE,
  OPEN_GLOBAL_MODAL,
  CLEAR_GLOBAL_MODAL,
  setFlashMessage,
  clearFlashMessage,
  setLearnExitDialog,
  openGlobalModal,
  clearGlobalModal,
  loadFooterInfo,
}
