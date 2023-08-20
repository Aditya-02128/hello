import { useState, useEffect } from "react";
import { useStudentDataContext } from "./StudentDataContext"; // Import the StudentDataContext
import { useUsnContext } from "./UsnContext";
import "./StudentDetails.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions as needed
import { db } from './config/firebase';

export default function StudentDetails() {
  function home() {
    navigate("/");
  }
  const navigate = useNavigate();
  const { usn } = useUsnContext();
  const { studentData } = useStudentDataContext(); // Use the studentData from context
  const [studentInfo, setStudentInfo] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  useEffect(() => {
    const getStudentName = async () => {
      const docRef = doc(db, "students", usn);

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
    console.log(studentDetails);
  },[]);

  useEffect(() => {
    const findStudentByUSN = () => {
      const student = studentData.find((student) => student.usn === usn); // Use studentData instead of dummyData
      if (student) {
        setStudentInfo(student);
      } else {
        setStudentInfo(null);
      }
    };

    findStudentByUSN();
  }, [usn, studentData]); // Include studentData in the dependency array
console.log(studentDetails)
  return (
    <div className="student-details-container">
      <h1>STUDENT DETAILS</h1>
      <button className="exit-button1" onClick={home}>
        Exit
      </button>
      {studentDetails!==null? (
        <table className="student-table">
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
    </div>
  );
}
