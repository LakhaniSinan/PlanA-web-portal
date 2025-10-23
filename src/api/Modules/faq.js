import api from "../index";
import ENDPOINTS from "../endpoints";

export const createFaq = (payload) => api(ENDPOINTS.faq, payload, "post");

export const updateFaq = (id, payload) =>
  api(`${ENDPOINTS.faqUpdate}/${id}`, payload, "put");

export const deleteFaq = (id) => api(`${ENDPOINTS.faq}/${id}`, null, "delete");

export const getFaqById = (id) => api(`${ENDPOINTS.getFaq}/${id}`, null, "get");

export const getAllFaqs = () => api(ENDPOINTS.getFaq, null, "get");
