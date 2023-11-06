import { toast } from "react-toastify";
import axiosService from "./axios.service";
import { mutate } from "swr";
import { SWR_KEY } from "../constants/SWR_KEY";

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
    const rs = await axiosService.get({
      url: `/roles/single/${id}`,
    });
    return rs;
  },

  create: async (data) => {
    const rs = await axiosService.post({
      url: `/roles/create`,
      data,
    });
    mutate(SWR_KEY.GET_ALL_ROLES);
    toast.success("Create role successfully !");
    return rs;
  },
  update: async ({ id, data }) => {
    const rs = await axiosService.patch({
      url: `/roles/update/${id}`,
      data,
    });
    mutate(SWR_KEY.GET_ALL_ROLES);
    toast.success("Update role successfully !");
    return rs;
  },
};
