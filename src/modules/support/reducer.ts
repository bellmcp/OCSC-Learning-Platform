import {
  LOAD_SUPPORT_REQUEST,
  LOAD_SUPPORT_SUCCESS,
  LOAD_SUPPORT_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_SUPPORT_REQUEST:
      return { ...state, isLoading: true, items: [] };
    case LOAD_SUPPORT_SUCCESS:
      return { ...state, isLoading: false, items: action.payload.supports };
    case LOAD_SUPPORT_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
