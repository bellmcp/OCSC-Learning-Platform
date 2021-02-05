import {
  LOAD_COURSE_REGISTRATIONS_REQUEST,
  LOAD_COURSE_REGISTRATIONS_SUCCESS,
  LOAD_COURSE_REGISTRATIONS_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSE_REGISTRATIONS_REQUEST:
      return { ...state, isLoading: true, items: [] };
    case LOAD_COURSE_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.registrations,
      };
    case LOAD_COURSE_REGISTRATIONS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
