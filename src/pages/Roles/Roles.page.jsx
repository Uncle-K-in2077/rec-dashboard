import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import EditButton from "./../../components/Buttons/EditButton";
import DeleteButton from "./../../components/Buttons/DeleteButton";

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

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">created_at</TableCell>
            <TableCell align="right">Updated_at</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">{row.updated_at}</TableCell>
              <TableCell align="right">
                <EditButton />
                <DeleteButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
