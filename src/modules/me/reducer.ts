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
  isCourseCertificatesLoading: false,
  isCurriculumCertificatesLoading: false,
  isOrientationScoreLoading: false,
  courseCertificates: [],
  curriculumCertificates: [],
  orientationScore: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COURSE_CERTIFICATES_REQUEST:
      return {
        ...state,
        isCourseCertificatesLoading: true,
        courseCertificates: [],
      };
    case LOAD_CURRICULUM_CERTIFICATES_REQUEST:
      return {
        ...state,
        isCurriculumCertificatesLoading: true,
        curriculumCertificates: [],
      };
    case LOAD_ORIENTATION_SCORE_REQUEST:
      return {
        ...state,
        isOrientationScoreLoading: true,
        orientationScore: {},
      };
    case LOAD_COURSE_CERTIFICATES_SUCCESS:
      return {
        ...state,
        isCourseCertificatesLoading: false,
        courseCertificates: action.payload.courseCertificates,
      };
    case LOAD_CURRICULUM_CERTIFICATES_SUCCESS:
      return {
        ...state,
        isCurriculumCertificatesLoading: false,
        curriculumCertificates: action.payload.curriculumCertificates,
      };
    case LOAD_ORIENTATION_SCORE_SUCCESS:
      return {
        ...state,
        isOrientationScoreLoading: false,
        orientationScore: action.payload.orientationScore,
      };
    case LOAD_COURSE_CERTIFICATES_FAILURE:
      return { ...state, isCourseCertificatesLoading: false };
    case LOAD_CURRICULUM_CERTIFICATES_FAILURE:
      return { ...state, isCurriculumCertificatesLoading: false };
    case LOAD_ORIENTATION_SCORE_FAILURE:
      return { ...state, isOrientationScoreLoading: false };
    default:
      return state;
  }
}
