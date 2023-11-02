import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function CancelButton({ onClick, cancelUrl }) {
  return (
    <Link to={cancelUrl}>
      <Button
        variant="outlined"
        color="error"
        onClick={onClick}
        className="mx-1"
      >
        Cancel
      </Button>
    </Link>
  );
}

export default CancelButton;
