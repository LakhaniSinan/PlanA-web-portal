import api from "../index";
import ENDPOINTS from "../endpoints";

export const getUsers = () => api(ENDPOINTS.getUsers, {}, "get");

export const adminUpdateUser = (id, payload) =>
  api(`${ENDPOINTS.adminUpdateUser}/${id}`, payload, "put");

export const adminChangeUserPassword = (id, payload) =>
  api(`${ENDPOINTS.adminChangeUserPassword}/${id}`, payload, "put");
