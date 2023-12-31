import { Button } from "@mui/material";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function CancelButton({ onClick, cancelUrl, fullWidth }) {
  return (
    <Link to={cancelUrl}>
      <Button fullWidth={fullWidth}
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
