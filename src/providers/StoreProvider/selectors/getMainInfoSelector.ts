import { StateScheme } from "../config/StateScheme";

export const getMainInfoSelector = (state: StateScheme) =>
  state.profile.mainInfo;
