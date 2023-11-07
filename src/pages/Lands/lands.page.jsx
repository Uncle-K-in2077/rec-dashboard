import { useState, useEffect } from "react";

import LandsService from "../../services/lands.service";
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
import moment from 'moment'

function LandsPage() {
    const [page, setPage] = useState(1);
    const limit = 20;
    const handleGetLans = async () => {
        return await LandsService.getAll({ page, limit });
    };
    const { data, mutate, isLoading } = useSWR(
        SWR_KEY.GET_ALL_LANDS,
        handleGetLans
    );
    const handleChange = async (event, value) => {
        await setPage(value);
        mutate()
    };
    const handleRemove = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này?");
        if (confirmed) {
            await LandsService.delete(id);
            mutate();
        }
    };

    return (
        <div className="lands-page">
            <Paper>
                <div className="users-controller">
                    <div
                        className="row m-1"
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div className="users-controller_searcher col-md-5">
                            <form onSubmit={() => {

                            }}>
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
                            <CreateButton createUrl={"/dashboard/lands/create"} />
                        </div>
                    </div>
                </div>

                <LandTable data={data} isLoading={isLoading} handleRemove={handleRemove} />

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


const LandTable = ({ data, isLoading, handleRemove }) => {
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
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">title</TableCell>
                        <TableCell align="left">name</TableCell>
                        <TableCell align="left">description</TableCell>
                        <TableCell align="left">phone</TableCell>
                        <TableCell align="left">created-at</TableCell>
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
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.phone}</TableCell>
                                <TableCell align="left">{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
                                <TableCell align="left">
                                    <MenuButton detailUrl={`/dashboard/lands/${row.id}`}
                                        onRemove={() => handleRemove(row.id)}

                                    />
                                </TableCell>
                            </TableRow>
                        ))}

                </TableBody>
            </Table>
        </TableContainer>

    );
};


export default LandsPage;