import { toast } from "react-toastify";
import AxiosService from "./axios.service";
import { mutate } from "swr";
import { SWR_KEY } from "../constants/SWR_KEY";

const LandsService = {
    getAll: async ({ page = 1, limit = 20 }) => {
        const rs = await AxiosService.post({
            url: "/lands",
            data: {
                pagination: {
                    per_page: Number(limit),
                    current_page: Number(page),
                },
            },
        });
        return rs;
    },
    getContentFlowStt: async () => {
        const rs = await AxiosService.post({
            url: "/contentFlowStatuses",
        });
        return rs;
    },
    create: async (data) => {
        console.log("dataaaa : ", data);
        const rs = await AxiosService.post({
            url: `/lands/create`,
            data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        mutate(SWR_KEY.GET_ALL_LANDS);
        toast.success("Create lands successfully!");
        return rs;
    },
    getLandDetails: async (id) => {
        const rs = await AxiosService.get({
            url: `/lands/single/${id}`,
        });
        return rs;
    },
    delete: async (id) => {
        const response = await AxiosService.delete({
            url: `/lands/delete/${id}`,
        });
        toast.success("Delete lands successfully!");
        return response.data;
    },
    update: async (id, data) => {
        const response = await AxiosService.post({
            url: `/lands/update/${id}`,
            data,
        });
        toast.success("Update land successfully!");
        return response.data;
    },
};
export default LandsService;

