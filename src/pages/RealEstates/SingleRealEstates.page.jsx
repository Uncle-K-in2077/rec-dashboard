import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { SWR_KEY } from "../../constants/SWR_KEY";
import useSWR from "swr";
import RealEstatesService from "../../services/realEstates.service";

import Spinners from "../../components/Loading/Spinners";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DateChooser from "../../components/Inputs/DateChooser";
import UpdateButton from "../../components/Buttons/UpdateButton";
import dayjs from "dayjs";

function SingleRealEstates() {
    const { id } = useParams();
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

    if (isLoading) {
        return <Spinners />;
    }
    return (
        <div className="row">
            <div className="col-sm-12 col-md-8 col-xl-10" style={{ margin: "0 auto" }}>
                <div className="create_RE_form">
                    <Paper className="p-3">
                        <h3>Name: {realEstateData.title}</h3>
                        <hr />
                        <form
                        // onSubmit={handleCreate}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        name="title"
                                        label="Title"
                                        variant="outlined"
                                        value={realEstateData.title}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="id_ref"
                                        label="Reference ID"
                                        variant="outlined"
                                        value={realEstateData.id_ref}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="price_display"
                                        label="Price Display"
                                        variant="outlined"
                                        value={realEstateData.price_display}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="url"
                                        label="URL"
                                        variant="outlined"
                                        value={realEstateData.url}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="domain"
                                        label="Domain"
                                        variant="outlined"
                                        value={realEstateData.domain}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="publish_display"
                                        label="Publish Display"
                                        variant="outlined"
                                        value={realEstateData.publish_display}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="location"
                                        label="Location"
                                        variant="outlined"
                                        value={realEstateData.location}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <DateChooser
                                        name="publish_at"
                                        label="Publish Date"
                                        selectedDate={dayjs(realEstateData.publish_at)}
                                        onDateChange={handleDateChange}
                                        fullWidth
                                        required
                                    />

                                </Grid>
                            </Grid>
                            <hr />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="reset"
                                        fullWidth
                                        required
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <UpdateButton
                                        fullWidth
                                        required
                                    >
                                        Update
                                    </UpdateButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default SingleRealEstates;