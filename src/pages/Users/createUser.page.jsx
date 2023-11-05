import {
  Avatar,
  Button,
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
import { useEffect, useState } from "react";
import UserSerivce from "../../services/user.service";
import { useParams } from "react-router-dom";
import { SWR_KEY } from "../../constants/SWR_KEY";
import { UserStatusService } from "../../services/userStatus.service";
import useSWR from "swr";
import UpdateButton from "../../components/Buttons/UpdateButton";

function CreateUserPage() {
  const { id } = useParams();
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    id_card: "",
    birthday: null,
    gender: 0,
    phone: "",
    address: "",
    user_status_id: 1,
    email: "",
    password: "",
  });

  const [file, setFile] = useState(null);

  const handleGetUserStatus = async () => {
    return await UserStatusService.getAll();
  };

  const { data: UStatuses } = useSWR(
    SWR_KEY.GET_ALL_USER_STATUS,
    handleGetUserStatus
  );
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (id) {
      const getCurentUser = async () => {
        const rs = await UserSerivce.getById(id);
        setUser(rs);
      };
      getCurentUser();
    }
  }, [id]);

  const handleCreate = async () => {
    await UserSerivce.create({ ...user, file });
  };

  const handleUpdate = async () => {
    await UserSerivce.update({
      id,
      data: { ...user, file },
    });
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm-12 col-md-8 col-xl-8">
          <div className="create-user-form">
            <div>
              <div className="row m-0">
                <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                  <TextField
                    required
                    name="first_name"
                    value={user.first_name}
                    label="First name"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group p-2 col-sm-12 col-md-6 col-xl-6">
                  <TextField
                    required
                    name="last_name"
                    value={user.last_name}
                    label="Last name"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group p-2 col-sm-12 col-md-4 col-xl-4">
                  <TextField
                    required
                    name="id_card"
                    value={user.id_card}
                    label="Card id"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group p-2 col-sm-12 col-md-4 col-xl-4">
                  <FormControl key={user.gender?.id || 0}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      name="gender"
                      value={user.gender?.id || 0}
                      autoWidth
                      label="Gender"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Woman</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="form-group p-2 col-sm-12 col-md-4 col-xl-4">
                  <DateChooser
                    name="birthday"
                    value={user.birthday}
                    label={"Birthday"}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group p-2 ">
                <TextField
                  required
                  name="phone"
                  value={user.phone}
                  label="Phone number"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group p-2 ">
                <TextField
                  required
                  name="address"
                  value={user.address}
                  label="Address"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group p-2 ">
                <TextField
                  required
                  name="email"
                  value={user.email}
                  label="Email address"
                  variant="outlined"
                  type="email"
                  onChange={handleInputChange}
                />
              </div>
              {!id && (
                <>
                  <div className="form-group p-2 ">
                    <TextField
                      required
                      name="password"
                      value={user.password}
                      label="Password"
                      variant="outlined"
                      type="password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group p-2 ">
                    <TextField
                      required
                      name="confirm_password"
                      value={user.confirm_password}
                      label="Confirm password"
                      variant="outlined"
                      type="password"
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}

              <div className="form-group p-2 ">
                <FormControl>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    name="user_status_id"
                    value={user.user_status_id}
                    autoWidth
                    label="Status"
                    onChange={handleInputChange}
                  >
                    {UStatuses && UStatuses.data ? (
                      UStatuses.data.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
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
              <UploadFileButton label={"Upload avatar"} setFile={setFile} />
            </center>
          </div>
          {id && (
            <div className="user-update-password">
              {!changePasswordMode && (
                <div className="form-group p-2 ">
                  <Button
                    onClick={() => setChangePasswordMode(true)}
                    variant="text"
                  >
                    Change password
                  </Button>
                </div>
              )}
              {changePasswordMode && (
                <div className="form-update-password">
                  <div className="form-group p-2 ">
                    <TextField
                      fullWidth
                      name="password"
                      value={user.password}
                      label="Password"
                      variant="outlined"
                      type="password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group p-2 ">
                    <TextField
                      fullWidth
                      name="confirm_password"
                      value={user.confirm_password}
                      label="Confirm password"
                      variant="outlined"
                      type="password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group p-2 ">
                    <UpdateButton
                      onClick={() => setChangePasswordMode(false)}
                    />

                    <CancelButton
                      onClick={() => setChangePasswordMode(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="create-user-buttons m-1 mt-4">
          {id ? (
            <UpdateButton onClick={handleUpdate} />
          ) : (
            <SuccessButton onClick={handleCreate} />
          )}

          <CancelButton cancelUrl={"/dashboard/users"} />
        </div>
      </div>
    </div>
  );
}

export default CreateUserPage;
