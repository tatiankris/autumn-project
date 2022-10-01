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
    min: 0,
    max: 110,
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
        case 'packs/SET-PACKS-COUNT': {
            return {...state, minCardsCount: action.sliderValue[0], maxCardsCount: action.sliderValue[1]}
        }
        case 'packs/RESET-ALL-PACKS-FILTER': {
            return {
                ...state,
                search: action.search,
                isMyId: action.isMyId,
                min: state.minCardsCount,
                max: state.maxCardsCount,
            }
        }
        case 'packs/SET-CARDS-RANGE': {
            return {
                ...state,
                min: action.min,
                max: action.max,
            }
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
export const setPacksCountAC = (sliderValue: Array<number>) => {
    return {
        type: 'packs/SET-PACKS-COUNT',
        sliderValue
    } as const
}
export const resetAllPacksFilterAC = () => {
    return {
        type: 'packs/RESET-ALL-PACKS-FILTER',
        search: '',
        isMyId: false,
    } as const
}
export const setCardsRangeAC = (min: number, max: number) => {
    return {
        type: 'packs/SET-CARDS-RANGE',
        min,
        max
    } as const
}

export const setPacksTC = (): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"))
    const {search, page, pageCount, isMyId, min, max} = getState().packs;
    const _id = getState().profile._id;

    packsAPI.getPacks({
        packName: search,
        user_id: isMyId ? _id : '',
        page,
        pageCount,
        min: min,
        max: max
    })
        .then(res => {
            dispatch(setPacksAC(res.data))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message

            if (error === "you are not authorized /ᐠ-ꞈ-ᐟ\\")
                return

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

export const setCardsRangeTC = (range: { min: number; max: number }): AppThunk => (dispatch) => {
    dispatch(setCardsRangeAC(range.min, range.max))
    dispatch(setPacksTC())
}

export const resetAllPacksFilterTC = (): AppThunk => (dispatch) => {
    dispatch(resetAllPacksFilterAC())
    dispatch(setPacksTC())
}

export type PacksStateType = typeof initialState;
export type PacksActionsType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof searchPacksAC>
    | ReturnType<typeof changePacksPageAC>
    | ReturnType<typeof setMyPacksToPageAC>
    | ReturnType<typeof setPacksCountAC>
    | ReturnType<typeof resetAllPacksFilterAC>
    | ReturnType<typeof setCardsRangeAC>;