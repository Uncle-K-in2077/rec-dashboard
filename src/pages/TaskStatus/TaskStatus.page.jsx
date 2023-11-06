import "./style.css";
import MenuButton from "../../components/Buttons/MenuButton";
import { Paper } from "@mui/material";

function TaskStatus() {
    return (
        <div className="row">
            <h1>Task Status</h1>
            <div className="task_status_list row">
                <div className="col-2">
                    <div className="task_status">
                        <strong>Task 1</strong>
                        <MenuButton className="task_menu" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TaskStatus;