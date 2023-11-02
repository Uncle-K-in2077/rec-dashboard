import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import "./style.css";
import UploadFileButton from "../../components/Buttons/UploadFileButton";
import SuccessButton from "../../components/Buttons/SuccessButton";
import CancelButton from "../../components/Buttons/CancelButton";
import DateChooser from "../../components/Inputs/DateChooser";
import React from "react";

function CreateUserPage() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-8 col-xl-8">
          <div className="create-user-form">
            <div>
              <div className="row m-0">
                <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                  <TextField required label="First name" variant="outlined" />
                </div>
                <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                  <TextField required label="Last name" variant="outlined" />
                </div>
                <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                  <DateChooser label={"Birthday"} />
                </div>
                <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                  <FormControl>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Age
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={age}
                      onChange={handleChange}
                      autoWidth
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Twenty</MenuItem>
                      <MenuItem value={21}>Twenty one</MenuItem>
                      <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="form-group p-2 ">
                <TextField required label="Phone number" variant="outlined" />
              </div>
              <div className="form-group p-2 ">
                <TextField required label="Address" variant="outlined" />
              </div>
              <div className="form-group p-2 ">
                <TextField
                  required
                  label="Email address"
                  variant="outlined"
                  type="email"
                />
              </div>
              <div className="form-group p-2 ">
                <TextField
                  required
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </div>
              <div className="form-group p-2 ">
                <TextField
                  required
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 col-xl-4">
          <div className="avatar-container">
            <Avatar
              className="create-user-avatar"
              alt="Remy Sharp"
              src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/386075921_1527087921389478_3433649193143410273_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGi20pAMm4qeOfsQRvqk_Kyk86kkdu8gtuTzqSR27yC23DLp51GT_IdpGgvF8WjB4dCrQI4HZoj4yhm2se29mB8&_nc_ohc=ZASPobP1qdQAX-4GH6i&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfCJxUk0JCKvRD17C1hHQ-J3RoCJLmWC4nc5TVbIr-MTLA&oe=6547ABCD"
            />
            <center className="m-1">
              <UploadFileButton label={"Choose avatar"} />
            </center>
          </div>
        </div>
        <div className="create-user-buttons m-1 mt-4">
          <SuccessButton />
          <CancelButton cancelUrl={"/dashboard/users"} />
        </div>
      </div>
    </div>
  );
}

export default CreateUserPage;
