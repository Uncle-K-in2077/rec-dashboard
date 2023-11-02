import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function CreateButton({ createUrl, onClick }) {
  return (
    <Link to={createUrl}>
      <Button
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
