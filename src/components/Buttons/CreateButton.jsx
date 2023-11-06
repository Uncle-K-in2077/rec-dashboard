import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function CreateButton({ createUrl, onClick, fullWidth }) {
  return (
    <Link to={createUrl}>
      <Button
        fullWidth={fullWidth}
        variant="contained"
        color="success"
        onClick={onClick}
        className="mx-1"
      >
        Create +
      </Button>
    </Link>
  );
}

export default CreateButton;
