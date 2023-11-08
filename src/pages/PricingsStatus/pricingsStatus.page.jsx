import { Button, Pagination, Paper, TextField } from "@mui/material";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import CreateButton from "../../components/Buttons/CreateButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuButton from "../../components/Buttons/MenuButton";
import Spinners from "../../components/Loading/Spinners";
import { useState } from "react";
import PricingService from "../../services/pricing.service";
import moment from "moment";

function PricingsStatusPage() {
    const [page, setPage] = useState(1);
    const limit = 20;

    const getPricingStatus = async () => {
        return await PricingService.getListStatus({ page, limit });
    }
    const { data, mutate, isLoading } = useSWR(
        SWR_KEY.GET_ALL_PRICINGS_STATUS,
        getPricingStatus
    );
    console.log("data ", data);
    const handleChange = async (event, value) => {
        await setPage(value);
        mutate()
    };
    const handleRemove = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này?");
        if (confirmed) {
            await PricingService.deleteStatus(id);
            mutate();
        }
    }
    if (isLoading) {
        return <Spinners />;
    }
    return (
        <div className="pricings-page">
            <Paper>
                <div className="users-controller">
                    <h3> Pricing Status</h3>
                    <div
                        className="row m-1"
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div className="users-controller_searcher col-md-5">
                            <div>
                                <TextField
                                    label="Search..."
                                    variant="standard"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>

                        <div
                            className="users-controller_button col-md-3"
                            style={{ textAlign: "right" }}
                        >
                            <CreateButton createUrl={"/dashboard/pricing-status/create"} />
                        </div>
                    </div>
                </div>

                <PricingStatusTable data={data} isLoading={isLoading} handleRemove={handleRemove} />

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

const PricingStatusTable = ({ data, isLoading, handleRemove }) => {
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
                                        detailUrl={`/dashboard/pricing-status/${row.id}`}
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
export default PricingsStatusPage;