import axios from "axios";
const LOAD_CURRICULUMS_REQUEST =
  "learning-platform/curriculums/LOAD_CURRICULUMS_REQUEST";
const LOAD_CURRICULUMS_SUCCESS =
  "learning-platform/curriculums/LOAD_CURRICULUMS_SUCCESS";
const LOAD_CURRICULUMS_FAILURE =
  "learning-platform/curriculums/LOAD_CURRICULUMS_FAILURE";
const LOAD_CURRICULUM_REQUEST =
  "learning-platform/curriculums/LOAD_CURRICULUM_REQUEST";
const LOAD_CURRICULUM_SUCCESS =
  "learning-platform/curriculums/LOAD_CURRICULUM_SUCCESS";
const LOAD_CURRICULUM_FAILURE =
  "learning-platform/curriculums/LOAD_CURRICULUM_FAILURE";
const LOAD_CURRICULUM_CHILD_REQUEST =
  "learning-platform/curriculums/LOAD_CURRICULUM_CHILD_REQUEST";
const LOAD_CURRICULUM_CHILD_SUCCESS =
  "learning-platform/curriculums/LOAD_CURRICULUM_CHILD_SUCCESS";
const LOAD_CURRICULUM_CHILD_FAILURE =
  "learning-platform/curriculums/LOAD_CURRICULUM_CHILD_FAILURE";

function loadCurriculums(query: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CURRICULUMS_REQUEST });
    try {
      const { data } = await axios.get(`/Curriculums${query}`, {
        baseURL: "https://welearn.ocsc.go.th/learning-platform-api/",
      });
      dispatch({
        type: LOAD_CURRICULUMS_SUCCESS,
        payload: {
          curriculums: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_CURRICULUMS_FAILURE });
    }
  };
}

function loadCurriculum(id: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CURRICULUM_REQUEST });
    try {
      const { data } = await axios.get(`/Curriculums/${id}`, {
        baseURL: "https://welearn.ocsc.go.th/learning-platform-api/",
      });
      dispatch({
        type: LOAD_CURRICULUM_SUCCESS,
        payload: {
          curriculum: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_CURRICULUM_FAILURE });
    }
  };
}

function loadCurriculumChild(id: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CURRICULUM_CHILD_REQUEST });
    try {
      const { data } = await axios.get(`/Curriculums/${id}/Courses`, {
        baseURL: "https://welearn.ocsc.go.th/learning-platform-api/",
      });
      dispatch({
        type: LOAD_CURRICULUM_CHILD_SUCCESS,
        payload: {
          childCourses: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_CURRICULUM_CHILD_FAILURE });
    }
  };
}

export {
  LOAD_CURRICULUMS_REQUEST,
  LOAD_CURRICULUMS_SUCCESS,
  LOAD_CURRICULUMS_FAILURE,
  LOAD_CURRICULUM_REQUEST,
  LOAD_CURRICULUM_SUCCESS,
  LOAD_CURRICULUM_FAILURE,
  LOAD_CURRICULUM_CHILD_REQUEST,
  LOAD_CURRICULUM_CHILD_SUCCESS,
  LOAD_CURRICULUM_CHILD_FAILURE,
  loadCurriculums,
  loadCurriculum,
  loadCurriculumChild,
};
