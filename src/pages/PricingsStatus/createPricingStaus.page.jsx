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
import PricingService from "../../services/pricing.service";

function CreatePricingStatus() {
    const { id } = useParams();
    const [idStatus, setIdStatus] = useState(id);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [pricingStatus, setPricingStatus] = useState({ name: "" });
    useEffect(() => {
        if (idStatus) {
            const getDetailsStatus = async () => {
                setIsLoadingPage(true);
                try {
                    const rs = await PricingService.getDetailsStatus(idStatus);
                    setPricingStatus(rs);
                } catch (error) {
                    console.error("Error while fetching details:", error);
                } finally {
                    setIsLoadingPage(false);
                }
            };
            getDetailsStatus();
        }
    }, [idStatus]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPricingStatus((item) => ({
            ...item,
            [name]: value,
        }));
    };
    const handleAdd = async () => {
        await PricingService.createStatus(pricingStatus);
    }
    const handleUpdate = async () => {
        try {
            await PricingService.updateStatus(idStatus, pricingStatus);
        } catch (error) {
            console.error("Error while updating pricing status:", error);
        }
    }
    if (isLoadingPage) {
        return <Spinners />;
    }
    return (
        <div className="row">
            <div className="col-sm-12 col-md-8 col-xl-10" style={{ margin: "0 auto" }}>
                <div className="create_RE_form">
                    <Paper className="p-3">
                        <h3>Create Status For Pricing</h3>
                        <hr />
                        <div>
                            <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                <TextField
                                    name="name"
                                    label="Status Name"
                                    variant="outlined"
                                    value={pricingStatus.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="d-flex">
                                <div className="me-2">
                                    {idStatus ? <UpdateButton
                                        className="w-100"
                                        type="submit"
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </UpdateButton> :
                                        <CreateButton
                                            className="w-100"
                                            type="submit"
                                            onClick={handleAdd}
                                        >
                                            Create
                                        </CreateButton>}
                                </div>
                                <div>
                                    <CancelButton
                                        className="w-100"
                                        cancelUrl="/dashboard/pricing-status"
                                    >
                                    </CancelButton>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default CreatePricingStatus;
