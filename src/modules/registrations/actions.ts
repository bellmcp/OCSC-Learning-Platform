// @ts-nocheck
import axios from 'axios'
import { getCookie } from 'utils/cookies'
import { push } from 'connected-react-router'
import parseJwt from 'utils/parseJwt'
import * as uiActions from 'modules/ui/actions'

const LOAD_COURSE_REGISTRATIONS_REQUEST =
  'learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_REQUEST'
const LOAD_COURSE_REGISTRATIONS_SUCCESS =
  'learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_SUCCESS'
const LOAD_COURSE_REGISTRATIONS_FAILURE =
  'learning-platform/registrations/LOAD_COURSE_REGISTRATIONS_FAILURE'
const LOAD_CURRICULUM_REGISTRATIONS_REQUEST =
  'learning-platform/registrations/LOAD_CURRICULUM_REGISTRATIONS_REQUEST'
const LOAD_CURRICULUM_REGISTRATIONS_SUCCESS =
  'learning-platform/registrations/LOAD_CURRICULUM_REGISTRATIONS_SUCCESS'
const LOAD_CURRICULUM_REGISTRATIONS_FAILURE =
  'learning-platform/registrations/LOAD_CURRICULUM_REGISTRATIONS_FAILURE'
const COURSE_REGISTRATION_REQUEST =
  'learning-platform/registrations/COURSE_REGISTRATION_REQUEST'
const COURSE_REGISTRATION_SUCCESS =
  'learning-platform/registrations/COURSE_REGISTRATION_SUCCESS'
const COURSE_REGISTRATION_FAILURE =
  'learning-platform/registrations/COURSE_REGISTRATION_FAILURE'
const CURRICULUM_REGISTRATION_REQUEST =
  'learning-platform/registrations/CURRICULUM_REGISTRATION_REQUEST'
const CURRICULUM_REGISTRATION_SUCCESS =
  'learning-platform/registrations/CURRICULUM_REGISTRATION_SUCCESS'
const CURRICULUM_REGISTRATION_FAILURE =
  'learning-platform/registrations/CURRICULUM_REGISTRATION_FAILURE'
const UPDATE_COURSE_SATISFACTION_SCORE_REQUEST =
  'learning-platform/registrations/UPDATE_COURSE_SATISFACTION_SCORE_REQUEST'
const UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS =
  'learning-platform/registrations/UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS'
const UPDATE_COURSE_SATISFACTION_SCORE_FAILURE =
  'learning-platform/registrations/UPDATE_COURSE_SATISFACTION_SCORE_FAILURE'
const UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST =
  'learning-platform/registrations/UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST'
const UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS =
  'learning-platform/registrations/UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS'
const UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE =
  'learning-platform/registrations/UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE'
const LOAD_LOCAL_DATE_TIME_REQUEST =
  'learning-platform/registrations/LOAD_LOCAL_DATE_TIME_REQUEST'
const LOAD_LOCAL_DATE_TIME_SUCCESS =
  'learning-platform/registrations/LOAD_LOCAL_DATE_TIME_SUCCESS'
const LOAD_LOCAL_DATE_TIME_FAILURE =
  'learning-platform/registrations/LOAD_LOCAL_DATE_TIME_FAILURE'
const COURSE_UNENROLL_REQUEST =
  'learning-platform/registrations/COURSE_UNENROLL_REQUEST'
const COURSE_UNENROLL_SUCCESS =
  'learning-platform/registrations/COURSE_UNENROLL_SUCCESS'
const COURSE_UNENROLL_FAILURE =
  'learning-platform/registrations/COURSE_UNENROLL_FAILURE'
const CURRICULUM_UNENROLL_REQUEST =
  'learning-platform/registrations/CURRICULUM_UNENROLL_REQUEST'
const CURRICULUM_UNENROLL_SUCCESS =
  'learning-platform/registrations/CURRICULUM_UNENROLL_SUCCESS'
const CURRICULUM_UNENROLL_FAILURE =
  'learning-platform/registrations/CURRICULUM_UNENROLL_FAILURE'

const PATH = process.env.REACT_APP_BASE_PATH

function loadCourseRegistrations() {
  return async (dispatch: any, getState) => {
    const token = getCookie('token')
    const userId = parseJwt(token).unique_name
    dispatch({ type: LOAD_COURSE_REGISTRATIONS_REQUEST })
    try {
      var { data } = await axios.get(`/Users/${userId}/CourseRegistrations`)
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_COURSE_REGISTRATIONS_SUCCESS,
        payload: {
          coursesRegistrations: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_COURSE_REGISTRATIONS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลการลงทะเบียนรายวิชาทั้งหมดไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

function loadCurriculumRegistrations() {
  return async (dispatch: any) => {
    const token = getCookie('token')
    const userId = parseJwt(token).unique_name
    dispatch({ type: LOAD_CURRICULUM_REGISTRATIONS_REQUEST })
    try {
      var { data } = await axios.get(`/Users/${userId}/CurriculumRegistrations`)
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_CURRICULUM_REGISTRATIONS_SUCCESS,
        payload: {
          curriculumsRegistrations: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_CURRICULUM_REGISTRATIONS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลการลงทะเบียนหลักสูตรทั้งหมดไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

function registerCourse(courseRoundId) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState()
    const token = getCookie('token')
    dispatch({ type: COURSE_REGISTRATION_REQUEST })
    try {
      var { data } = await axios.post(
        `/Users/${items.id}/CourseRegistrations`,
        {
          courseRoundId: parseInt(courseRoundId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: COURSE_REGISTRATION_SUCCESS,
        payload: { courseRegister: data },
      })
      dispatch(
        uiActions.setFlashMessage('ลงทะเบียนรายวิชาเรียบร้อยแล้ว', 'success')
      )
      dispatch(push(`${PATH}/learn`))
    } catch (err) {
      dispatch({ type: COURSE_REGISTRATION_FAILURE })
      if (err?.response?.status === 403) {
        dispatch(
          uiActions.setFlashMessage(
            'คุณได้ลงทะเบียนรายวิชานี้แล้ว หรือไม่มีสิทธิ์ลงทะเบียนตามเงื่อนไขที่กำหนด',
            'error'
          )
        )
      } else {
        dispatch(
          uiActions.setFlashMessage(
            `ลงทะเบียนรายวิชาไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            'error'
          )
        )
      }
    }
  }
}

function unEnrollCourse(courseRoundId) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState()
    const token = getCookie('token')
    dispatch({ type: COURSE_UNENROLL_REQUEST })
    try {
      var { data } = await axios.delete(
        `/Users/${items.id}/CourseRegistrations/${parseInt(courseRoundId)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: COURSE_UNENROLL_SUCCESS,
        payload: { courseUnenroll: data },
      })
      const { mesg } = data
      dispatch(uiActions.setFlashMessage(mesg, 'success'))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      const data = err.response.data
      const { mesg } = data
      dispatch({ type: COURSE_UNENROLL_FAILURE })
      dispatch(uiActions.setFlashMessage(mesg, 'error'))
    }
  }
}

function registerCurriculum(curriculumId) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState()
    const token = getCookie('token')
    dispatch({ type: CURRICULUM_REGISTRATION_REQUEST })
    try {
      var { data } = await axios.post(
        `/Users/${items.id}/CurriculumRegistrations`,
        {
          curriculumId: parseInt(curriculumId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: CURRICULUM_REGISTRATION_SUCCESS,
        payload: { curriculumRegister: data },
      })
      dispatch(
        uiActions.setFlashMessage('ลงทะเบียนหลักสูตรเรียบร้อยแล้ว', 'success')
      )
      dispatch(push(`${PATH}/learn`))
    } catch (err) {
      dispatch({ type: CURRICULUM_REGISTRATION_FAILURE })
      if (err?.response?.status === 403) {
        dispatch(
          uiActions.setFlashMessage(
            'คุณได้ลงทะเบียนหลักสูตร หรือรายวิชาในหลักสูตรนี้แล้ว หรือไม่มีสิทธิ์ลงทะเบียนตามเงื่อนไขที่กำหนด',
            'error'
          )
        )
      } else {
        dispatch(
          uiActions.setFlashMessage(
            `ลงทะเบียนหลักสูตรไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
            'error'
          )
        )
      }
    }
  }
}

function unEnrollCurriculum(curriculumId) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState()
    const token = getCookie('token')
    dispatch({ type: CURRICULUM_UNENROLL_REQUEST })
    try {
      var { data } = await axios.delete(
        `/Users/${items.id}/CurriculumRegistrations/${parseInt(curriculumId)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: CURRICULUM_UNENROLL_SUCCESS,
        payload: { curriculumUnenroll: data },
      })
      const { mesg } = data
      dispatch(uiActions.setFlashMessage(mesg, 'success'))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      const data = err.response.data
      const { mesg } = data
      dispatch({ type: CURRICULUM_UNENROLL_FAILURE })
      dispatch(uiActions.setFlashMessage(mesg, 'error'))
    }
  }
}

function updateCourseSatisfactionScore(registrationId, satisfactionScore) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState()
    const token = getCookie('token')
    dispatch({ type: UPDATE_COURSE_SATISFACTION_SCORE_REQUEST })
    try {
      var { data } = await axios.put(
        `/Users/${items.id}/CourseRegistrations/${registrationId}/SatisfactionScore`,
        {
          satisfactionScore,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS,
        payload: { satisfactionScoreUpdate: data },
      })
      dispatch(
        uiActions.setFlashMessage(
          'บันทึกข้อมูลเรียบร้อย ขอบคุณที่ให้คะแนน',
          'success'
        )
      )
    } catch (err) {
      dispatch({ type: UPDATE_COURSE_SATISFACTION_SCORE_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `บันทึกข้อมูลไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

function updateCurriculumSatisfactionScore(registrationId, satisfactionScore) {
  return async (dispatch, getState) => {
    const {
      user: { items },
    } = getState()
    const token = getCookie('token')
    dispatch({ type: UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST })
    try {
      var { data } = await axios.put(
        `/Users/${items.id}/CurriculumRegistrations/${registrationId}/SatisfactionScore`,
        {
          satisfactionScore,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS,
        payload: { satisfactionScoreUpdate: data },
      })
      dispatch(
        uiActions.setFlashMessage(
          'บันทึกข้อมูลเรียบร้อย ขอบคุณที่ให้คะแนน',
          'success'
        )
      )
    } catch (err) {
      dispatch({ type: UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `บันทึกข้อมูลไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

function loadLocalDateTime() {
  return async (dispatch: any, getState) => {
    dispatch({ type: LOAD_LOCAL_DATE_TIME_REQUEST })
    try {
      var { data } = await axios.get('/LocalDateTime')
      if (data.length === 0) {
        data = {}
      }
      const { datetime } = data
      dispatch({
        type: LOAD_LOCAL_DATE_TIME_SUCCESS,
        payload: {
          localDateTime: datetime?.slice(0, 10)?.split('-'),
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_LOCAL_DATE_TIME_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลวันและเวลาปัจจุบันไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

export {
  LOAD_COURSE_REGISTRATIONS_REQUEST,
  LOAD_COURSE_REGISTRATIONS_SUCCESS,
  LOAD_COURSE_REGISTRATIONS_FAILURE,
  LOAD_CURRICULUM_REGISTRATIONS_REQUEST,
  LOAD_CURRICULUM_REGISTRATIONS_SUCCESS,
  LOAD_CURRICULUM_REGISTRATIONS_FAILURE,
  COURSE_REGISTRATION_REQUEST,
  COURSE_REGISTRATION_SUCCESS,
  COURSE_REGISTRATION_FAILURE,
  CURRICULUM_REGISTRATION_REQUEST,
  CURRICULUM_REGISTRATION_SUCCESS,
  CURRICULUM_REGISTRATION_FAILURE,
  UPDATE_COURSE_SATISFACTION_SCORE_REQUEST,
  UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS,
  UPDATE_COURSE_SATISFACTION_SCORE_FAILURE,
  UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST,
  UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS,
  UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE,
  LOAD_LOCAL_DATE_TIME_REQUEST,
  LOAD_LOCAL_DATE_TIME_SUCCESS,
  LOAD_LOCAL_DATE_TIME_FAILURE,
  COURSE_UNENROLL_REQUEST,
  COURSE_UNENROLL_SUCCESS,
  COURSE_UNENROLL_FAILURE,
  CURRICULUM_UNENROLL_REQUEST,
  CURRICULUM_UNENROLL_SUCCESS,
  CURRICULUM_UNENROLL_FAILURE,
  loadCourseRegistrations,
  loadCurriculumRegistrations,
  registerCourse,
  registerCurriculum,
  updateCourseSatisfactionScore,
  updateCurriculumSatisfactionScore,
  loadLocalDateTime,
  unEnrollCourse,
  unEnrollCurriculum,
}
