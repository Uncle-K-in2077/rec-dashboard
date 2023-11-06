import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DateChooser from "../../components/Inputs/DateChooser";
import "./style.css";

import RealEstatesService from "../../services/realEstates.service";
import dayjs from "dayjs";

function CreateRealEstate() {
    const [realEstateData, setRealEstateData] = useState({
        title: "",
        id_ref: "",
        price: "",
        price_display: "",
        url: "",
        domain: "",
        publish_at: dayjs(Date.now()),
        publish_display: "",
        location: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRealEstateData({ ...realEstateData, [name]: value });
    };

    const handleDateChange = (date) => {
        setRealEstateData({ ...realEstateData, publish_at: date });
        console.log("Real Estate Date:", realEstateData);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        // Format publish_at theo dang YYYY-MM-DD HH:mm:ss
        const formattedPublishAt = realEstateData.publish_at.format('YYYY-MM-DD HH:mm:ss');
        const dataToCreate = { ...realEstateData, publish_at: formattedPublishAt };
        // Create logic
        try {
            await RealEstatesService.create(dataToCreate);
            console.log("Creating Real Estate with data:", dataToCreate);
        } catch (error) {
            console.log("Error while creating Real Estate:", error);
        }
    };

    return (
        <div className="row">
            <div className="col-sm-12 col-md-8 col-xl-8">
                <div className="create_RE_form">
                    <Paper className="p-3">
                        <h3>Create Real Estate</h3>
                        <hr />
                        <form
                            onSubmit={handleCreate}
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
                                    <DateChooser
                                        name="publish_at"
                                        label="Publish Date"
                                        selectedDate={dayjs(realEstateData.publish_at)}
                                        onDateChange={handleDateChange}
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
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        required
                                    >
                                        Create Real Estate
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default CreateRealEstate;
