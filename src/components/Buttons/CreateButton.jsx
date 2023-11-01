import { Button } from "@mui/material";

function CraeteButton({ onClick }) {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={onClick}
      className="mx-1"
    >
      Create +
    </Button>
  );
}

export default CraeteButton;
