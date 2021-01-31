import {
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
} from "./actions";
const initialState = {
  isLoading: false,
  status: [],
  message: [],
  data: [],
  user: [],
  isErrorProfile: 404,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: [],
        data: [],
        isErrorProfile: [],
      };
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        status: action.payload.status,
        data: action.payload.data,
      };
    case LOAD_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        status: action.payload.status,
        isErrorProfile: action.payload.isErrorProfile,
      };
    default:
      return state;
  }
}
