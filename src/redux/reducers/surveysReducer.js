import Axios from "axios";

const initialState = {
    allSurveys: [],
    userSurveys: []
}

const UPDATE_ALL_SURVEYS = "UPDATE_ALL_SURVEYS";
const UPDATE_USER_SURVEYS = "UPDATE_USER_SURVEYS";
const ADD_SURVEY = "ADD_SURVEY";

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

export function addSurvey(newSurvey) {
    return {
        type: ADD_SURVEY,
        payload: Axios.post("/api/survey", newSurvey)
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
        default: return state;

    }
}