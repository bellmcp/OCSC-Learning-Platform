import {
  LOAD_COURSE_REGISTRATIONS_REQUEST,
  LOAD_COURSE_REGISTRATIONS_SUCCESS,
  LOAD_COURSE_REGISTRATIONS_FAILURE,
  LOAD_CURRICULUM_REGISTRATIONS_REQUEST,
  LOAD_CURRICULUM_REGISTRATIONS_SUCCESS,
  LOAD_CURRICULUM_REGISTRATIONS_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  myCourses: [],
  myCurriculums: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSE_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, myCourses: [] };
    case LOAD_CURRICULUM_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, myCurriculums: [] };
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
    case LOAD_COURSE_REGISTRATIONS_FAILURE:
    case LOAD_CURRICULUM_REGISTRATIONS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
