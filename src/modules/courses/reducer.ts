import {
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILURE,
  LOAD_COURSE_REQUEST,
  LOAD_COURSE_SUCCESS,
  LOAD_COURSE_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSES_REQUEST:
    case LOAD_COURSE_REQUEST:
      return { ...state, isLoading: true, items: [] };
    case LOAD_COURSES_SUCCESS:
      return { ...state, isLoading: false, items: action.payload.courses };
    case LOAD_COURSE_SUCCESS:
      return { ...state, isLoading: false, items: [action.payload.course] };
    case LOAD_COURSES_FAILURE:
    case LOAD_COURSE_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
