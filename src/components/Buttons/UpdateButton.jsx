import { Button } from "@mui/material";

function UpdateButton(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={props.onClick}
      {...props}
    >
      Update
    </Button>
  );
}

export default UpdateButton;
