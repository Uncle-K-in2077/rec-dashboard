import AxiosService from "./axios.service";

export const UserStatusService = {
  getAll: async () => {
    const rs = await AxiosService.post({
      url: "/userStatus",
    });
    return rs;
  },
};
