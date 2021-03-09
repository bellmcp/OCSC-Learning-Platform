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
  LOAD_EVALUATION_REQUEST,
  LOAD_EVALUATION_SUCCESS,
  LOAD_EVALUATION_FAILURE,
  LOAD_EVALUATION_ITEMS_REQUEST,
  LOAD_EVALUATION_ITEMS_SUCCESS,
  LOAD_EVALUATION_ITEMS_FAILURE,
  LOAD_TEST_REQUEST,
  LOAD_TEST_SUCCESS,
  LOAD_TEST_FAILURE,
  LOAD_TEST_ITEMS_REQUEST,
  LOAD_TEST_ITEMS_SUCCESS,
  LOAD_TEST_ITEMS_FAILURE,
} from "./actions";

const initialState = {
  isLoading: false,
  sessions: [],
  contentViews: [],
  contentSeconds: [],
  evaluation: [],
  evaluationItems: [],
  test: [],
  testItems: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case CREATE_SESSION_REQUEST:
      return { ...state, isLoading: true, sessions: [] };
    case LOAD_CONTENT_VIEWS_REQUEST:
      return { ...state, isLoading: true, contentViews: [] };
    case UPDATE_CONTENT_VIEW_REQUEST:
      return { ...state, isLoading: true, contentSeconds: [] };
    case LOAD_EVALUATION_REQUEST:
      return { ...state, isLoading: true, evaluation: [] };
    case LOAD_EVALUATION_ITEMS_REQUEST:
      return { ...state, isLoading: true, evaluationItems: [] };
    case LOAD_TEST_REQUEST:
      return { ...state, isLoading: true, test: [] };
    case LOAD_TEST_ITEMS_REQUEST:
      return { ...state, isLoading: true, testItems: [] };
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
    case LOAD_EVALUATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        evaluation: action.payload.evaluation,
      };
    case LOAD_EVALUATION_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        evaluationItems: action.payload.evaluationItems,
      };
    case LOAD_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        test: action.payload.test,
      };
    case LOAD_TEST_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        testItems: action.payload.testItems,
      };
    case CREATE_SESSION_FAILURE:
    case LOAD_CONTENT_VIEWS_FAILURE:
    case UPDATE_CONTENT_VIEW_FAILURE:
    case LOAD_EVALUATION_FAILURE:
    case LOAD_EVALUATION_ITEMS_FAILURE:
    case LOAD_TEST_FAILURE:
    case LOAD_TEST_ITEMS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
