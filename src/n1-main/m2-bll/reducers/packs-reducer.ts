import {
    GetPacksResponseType,
    packsAPI,
    PackType,
    UpdatePackDataType
} from "../../m3-dal/api/packs-api";
import {AppRootStateType, AppThunk} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../m1-ui/common/utils/error-utils";

const initialState = {
    cardPacks: [] as Array<PackType>,
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 100,
    minCardsCount: 0,
    search: '',
    page: 1, // выбранная страница
    pageCount: 8,
    isMyId: false
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS': {
            return {
                ...state,
                cardPacks: action.data.cardPacks,
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                maxCardsCount: action.data.maxCardsCount,
                minCardsCount: action.data.minCardsCount,
                page: action.data.page,
                pageCount: action.data.pageCount
            }
        }
        case 'packs/SEARCH-PACKS': {
            return ({...state, search: action.search})
        }
        case 'packs/CHANGE-PACKS-PAGE': {
            return {...state, page: action.page}
        }
        case 'packs/SET-MY-PACKS-TO-PAGE': {
            return {...state, isMyId: action.isMyId}
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
export const searchPacksAC = (search: string) => {
    return {
        type: 'packs/SEARCH-PACKS',
        search
    } as const
}
export const changePacksPageAC = (page: number) => {
    return {
        type: 'packs/CHANGE-PACKS-PAGE',
        page
    } as const
}
export const setMyPacksToPageAC = (isMyId: boolean) => {
    return {
        type: 'packs/SET-MY-PACKS-TO-PAGE',
        isMyId
    } as const
}

export const setPacksTC = (): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"))

    const {search, page, pageCount, isMyId} = getState().packs;
    const _id = getState().profile._id;

    packsAPI.getPacks({packName: search, user_id: isMyId ? _id : '', page, pageCount})
        .then(res => {
            dispatch(setPacksAC(res.data))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
}

export const createPackTC = (cardsPack: { name?: string, deckCover?: string, private_?: boolean }): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))

    packsAPI.createPack({cardsPack})
        .then(res => {
            dispatch(setPacksTC());
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};

export const deletePackTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))

    packsAPI.deletePack(id)
        .then(res => {
            dispatch(setPacksTC());
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};

export const updatePackTC = (data: UpdatePackDataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))

    packsAPI.updatePack(data)
        .then(res => {
            dispatch(setPacksTC());
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            handleServerNetworkError({message: error}, dispatch)
        })
        .finally(() => dispatch(setAppStatusAC("idle")))
};

export type PacksStateType = typeof initialState;
export type PacksActionsType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof searchPacksAC>
    | ReturnType<typeof changePacksPageAC>
    | ReturnType<typeof setMyPacksToPageAC>;