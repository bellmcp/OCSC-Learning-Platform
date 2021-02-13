import axios from "axios";
const LOAD_CATEGORIES_REQUEST =
  "learning-platform/categories/LOAD_CATEGORIES_REQUEST";
const LOAD_CATEGORIES_SUCCESS =
  "learning-platform/categories/LOAD_CATEGORIES_SUCCESS";
const LOAD_CATEGORIES_FAILURE =
  "learning-platform/categories/LOAD_CATEGORIES_FAILURE";

function loadCategories() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CATEGORIES_REQUEST });
    try {
      const { data } = await axios.get("/CourseCategories", {
        baseURL: "https://welearn.ocsc.go.th/learning-platform-api",
      });
      dispatch({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: {
          categories: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_CATEGORIES_FAILURE });
    }
  };
}

export {
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  loadCategories,
};
