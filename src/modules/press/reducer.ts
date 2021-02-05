import { LOAD_PRESS_REQUEST, LOAD_PRESS_SUCCESS, LOAD_PRESS_FAILURE } from './actions'

const initialState = {
    isLoading: false,
    items: []
}

export default function(state = initialState, action:any) {
    switch(action.type) {
        case LOAD_PRESS_REQUEST:
            return { ...state, isLoading: true, items: []}
        case LOAD_PRESS_SUCCESS:
            return {...state, isLoading: false, items: action.payload.presses}
        case LOAD_PRESS_FAILURE:
            return {...state, isLoading: false}     
        default:
            return state
    }
}