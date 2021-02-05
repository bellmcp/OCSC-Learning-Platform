const SET_FLASH_MESSAGE = "learning-platform/ui/SET_FLASH_MESSAGE";
const CLEAR_FLASH_MESSAGE = "learning-platform/ui/CLEAR_FLASH_MESSAGE";

function setFlashMessage(message: string) {
  return {
    type: SET_FLASH_MESSAGE,
    payload: {
      message,
    },
  };
}

function clearFlashMessage() {
  return {
    type: CLEAR_FLASH_MESSAGE,
  };
}

export {
  SET_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
  setFlashMessage,
  clearFlashMessage,
};
