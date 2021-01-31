import {
    LOAD_EDUCATION_REQUEST,
    LOAD_EDUCATION_SUCCESS,
    LOAD_EDUCATION_FAILURE,
    LOAD_USERTYPE_REQUEST,
    LOAD_USERTYPE_SUCCESS,
    LOAD_USERTYPE_FAILURE,
    LOAD_JOBTYPE1_REQUEST,
    LOAD_JOBTYPE1_SUCCESS,
    LOAD_JOBTYPE1_FAILURE,
    LOAD_JOBTYPE2_REQUEST,
    LOAD_JOBTYPE2_SUCCESS,
    LOAD_JOBTYPE2_FAILURE,
    LOAD_JOBTYPE3_REQUEST,
    LOAD_JOBTYPE3_SUCCESS,
    LOAD_JOBTYPE3_FAILURE,
    LOAD_JOBLEVEL_REQUEST,
    LOAD_JOBLEVEL_SUCCESS,
    LOAD_JOBLEVEL_FAILURE,
    LOAD_MINISTRIES_REQUEST,
    LOAD_MINISTRIES_SUCCESS,
    LOAD_MINISTRIES_FAILURE,
    LOAD_DEPARTMENTS_REQUEST,
    LOAD_DEPARTMENTS_SUCCESS,
    LOAD_DEPARTMENTS_FAILURE,
    LOAD_STATEENTERPRISES_REQUEST,
    LOAD_STATEENTERPRISES_SUCCESS,
    LOAD_STATEENTERPRISES_FAILURE,
    LOAD_OCCUPATIONS_REQUEST,
    LOAD_OCCUPATIONS_SUCCESS,
    LOAD_OCCUPATIONS_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    CLEAR_MESSAGE,
    LOAD_MESSAGE,
  } from "./actions";
  
  const initialState = {
    isLoading: false,
    educations: [],
    isError: [],
    userTypes: [],
    jobTypes1: [],
    jobTypes2: [],
    jobTypes3: [],
    jobLevels: [],
    Ministries: [],
    Departments: [],
    StateEnterprises: [],
    Occupations: [],
    message: null,
    severity: null,
  };
  
  export default function (state = initialState, action: any) {
    switch (action.type) {
      case LOAD_EDUCATION_REQUEST:
        return { ...state, isLoading: true, education: [], isError: false };
      case LOAD_EDUCATION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          educations: action.payload.educations,
          isError: true,
        };
      case LOAD_EDUCATION_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_USERTYPE_REQUEST:
        return { ...state, isLoading: true, userTypes: [], isError: false };
      case LOAD_USERTYPE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          userTypes: action.payload.userTypes,
          isError: true,
        };
      case LOAD_USERTYPE_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_JOBTYPE1_REQUEST:
        return { ...state, isLoading: true, jobTypes1: [], isError: false };
      case LOAD_JOBTYPE1_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jobTypes1: action.payload.jobTypes1,
          isError: true,
        };
      case LOAD_JOBTYPE1_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_JOBTYPE2_REQUEST:
        return { ...state, isLoading: true, jobTypes2: [], isError: false };
      case LOAD_JOBTYPE2_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jobTypes2: action.payload.jobTypes2,
          isError: true,
        };
      case LOAD_JOBTYPE2_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_JOBTYPE3_REQUEST:
        return { ...state, isLoading: true, jobTypes3: [], isError: false };
      case LOAD_JOBTYPE3_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jobTypes3: action.payload.jobTypes3,
          isError: true,
        };
      case LOAD_JOBTYPE3_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_JOBLEVEL_REQUEST:
        return { ...state, isLoading: true, jobLevels: [], isError: false };
      case LOAD_JOBLEVEL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jobLevels: action.payload.jobLevels,
          isError: true,
        };
      case LOAD_JOBLEVEL_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_MINISTRIES_REQUEST:
        return { ...state, isLoading: true, Ministries: [], isError: false };
      case LOAD_MINISTRIES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          Ministries: action.payload.Ministries,
          isError: true,
        };
      case LOAD_MINISTRIES_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_DEPARTMENTS_REQUEST:
        return { ...state, isLoading: true, Departments: [], isError: false };
      case LOAD_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          Departments: action.payload.Departments,
          isError: true,
        };
      case LOAD_DEPARTMENTS_FAILURE:
        return { ...state, isLoading: false, isError: false };
      case LOAD_STATEENTERPRISES_REQUEST:
        return {
          ...state,
          isLoading: true,
          StateEnterprises: [],
          isError: false,
        };
      case LOAD_STATEENTERPRISES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          StateEnterprises: action.payload.StateEnterprises,
          isError: true,
        };
      case LOAD_STATEENTERPRISES_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_OCCUPATIONS_REQUEST:
        return { ...state, isLoading: true, Occupations: [], isError: false };
      case LOAD_OCCUPATIONS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          Occupations: action.payload.Occupations,
          isError: true,
        };
      case LOAD_OCCUPATIONS_FAILURE:
        return { ...state, isLoading: false, isError: false };
  
      case LOAD_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          message: null,
          isError: false,
          severity: null,
        };
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          message: action.payload.message,
          severity: action.payload.severity,
          isError: true,
        };
      case LOAD_USER_FAILURE:
        return { ...state, isLoading: false, isError: false };
      case CLEAR_MESSAGE:
        return { ...state, message: null, severity: null };
      case LOAD_MESSAGE:
        return {
          ...state,
          message: action.payload.message,
          severity: action.payload.severity,
        };
      default:
        return state;
    }
  }
  