import {
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILURE,
  LOAD_RECOMMENDED_COURSES_REQUEST,
  LOAD_RECOMMENDED_COURSES_SUCCESS,
  LOAD_RECOMMENDED_COURSES_FAILURE,
  LOAD_COURSE_REQUEST,
  LOAD_COURSE_SUCCESS,
  LOAD_COURSE_FAILURE,
  LOAD_COURSE_ROUND_REQUEST,
  LOAD_COURSE_ROUND_SUCCESS,
  LOAD_COURSE_ROUND_FAILURE,
  CLEAR_COURSES,
} from "./actions";

const initialState = {
  isLoading: false,
  items: [],
  recommended: [],
  rounds: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSES_REQUEST:
    case LOAD_COURSE_REQUEST:
    case LOAD_COURSE_ROUND_REQUEST:
      return {
        ...state,
        isLoading: true,
        items: [],
        rounds: [],
      };
    case LOAD_RECOMMENDED_COURSES_REQUEST:
      return {
        ...state,
        recommended: [],
      };
    case LOAD_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.courses,
      };
    case LOAD_RECOMMENDED_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recommended: action.payload.recommendedCourses,
      };
    case LOAD_COURSE_SUCCESS:
      return { ...state, isLoading: false, items: [action.payload.course] };
    case LOAD_COURSE_ROUND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rounds: action.payload.courseRounds,
      };
    case LOAD_COURSES_FAILURE:
    case LOAD_RECOMMENDED_COURSES_FAILURE:
    case LOAD_COURSE_FAILURE:
    case LOAD_COURSE_ROUND_FAILURE:
      return { ...state, isLoading: false };
    case CLEAR_COURSES:
      return { ...state, isLoading: false, items: [] };
    default:
      return state;
  }
}
