import { Button, Pagination, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import PricingService from "../../services/pricing.service";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import { useState } from "react";
import Spinners from "../../components/Loading/Spinners";
import { Table } from "react-bootstrap";
import moment from "moment";
import MenuButton from "../../components/Buttons/MenuButton";



function PricingsPage() {
    const [page, setPage] = useState(1);
    const limit = 20;
    const [searchQuery, setSearchQuery] = useState("");
    const getPricing = async () => {
        return await PricingService.getAll({ page, limit });
    }
    const { data, mutate, isLoading } = useSWR(
        SWR_KEY.GET_ALL_PRICINGS,
        getPricing
    );
    const handleChange = async (event, value) => {
        await setPage(value);
        mutate()
    };
    const handleRemove = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này?");
        if (confirmed) {
            await PricingService.delete(id);
            mutate();
        }
    }

    return (
        <div className="lands-page">
            <Paper>
                <div className="users-controller">
                    <h3> Pricings </h3>
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
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>

                        <div
                            className="users-controller_button col-md-6"
                            style={{ textAlign: "right" }}
                        >
                            <CreateButton createUrl={"/dashboard/pricings/create"} />
                            <Link to={"/dashboard/pricing-status"}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                >Pricing Status Page</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <PricingTable data={data} isLoading={isLoading} handleRemove={handleRemove} searchQuery={searchQuery} />

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
const PricingTable = ({ data, isLoading, handleRemove, searchQuery }) => {
    let filteredData = [];
    if (Array.isArray(data?.data)) {
        const normalizedSearchQuery = searchQuery.toLowerCase();
        if (normalizedSearchQuery === '') {
            filteredData = data.data;
        } else {
            filteredData = data.data.filter((row) => {
                return (
                    row.name.toLowerCase().includes(normalizedSearchQuery) ||
                    row.original_price.toLowerCase().includes(normalizedSearchQuery)
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
                        <TableCell align="left">name</TableCell>
                        <TableCell align="left">origin price </TableCell>
                        <TableCell align="left">sale price </TableCell>
                        <TableCell align="left">status</TableCell>
                        <TableCell align="left">createAt</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {filteredData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.original_price}</TableCell>
                            <TableCell>{row.sale_price}</TableCell>
                            <TableCell>{row.pricing_status?.name}</TableCell>
                            <TableCell>{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
                            <TableCell>
                                <MenuButton
                                    onRemove={() => handleRemove(row.id)}
                                    detailUrl={`/dashboard/pricings/${row.id}`}
                                />
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>

    );
};
export default PricingsPage;