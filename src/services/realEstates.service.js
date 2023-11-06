import axiosService from "./axios.service";
import { toast } from "react-toastify";

const RealEstatesService = {
    //getAll
    getAll: async ({ page = 1, limit = 10 }) => {
        const response = await axiosService.post({
            url: "/realEstates",
            data: {
                pagination: {
                    per_page: Number(limit),
                    current_page: Number(page),
                },
            }
        });
        return response;
    },
    //getById
    getById: async (id) => {
        const response = await axiosService.get({
            url: `/realEstates/single/${id}`,
        });
        return response;
    },
    //create
    create: async (data) => {
        const response = await axiosService.post({
            url: `/realEstates/create`,
            data,
        });
        toast.success("Create real estate successfully!");
        return response;
    },
    //update
    update: async (id, data) => {
        const response = await axiosService.patch({
            url: `/realEstates/update/${id}`,
            data,
        });
        toast.success("Update real estate successfully!");
        return response.data;
    },
    //delete
    delete: async (id) => {
        const response = await axiosService.delete({
            url: `/realEstates/delete/${id}`,
        });
        toast.success("Delete real estate successfully!");
        return response.data;
    },

}
export default RealEstatesService;