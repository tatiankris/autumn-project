import {changeNameAC, ProfileActionsType, ProfileStateType} from "./profile-reducer";
import {GetPacksParamsType, GetPacksResponseType, packsAPI, UpdatePackDataType} from "../../m3-dal/api/packs-api";
import {AppDispatch, AppRootStateType, AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {authAPI} from "../../m3-dal/api/auth-api";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../m1-ui/common/utils/error-utils";
import { Dispatch } from "redux";

const initialState = {
    cardPacks: [
        // {
        //     _id: "5eb6cef840b7bf1cf0d8122d",
        //     user_id: "5eb543f6bea3ad21480f1ee7",
        //     name: "no Name",
        //     cardsCount: 25,
        //     created: "2020-05-09T15:40:40.339Z",
        //     updated: "2020-05-09T15:40:40.339Z",
        // },
    ],
    cardPacksTotalCount: 14, // количество колод
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 3, // выбранная страница
    pageCount: 8,
} as PacksStateType

export type PacksStateType = GetPacksResponseType



export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS': {
            return {...state,
                cardPacks: action.data.cardPacks,
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                maxCardsCount: action.data.maxCardsCount,
                minCardsCount: action.data.minCardsCount,
                page: action.data.page,
                pageCount: action.data.pageCount}
        }

        default:
            return state;
    }
}

export const setPacksAC = (data: GetPacksResponseType) => {
    return {
        type: 'packs/SET-PACKS',
        data
    } as const
}

export const setPacksTC = (params?: GetPacksParamsType) => (dispatch: Dispatch) => {

    packsAPI.getPacks(params || {page: 1, pageCount: 8})
        .then(res => {
            dispatch(setPacksAC(res.data))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
}

export const createPackTC = (cardsPack: {name?: string, deckCover?: string, private_?: boolean}, setPacksParams: GetPacksParamsType): AppThunk => (dispatch) => {

    dispatch(setAppStatusAC("loading"))
    packsAPI.createPack({cardsPack})
        .then(res => {
            dispatch(setPacksTC(setPacksParams));
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};

export const deletePackTC = (id: string, setPacksParams: GetPacksParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))

    packsAPI.deletePack(id)
        .then(res => {
            dispatch(setPacksTC(setPacksParams));
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};

export const updatePackTC = (data: UpdatePackDataType, setPacksParams: GetPacksParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))

    packsAPI.updatePack(data)
        .then(res => {
            dispatch(setPacksTC(setPacksParams));
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};





export type PacksActionsType = ReturnType<typeof setPacksAC>