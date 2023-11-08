import axiosService from "./axios.service";
import { toast } from "react-toastify";

const TaskStatusService = {
    getAllTaskStatuses: async () => {
        const response = await axiosService.post({
            url: "/taskStatuses",
        });
        return response;
    },

    getDetailsStatus: async (id) => {
        const response = await axiosService.get({
            url: `/taskStatuses/single/${id}`,
        });
        return response;
    },

    createTaskStatus: async (data) => {
        const response = await axiosService.post({
            url: `/taskStatuses/create`,
            data,
        });
        toast.success("Create task status successfully!");
        return response;
    },

    updateTaskStatus: async (id, data) => {
        const response = await axiosService.patch({
            url: `/taskStatuses/update/${id}`,
            data,
        });
        toast.success("Update task status successfully!");
        return response.data;
    },

    deleteTaskStatus: async (id) => {
        const response = await axiosService.delete({
            url: `/taskStatuses/delete/${id}`,
        });
        toast.success("Delete task status successfully!");
        return response.data;
    },

}
export default TaskStatusService;