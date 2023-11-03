import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./style.css";
import { Pagination, TextField } from "@mui/material";
import CreateButton from "../../components/Buttons/CreateButton";
import MenuButton from "../../components/Buttons/MenuButton";
import { useState } from "react";
import useSWR from "swr";
import UserSerivce from "../../services/users.service";
import { SWR_KEY } from "../../constants/SWR_KEY";
import Spinners from "../../components/Loading/Spinners";

function UsersPage() {
  const fetcher = async () => {
    return await UserSerivce.getAll();
  };
  const { data } = useSWR(SWR_KEY.GET_ALL_USERS, fetcher);

  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
    alert("Search User");
  };

  return (
    <div className="users-page">
      <div className="users-controller">
        <div
          className="row m-1"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="users-controller_searcher col-md-5">
            <form onSubmit={handleSearchUser}>
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
            <CreateButton createUrl={"/dashboard/users/create"} />
          </div>
        </div>
      </div>
      <UserTableData data={data} />
      <div className="pagination">
        <Pagination
          count={10}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </div>
    </div>
  );
}

const columns = [
  { id: "avatar", label: "Avatar" },
  { id: "full_name", label: "Full name" },
  { id: "id_card", label: "Card id" },
  { id: "birthday", label: "Birthday" },
  { id: "gender", label: "Gender" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "address  ", label: "Address" },
  { id: "user_status", label: "status" },
];

function UserTableData({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
      <TableContainer sx={{ maxHeight: "60vh" }}>
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
            {data && data.data ? (
              data.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="left">
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell key="actions" align="left">
                        <MenuButton />
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <Spinners />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default UsersPage;
