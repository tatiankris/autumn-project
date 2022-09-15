let initialState = {

}
export type StateType = typeof initialState;

export const passwordRecoveryReducer = (state: StateType = initialState, action: ActionType): StateType => {

    switch (action.type) {
        case 'TEST': {
            return {...state}
        }
        default:
            return state
    }
}


export const testAC = () => {
    return {
        type: 'TEST'
    } as const
}
export type ActionType = ReturnType<typeof testAC>