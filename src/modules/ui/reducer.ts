import { SET_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from "./actions";

const initialState = {
  flashMessage: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload.message };
    case CLEAR_FLASH_MESSAGE:
      return { ...state, flashMessage: null };
    default:
      return state;
  }
}
