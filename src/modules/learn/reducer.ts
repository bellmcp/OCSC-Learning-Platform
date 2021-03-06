import {
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  LOAD_CONTENT_VIEWS_REQUEST,
  LOAD_CONTENT_VIEWS_SUCCESS,
  LOAD_CONTENT_VIEWS_FAILURE,
  UPDATE_CONTENT_VIEW_REQUEST,
  UPDATE_CONTENT_VIEW_SUCCESS,
  UPDATE_CONTENT_VIEW_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  sessions: [],
  contentViews: [],
  contentSeconds: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case CREATE_SESSION_REQUEST:
      return { ...state, isLoading: true, sessions: [] };
    case LOAD_CONTENT_VIEWS_REQUEST:
      return { ...state, isLoading: true, contentViews: [] };
    case UPDATE_CONTENT_VIEW_REQUEST:
      return { ...state, isLoading: true, contentSeconds: [] };
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sessions: action.payload.session,
      };
    case LOAD_CONTENT_VIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contentViews: action.payload.contentViews,
      };
    case UPDATE_CONTENT_VIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contentSeconds: action.payload.contentSeconds,
      };
    case CREATE_SESSION_FAILURE:
    case LOAD_CONTENT_VIEWS_FAILURE:
    case UPDATE_CONTENT_VIEW_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
