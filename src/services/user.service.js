import { toast } from "react-toastify";
import AxiosService from "./axios.service";
import { mutate } from "swr";
import { SWR_KEY } from "../constants/SWR_KEY";

const UserSerivce = {
  getAll: async ({ page = 1, limit = 20 }) => {
    const rs = await AxiosService.post({
      url: "/users",
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
    const rs = await AxiosService.get({
      url: `/users/single/${id}`,
    });

    return rs;
  },

  create: async (data) => {
    const rs = await AxiosService.post({
      url: `/users/create`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    mutate(SWR_KEY.GET_ALL_USERS);
    toast.success("Create user successfully!");
    return rs;
  },

  update: async ({ id, data }) => {
    const rs = await AxiosService.patch({
      url: `/users/update/${id}`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    mutate(SWR_KEY.GET_ALL_USERS);

    toast.success("Update user successfully!");

    return rs;
  },
  delete: async (id, data) => {
    const rs = await AxiosService.delete({
      url: `/users/delete/${id}`,
      data,
    });
    toast.success("Delete user successfully!");
    mutate(SWR_KEY.GET_ALL_USERS);

    return rs;
  },

  getTasks: async (id) => {
    const rs = await AxiosService.get({
      url: `/userTasks/single/${id}`,
    });

    return rs;
  },
};
export default UserSerivce;
