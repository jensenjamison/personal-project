import Axios from "axios"


const initialState = {
    first_name: "",
    last_name: "",
    email: ""
};

const GET_SESSION = "GET_SESSION"
const REGISTER = "REGISTER";
const EDIT_USER = "EDIT_USER"
const LOG_IN_USER = "LOG_IN_USER";
const LOG_OUT_USER = "LOG_OUT_USER";

export function getSession() {
    return {
        type: GET_SESSION,
        payload: Axios.get("/auth/session")
    }
}

export function registerUser(data) {
    return {
        type: REGISTER,
        payload: Axios.post("/auth/register", data)
    }
}

export function editUser(data) {
    return {
        type: EDIT_USER,
        payload: Axios.put("/auth/editUser", data)
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
    const { type, payload } = action;

    switch (type) {
        case `${GET_SESSION}_FULFILLED`:
            return {
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                email: payload.data.email
            };
        case `${REGISTER}_FULFILLED`:
            return {
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                email: payload.data.email
            };
        case `${EDIT_USER}_FULFILLED`:
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
        case `${LOG_IN_USER}_REJECTED`:
            alert("Username or Password incorrect")
            break;
        case `${LOG_OUT_USER}_FULFILLED`:
            console.log("hit")
            return {
                first_name: "",
                last_name: "",
                email: ""
            }
        default: return state;

    }
}