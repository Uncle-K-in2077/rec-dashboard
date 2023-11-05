import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadFileButton = ({ label, setFile, ...rest }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (setFile && selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      {...rest}
    >
      {label || "Button"}
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange}
        accept=".png, .jpg, .jpeg"
      />
    </Button>
  );
};

export default UploadFileButton;
