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
import CraeteButton from "../../components/Buttons/CreateButton";
import EditButton from "./../../components/Buttons/EditButton";
import DeleteButton from "./../../components/Buttons/DeleteButton";
function UsersPage() {
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
            <CraeteButton />
          </div>
        </div>
      </div>
      <UserTableData />
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
  { id: "id", label: "ID", minWidth: 50 },
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 170 },
  { id: "id_card", label: "ID Card", minWidth: 170 },
  { id: "birthday", label: "Birthday", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
];

const usersData = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    id_card: "1234567890",
    birthday: "1990-01-15",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    id_card: "9876543210",
    birthday: "1995-05-20",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    first_name: "Alice",
    last_name: "Johnson",
    id_card: "3456789012",
    birthday: "1988-08-12",
    email: "alice.johnson@example.com",
  },
  {
    id: 4,
    first_name: "Bob",
    last_name: "Williams",
    id_card: "6543210987",
    birthday: "1992-03-25",
    email: "bob.williams@example.com",
  },
  {
    id: 5,
    first_name: "Eva",
    last_name: "Davis",
    id_card: "7890123456",
    birthday: "1997-11-30",
    email: "eva.davis@example.com",
  },
  {
    id: 6,
    first_name: "Michael",
    last_name: "Lee",
    id_card: "5678901234",
    birthday: "1985-04-18",
    email: "michael.lee@example.com",
  },
  {
    id: 7,
    first_name: "Sophia",
    last_name: "Brown",
    id_card: "1234598765",
    birthday: "1987-09-04",
    email: "sophia.brown@example.com",
  },
  {
    id: 8,
    first_name: "William",
    last_name: "Taylor",
    id_card: "4321098765",
    birthday: "1998-07-15",
    email: "william.taylor@example.com",
  },
  {
    id: 9,
    first_name: "Olivia",
    last_name: "Martinez",
    id_card: "9876543210",
    birthday: "1993-02-22",
    email: "olivia.martinez@example.com",
  },
  {
    id: 10,
    first_name: "Liam",
    last_name: "Garcia",
    id_card: "8765432109",
    birthday: "1994-06-07",
    email: "liam.garcia@example.com",
  },
];

function UserTableData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell key="actions" align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData
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
                    <TableCell key="actions" align="left" colSpan={2}>
                      <EditButton />
                      <DeleteButton />
                    </TableCell>
                    {/* <TableCell key="actions" align="left">
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default UsersPage;
