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
  LOAD_COURSE_CONTENT_REQUEST,
  LOAD_COURSE_CONTENT_SUCCESS,
  LOAD_COURSE_CONTENT_FAILURE,
  CLEAR_COURSES,
} from './actions';

const initialState = {
  isRecommendedCoursesLoading: false,
  isLoading: false,
  items: [],
  recommended: [],
  rounds: [],
  contents: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSES_REQUEST:
    case LOAD_COURSE_REQUEST:
    case LOAD_COURSE_ROUND_REQUEST:
    case LOAD_COURSE_CONTENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        items: [],
        rounds: [],
        contents: [],
      };
    case LOAD_RECOMMENDED_COURSES_REQUEST:
      return {
        ...state,
        isRecommendedCoursesLoading: true,
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
        isRecommendedCoursesLoading: false,
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
    case LOAD_COURSE_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contents: action.payload.courseContents,
      };
    case LOAD_COURSES_FAILURE:
    case LOAD_RECOMMENDED_COURSES_FAILURE:
    case LOAD_COURSE_FAILURE:
    case LOAD_COURSE_ROUND_FAILURE:
    case LOAD_COURSE_CONTENT_FAILURE:
      return { ...state, isLoading: false, isRecommendedCoursesLoading: false };
    case CLEAR_COURSES:
      return {
        ...state,
        isLoading: false,
        isRecommendedCoursesLoading: false,
        items: [],
      };
    default:
      return state;
  }
}
