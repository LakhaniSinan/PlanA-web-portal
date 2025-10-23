import api from "../index";
import ENDPOINTS from "../endpoints";

export const createSetting = (payload) =>
  api(ENDPOINTS.setting, payload, "post");

export const updateSetting = (id, payload) =>
  api(`${ENDPOINTS.setting}/${id}`, payload, "put");

export const getSetting = () => {
  return api(ENDPOINTS.setting, null, "get");
};
