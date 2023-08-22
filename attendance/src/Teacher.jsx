import "./Teacher.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCourseIDContext } from "./CourseIDContext";
import { useCourseNameContext } from "./CourseNameContext";

export default function Teacher() {

  const {CourseName, setCourseName}=useCourseNameContext();
  const {CourseID, setCourseID}=useCourseIDContext();
  const navigate = useNavigate();
  
  function home() {
    navigate("/");
  }

  function login() {
    navigate("/TeacherDetails");
  }

  
  return (
    <div className="teacher-body">
      <div className="overlay1"></div>
      <form className="form">
        <div
          className="gradient1"
          style={{
            backgroundImage: "linear-gradient(50deg, #800080,transparent)",
          }}
        ></div>
        <div className="title1">Enter Your FacultyID</div>

        <div className="usn1">
          <label htmlFor="usn">CourseName</label>
          <input
            className="inputbox"
            id="usn"
            name="usn"
            type="usn"
            placeholder="Enter course name:"
            value={CourseName}
            onChange={(e) => setCourseName(e.target.value)}
          ></input>

          <label htmlFor="usn">CourseID</label>
          <input
            className="inputbox"
            id="usn"
            name="usn"
            type="usn"
            placeholder="Enter course ID:"
            value={CourseID}
            onChange={(e) => setCourseID(e.target.value)}
          ></input>
        </div>

        <div>
          <Button
            size="lg"
            color="secondary"
            variant="contained"
            type="submit"
            sx={{ mr: 3 }}
            onClick={login}
          >
            Log In
          </Button>
          <Button
            size="lg"
            color="secondary"
            variant="contained"
            onClick={home}
          >
            Home
          </Button>
        </div>
      </form>
    </div>
  );
}
