import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuButton from "../../components/Buttons/MenuButton";
import { Pagination, TextField } from "@mui/material";
import CreateButton from "../../components/Buttons/CreateButton";

function createData(name, created_at, updated_at) {
  return { name, created_at, updated_at };
}

const rows = [
  createData("Admin", "2023-01-01 12:00:00", "2023-01-01 12:00:00"),
  createData("User", "2023-01-02 13:00:00", "2023-01-02 13:00:00"),
  createData("Manager", "2023-01-03 14:00:00", "2023-01-03 14:00:00"),
  createData("Guest", "2023-01-04 15:00:00", "2023-01-04 15:00:00"),
  createData("Editor", "2023-01-05 16:00:00", "2023-01-05 16:00:00"),
  createData("Moderator", "2023-01-06 17:00:00", "2023-01-06 17:00:00"),
  createData("Supervisor", "2023-01-07 18:00:00", "2023-01-07 18:00:00"),
  createData("Developer", "2023-01-08 19:00:00", "2023-01-08 19:00:00"),
  createData("Tester", "2023-01-09 20:00:00", "2023-01-09 20:00:00"),
  createData("Designer", "2023-01-10 21:00:00", "2023-01-10 21:00:00"),
];

export default function RolePage() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearchRole = (e) => {
    e.preventDefault();
    alert("Search role...");
  };

  return (
    <div className="role-page">
      <div className="users-controller">
        <div
          className="row m-1"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="users-controller_searcher col-md-5">
            <form onSubmit={handleSearchRole}>
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
            <CreateButton createUrl={"/dashboard/roles/create"} />
          </div>
        </div>
      </div>
      <RoleTableData data={rows} />
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

const RoleTableData = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "60vh", marginTop: "20px" }}
    >
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">created_at</TableCell>
            <TableCell align="left">Updated_at</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.created_at}</TableCell>
                <TableCell align="left">{row.updated_at}</TableCell>
                <TableCell align="left">
                  <MenuButton />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
