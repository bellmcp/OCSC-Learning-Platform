import {
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  sessions: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case CREATE_SESSION_REQUEST:
      return { ...state, isLoading: true, sessions: [] };
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sessions: action.payload.session,
      };
    case CREATE_SESSION_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
