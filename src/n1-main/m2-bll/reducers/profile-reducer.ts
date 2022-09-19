import {profileAPI} from "../../m3-dal/api/profile-api";
import {AppDispatch, AppRootStateType} from "../store";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../m1-ui/common/utils/error-utils";
import {setAppStatusAC} from "./app-reducer";

//state
const initialState = {} as ProfileStateType;

//reducer
export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case 'SET-PROFILE': {
            return {
                ...state,
                _id: action.id,
                name: action.name,
                email: action.email,
                avatar: action.avatar
            };
        }
        case 'CHANGE-NAME': {
            return {...state, name: action.name};
        }
        default:
            return state;
    }
}


//actions
export const setProfileAC = (id: string, name: string, email: string, avatar?: string ) => {
    return {
        type: 'SET-PROFILE',
        id,
        name,
        email,
        avatar: 'https:\//i.pinimg.com/originals/ea/09/10/ea0910307bcc7fea70790f85c0598aa3.jpg',
    } as const
};
export const changeNameAC = (name: string) => {
    return {
        type: 'CHANGE-NAME',
        name,
    } as const
};


//thunks
export const changeNameTC = (name: string) =>
    (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC("loading"))
    const avatar = getState().profile.avatar;

    profileAPI.changeProfile(name, avatar)
        .then(res => {
            dispatch(changeNameAC(res.data.updatedUser.name));
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message:error},dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};


//types
export type ProfileActionsType = ReturnType<typeof changeNameAC | typeof setProfileAC>;
export type ProfileStateType = {
    _id: string
    name: string
    avatar: string
    email: string
};