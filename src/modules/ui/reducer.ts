import { SET_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from "./actions";

const initialState = {
  flashMessage: null,
  alertType: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: action.payload.message,
        alertType: action.payload.severity,
      };
    case CLEAR_FLASH_MESSAGE:
      return { ...state, flashMessage: null };
    default:
      return state;
  }
}
