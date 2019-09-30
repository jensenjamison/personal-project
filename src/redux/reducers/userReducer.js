import Axios from "axios"


const initialState = {
    first_name: "",
    last_name: "",
    email: ""
};

const REGISTER = "REGISTER";
const LOG_IN_USER = "LOG_IN_USER";
const LOG_OUT_USER = "LOG_OUT_USER";

export function registerUser(data) {
    return {
        type: REGISTER,
        payload: Axios.post("/auth/register", data)
    }
}

export function loginUser(data) {
    return {
        type: LOG_IN_USER,
        payload: Axios.post("/auth/login", data)
    }
}

export function logOutUser() {
    return {
        type: LOG_OUT_USER,
        payload: Axios.post("/auth/logout")
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case `${REGISTER}_FULFILLED`:
            return {
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                email: payload.data.email
            };
        case `${LOG_IN_USER}_FULFILLED`:
            return {
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                email: payload.data.email
            };
        case `${LOG_OUT_USER}_FULFILLED`:
            return {
                ...state
            }
        default: return state;

    }
}