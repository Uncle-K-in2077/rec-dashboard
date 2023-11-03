import { toast } from "react-toastify";
import AxiosService from "./axios.service";

const UserSerivce = {
  getAll: async () => {
    const rs = await AxiosService.post({
      url: "/users",
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
    });
    toast.success("Create user successfully!");
    return rs;
  },

  update: async (id, data) => {
    const rs = await AxiosService.patch({
      url: `/users/update/${id}`,
      data,
    });
    toast.success("Update user successfully!");

    return rs;
  },
  delete: async (id, data) => {
    const rs = await AxiosService.delete({
      url: `/users/delete/${id}`,
      data,
    });
    toast.success("Delete user successfully!");

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
