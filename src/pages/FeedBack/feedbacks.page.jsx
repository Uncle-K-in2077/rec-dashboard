import { useState, useEffect } from "react";
import "./style.css";
import FeedBackSerivce from "../../services/feedback.service";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import { Pagination, TextField } from "@mui/material";
import CreateButton from "../../components/Buttons/CreateButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuButton from "../../components/Buttons/MenuButton";
import Spinners from "../../components/Loading/Spinners";


function FeedBackPage() {
    const [page, setPage] = useState(1);
    const limit = 20;
    const handleGetFeedback = async () => {
        return await FeedBackSerivce.getAll({ page, limit });
    };
    const { data, mutate, isLoading } = useSWR(
        SWR_KEY.GET_ALL_FEEDBACK,
        handleGetFeedback
    );
    const handleChange = async (event, value) => {
        await setPage(value);
        mutate()
    };
    const handleSearchFeedback = () => {

    }
    return (
        <div className="feedbacks-page">
            <div className="users-controller">
                <div
                    className="row m-1"
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div className="users-controller_searcher col-md-5">
                        <form onSubmit={handleSearchFeedback}>
                            <TextField
                                label="Search..."
                                variant="standard"
                                style={{ width: "100%" }}
                            />
                        </form>
                    </div>
                    <div
                        className="users-controller_button col-md-3"
                        style={{ textAlign: "right" }}
                    >
                    </div>
                </div>
            </div>
            <FeedbackTableData data={data} isLoading={isLoading} />
            <div className="pagination">
                <Pagination
                    count={data?.meta?.last_page}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                />
            </div>
        </div>
    );
}


const FeedbackTableData = ({ data, isLoading }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{ maxHeight: "60vh", marginTop: "20px" }}
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
                        <TableCell align="left">title</TableCell>
                        <TableCell align="left">email</TableCell>
                        <TableCell align="left">user</TableCell>
                        <TableCell align="left">date</TableCell>
                        <TableCell align="left">report-type</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >

                                <TableCell align="left">{row.title}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.user?.full_name}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.report_type?.name}</TableCell>
                                <TableCell align="left">
                                    <MenuButton detailUrl={`/dashboard/feedbacks/${row.id}`} />
                                </TableCell>
                            </TableRow>
                        ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default FeedBackPage;