import api from "./axios";

export const logout = async () => {
  await api.post("/Auth/logout");
};
