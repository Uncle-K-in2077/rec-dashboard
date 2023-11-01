import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function DeleteButton({ onClick }) {
  return (
    <Button variant="outlined" color="error" onClick={onClick} className="mx-1">
      <ClearIcon />
    </Button>
  );
}

export default DeleteButton;
