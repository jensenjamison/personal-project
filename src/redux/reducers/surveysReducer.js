import Axios from "axios";

const initialState = {
    surveys: []
}

const UPDATE_SURVEYS = "UPDATE_SURVEYS";
const ADD_SURVEY = "ADD_SURVEY"

export function updateSurveys() {
    return {
        type: UPDATE_SURVEYS,
        payload: Axios.get("/api/survey")
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
        case `${UPDATE_SURVEYS}_FULFILLED`:
            return {
                ...state,
                surveys: payload.data
            }
        case `${ADD_SURVEY}_FULFILLED`:
            return {
                ...state,
                surveys: payload.data
            }
        default: return state;

    }
}