const SET_FLASH_MESSAGE = "learning-platform/ui/SET_FLASH_MESSAGE";
const CLEAR_FLASH_MESSAGE = "learning-platform/ui/CLEAR_FLASH_MESSAGE";
const SET_LEARN_EXIT_DIALOG = "learning-platform/ui/SET_LEARN_EXIT_DIALOG";

function setFlashMessage(message: string, severity: string) {
  return {
    type: SET_FLASH_MESSAGE,
    payload: {
      message,
      severity,
    },
  };
}

function clearFlashMessage() {
  return {
    type: CLEAR_FLASH_MESSAGE,
  };
}

function setLearnExitDialog(isOpen: boolean) {
  return {
    type: SET_LEARN_EXIT_DIALOG,
    payload: {
      isOpen,
    },
  };
}

export {
  SET_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
  SET_LEARN_EXIT_DIALOG,
  setFlashMessage,
  clearFlashMessage,
  setLearnExitDialog,
};
