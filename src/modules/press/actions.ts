import axios from 'axios'
const LOAD_PRESS_REQUEST = 'app/press/LOAD_PRESS_REQUEST'
const LOAD_PRESS_SUCCESS = 'app/press/LOAD_PRESS_SUCCESS'
const LOAD_PRESS_FAILURE = 'app/press/LOAD_PRESS_FAILURE'

function loadPresses() {
    return async (dispatch: any) => {
        dispatch({type: LOAD_PRESS_REQUEST})
        try {
            const {data} = await axios.get('/PressReleases')
            dispatch({type: LOAD_PRESS_SUCCESS, payload: {
                presses: data,
            }})
        } catch(err) {
            dispatch({type: LOAD_PRESS_FAILURE})
        }
    }
}

export {
    LOAD_PRESS_REQUEST,
    LOAD_PRESS_SUCCESS,
    LOAD_PRESS_FAILURE,
    loadPresses
}