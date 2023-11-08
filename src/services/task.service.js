import { toast } from "react-toastify";
import AxiosService from "./axios.service";
import { SWR_KEY } from "../constants/SWR_KEY";
import { mutate } from "swr";

const TaskService = {

    getAll: async ({ page = 1, limit = 20 }) => {
        const rs = await AxiosService.post({
            url: "/tasks",
            data: {
                pagination: {
                    per_page: Number(limit),
                    current_page: Number(page),
                },
            },
        });
        return rs;
    },
    create: async (data) => {
        const rs = await AxiosService.post({
            url: `/tasks/create`,
            data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        mutate(SWR_KEY.GET_ALL_PRICINGS);
        toast.success("Create Task successfully!");
        return rs;
    },

    getTaskDetails: async (id) => {
        const rs = await AxiosService.get({
            url: `/tasks/single/${id}`,
        });
        return rs;
    },
    delete: async (id) => {
        const response = await AxiosService.delete({
            url: `/tasks/delete/${id}`,
        });
        toast.success("Delete Task successfully!");
        return response.data;
    },
    update: async (id, data) => {
        const response = await AxiosService.patch({
            url: `/tasks/update/${id}`,
            data,
        });
        toast.success("Update Task successfully!");
        return response.data;
    },
};
export default TaskService;

