import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import UpdateButton from "../../components/Buttons/UpdateButton";
import { Divider, FormControlLabel, Switch } from "@mui/material";
import "./style.css";
import useSWR from "swr";
import { SWR_KEY } from "../../constants/SWR_KEY";
import { PermissionService } from "../../services/permission.service";
import Spinners from "../../components/Loading/Spinners";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateButton from "../../components/Buttons/CreateButton";
import { toast } from "react-toastify";
import { RoleService } from "../../services/role.service";
import CancelButton from "../../components/Buttons/CancelButton";
function CreateRolePage() {
  const { id } = useParams();

  const [role, setRole] = useState({
    name: "",
    list_permission: [],
  });

  const { data, isLoading } = useSWR(
    SWR_KEY.GET_ALL_PERMISSION,
    PermissionService.getAll
  );

  const handleChangeSwitch = (id, e) => {
    const permission_id = id;
    const checked = e.target.checked;

    setRole((prevRole) => {
      let updatedPermissions;
      if (checked) {
        updatedPermissions = [...prevRole.list_permission, permission_id];
      } else {
        updatedPermissions = prevRole.list_permission.filter(
          (permission) => permission !== permission_id
        );
      }

      return {
        ...prevRole,
        list_permission: updatedPermissions,
      };
    });
  };

  const handleCreate = async () => {
    if (!role.name) {
      toast.warn("Please enter role name !");
    } else {
      await RoleService.create(role);
    }
  };

  const handleUpdate = async () => {
    if (!role.name) {
      toast.warn("Please enter role name !");
    } else {
      await RoleService.update({
        id,
        data: role,
      });
    }
  };
  useEffect(() => {
    if (id) {
      const getCurentRole = async () => {
        const rs = await RoleService.getById(id);
        if (rs) {
          setRole({
            name: rs.name,
            list_permission: rs.permissions?.map((item) => item.id),
          });
        }
      };
      getCurentRole();
    }
  }, [id]);
  return (
    <div className="create-role-page">
      <div className="container">
        <div className="role-name">
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              style={{ justifyContent: "flex-start" }}
              controlId="formPlaintextPassword"
            >
              <Form.Label column="true" sm="12" md="2" xl="2">
                <h5>Role name</h5>
              </Form.Label>
              <div className="form-group col-sm-12 col-md-8 col-xl-8">
                <div className="row">
                  <Col column="true" sm="12" md="12" xl="8">
                    <Form.Control
                      value={role.name}
                      onChange={(e) => {
                        setRole({ ...role, name: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter the role name..."
                    />
                  </Col>
                  <Col sm="12" md="12" xl="4">
                    <div>
                      {!id ? (
                        <CreateButton onClick={handleCreate} />
                      ) : (
                        <UpdateButton onClick={handleUpdate} />
                      )}
                      <CancelButton cancelUrl={"/dashboard/roles"} />
                    </div>
                  </Col>
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>

        <Divider className="my-3" />

        {!isLoading ? (
          <div className="role-permissions">
            <div className="container col-sm-12 col-md-9 col-xl-8">
              {data &&
                Object.keys(data).map((groupName, index) => {
                  return (
                    <div key={index} className="permission-group p-3">
                      <div
                        className="row"
                        style={{ justifyContent: "space-evenly" }}
                      >
                        <div
                          className="permission-name col-md-4"
                          style={{ textAlign: "right" }}
                        >
                          <p>{groupName}</p>
                        </div>
                        {!id ? (
                          <div className="permission-switchs col-md-6">
                            {data &&
                              data[groupName] &&
                              data[groupName].map((item, i) => {
                                return (
                                  <div className="permission-item" key={i}>
                                    <FormControlLabel
                                      onChange={(e) => {
                                        handleChangeSwitch(item.id, e);
                                      }}
                                      control={<Switch />}
                                      label={item.name}
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        ) : (
                          <div className="permission-switchs col-md-6">
                            {data &&
                              role.list_permission &&
                              data[groupName] &&
                              data[groupName].map((item, i) => {
                                const isChecked = Object.values(
                                  role.list_permission
                                ).some((permission) => permission === item.id);
                                return (
                                  <div className="permission-item" key={i}>
                                    <FormControlLabel
                                      onChange={(e) => {
                                        handleChangeSwitch(item.id, e);
                                      }}
                                      control={<Switch checked={isChecked} />}
                                      label={item.name}
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <Spinners />
        )}
      </div>
    </div>
  );
}

export default CreateRolePage;
