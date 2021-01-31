import axios from "axios";

const LOAD_EDUCATION_REQUEST =
  "learning-portal/src/info/LOAD_EDUCATION_REQUEST";
const LOAD_EDUCATION_SUCCESS =
  "learning-portal/src/info/LOAD_EDUCATION_SUCCESS";
const LOAD_EDUCATION_FAILURE =
  "learning-portal/src/info/LOAD_EDUCATION_REQUEST";

const LOAD_USERTYPE_REQUEST = "learning-portal/src/info/LOAD_USERTYPE_REQUEST";
const LOAD_USERTYPE_SUCCESS = "learning-portal/src/info/LOAD_USERTYPE_SUCCESS";
const LOAD_USERTYPE_FAILURE = "learning-portal/src/info/LOAD_USERTYPE_REQUEST";

const LOAD_JOBTYPE1_REQUEST = "learning-portal/src/info/LOAD_JOBTYPE1_REQUEST";
const LOAD_JOBTYPE1_SUCCESS = "learning-portal/src/info/LOAD_JOBTYPE1_SUCCESS";
const LOAD_JOBTYPE1_FAILURE = "learning-portal/src/info/LOAD_JOBTYPE1_REQUEST";

const LOAD_JOBTYPE2_REQUEST = "learning-portal/src/info/LOAD_JOBTYPE2_REQUEST";
const LOAD_JOBTYPE2_SUCCESS = "learning-portal/src/info/LOAD_JOBTYPE2_SUCCESS";
const LOAD_JOBTYPE2_FAILURE = "learning-portal/src/info/LOAD_JOBTYPE2_REQUEST";

const LOAD_JOBTYPE3_REQUEST = "learning-portal/src/info/LOAD_JOBTYPE3_REQUEST";
const LOAD_JOBTYPE3_SUCCESS = "learning-portal/src/info/LOAD_JOBTYPE3_SUCCESS";
const LOAD_JOBTYPE3_FAILURE = "learning-portal/src/info/LOAD_JOBTYPE3_REQUEST";

const LOAD_JOBLEVEL_REQUEST = "learning-portal/src/info/LOAD_JOBLEVEL_REQUEST";
const LOAD_JOBLEVEL_SUCCESS = "learning-portal/src/info/LOAD_JOBLEVEL_SUCCESS";
const LOAD_JOBLEVEL_FAILURE = "learning-portal/src/info/LOAD_JOBLEVEL_REQUEST";

const LOAD_MINISTRIES_REQUEST =
  "learning-portal/src/info/LOAD_MINISTRIES_REQUEST";
const LOAD_MINISTRIES_SUCCESS =
  "learning-portal/src/info/LOAD_MINISTRIES_SUCCESS";
const LOAD_MINISTRIES_FAILURE =
  "learning-portal/src/info/LOAD_MINISTRIES_REQUEST";

const LOAD_DEPARTMENTS_REQUEST =
  "learning-portal/src/info/LOAD_DEPARTMENTS_REQUEST";
const LOAD_DEPARTMENTS_SUCCESS =
  "learning-portal/src/info/LOAD_DEPARTMENTS_SUCCESS";
const LOAD_DEPARTMENTS_FAILURE =
  "learning-portal/src/info/LOAD_DEPARTMENTS_REQUEST";

const LOAD_STATEENTERPRISES_REQUEST =
  "learning-portal/src/info/LOAD_STATEENTERPRISES_REQUEST";
const LOAD_STATEENTERPRISES_SUCCESS =
  "learning-portal/src/info/LOAD_STATEENTERPRISES_SUCCESS";
const LOAD_STATEENTERPRISES_FAILURE =
  "learning-portal/src/info/LOAD_STATEENTERPRISES_REQUEST";

const LOAD_OCCUPATIONS_REQUEST =
  "learning-portal/src/info/LOAD_OCCUPATIONS_REQUEST";
const LOAD_OCCUPATIONS_SUCCESS =
  "learning-portal/src/info/LOAD_OCCUPATIONS_SUCCESS";
const LOAD_OCCUPATIONS_FAILURE =
  "learning-portal/src/info/LOAD_OCCUPATIONS_REQUEST";

const LOAD_USER_REQUEST = "learning-portal/src/info/LOAD_USER_REQUEST";
const LOAD_USER_SUCCESS = "learning-portal/src/info/LOAD_USER_SUCCESS";
const LOAD_USER_FAILURE = "learning-portal/src/info/LOAD_USER_FAILURE";

const LOAD_MESSAGE = "learning-portal/src/info/LOAD_MESSAGE";
const CLEAR_MESSAGE = "learning-portal/src/info/CLEAR_MESSAGE";
function loadEducation() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_EDUCATION_REQUEST });
    try {
      const { data } = await axios.get(`/Educations`);
      dispatch({
        type: LOAD_EDUCATION_SUCCESS,
        payload: {
          educations: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_EDUCATION_FAILURE });
    }
  };
}

function loadUserTypes() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_USERTYPE_REQUEST });
    try {
      const { data } = await axios.get(`/UserTypes`);
      dispatch({
        type: LOAD_USERTYPE_SUCCESS,
        payload: {
          userTypes: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_USERTYPE_FAILURE });
    }
  };
}

function loadJobType1() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_JOBTYPE1_REQUEST });
    try {
      const { data } = await axios.get(`/JobTypes1`);
      dispatch({
        type: LOAD_JOBTYPE1_SUCCESS,
        payload: {
          jobTypes1: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_JOBTYPE1_FAILURE });
    }
  };
}

function loadJobType2() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_JOBTYPE2_REQUEST });
    try {
      const { data } = await axios.get(`/JobTypes2`);
      dispatch({
        type: LOAD_JOBTYPE2_SUCCESS,
        payload: {
          jobTypes2: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_JOBTYPE2_FAILURE });
    }
  };
}

function loadJobType3() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_JOBTYPE3_REQUEST });
    try {
      const { data } = await axios.get(`/JobTypes3`);
      dispatch({
        type: LOAD_JOBTYPE3_SUCCESS,
        payload: {
          jobTypes3: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_JOBTYPE3_FAILURE });
    }
  };
}

function loadJobLevel() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_JOBLEVEL_REQUEST });
    try {
      const { data } = await axios.get(`/JobLevels`);
      dispatch({
        type: LOAD_JOBLEVEL_SUCCESS,
        payload: {
          jobLevels: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_JOBLEVEL_FAILURE });
    }
  };
}

function loadMinistries() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_MINISTRIES_REQUEST });
    try {
      const { data } = await axios.get(`/Ministries`);
      dispatch({
        type: LOAD_MINISTRIES_SUCCESS,
        payload: {
          Ministries: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_MINISTRIES_FAILURE });
    }
  };
}

function loadDepartments(id: any) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_DEPARTMENTS_REQUEST });
    try {
      const { data } = await axios.get(`/Ministries/${id}/Departments`);

      dispatch({
        type: LOAD_DEPARTMENTS_SUCCESS,
        payload: {
          Departments: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_DEPARTMENTS_FAILURE });
    }
  };
}

function loadStateEnterprises() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_STATEENTERPRISES_REQUEST });
    try {
      const { data } = await axios.get(`/StateEnterprises`);

      dispatch({
        type: LOAD_STATEENTERPRISES_SUCCESS,
        payload: {
          StateEnterprises: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_STATEENTERPRISES_FAILURE });
    }
  };
}

function loadOccupations() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_OCCUPATIONS_REQUEST });
    try {
      const { data } = await axios.get(`/Occupations`);

      dispatch({
        type: LOAD_OCCUPATIONS_SUCCESS,
        payload: {
          Occupations: data,
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_OCCUPATIONS_FAILURE });
    }
  };
}

function loadPresence(id: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_USER_REQUEST });
    try {
      const { data } = await axios.get(`/Users/${id}/Presence`, { baseURL: 'https://welearn.ocsc.go.th/learning-portal-api/',});

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: {
          message: data.presence
            ? "เลขประจำตัวประชาชนนี้ได้ทำการสมัครเเล้ว"
            : "สามารถใช้เลขประจำตัวประชาชนนี้ได้",
          severity: data.presence ? "error" : "info",
        },
      });
    } catch (err) {
      dispatch({ type: LOAD_USER_FAILURE });
    }
  };
}
function clearMessage() {
  return {
    type: CLEAR_MESSAGE,
  };
}
function loadMessage(message: string, severity: string) {
  return {
    type: LOAD_MESSAGE,
    payload: {
      message,
      severity,
    },
  };
}

export {
  CLEAR_MESSAGE,
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
  LOAD_MESSAGE,
  clearMessage,
  loadEducation,
  loadUserTypes,
  loadJobType1,
  loadJobType2,
  loadJobType3,
  loadJobLevel,
  loadMinistries,
  loadDepartments,
  loadStateEnterprises,
  loadOccupations,
  loadPresence,
  loadMessage,
};
