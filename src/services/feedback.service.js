import { toast } from "react-toastify";
import AxiosService from "./axios.service";
import { mutate } from "swr";
import { SWR_KEY } from "../constants/SWR_KEY";

const FeedBackSerivce = {
    getAll: async ({ page = 1, limit = 20 }) => {
        const rs = await AxiosService.post({
            url: "/feedback",
            data: {
                pagination: {
                    per_page: Number(limit),
                    current_page: Number(page),
                },
            },
        });
        return rs;
    },
    getListStatus: async () => {
        const rs = await AxiosService.post({
            url: "/feedbackStatus",
        });
        return rs;
    },
    getFeedbackDetails: async (id) => {
        const rs = await AxiosService.get({
            url: `/feedback/single/${id}`,
        });
        return rs;
    },
    create: async (data) => {
        const rs = await AxiosService.post({
            url: `/feedback/create`,
            data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        mutate(SWR_KEY.GET_ALL_USERS);
        toast.success("Create user successfully!");
        return rs;
    },

    // getReportType: async (id) => {
    //     const rs = await AxiosService.get({
    //         url: `/feedback/single/${id}`,
    //     });
    //     return rs;
    // },
};
export default FeedBackSerivce;

