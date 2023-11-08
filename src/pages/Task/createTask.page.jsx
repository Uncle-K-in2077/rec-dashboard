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
import TaskService from "../../services/task.service";
import UserSerivce from "../../services/user.service";
import TaskStatusService from "../../services/taskStatus.service";
import DateChooser from "../../components/Inputs/DateChooser";

function CreateTasks() {
    const { id } = useParams();
    const [idTask, setIdTask] = useState(1);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 100;

    const [tasks, setTasks] = useState({
        title: "",
        user_id: null,
        task_status_id: null,
        description: "",
        start_date: "",
        end_date: ""
    });
    const handleGetUsers = async () => {
        return await UserSerivce.getAll({ page, limit });
    };
    const { data: listUser, mutate: getListUser, isLoading: loadingUser } = useSWR(
        SWR_KEY.GET_ALL_USERS,
        handleGetUsers
    );
    const getTaskStatus = async () => {
        return await TaskStatusService.getAllTaskStatuses();
    };
    const { data: listStatus, mutate: getListStatus, isLoading: loadingStatus } = useSWR(
        SWR_KEY.GET_ALL_TASK_STATUS,
        getTaskStatus
    );

    const handleStartDateChange = (date) => {
        setTasks({ ...tasks, start_date: date });
    };

    const handleEndDateChange = (date) => {
        setTasks({ ...tasks, end_date: date });
    };

    // useEffect(() => { without api task details
    //     if (idTask) {
    //         const getDetailTask = async () => {
    //             setIsLoadingPage(true);
    //             try {
    //                 const rs = await TaskService.getTaskDetails(idTask);
    //                 setTasks(rs);
    //                 console.log("task Details ", rs);
    //             } catch (error) {
    //                 console.error("Error while fetching details:", error);
    //             } finally {
    //                 setIsLoadingPage(false);
    //             }
    //         };
    //         getDetailTask();
    //     }
    // }, [idTask]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTasks((item) => ({
            ...item,
            [name]: value,
        }));
    };
    const handleAdd = async () => {
        await TaskService.create(tasks);
    }
    const handleUpdate = async () => {
        try {
            await TaskService.update(idTask, tasks);
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
                        <h3>Create New Task</h3>
                        <hr />
                        <div>
                            <Grid container spacing={2}>
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <TextField
                                        name="title"
                                        label="Title"
                                        variant="outlined"
                                        value={tasks.title}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </div>
                                {loadingUser ? <Spinners /> :
                                    <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                        <FormControl style={{ width: "100%" }}>
                                            <InputLabel id="select-label">
                                                User
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                name="user_id"
                                                value={tasks?.user_id | ""}
                                                autoWidth
                                                label="User"
                                                onChange={handleInputChange}
                                            >
                                                {listUser && listUser.data ? (
                                                    listUser.data.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.id}>
                                                                {item.full_name}
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
                                    </div>}


                                <div className="col-sm-12 col-md-12 col-xl-6 p-2">
                                    <FormControl style={{ width: "100%" }}>
                                        <InputLabel id="select-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            name="task_status_id"
                                            value={tasks?.task_status_id | ""}
                                            autoWidth
                                            label="Task Status"
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
                                <div className="col-sm-12 col-md-12 col-xl-6 p-2 p-1">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-xl-6 ">
                                            <DateChooser
                                                name="start_date"
                                                label={"Start Date"}
                                                selectedDate={dayjs(tasks.start_date)}
                                                onDateChange={handleStartDateChange}
                                            />
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xl-6 " >
                                            <DateChooser
                                                name="end_date"
                                                label={"End Date"}
                                                selectedDate={dayjs(tasks.end_date)}
                                                onDateChange={handleEndDateChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-12 p-2" style={{ position: "relative" }}>
                                    <label style={{ position: "absolute", top: 0, left: 10, background: "#fff", padding: "0 5px" }}>Description</label>
                                    <textarea
                                        label="Description"
                                        className="form-control"
                                        rows="4"
                                        name="description"
                                        cols="100"
                                        style={{ paddingTop: "20px" }}
                                        defaultValue={tasks && tasks.description ? tasks.description : ""}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </Grid>

                            <div className="d-flex">
                                <div className="me-2">
                                    {idTask ? <UpdateButton
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
                                        cancelUrl="/dashboard/task"
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

export default CreateTasks;
