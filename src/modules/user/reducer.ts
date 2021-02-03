import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        items: [],
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.users,
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
