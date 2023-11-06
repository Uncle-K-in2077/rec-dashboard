import axiosService from "./axios.service";
import { toast } from "react-toastify";

const RealEstatesService = {
    //getAll
    getAll: async () => {
        const response = await axiosService.post({
            url: "/realEstates",
        });
        console.log("service", response.data);
        return response.data;
    },
    //getById
    getById: async (id) => {
        const response = await axiosService.get({
            url: `/realEstates/${id}`,
        });
        return response.data;
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
            url: `/realEstates/${id}`,
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