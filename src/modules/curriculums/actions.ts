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

function loadCurriculums(query: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CURRICULUMS_REQUEST });
    try {
      const { data } = await axios.get(`/Curriculums${query}`);
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
      const { data } = await axios.get(`/Curriculums/${id}`);
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

export {
  LOAD_CURRICULUMS_REQUEST,
  LOAD_CURRICULUMS_SUCCESS,
  LOAD_CURRICULUMS_FAILURE,
  LOAD_CURRICULUM_REQUEST,
  LOAD_CURRICULUM_SUCCESS,
  LOAD_CURRICULUM_FAILURE,
  loadCurriculums,
  loadCurriculum,
};
