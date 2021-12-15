import axios from "axios";
import { API } from "../../config";

export const getSubs = async () =>
  await axios.get(`${API}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${API}/sub/${slug}`);

export const getSubByCategory = async (id) =>
  await axios.get(`${API}/category/subs/${id}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`${API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });