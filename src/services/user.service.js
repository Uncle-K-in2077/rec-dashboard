import { toast } from "react-toastify";
import AxiosService from "./axios.service";
import { mutate } from "swr";
import { SWR_KEY } from "../constants/SWR_KEY";

const trimAll = (user) => {
  return {
    ...user,
    first_name: user.first_name.trim(),
    last_name: user.last_name.trim(),
    id_card: user.id_card.trim(),
    birthday: user.birthday.trim(),
    gender: user.gender.trim(),
    phone: user.phone.trim(),
    address: user.address.trim(),
    user_status_id: user.user_status_id.trim(),
    email: user.email.trim(),
    password: user.password.trim(),
  };
};

const UserSerivce = {
  getAll: async ({ page, limit }) => {
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

  create: async (user) => {
    const rs = await AxiosService.post({
      url: `/users/create`,
      data: trimAll(user),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    mutate(SWR_KEY.GET_ALL_USERS);
    toast.success("Create user successfully!");
    return rs;
  },

  update: async ({ id, user }) => {
    const rs = await AxiosService.post({
      url: `/users/update/${id}`,
      data: trimAll(user),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    mutate(SWR_KEY.GET_ALL_USERS);

    toast.success("Update user successfully!");

    return rs;
  },

  changePassword: async ({ user, newPassword }) => {
    const rs = await AxiosService.post({
      url: `/users/update/${user.id}`,
      data: { ...user, password: newPassword, gender: user.gender.id },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    mutate(SWR_KEY.GET_ALL_USERS);

    toast.success("Change password successfully!");

    return rs;
  },

  delete: async (id) => {
    const rs = await AxiosService.delete({
      url: `/users/delete/${id}`,
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
