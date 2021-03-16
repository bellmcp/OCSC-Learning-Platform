import {
  SET_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
  SET_LEARN_EXIT_DIALOG,
} from "./actions";

const initialState = {
  isSnackbarOpen: false,
  flashMessage: null,
  alertType: null,
  isDialogOpen: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        isSnackbarOpen: true,
        flashMessage: action.payload.message,
        alertType: action.payload.severity,
      };
    case SET_LEARN_EXIT_DIALOG:
      return {
        ...state,
        isDialogOpen: action.payload.isOpen,
      };
    case CLEAR_FLASH_MESSAGE:
      return { ...state, isSnackbarOpen: false };
    default:
      return state;
  }
}
