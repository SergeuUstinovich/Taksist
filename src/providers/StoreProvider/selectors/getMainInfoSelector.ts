import { StateScheme } from "../config/StateScheme";

export const getMainInfoSelector = (state: StateScheme) =>
  state.profile.mainInfo;
export const getOffsetServerSelector = (state: StateScheme) =>
  state.profile.offsetServerNow;
