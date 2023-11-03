import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import UpdateButton from "../../components/Buttons/UpdateButton";
import { Divider, FormControlLabel, Switch } from "@mui/material";
import "./style.css";
function CreateRolePage() {
  const handleChangeSwitch = (id) => {
    alert("handleChangeSwitch" + id);
  };

  return (
    <div className="create-role-page" style={{ minHeight: "80vh" }}>
      <div className="container">
        <div className="role-name">
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              style={{ justifyContent: "flex-start" }}
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Role name
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  placeholder="Enter the role name..."
                />
              </Col>
              <Col sm="2">
                <UpdateButton />
              </Col>
            </Form.Group>
          </Form>
        </div>

        <Divider className="my-3" />

        <div className="role-permissions">
          <div className="container col-8">
            {role_api &&
              Object.keys(role_api).map((groupName, index) => {
                return (
                  <div key={index} className="permission-group">
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
                      <div className="permission-switchs col-md-6">
                        {role_api &&
                          role_api[groupName] &&
                          role_api[groupName].map((item, i) => {
                            return (
                              <div className="permission-item" key={i}>
                                <FormControlLabel
                                  onChange={() => {
                                    handleChangeSwitch(item.id);
                                  }}
                                  control={<Switch defaultChecked />}
                                  label={item.name}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRolePage;

const role_api = {
  "Real Estates": [
    {
      id: 1,
      name: "List Real Estates",
      action: "admin.real_estates.index",
    },
    {
      id: 2,
      name: "Create Real Estate",
      action: "admin.real_estates.create",
    },
    {
      id: 3,
      name: "Create Real Estate",
      action: "admin.real_estates.edit",
    },
    {
      id: 4,
      name: "Create Real Estate",
      action: "admin.real_estates.destroy",
    },
  ],
  Roles: [
    {
      id: 5,
      name: "List Roles",
      action: "admin.roles.index",
    },
    {
      id: 6,
      name: "Create Role",
      action: "admin.roles.create",
    },
    {
      id: 7,
      name: "Update Role",
      action: "admin.roles.edit",
    },
    {
      id: 8,
      name: "Delete Role",
      action: "admin.roles.destroy",
    },
  ],
  Users: [
    {
      id: 9,
      name: "List Users",
      action: "admin.users.index",
    },
    {
      id: 10,
      name: "Create User",
      action: "admin.users.create",
    },
    {
      id: 11,
      name: "Create User",
      action: "admin.users.edit",
    },
    {
      id: 12,
      name: "Create User",
      action: "admin.users.destroy",
    },
  ],
  "User Statuses": [
    {
      id: 13,
      name: "List User Statuses",
      action: "admin.user_statuses.index",
    },
    {
      id: 14,
      name: "Create User Statuses",
      action: "admin.user_statuses.create",
    },
    {
      id: 15,
      name: "Update User Statuses",
      action: "admin.user_statuses.edit",
    },
    {
      id: 16,
      name: "Delete User Statuses",
      action: "admin.user_statuses.destroy",
    },
  ],
  Tasks: [
    {
      id: 17,
      name: "List Tasks",
      action: "admin.tasks.index",
    },
    {
      id: 18,
      name: "Create Task",
      action: "admin.tasks.create",
    },
    {
      id: 19,
      name: "Update Task",
      action: "admin.tasks.edit",
    },
    {
      id: 20,
      name: "Delete Task",
      action: "admin.tasks.destroy",
    },
  ],
  Pricings: [
    {
      id: 33,
      name: "List Pricings",
      action: "admin.pricings.index",
    },
    {
      id: 34,
      name: "Create Pricing",
      action: "admin.pricings.create",
    },
    {
      id: 35,
      name: "Update Pricing",
      action: "admin.pricings.edit",
    },
    {
      id: 36,
      name: "Delete Pricing",
      action: "admin.pricings.destroy",
    },
  ],
};
