import * as React from "react";
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
import { TextField } from "@mui/material";
import CreateButton from "../../components/Buttons/CreateButton";
import { toast } from "react-toastify";


function RealEstates() {

    const fectcher = async () => {
        return await RealEstatesService.getAll();
    };
    const { data, mutate } = useSWR(SWR_KEY.GET_ALL_REAL_ESTATES, fectcher);
    console.log("data ... ", data);

    const handleRemove = (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này?");
        if (confirmed) {
            RealEstatesService.delete(id);
            // mutate(SWR_KEY.GET_ALL_REAL_ESTATES);
            toast.warning("Please Reload for update :<");
            toast.warning("I will fix it soon :>");
            console.log(`Remove item with ID: ${id}`);
        }
    };

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
                        <form
                        // onSubmit={handleSearchRole}
                        >
                            <TextField
                                label="Search..."
                                variant="standard"
                                style={{ width: "100%" }}
                            />
                        </form>
                    </div>
                    <div
                        className="col-md-3"
                        style={{ textAlign: "right" }}
                    >
                        <CreateButton createUrl={"/dashboard/real_estates/create"} />
                    </div>
                </div>
                <hr />
                <RealEstatesDataTable data={data} handleRemove={handleRemove} />
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

function RealEstatesDataTable({ data, handleRemove }) {

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
            <TableContainer sx={{ height: "60vh" }}>
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
                        {data && data.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align="left">
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                                <TableCell key="actions" align="left">
                                    <MenuButton onRemove={() => handleRemove(row.id)} />
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