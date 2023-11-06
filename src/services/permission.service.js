import AxiosService from "./axios.service";

export const PermissionService = {
  getAll: async () => {
    const rs = await AxiosService.post({
      url: "/permissions",
    });
    return rs;
  },
};
