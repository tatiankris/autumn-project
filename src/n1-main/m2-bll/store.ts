import {AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {authReducer} from "./reducers/auth-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import { appReducer } from './reducers/app-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

