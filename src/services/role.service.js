import axiosService from "./axios.service";

export const RoleService = {
  getAll: async ({ page = 1, limit = 20 }) => {
    const rs = await axiosService.post({
      url: "/roles",
      data: {
        pagination: {
          per_page: Number(limit),
          current_page: Number(page),
        },
      },
    });
    return rs;
  },

  getById: async (id) => {
    const rs = await axiosService.post({
      url: `/single/roles/${id}`,
    });
    return rs;
  },
};
