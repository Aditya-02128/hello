import { useState, useEffect } from "react";
import { useUsnContext } from "./UsnContext";
import "./StudentDetails.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from './config/firebase';

export default function StudentDetails() {

  function printScreen(){
    window.print(); 
  };

  function home() {
    navigate("/");
  }

  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const urlPath = window.location.pathname;
  const parts = urlPath.split('/');
  const tail = parts[parts.length - 1];
  console.log(tail);

useEffect(()=>{
  fetch("http://localhost:81/php_files/init.php?usn="+tail,{method:"GET"})
    .then(response=>response.json())
    .then(data=>{console.log(data);
    setStudentData(data)});
},[])

 /* useEffect(() => {
    const getStudentName = async () => {
      const docRef = doc(db, "students", tail);
      console.log("fetching")
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
  },[]);*/


console.log(studentDetails)
  return (
    <div ig="printable" className="student-details-container">
      
      {/*{studentDetails!==null? (
        
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
      )}*/}
      {studentData!==null && studentData.length!==0?(<table className="student-table">
          <caption><h1><p>STUDENT DETAILS</p><p>{studentData[0].StudentName}</p></h1><br></br></caption>
          <thead>
            <tr>
              <th>USN</th>
              <th>NAME</th>
              <th>IA1</th>
              <th>IA2</th>
              <th>IA3</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
          {studentData.map((row) => (
            <tr>
              <td>{row.Subcode}</td>
              <td>{row.Title}</td>
              <td>{row.IA1}</td>
              <td>{row.IA2}</td>
              <td>{row.IA3}</td>
              <td>{row.Attendance}</td>
            </tr>
          ))}
          </tbody>
        </table>):(<h1 className="error">No student found with the entered USN</h1>)}
      
      <button className="exit-button1" onClick={home}>
        Exit
      </button>
      <button className="Print-button" onClick={printScreen}>
        Print
      </button>
    </div>
  );
}
