import {
  LOAD_COURSE_REGISTRATIONS_REQUEST,
  LOAD_COURSE_REGISTRATIONS_SUCCESS,
  LOAD_COURSE_REGISTRATIONS_FAILURE,
  LOAD_CURRICULUM_REGISTRATIONS_REQUEST,
  LOAD_CURRICULUM_REGISTRATIONS_SUCCESS,
  LOAD_CURRICULUM_REGISTRATIONS_FAILURE,
  CURRICULUM_REGISTRATION_REQUEST,
  CURRICULUM_REGISTRATION_SUCCESS,
  CURRICULUM_REGISTRATION_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  myCourses: [],
  myCurriculums: [],
  curriculumRegister: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSE_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, myCourses: [] };
    case LOAD_CURRICULUM_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, myCurriculums: [] };
    case CURRICULUM_REGISTRATION_REQUEST:
      return { ...state, isLoading: true, curriculumRegister: [] };
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
    case CURRICULUM_REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        curriculumRegister: action.payload.curriculumRegister,
      };
    case LOAD_COURSE_REGISTRATIONS_FAILURE:
    case LOAD_CURRICULUM_REGISTRATIONS_FAILURE:
    case CURRICULUM_REGISTRATION_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
