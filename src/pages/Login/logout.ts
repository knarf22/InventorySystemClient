import api from "../../api/axios";

export const logout = async () => {
  await api.post("/Auth/logout");
};
