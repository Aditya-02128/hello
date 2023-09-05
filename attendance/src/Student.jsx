import "./Student.css";
import { useUsnContext } from "./UsnContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Student() {

  const { usn, setUsn } = useUsnContext();
  function home() {
    navigate("/");
  }

  function login() {
    navigate(`/StudentDetails/${usn}`);
  }

  const navigate = useNavigate();

  return (
    <div className="student-body">
      <div className="overlay1"></div>
      <form className="form">
        <div
          className="gradient1"
          style={{
            backgroundImage: "linear-gradient(50deg, #00f0ff,transparent)",
          }}
        ></div>
        <div className="title1">Enter Your USN</div>

        <div className="usn1">
          <label htmlFor="usn">USN</label>
          <input
            className="inputbox"
            id="usn"
            name="usn"
            type="usn"
            placeholder="Enter your USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
          ></input>
        </div>

        <div>
          <Button
            size="lg"
            variant="contained"
            type="submit"
            sx={{ mr: 3 }}
            onClick={login}
          >
            Log In
          </Button>
          <Button size="lg" variant="contained" onClick={home}>
            Home
          </Button>
        </div>
      </form>
    </div>
  );
}
