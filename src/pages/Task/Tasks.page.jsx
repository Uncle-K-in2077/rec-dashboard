import { Link, useParams } from "react-router-dom";
import TaskService from "../../services/task.service";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import { useState } from "react";
import { Button, Pagination, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Spinners from "../../components/Loading/Spinners";
import { Table } from "react-bootstrap";
import moment from "moment";
import MenuButton from "../../components/Buttons/MenuButton";
import CreateButton from "../../components/Buttons/CreateButton";

function TaskPage() {

    const [page, setPage] = useState(1);
    const limit = 20;
    const [searchQuery, setSearchQuery] = useState("");
    const handleGetAllTask = async () => {
        return await TaskService.getAll({ page, limit });
    };
    const { data, mutate, isLoading } = useSWR(
        SWR_KEY.GET_ALL_TASKS,
        handleGetAllTask
    );
    const handleChange = async (event, value) => {
        await setPage(value);
        mutate()
    };
    console.log("data", data);

    const handleRemove = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này?");
        if (confirmed) {
            await TaskService.delete(id);
            mutate();
        }
    }
    return (

        <div className="lands-page">
            <Paper>
                <div className="users-controller">
                    <div className="col-md-6">
                        <h3>Tasks Page</h3>
                    </div>
                    <div
                        className="row m-1"
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div className="users-controller_searcher col-md-5">
                            <div >
                                <TextField
                                    label="Search..."
                                    variant="standard"
                                    style={{ width: "100%" }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />

                            </div>
                        </div>

                        <div
                            className="users-controller_button col-md-6"
                            style={{ textAlign: "right" }}
                        >
                            <CreateButton createUrl={"/dashboard/task/create"} />
                            <Link to={"/dashboard/task_status"}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                >Tasks Status Page</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <TasksTable data={data} isLoading={isLoading} handleRemove={handleRemove} searchQuery={searchQuery} />

                <div className="pagination">
                    <Pagination
                        count={data?.meta?.last_page}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                    />
                </div>
            </Paper>
        </div>
    );
}


const TasksTable = ({ data, isLoading, handleRemove, searchQuery }) => {
    let filteredData = [];
    if (Array.isArray(data?.data)) {
        const normalizedSearchQuery = searchQuery.toLowerCase();
        if (normalizedSearchQuery === '') {
            filteredData = data.data;
        } else {
            filteredData = data.data.filter((row) => {
                return (
                    row.title.toLowerCase().includes(normalizedSearchQuery) ||
                    row.user?.full_name.toLowerCase().includes(normalizedSearchQuery)
                );
            });
        }
    }
    return (

        <TableContainer
            component={Paper}
            sx={{ maxHeight: "60vh" }}
        >
            {isLoading && (
                <TableRow>
                    <TableCell>
                        <Spinners />
                    </TableCell>
                </TableRow>
            )}
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">title</TableCell>
                        <TableCell align="left">user </TableCell>
                        <TableCell align="left">status</TableCell>
                        <TableCell align="left">createAt</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {filteredData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.user?.full_name}</TableCell>
                            <TableCell>{row.task_status?.name}</TableCell>
                            <TableCell>{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
                            <TableCell>
                                <MenuButton
                                    onRemove={() => handleRemove(row.id)}
                                    detailUrl={`/dashboard/task/${row.id}`}
                                />
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>

    );
};
export default TaskPage;