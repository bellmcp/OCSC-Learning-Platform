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
  UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST,
  UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS,
  UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  myCourses: [],
  myCurriculums: [],
  courseRegister: [],
  curriculumRegister: [],
  satisfactionScore: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSE_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, myCourses: [] };
    case LOAD_CURRICULUM_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, myCurriculums: [] };
    case COURSE_REGISTRATION_REQUEST:
      return { ...state, isLoading: true, courseRegister: [] };
    case CURRICULUM_REGISTRATION_REQUEST:
      return { ...state, isLoading: true, curriculumRegister: [] };
    case UPDATE_CURRICULUM_SATISFACTION_SCORE_REQUEST:
      return { ...state, isLoading: true, satisfactionScore: [] };
    case LOAD_COURSE_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myCourses: action.payload.coursesRegistrations,
      };
    case LOAD_CURRICULUM_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myCurriculums: action.payload.curriculumsRegistrations,
      };
    case COURSE_REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        curriculumRegister: action.payload.courseRegister,
      };
    case CURRICULUM_REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        curriculumRegister: action.payload.curriculumRegister,
      };
    case UPDATE_CURRICULUM_SATISFACTION_SCORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        satisfactionScore: action.payload.satisfactionScoreUpdate,
      };
    case LOAD_COURSE_REGISTRATIONS_FAILURE:
    case LOAD_CURRICULUM_REGISTRATIONS_FAILURE:
    case COURSE_REGISTRATION_FAILURE:
    case CURRICULUM_REGISTRATION_FAILURE:
    case UPDATE_CURRICULUM_SATISFACTION_SCORE_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
