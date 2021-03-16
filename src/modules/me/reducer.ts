import {
  LOAD_COURSE_CERTIFICATES_REQUEST,
  LOAD_COURSE_CERTIFICATES_SUCCESS,
  LOAD_COURSE_CERTIFICATES_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  courseCertificates: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSE_CERTIFICATES_REQUEST:
      return { ...state, isLoading: true, courseCertificates: [] };
    case LOAD_COURSE_CERTIFICATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        courseCertificates: action.payload.courseCertificates,
      };
    case LOAD_COURSE_CERTIFICATES_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
