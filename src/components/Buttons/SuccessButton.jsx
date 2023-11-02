import { Button } from "@mui/material";

function SuccessButton({ onClick }) {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={onClick}
      className="mx-1"
    >
      Success
    </Button>
  );
}

export default SuccessButton;
