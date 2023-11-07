import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SWR_KEY } from "../../constants/SWR_KEY";
import useSWR from "swr";
import RealEstatesService from "../../services/realEstates.service";

import TextField from "@mui/material/TextField";
import Spinners from "../../components/Loading/Spinners";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DateChooser from "../../components/Inputs/DateChooser";
import UpdateButton from "../../components/Buttons/UpdateButton";
import CancelButton from "../../components/Buttons/CancelButton";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function SingleRealEstates() {
    const { id } = useParams();
    const [updating, setUpdating] = useState(false);
    const fetcher = async () => {
        return await RealEstatesService.getById(id);
    };
    const { isLoading, data, mutate } = useSWR(SWR_KEY.GET_SINGLE_REAL_ESTATE, fetcher);
    console.log(data);

    const [realEstateData, setRealEstateData] = useState({
        title: "",
        id_ref: "",
        price: "",
        price_display: "",
        url: "",
        domain: "",
        publish_at: dayjs(),
        publish_display: "",
        location: "",
    });

    useEffect(() => {
        if (data) {
            setRealEstateData(data);
        }
    }, [data]);

    const handleChange = (e) => {
        setRealEstateData({
            ...realEstateData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date) => {
        setRealEstateData({
            ...realEstateData,
            publish_at: date,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const formattedPublishAt = dayjs(realEstateData.publish_at).format('YYYY-MM-DD HH:mm:ss');
        const dataToUpdate = { ...realEstateData, publish_at: formattedPublishAt };

        console.log("datatoupdate   >> ", dataToUpdate);
        try {
            await RealEstatesService.update(id, dataToUpdate);
            mutate();
        } catch (error) {
            toast.error("Error while updating Real Estate");
            throw error;
        } finally {
            setUpdating(false);
        }
    }

    if (isLoading) {
        return <Spinners />;
    }
    return (
        <div className="row">
            <div className="col-sm-12 col-md-8 col-xl-10" style={{ margin: "0 auto" }}>
                <div className="create_RE_form">
                    <Paper className="p-3">
                        <h3>Name: {realEstateData.title}</h3>
                        <form className="mt-5"
                            onSubmit={handleUpdate}
                        >
                            <Grid container spacing={2}>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="title"
                                        label="Title"
                                        variant="outlined"
                                        value={realEstateData.title}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="id_ref"
                                        label="Reference ID"
                                        variant="outlined"
                                        value={realEstateData.id_ref}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="price"
                                        label="Price"
                                        type="number"
                                        variant="outlined"
                                        value={realEstateData.price}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="price_display"
                                        label="Price Display"
                                        variant="outlined"
                                        value={realEstateData.price_display}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="url"
                                        label="URL"
                                        variant="outlined"
                                        value={realEstateData.url}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="domain"
                                        label="Domain"
                                        variant="outlined"
                                        value={realEstateData.domain}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="publish_display"
                                        label="Publish Display"
                                        variant="outlined"
                                        value={realEstateData.publish_display}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="location"
                                        label="Location"
                                        variant="outlined"
                                        value={realEstateData.location}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <DateChooser
                                        name="publish_at"
                                        label="Publish Date"
                                        selectedDate={dayjs(realEstateData.publish_at)}
                                        onDateChange={handleDateChange}
                                        fullWidth
                                        required
                                    />

                                </div>
                                {updating && (
                                    <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                        <Spinners />
                                    </div>
                                )}
                            </Grid>
                            <hr />
                            <Grid container spacing={2}>
                                <div className="col-sm-12 col-md-12 col-xl-6 px-2 mt-3">
                                    <UpdateButton
                                        fullWidth
                                        type="submit"
                                    >
                                        Update
                                    </UpdateButton>
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 px-2 mt-3">
                                    <CancelButton
                                        fullWidth={true}
                                        cancelUrl={"/dashboard/real_estates"}
                                    >
                                    </CancelButton>
                                </div>
                            </Grid>
                        </form>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default SingleRealEstates;