import {
  SET_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
  SET_LEARN_EXIT_DIALOG,
  OPEN_GLOBAL_MODAL,
  CLEAR_GLOBAL_MODAL,
  LOAD_FOOTER_INFO_REQUEST,
  LOAD_FOOTER_INFO_SUCCESS,
  LOAD_FOOTER_INFO_FAILURE,
} from './actions'

const initialState = {
  isSnackbarOpen: false,
  flashMessage: null,
  alertType: null,
  isDialogOpen: false,
  isGlobalModalOpen: false,
  globalModalTitle: '',
  globalModalMessage: '',
  isLoading: false,
  footerInfo: {},
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        isSnackbarOpen: true,
        flashMessage: action.payload.message,
        alertType: action.payload.severity,
      }
    case SET_LEARN_EXIT_DIALOG:
      return {
        ...state,
        isDialogOpen: action.payload.isOpen,
      }
    case CLEAR_FLASH_MESSAGE:
      return { ...state, isSnackbarOpen: false }
    case OPEN_GLOBAL_MODAL:
      return {
        ...state,
        isGlobalModalOpen: true,
        globalModalTitle: action.payload.globalModalTitle,
        globalModalMessage: action.payload.globalModalMessage,
      }
    case CLEAR_GLOBAL_MODAL:
      return {
        ...state,
        isGlobalModalOpen: false,
      }
    case LOAD_FOOTER_INFO_REQUEST:
      return { ...state, isLoading: true, footerInfo: {} }
    case LOAD_FOOTER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        footerInfo: action.payload.footerInfo,
      }
    case LOAD_FOOTER_INFO_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
