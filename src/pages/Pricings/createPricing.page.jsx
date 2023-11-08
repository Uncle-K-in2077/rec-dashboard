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

function CreatePricing() {
    const { id } = useParams();
    const [idPricing, setIdPricing] = useState(id);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [pricing, setPricing] = useState({
        name: "",
        pricing_status_id: null,
        original_price: "",
        sale_price: ""
    });
    const getPricingStatus = async () => {
        return await PricingService.getListStatus(1, 100);
    }
    const { data: listStatus, mutate, isLoading } = useSWR(
        SWR_KEY.GET_ALL_PRICINGS_STATUS,
        getPricingStatus
    );
    useEffect(() => {
        if (idPricing) {
            const getDetailsStatus = async () => {
                setIsLoadingPage(true);
                try {
                    const rs = await PricingService.getPricingDetails(idPricing);
                    setPricing(rs);
                } catch (error) {
                    console.error("Error while fetching details:", error);
                } finally {
                    setIsLoadingPage(false);
                }
            };
            getDetailsStatus();
        }
    }, [idPricing]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPricing((item) => ({
            ...item,
            [name]: value,
        }));
    };
    const handleAdd = async () => {
        await PricingService.create(pricing);
    }
    const handleUpdate = async () => {
        try {
            await PricingService.update(idPricing, pricing);
        } catch (error) {
            console.error("Error while updating pricing:", error);
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
                        <h3>Create New Pricing</h3>
                        <hr />
                        <div>
                            <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                <TextField
                                    name="name"
                                    label="Name Product"
                                    variant="outlined"
                                    value={pricing.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </div>

                            <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                <TextField
                                    name="original_price"
                                    label="Original Price"
                                    variant="outlined"
                                    value={pricing.original_price}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                <TextField
                                    name="sale_price"
                                    label="Sale Price"
                                    variant="outlined"
                                    value={pricing.sale_price}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="col-sm-12 col-md-12 col-xl-12 p-2">
                                <FormControl>
                                    <InputLabel id="demo-simple-select-autowidth-label">
                                        Content-flow
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        name="pricing_status_id"
                                        value={pricing?.pricing_status_id | ""}
                                        autoWidth
                                        label="Pricing Status"
                                        onChange={handleInputChange}
                                    >
                                        {listStatus && listStatus.data ? (
                                            listStatus.data.map((item, index) => {
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
                            </div>
                            <div className="d-flex">
                                <div className="me-2">
                                    {idPricing ? <UpdateButton
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
                                        cancelUrl="/dashboard/pricings"
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

export default CreatePricing;
