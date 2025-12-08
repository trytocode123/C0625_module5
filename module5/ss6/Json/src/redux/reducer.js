import {combineReducers} from "redux";

const initAuth = {
    account: null
}
export const authReducer = (state = initAuth, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                account: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                account: null
            }

        default:
            return state;
    }
}
const student = {
    studentList: [],
    newStudent: null
};

export const studentReducer = (state = student, action) => {
    switch (action.type) {
        case "LIST":
            return {
                ...state,
                studentList: action.payload
            }
        case "ADD":
            return {
                ...state,
                newStudent: action.payload
            }
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    auth: authReducer,
    student: studentReducer
})