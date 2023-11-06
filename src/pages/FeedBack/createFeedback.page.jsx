import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DateChooser from "../../components/Inputs/DateChooser";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import FeedBackSerivce from "../../services/feedback.service";
import { useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import CreateButton from "../../components/Buttons/CreateButton";
import UserSerivce from "../../services/user.service";

function CreateFeedBackPage() {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const limit = 20;

    const [feedBack, setFeedback] = useState({
        email: "",
        phone: "",
        title: "",
        description: "",
        date: null,
        feedback_status_id: "",
        report_type_id: 1,
    });
    const [isLoadingID, setIsLoadingID] = useState(false);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (id) {
            const getCurentFeedback = async () => {
                const rs = await FeedBackSerivce.getFeedbackDetails(id);
                if (rs) {
                    setFeedback(rs);
                    setIsLoadingID(true);
                }
            };
            getCurentFeedback();
        }
    }, [id]);
    const handleGetFeedbackStatus = async () => {
        return await FeedBackSerivce.getListStatus();
    };
    const { data: status, mutate, isLoading } = useSWR(
        SWR_KEY.GET_ALL_FEEDBACK_STATUS,
        handleGetFeedbackStatus
    );

    const handleGetUsers = async () => {
        return await UserSerivce.getAll({ page, limit });
    };
    const { data: users } = useSWR(
        SWR_KEY.GET_ALL_USERS,
        handleGetUsers
    );

    const handleCreate = async () => {
        await FeedBackSerivce.create({ ...feedBack });
    }
    console.log("ussers", users);
    return (
        <div className="create-role-page">

            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-xl-8">
                        <div className="create-user-form">
                            <div>
                                <div className="row m-0">
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                                        <TextField
                                            required
                                            name="email"
                                            value={feedBack.email}
                                            label="Email"
                                            variant="outlined"
                                            onChange={
                                                handleInputChange
                                            }
                                        />
                                    </div>
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                                        <TextField
                                            required
                                            name="phone"
                                            value={feedBack.phone}
                                            label="Phone Number"
                                            variant="outlined"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                                        <TextField
                                            required
                                            name="title"
                                            value={feedBack.title}
                                            label="Title"
                                            variant="outlined"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                                        <TextField
                                            required
                                            name="description"
                                            value={feedBack.description}
                                            label="Description"
                                            variant="outlined"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                                        <DateChooser
                                            name="date"
                                            value={feedBack.created_at}
                                            label={"Date"}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6 ">
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-autowidth-label">
                                                Status-FeedBack
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                name="feedback_status_id"
                                                value={feedBack.feedback_status_id}
                                                autoWidth
                                                label="Status"
                                                onChange={handleInputChange}
                                            >
                                                {status && status.data ? (
                                                    status.data.map((item, index) => {
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

                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6 ">
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-autowidth-label">
                                                Report-type
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                name="feedback_status_id"
                                                value={feedBack.report_type_id}
                                                autoWidth
                                                label="Status"
                                                onChange={handleInputChange}
                                            >
                                                {status && status.data ? (
                                                    status.data.map((item, index) => {
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

                                    <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6 ">
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-autowidth-label">
                                                User
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                name="feedback_status_id"
                                                value={feedBack.user?.full_name}
                                                autoWidth
                                                label="User"
                                                onChange={handleInputChange}
                                            >
                                                {users && users.data ? (
                                                    users.data.map((item, index) => {
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
                                    {/* <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                                        <TextField
                                            required
                                            name="user"
                                            value={feedBack.user?.full_name}
                                            label="User"
                                            variant="outlined"
                                            onChange={handleInputChange}
                                        />
                                    </div> */}
                                </div>
                                <div className="create-user-buttons m-1 mt-4">
                                    {id ? (
                                        <CancelButton cancelUrl={"/dashboard/feedbacks"} />) :
                                        (<CreateButton onClick={handleCreate} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateFeedBackPage;

