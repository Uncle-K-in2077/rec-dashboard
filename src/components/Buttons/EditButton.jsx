import { Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function EditButton({ onClick }) {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={onClick}
    >
      <BorderColorIcon />
    </Button>
  );
}

export default EditButton;
