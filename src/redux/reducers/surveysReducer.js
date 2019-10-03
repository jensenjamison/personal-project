import Axios from "axios";

const initialState = {
    allSurveys: [],
    userSurveys: [],
    survey: {}
}

const UPDATE_ALL_SURVEYS = "UPDATE_ALL_SURVEYS";
const UPDATE_USER_SURVEYS = "UPDATE_USER_SURVEYS";
const ADD_SURVEY = "ADD_SURVEY";
const CLEAR_SURVEY_DATA = "CLEAR_SURVEY_DATA";
const DELETE_SURVEY = "DELETE_SURVEY";
const GET_ONE = "GET_ONE";

export function updateAllSurveys() {
    return {
        type: UPDATE_ALL_SURVEYS,
        payload: Axios.get("/api/survey/getAll/")
    }
}

export function updateUserSurveys() {
    return {
        type: UPDATE_USER_SURVEYS,
        payload: Axios.get("/api/survey/getAll/user")
    }
}

export function getOne(survey_id) {
    return {
        type: GET_ONE,
        payload: Axios.get(`/api/survey/getOne/${survey_id}`)
    }
}

export function addSurvey(newSurvey) {
    return {
        type: ADD_SURVEY,
        payload: Axios.post("/api/survey", newSurvey)
    }
}

export function deleteSurvey(survey_id) {
    return {
        type: DELETE_SURVEY,
        payload: Axios.delete(`/api/survey/${survey_id}`)
    }
}

export function clearSurveyData() {
    return {
        type: CLEAR_SURVEY_DATA
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case `${UPDATE_ALL_SURVEYS}_FULFILLED`:
            return {
                ...state,
                allSurveys: payload.data
            }
        case `${UPDATE_USER_SURVEYS}_FULFILLED`:
            return {
                ...state,
                userSurveys: payload.data
            }
        case `${ADD_SURVEY}_FULFILLED`:
            return {
                ...state,
                allSurveys: payload.data
            }
        case `${DELETE_SURVEY}_FULFILLED`:
            console.log(payload)
            return {
                ...state,
                userSurveys: payload.data
            }
        case `${GET_ONE}_FULFILLED`:
            return {
                ...state,
                survey: payload.data
            }
        case CLEAR_SURVEY_DATA:
            return {
                allSurveys: [],
                userSurveys: []
            }
        default: return state;

    }
}