import { Button } from "@mui/material";
import { Link } from "react-router-dom";



function TaskPage() {
    return (
        <div>
            <div className="row p-1">
                <div className="col-md-6">
                    <h3>Tasks Page</h3>
                </div>
                <div className="col-md-6" style={{ textAlign: "right" }}>
                    <Link to={"/dashboard/task_status"}>
                        <Button
                            variant="outlined"
                            color="secondary"
                        >Task's Status Page</Button>
                    </Link>
                </div>
            </div>
            <hr />
            <div className="row p-1">
                <div className="col-md-12">
                    <h4>Tasks</h4>
                </div>
            </div>
        </div>
    );
}

export default TaskPage;