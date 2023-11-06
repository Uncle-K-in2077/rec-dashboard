import { FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DateChooser from "../../components/Inputs/DateChooser";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import FeedBackSerivce from "../../services/feedback.service";
import { useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import CreateButton from "../../components/Buttons/CreateButton";
import UserSerivce from "../../services/user.service";
import dayjs from "dayjs";
import Spinners from "../../components/Loading/Spinners";
import DialogSpinner from "../../components/Loading/DialogSpinner";
function FeedBackDetailsPage() {
    const { id } = useParams();
    const [idFb, setIdFb] = useState(id);
    console.log("idFb ", idFb);
    const handleGetFeedbackStatus = async () => {
        return await FeedBackSerivce.getListStatus();
    };
    const { data: status } = useSWR(
        SWR_KEY.GET_ALL_FEEDBACK_STATUS,
        handleGetFeedbackStatus
    );
    const getCurentFeedback = async () => {
        return await FeedBackSerivce.getFeedbackDetails(idFb);
    };
    const { data: feedBack, isLoading: loading, mutate: getDetails } = useSWR(
        SWR_KEY.GET_ALL_FEEDBACK_DETAILS,
        getCurentFeedback
    );
    useEffect(() => {
        getDetails();
    }, [idFb]);



    return (
        <div className="create-role-page">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-xl-8">
                        <div className="create-user-form">
                            <div>
                                <div className="row m-0">
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-12">
                                        <TextField
                                            name="title"
                                            value={feedBack ? feedBack.title : ""}
                                            label="Title"
                                            defaultValue
                                        />
                                    </div>
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                                        <TextField
                                            name="email"
                                            value={feedBack ? feedBack.email : ""}
                                            label="Email"
                                            defaultValue
                                        />
                                    </div>
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                                        <TextField
                                            name="phone"
                                            value={feedBack ? feedBack.phone : ""}
                                            label="Phone Number"
                                            defaultValue
                                        />
                                    </div>

                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">

                                        <TextField
                                            value={feedBack ? feedBack.date : ""}
                                            name="date"
                                            label="Date"
                                            defaultValue
                                        />
                                    </div>

                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">

                                        <TextField
                                            label="type_report"
                                            value={feedBack ? feedBack.report_type?.name : ""}
                                            name="type_report"
                                            defaultValue
                                        />
                                    </div>
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">

                                        <TextField
                                            name="feedback_status"
                                            value={feedBack ? feedBack.feedback_status?.name : ""}
                                            label="Status"
                                            defaultValue
                                        />
                                    </div>   <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">

                                        <TextField
                                            name="date"
                                            value={feedBack ? feedBack.user?.full_name : ""}
                                            label="User"
                                            defaultValue
                                        />
                                    </div>

                                    <div className="form-group p-2 col-12">
                                        <textarea
                                            className="form-control"
                                            rows="4" cols="100" value={feedBack && feedBack.description ? feedBack.description : ""}>
                                        </textarea>
                                    </div>

                                </div>
                                <div className="create-user-buttons m-1 mt-4">

                                    <CancelButton cancelUrl={"/dashboard/feedbacks"} />
                                </div>
                                {loading && (
                                    <TableRow>
                                        <TableCell>
                                            <DialogSpinner />

                                        </TableCell>
                                    </TableRow>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default FeedBackDetailsPage;

