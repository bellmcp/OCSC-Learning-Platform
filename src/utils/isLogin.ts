import { getCookie } from "utils/cookies";

export const isLogin = () => {
  const token = getCookie("token");
  if (token) {
    return true;
  }
  return false;
};
