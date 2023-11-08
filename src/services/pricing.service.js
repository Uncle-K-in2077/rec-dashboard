import { toast } from "react-toastify";
import AxiosService from "./axios.service";
import { SWR_KEY } from "../constants/SWR_KEY";
import { mutate } from "swr";

const PricingService = {

    getListStatus: async ({ page, limit }) => {
        const rs = await AxiosService.post({
            url: "/pricingStatuses",
            data: {
                pagination: {
                    per_page: Number(limit),
                    current_page: Number(page),
                },
            },
        });
        return rs;
    },
    getDetailsStatus: async (id) => {
        const rs = await AxiosService.get({ url: `/pricingStatuses/single/${id}`, });
        return rs;
    },
    createStatus: async (data) => {
        const rs = await AxiosService.post({
            url: `/pricingStatuses/create`,
            data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        mutate(SWR_KEY.GET_ALL_PRICINGS_STATUS);
        toast.success("Create Status For Pricing successfully!");
        return rs;
    },
    deleteStatus: async (id) => {
        const response = await AxiosService.delete({
            url: `/pricingStatuses/delete/${id}`,
        });
        toast.success("Delete status successfully!");
        return response.data;
    },
    updateStatus: async (id, data) => {
        const response = await AxiosService.patch({
            url: `/pricingStatuses/update/${id}`,
            data,
        });
        toast.success("Update land successfully!");
        return response.data;
    },
    //Pricing 
    getAll: async ({ page = 1, limit = 20 }) => {
        const rs = await AxiosService.post({
            url: "/pricings",
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
            url: `/pricings/create`,
            data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        mutate(SWR_KEY.GET_ALL_PRICINGS);
        toast.success("Create Pricing successfully!");
        return rs;
    },

    getPricingDetails: async (id) => {
        const rs = await AxiosService.get({
            url: `/pricings/single/${id}`,
        });
        return rs;
    },
    delete: async (id) => {
        const response = await AxiosService.delete({
            url: `/pricings/delete/${id}`,
        });
        toast.success("Delete pricing successfully!");
        return response.data;
    },
    update: async (id, data) => {
        const response = await AxiosService.patch({
            url: `/pricings/update/${id}`,
            data,
        });
        toast.success("Update pricing successfully!");
        return response.data;
    },
};
export default PricingService;

