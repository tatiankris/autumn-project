import {AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {loginReducer} from "./reducers/login-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import {registrationReducer} from "./reducers/registration-reducer";
import {passwordRecoveryReducer} from "./reducers/password-recovery-reducer";
import {newPasswordReducer} from "./reducers/new-password-reducer";
import { appReducer } from './reducers/app-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    passwordRec: passwordRecoveryReducer,
    newPassword: newPasswordReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

