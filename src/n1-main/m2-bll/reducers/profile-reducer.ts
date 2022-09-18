import {Dispatch} from "redux"
import {profileAPI} from "../../m3-dal/api/profile-api";
import {AppRootStateType} from "../store";

//state
const initialState: ProfileStateType = {
    _id: 'test',
    name: 'test',
    avatar: 'test',
    email: 'test',
};

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
    debugger
    return {
        type: 'SET-PROFILE',
        id,
        name,
        email,
        avatar: 'https:\//i.pinimg.com/originals/ea/09/10/ea0910307bcc7fea70790f85c0598aa3.jpg'
    } as const
};
export const changeNameAC = (name: string) => {
    return {
        type: 'CHANGE-NAME',
        name
    } as const
};


//thunks
export const changeNameTC = (name: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const avatar = getState().profile.avatar;

    profileAPI.changeProfile(name, avatar)
        .then(() => {
            dispatch(changeNameAC(name));
        })
};


//types
export type ProfileActionsType = ReturnType<typeof changeNameAC | typeof setProfileAC>;
export type ProfileStateType = {
    _id: string
    name: string
    avatar: string
    email: string
};