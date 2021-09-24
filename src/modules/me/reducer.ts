import {
  LOAD_COURSE_CERTIFICATES_REQUEST,
  LOAD_COURSE_CERTIFICATES_SUCCESS,
  LOAD_COURSE_CERTIFICATES_FAILURE,
  LOAD_CURRICULUM_CERTIFICATES_REQUEST,
  LOAD_CURRICULUM_CERTIFICATES_SUCCESS,
  LOAD_CURRICULUM_CERTIFICATES_FAILURE,
  LOAD_ORIENTATION_SCORE_REQUEST,
  LOAD_ORIENTATION_SCORE_SUCCESS,
  LOAD_ORIENTATION_SCORE_FAILURE,
} from './actions';

const initialState = {
  isLoading: false,
  courseCertificates: [],
  curriculumCertificates: [],
  orientationScore: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSE_CERTIFICATES_REQUEST:
      return { ...state, isLoading: true, courseCertificates: [] };
    case LOAD_CURRICULUM_CERTIFICATES_REQUEST:
      return { ...state, isLoading: true, curriculumCertificates: [] };
    case LOAD_ORIENTATION_SCORE_REQUEST:
      return { ...state, isLoading: true, orientationScore: {} };
    case LOAD_COURSE_CERTIFICATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        courseCertificates: action.payload.courseCertificates,
      };
    case LOAD_CURRICULUM_CERTIFICATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        curriculumCertificates: action.payload.curriculumCertificates,
      };
    case LOAD_ORIENTATION_SCORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orientationScore: action.payload.orientationScore,
      };
    case LOAD_COURSE_CERTIFICATES_FAILURE:
    case LOAD_CURRICULUM_CERTIFICATES_FAILURE:
    case LOAD_ORIENTATION_SCORE_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
