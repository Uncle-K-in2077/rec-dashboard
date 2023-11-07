import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { Avatar, FormControl, InputLabel, MenuItem, Select, TextField, IconButton } from "@mui/material";
import RealEstatesService from "../../services/realEstates.service";
import dayjs from "dayjs";
import CreateButton from "../../components/Buttons/CreateButton";
import CancelButton from "../../components/Buttons/CancelButton";
import { SWR_KEY } from "../../constants/SWR_KEY";
import LandsService from "../../services/lands.service";
import useSWR from "swr";
import UploadFileButton from "../../components/Buttons/UploadFileButton";
import { useParams } from "react-router-dom";
import Spinners from "../../components/Loading/Spinners";
import UpdateButton from "../../components/Buttons/UpdateButton";

function CreateLand() {
    const { id } = useParams();
    const [idLands, setIdLands] = useState(id);
    const [isLoadingPage, setIsLoadingPage] = useState(false);

    const [lands, setLands] = useState({
        title: "",
        phone: "",
        name: "",
        price: "",
        description: "",
        content_flow_id: null,
        images: [],
        manager_id: null,
    });
    useEffect(() => {
        if (idLands) {
            const getDetailsLands = async () => {
                setIsLoadingPage(true);
                try {
                    const rs = await LandsService.getLandDetails(idLands);
                    setLands(rs);
                } catch (error) {
                    console.error("Error while fetching details:", error);
                } finally {
                    setIsLoadingPage(false);
                }
            };
            getDetailsLands();
        }
    }, [idLands]);

    const handleImageChange = (file) => {
        setLands((prevLand) => ({
            ...prevLand,
            images: [...prevLand.images, file],
        }));
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLands((prevLand) => ({
            ...prevLand,
            [name]: value,
        }));

    };
    console.log("land ", lands);
    const getContentFlowStt = async () => {
        return await LandsService.getContentFlowStt();
    };
    const { data: contentFlowStt, isLoading } = useSWR(
        SWR_KEY.GET_ALL_CONTENT_FLOW_STT,
        getContentFlowStt
    );

    const handleAddLand = async () => {

        await LandsService.create(lands);

    }
    const updateLand = async () => {
        try {
            const { images, ...restOfLand } = lands;

            await LandsService.update(idLands, restOfLand);
        } catch (error) {
            console.error("Error while updating land:", error);
        }
    }
    const handleDeleteImage = (index) => {
        setLands((prevLand) => ({
            ...prevLand,
            images: prevLand.images.filter((_, i) => i !== index),
        }));
    };

    if (isLoadingPage) {
        return <Spinners />;
    }
    return (

        <div className="row">
            <div className="col-sm-12 col-md-8 col-xl-10" style={{ margin: "0 auto" }}>
                <div className="create_RE_form">
                    <Paper className="p-3">
                        <h3>Create Land</h3>
                        <hr />
                        <div>
                            <Grid container spacing={2}>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="title"
                                        label="Title"
                                        variant="outlined"
                                        value={lands.title}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </div>

                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="phone"
                                        label="Phone "
                                        variant="outlined"
                                        value={lands.phone}
                                        onChange={handleInputChange}
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
                                        value={lands?.price}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </div>

                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="name"
                                        label="name"
                                        variant="outlined"
                                        value={lands.name}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                {lands.manager_id && lands.manager?.full_name ?
                                    (
                                        <>
                                            <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                                <TextField
                                                    name="manager"
                                                    label="Manager"
                                                    variant="outlined"
                                                    value={lands.manager?.full_name}
                                                    onChange={handleInputChange}
                                                    fullWidth
                                                    required
                                                />

                                            </div>

                                        </>)
                                    : null}
                                {lands.saller_id && lands.saller?.full_name ?
                                    (
                                        <>
                                            <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                                <TextField
                                                    name="Saller"
                                                    label="Saller"
                                                    variant="outlined"
                                                    value={lands.saller?.full_name}
                                                    onChange={handleInputChange}
                                                    fullWidth

                                                />
                                            </div>
                                        </>)
                                    : null}

                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    {lands.images.map((image, index) => (
                                        <div key={index} className="d-inline-flex m-2">
                                            <Avatar
                                                id={`user-avatar-${index}`}
                                                className="create-user-avatar"
                                                alt={`Uploaded ${index + 1}`}
                                                src={image}
                                            />


                                            <IconButton color='error' size='small' onClick={() => handleDeleteImage(index)}>
                                                x
                                            </IconButton>

                                        </div>
                                    ))}

                                    <center className="m-1">
                                        <UploadFileButton label={"Upload images"} setFile={handleImageChange} />
                                    </center>



                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    {isLoading ? (
                                        <>loading...</>
                                    ) : (
                                        <>

                                            <FormControl>
                                                <InputLabel id="demo-simple-select-autowidth-label">
                                                    Content-flow
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-autowidth-label"
                                                    name="content_flow_id"
                                                    value={lands.content_flow_id}
                                                    autoWidth
                                                    label="Content Flow Status"
                                                    onChange={handleInputChange}
                                                >
                                                    {contentFlowStt && contentFlowStt.data ? (
                                                        contentFlowStt.data.map((item, index) => {
                                                            return (
                                                                <MenuItem key={index} value={item.id}>
                                                                    {item.name}
                                                                </MenuItem>
                                                            );
                                                        })
                                                    ) : (
                                                        <MenuItem value={0}>
                                                            <em>None</em>
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </>
                                    )}
                                </div>



                                <div className="col-sm-12 col-md-12 col-xl-12 p-2">
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="description"
                                        cols="100"
                                        defaultValue={lands && lands.description ? lands.description : ""}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>





                            </Grid>
                            <hr />
                            <Grid container spacing={2}>
                                <div className="col-sm-12 col-md-12 col-xl-6 px-2 mt-3">
                                    {!idLands ?
                                        <CreateButton
                                            fullWidth={true}
                                            type="submit"
                                            onClick={handleAddLand}
                                        >
                                            Create
                                        </CreateButton> : <UpdateButton
                                            fullWidth={true}
                                            type="submit"
                                            onClick={updateLand}
                                        >
                                            Update
                                        </UpdateButton>}
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-6 px-2 mt-3">
                                    <CancelButton
                                        fullWidth={true}
                                        cancelUrl={"/dashboard/lands"}
                                    >
                                    </CancelButton>
                                </div>
                            </Grid>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default CreateLand;
