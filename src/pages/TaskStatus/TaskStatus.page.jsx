import "./style.css";
import MenuButton from "../../components/Buttons/MenuButton";
import TaskStatusService from "../../services/taskStatus.service";
import Spinners from "../../components/Loading/Spinners";
import { useState } from "react";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import CreateButton from "../../components/Buttons/CreateButton";
import { Button, Pagination, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Table } from "react-bootstrap";
import moment from "moment";
function TaskStatus() {


    const [page, setPage] = useState(1);
    const limit = 20;

    const getTaskStatus = async () => {
        return await TaskStatusService.getAllTaskStatuses();
    };
    const { data, mutate: getListStatus, isLoading } = useSWR(
        SWR_KEY.GET_ALL_TASK_STATUS,
        getTaskStatus
    );


    console.log("data ", data);
    const handleRemove = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này?");
        if (confirmed) {
            await TaskStatusService.deleteTaskStatus(id);
            getListStatus();
        }
    }
    if (isLoading) {
        return <Spinners />;
    }
    return (


        <div className="task_status_list row">
            <Paper>
                <div className="users-controller">
                    <h3> Tasks Status</h3>
                    <div
                        className="row m-1"
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div className="users-controller_searcher col-md-5">
                            <div>

                            </div>
                        </div>

                        <div
                            className="users-controller_button col-md-3"
                            style={{ textAlign: "left" }}
                        >
                            <CreateButton createUrl={"/dashboard/task_status/create"} />
                        </div>
                    </div>
                </div>
                <TaskStatusTable data={data} isLoading={isLoading} handleRemove={handleRemove} />
            </Paper>
        </div>
    );
}

const TaskStatusTable = ({ data, isLoading, handleRemove }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TableContainer
                component={Paper}
                sx={{ maxHeight: "60vh", maxWidth: "50vw" }}
            >
                {isLoading && (
                    <TableRow>
                        <TableCell>
                            <Spinners />
                        </TableCell>
                    </TableRow>
                )}
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">name</TableCell>
                            <TableCell align="left">created-at</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
                                    <TableCell align="right">
                                        <MenuButton
                                            detailUrl={`/dashboard/task_status/${row.id}`}
                                            onRemove={() => handleRemove(row.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default TaskStatus;