import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Spinners from "../../components/Loading/Spinners";
import MenuButton from "../../components/Buttons/MenuButton";

import RealEstatesService from "../../services/realEstates.service";
import { SWR_KEY } from "../../constants/SWR_KEY";
import useSWR from "swr";
import { TextField, Pagination } from "@mui/material";
import CreateButton from "../../components/Buttons/CreateButton";


function RealEstates() {

    // For Filtering
    const [searchQuery, setSearchQuery] = React.useState("");
    // For Pagination
    const [page, setPage] = useState(1);
    const limit = 10;
    const FetcherPaginationRE = async () => {
        return await RealEstatesService.getAll({ page, limit });
    }

    const { isLoading, data, mutate } = useSWR(SWR_KEY.GET_ALL_REAL_ESTATES, FetcherPaginationRE);

    const handleChange = async (event, value) => {
        await setPage(value);
        mutate();
    };

    const handleRemove = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này?");
        if (confirmed) {
            await RealEstatesService.delete(id);
            mutate();
        }
    };

    if (isLoading) {
        return <Spinners />
    }
    return (
        <div>
            <Paper>
                <div
                    className="row m-1"
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div className="col-md-5">
                        <TextField
                            label="Search by Title and Location"
                            variant="standard"
                            style={{ width: "100%" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div
                        className="col-md-3"
                        style={{ textAlign: "right" }}
                    >
                        <CreateButton createUrl={"/dashboard/real_estates/create"} />
                    </div>
                </div>
                <hr />
                <RealEstatesDataTable data={data.data} handleRemove={handleRemove} searchQuery={searchQuery} />
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
    )
}

// Table Configs Start
const columns = [
    { id: "id_ref", label: "Reference ID" },
    { id: "title", label: "Title" },
    { id: "price", label: "Price" },
    { id: "price_display", label: "Price Display" },
    { id: "location", label: "Location" },
    { id: "url", label: "URL" },
    { id: "domain", label: "Domain" },
    { id: "publish_at", label: "Publish Date" },
];

function RealEstatesDataTable({ data, handleRemove, searchQuery }) {

    const filteredData = data
        ? data.filter((row) => {
            const normalizedSearchQuery = searchQuery.toLowerCase();
            return (
                row.title.toLowerCase().includes(normalizedSearchQuery) ||
                row.location.toLowerCase().includes(normalizedSearchQuery)
                // Thêm các điều kiện tìm kiếm khác ở đây
            );
        })
        : [];

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
            <TableContainer sx={{ height: "65vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align="left">
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell key="actions" align="left" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align="left">
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                                <TableCell key="actions" align="left">
                                    <MenuButton
                                        onRemove={() => handleRemove(row.id)}
                                        detailUrl={`/dashboard/real_estates/${row.id}`} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default RealEstates;