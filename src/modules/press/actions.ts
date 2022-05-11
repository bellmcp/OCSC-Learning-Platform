import axios from 'axios'
import * as uiActions from 'modules/ui/actions'

const LOAD_PRESS_REQUEST = 'learning-platform/press/LOAD_PRESS_REQUEST'
const LOAD_PRESS_SUCCESS = 'learning-platform/press/LOAD_PRESS_SUCCESS'
const LOAD_PRESS_FAILURE = 'learning-platform/press/LOAD_PRESS_FAILURE'
const LOAD_ANNOUNCEMENT_REQUEST =
  'learning-platform/press/LOAD_ANNOUNCEMENT_REQUEST'
const LOAD_ANNOUNCEMENT_SUCCESS =
  'learning-platform/press/LOAD_ANNOUNCEMENT_SUCCESS'
const LOAD_ANNOUNCEMENT_FAILURE =
  'learning-platform/press/LOAD_ANNOUNCEMENT_FAILURE'

function loadPresses() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_PRESS_REQUEST })
    try {
      var { data } = await axios.get('/PressReleases', {
        params: {
          max: 5,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_PRESS_SUCCESS,
        payload: {
          presses: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_PRESS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลประชาสัมพันธ์ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

function loadAnnouncement() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_ANNOUNCEMENT_REQUEST })
    try {
      var { data } = await axios.get('/PressReleases/0')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_ANNOUNCEMENT_SUCCESS,
        payload: {
          announcement: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_ANNOUNCEMENT_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลประกาศไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

export {
  LOAD_PRESS_REQUEST,
  LOAD_PRESS_SUCCESS,
  LOAD_PRESS_FAILURE,
  LOAD_ANNOUNCEMENT_REQUEST,
  LOAD_ANNOUNCEMENT_SUCCESS,
  LOAD_ANNOUNCEMENT_FAILURE,
  loadPresses,
  loadAnnouncement,
}
