import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function CreateButton({ createUrl, onClick, fullWidth, type }) {
  return (
    <Link to={createUrl}>
      <Button
        fullWidth={fullWidth}
        variant="contained"
        color="success"
        onClick={onClick}
        className="mx-1"
        type={type ? type : "button"}
      >
        Create +
      </Button>
    </Link>
  );
}

export default CreateButton;
