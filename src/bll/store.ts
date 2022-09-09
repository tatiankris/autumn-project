import {applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {loginReducer} from "./reducers/login-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import {registrationReducer} from "./reducers/registration-reducer";
import {passwordRecoveryReducer} from "./reducers/password-recovery-reducer";
import {newPasswordReducer} from "./reducers/new-password-reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    passwordRec: passwordRecoveryReducer,
    newPassword: newPasswordReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

