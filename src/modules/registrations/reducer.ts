import {
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
} from './actions'

const initialState = {
  isLoading: false,
  isLocalDateTimeLoading: false,
  isUnEnrollLoading: false,
  myCourses: [],
  myCurriculums: [],
  courseRegister: [],
  curriculumRegister: [],
  courseSatisfactionScore: [],
  curriculumSatisfactionScore: [],
  localDateTime: [],
  courseUnenroll: [],
  curriculumUnenroll: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSE_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, myCourses: [] }
    case LOAD_CURRICULUM_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, myCurriculums: [] }
    case COURSE_REGISTRATION_REQUEST:
      return { ...state, isLoading: true, courseRegister: [] }
    case CURRICULUM_REGISTRATION_REQUEST:
      return { ...state, isLoading: true, curriculumRegister: [] }
    case UPDATE_COURSE_SATISFACTION_SCORE_REQUEST:
      return { ...state, courseSatisfactionScore: [] }
    case UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST:
      return { ...state, curriculumSatisfactionScore: [] }
    case LOAD_LOCAL_DATE_TIME_REQUEST:
      return { ...state, isLocalDateTimeLoading: true, localDateTime: [] }
    case COURSE_UNENROLL_REQUEST:
      return { ...state, isUnEnrollLoading: true, courseUnenroll: [] }
    case CURRICULUM_UNENROLL_REQUEST:
      return { ...state, isUnEnrollLoading: true, curriculumUnenroll: [] }
    case LOAD_COURSE_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myCourses: action.payload.coursesRegistrations,
      }
    case LOAD_CURRICULUM_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myCurriculums: action.payload.curriculumsRegistrations,
      }
    case COURSE_REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        curriculumRegister: action.payload.courseRegister,
      }
    case CURRICULUM_REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        curriculumRegister: action.payload.curriculumRegister,
      }
    case UPDATE_COURSE_SATISFACTION_SCORE_SUCCESS:
      return {
        ...state,
        courseSatisfactionScore: action.payload.satisfactionScoreUpdate,
      }
    case UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS:
      return {
        ...state,
        curriculumSatisfactionScore: action.payload.satisfactionScoreUpdate,
      }
    case LOAD_LOCAL_DATE_TIME_SUCCESS:
      return {
        ...state,
        isLocalDateTimeLoading: false,
        localDateTime: action.payload.localDateTime,
      }
    case COURSE_UNENROLL_SUCCESS:
      return {
        ...state,
        isUnEnrollLoading: false,
        courseUnenroll: action.payload.courseUnenroll,
      }
    case CURRICULUM_UNENROLL_SUCCESS:
      return {
        ...state,
        isUnEnrollLoading: false,
        curriculumUnenroll: action.payload.curriculumUnenroll,
      }
    case LOAD_COURSE_REGISTRATIONS_FAILURE:
    case LOAD_CURRICULUM_REGISTRATIONS_FAILURE:
    case COURSE_REGISTRATION_FAILURE:
    case CURRICULUM_REGISTRATION_FAILURE:
    case UPDATE_COURSE_SATISFACTION_SCORE_FAILURE:
    case UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE:
      return { ...state, isLoading: false }
    case LOAD_LOCAL_DATE_TIME_FAILURE:
      return { ...state, isLocalDateTimeLoading: false }
    case COURSE_UNENROLL_FAILURE:
    case CURRICULUM_UNENROLL_FAILURE:
      return { ...state, isUnEnrollLoading: false }
    default:
      return state
  }
}
