import {
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_CATEGORIES_REQUEST:
      return { ...state, isLoading: true, items: [] };
    case LOAD_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, items: action.payload.categories };
    case LOAD_CATEGORIES_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
