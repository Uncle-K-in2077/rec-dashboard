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
import { RoleService } from "../../services/role.service";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import { useEffect } from "react";
import { DateUtil } from "../../utils/date.util";

export default function RolePage() {
  const [page, setPage] = React.useState(1);
  const limit = 20;

  const fetcher = async () => {
    return await RoleService.getAll({ page, limit });
  };

  const { data, mutate } = useSWR(SWR_KEY.GET_ALL_ROLES, fetcher);

  const handleChange = async (event, value) => {
    await setPage(value);
    mutate();
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

      <RoleTableData data={data?.data || []} />
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

const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Role name" },
  { id: "created_at", label: "Created at" },
];

const RoleTableData = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "60vh", marginTop: "20px" }}
    >
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
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
          {data &&
            data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  {DateUtil.toString(row.updated_at)}
                </TableCell>
                <TableCell align="left">
                  <MenuButton detailUrl={`/dashboard/roles/${row.id}`} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
