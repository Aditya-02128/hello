import { Button } from "@mui/material";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions as needed
import { db } from './config/firebase';

export default function Home() {
  const navigate = useNavigate();
  const handleStudentButtonClick = () => {
    navigate("/Student");
  };
  const handleTeacherButtonClick = () => {
    navigate("/Teacher");
    
  };

  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    const getStudentName = async () => {
      const docRef = doc(db, "students", "1BY20CS101");

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("DocSnap data: ", docSnap.data());
          setStudentDetails(docSnap.data());
           // Update state with student details
        } else {
          console.log("Document does not exist");
          setStudentDetails(null); // Clear student details
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudentName();
  },[]);
  console.log(studentDetails);
  
  return (
    <div>
      <div className="app-bar">
        <div className="header-text">
          <h2>PARHEEKSHA</h2>
        </div>
      </div>

      <div className="home-body">
        <form className="form1">
          <div
            className="gradient1"
            style={{
              backgroundImage: "linear-gradient(50deg, #00ff00,transparent)",
            }}
          ></div>
          <div className="buttons">
            <Button
              color="success"
              variant="contained"
              size="large"
              onClick={handleTeacherButtonClick}
            >
              Teacher
            </Button>

            <Button
              color="success"
              size="large"
              variant="contained"
              onClick={handleStudentButtonClick}
            >
              Student
            </Button>
          </div>
        </form>
        {studentDetails!==null?
        (<p>{studentDetails["StudentName"]}</p>):
        (<p>no data</p>)}
      </div>
    </div>
  );
}
