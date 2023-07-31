import { combineReducers } from "@reduxjs/toolkit";
import { LocalBodyFormTwoReducer } from "./redux/local-body-form-two-slice";

const rootReducer = combineReducers({
    localBodyFormTwo: LocalBodyFormTwoReducer
});

export default rootReducer;