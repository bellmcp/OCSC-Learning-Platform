import {
  LOAD_CURRICULUMS_REQUEST,
  LOAD_CURRICULUMS_SUCCESS,
  LOAD_CURRICULUMS_FAILURE,
  LOAD_CURRICULUM_REQUEST,
  LOAD_CURRICULUM_SUCCESS,
  LOAD_CURRICULUM_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_CURRICULUMS_REQUEST:
    case LOAD_CURRICULUM_REQUEST:
      return { ...state, isLoading: true, items: [] };
    case LOAD_CURRICULUMS_SUCCESS:
      return { ...state, isLoading: false, items: action.payload.curriculums };
    case LOAD_CURRICULUM_SUCCESS:
      return { ...state, isLoading: false, items: [action.payload.curriculum] };
    case LOAD_CURRICULUMS_FAILURE:
    case LOAD_CURRICULUM_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
