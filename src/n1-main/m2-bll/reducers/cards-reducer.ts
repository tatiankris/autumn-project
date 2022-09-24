import {AppDispatch} from "../store";
import {handleServerNetworkError} from "../../m1-ui/common/utils/error-utils";
import {setAppStatusAC} from "./app-reducer";
import {cardsAPI, CardType, GetCardsParamsType, GetCardsResponseType} from "../../m3-dal/api/cards-api";


let initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 3,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: ""
}

export type StateType = typeof initialState;

export const cardsReducer = (state: StateType = initialState, action: ActionsType): StateType => {

    switch (action.type) {
        case "CARDS/GET-CARDS": {
            return {
                ...state,
                cards: action.cards.cards,
                cardsTotalCount: action.cards.cardsTotalCount,
                pageCount: action.cards.pageCount,
                page: action.cards.page,
                maxGrade: action.cards.maxGrade,
                minGrade: action.cards.maxGrade,
                packUserId: action.cards.packUserId
            }
        }
        default:
            return state
    }
}

//actions
export const getCardsAC = (cards: GetCardsResponseType) => {
    return {
        type: 'CARDS/GET-CARDS',
        cards
    } as const
}


//thunks
export const getCardsTC = (params: GetCardsParamsType) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC("loading"))
        cardsAPI.getCards(params)
            .then(res => {
                dispatch(getCardsAC(res.data))
            })
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : err.message
                handleServerNetworkError({message: error}, dispatch)
            })
            .finally(() => dispatch(setAppStatusAC("idle")))
    }
}


//types
export type ActionsType = ReturnType<typeof getCardsAC>


