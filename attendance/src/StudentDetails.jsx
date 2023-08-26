import { useState, useEffect } from "react";
import { useUsnContext } from "./UsnContext";
import "./StudentDetails.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from './config/firebase';

export default function StudentDetails() {

  function home() {
    navigate("/");
  }

  const navigate = useNavigate();
  const { usn } = useUsnContext();
  const [studentDetails, setStudentDetails] = useState(null);
  const urlPath = window.location.pathname;
  const parts = urlPath.split('/');
  const tail = parts[parts.length - 1];
  console.log(tail);
  useEffect(() => {
    const getStudentName = async () => {
      const docRef = doc(db, "students", tail);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("DocSnap data: ", docSnap.data());
          setStudentDetails(docSnap.data());
          console.log("usn");
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
    console.log(studentDetails);
  },[]);


console.log(studentDetails)
  return (
    <div className="student-details-container">
      
      {studentDetails!==null? (
        
        <table className="student-table">
          <caption><h1><p>STUDENT DETAILS</p><p>{studentDetails.StudentName}</p></h1><br></br></caption>
          <thead>
            <tr>
              <th>USN</th>
              <th>NAME</th>
              <th>IA1</th>
              <th>IA2</th>
              <th>IA3</th>
              <th>ATTENDANCE</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(studentDetails['Marks']).map((key) => (
            <tr>
              <td>{key}</td>
              <td>{studentDetails['Marks'][key]['courseName']}</td>
              <td>{studentDetails['Marks'][key]['IA1']}</td>
              <td>{studentDetails['Marks'][key]['IA2']}</td>
              <td>{studentDetails['Marks'][key]['IA3']}</td>
              <td>{studentDetails['Marks'][key]['Attendance']}</td>

            </tr>
            
          ))}
          </tbody>
        </table>
        
      ) : (
        <h1 className="error">No student found with the entered USN</h1>
      )}
      <button className="exit-button1" onClick={home}>
        Exit
      </button>
    </div>
  );
}
