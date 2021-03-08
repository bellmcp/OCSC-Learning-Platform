import axios from "axios";
import * as uiActions from "modules/ui/actions";

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
      var { data } = await axios.get("/CourseCategories");
      if (data.length === 0) {
        data = [];
      }
      dispatch({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: {
          categories: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_CATEGORIES_FAILURE });
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลหมวดหมู่ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          "error"
        )
      );
    }
  };
}

export {
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  loadCategories,
};
