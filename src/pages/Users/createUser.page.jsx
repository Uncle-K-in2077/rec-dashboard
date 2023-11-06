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
import { toast } from "react-toastify";

function CreateUserPage() {
  const { id } = useParams();
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [defaultUser, setDefaultUser] = useState(null);
  const [changePassword, setChangePassword] = useState({
    newPassword: "",
    comfirmNewPassword: "",
  });
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    id_card: "",
    birthday: new Date(),
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
        setDefaultUser(rs);
      };
      getCurentUser();
    }
  }, [id]);

  useEffect(() => {
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        avatar_path: imageURL,
      }));
    }
  }, [file]);

  const handleChangePassword = async () => {
    if (changePassword.comfirmNewPassword !== changePassword.newPassword) {
      toast.warn("Passwords do not match");
      return;
    }
    if (changePassword.comfirmNewPassword.length < 8) {
      toast.warn("Password is too short");
      return;
    }
    try {
      await UserSerivce.changePassword({
        user: defaultUser,
        newPassword: changePassword.comfirmNewPassword,
      });
      setChangePasswordMode(false);
    } catch (error) {
      toast.error("An error occurred while changing the password.");
    }
  };

  function validateUser(user, isCreating) {
    const errors = {};

    if (!user.first_name) {
      errors.first_name = "First name is required";
    }

    if (!user.last_name) {
      errors.last_name = "Last name is required";
    }

    if (!user.id_card) {
      errors.id_card = "ID card is required";
    }

    if (!user.phone) {
      errors.phone = "Phone number is required";
    }

    if (!user.address) {
      errors.address = "Address is required";
    }

    if (!user.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email is invalid";
    }

    if (!user.password && isCreating) {
      errors.password = "Password is required";
    }

    if (isCreating && user.password !== user.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  }

  const handleCreate = async () => {
    const errors = validateUser(user, true);

    if (Object.keys(errors).length === 0) {
      await UserSerivce.create({ ...user, file });
    } else {
      toast.error(Object.values(errors).join(", "));
    }
  };

  const handleUpdate = async () => {
    const errors = validateUser(user, false);

    if (Object.keys(errors).length === 0) {
      await UserSerivce.update({
        id,
        user: { ...user, file, gender: user.gender.id },
      });
    } else {
      toast.error(Object.values(errors).join(", "));
    }
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
                    key={user.birthday}
                    name="birthday"
                    selectedDate={user.birthday}
                    label={"Birthday"}
                    onDateChange={(date) => {
                      setUser({ ...user, birthday: date });
                    }}
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
              id="user-avatar"
              className="create-user-avatar"
              alt=""
              src={user.avatar_path}
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
                      onChange={(e) => {
                        setChangePassword({
                          ...changePassword,
                          newPassword: e.target.value.trim(),
                        });
                      }}
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
                      onChange={(e) => {
                        setChangePassword({
                          ...changePassword,
                          comfirmNewPassword: e.target.value.trim(),
                        });
                      }}
                    />
                  </div>
                  <div className="form-group p-2 ">
                    <UpdateButton onClick={handleChangePassword} />

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
