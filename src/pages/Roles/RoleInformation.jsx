import { Divider, TextField, Typography } from "@mui/material";
import UpdateButton from "./../../components/Buttons/UpdateButton";

function RoleInformation() {
  return (
    <div className="role-information">
      <div className="role-information_form">
        <form>
          <div className="form-group" style={{ maxWidth: 400 }}>
            <TextField label="Role name" variant="outlined" />
          </div>
          <div className="form-group">
            <UpdateButton className="my-2" />
          </div>
        </form>
        <div className=" role-description">
          {/* <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
            voluptas iste ipsam nihil sed nulla nemo aliquam? Corrupti officiis
            error odio sint aperiam mollitia, aliquam minus quos dolor amet
            reiciendis.
          </Typography> */}
        </div>
      </div>
    </div>
  );
}

export default RoleInformation;
