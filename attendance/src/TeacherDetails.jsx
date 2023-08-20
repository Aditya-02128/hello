import "./TeacherDetails.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { read, utils } from "xlsx";
import { useStudentDataContext } from "./StudentDataContext";
import { useCourseIDContext } from "./CourseIDContext";
import { useCourseNameContext } from "./CourseNameContext";
import { doc, getDoc,collection, getDocs, getFirestore } from 'firebase/firestore'; // Import Firestore functions as needed
import { db } from './config/firebase';

export default function TeacherDetails(props) {
  const navigate = useNavigate();
  const { studentData, setStudentData } = useStudentDataContext();
  const {CourseName, setCourseName}=useCourseNameContext();
  const {CourseID, setCourseID}=useCourseIDContext();
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    const getStudentName = async () => {
      
      const studentsCollection = collection(db, "students");
      try {
        const querySnapshot = await getDocs(studentsCollection);
        if (querySnapshot.size>0) {
          const studentData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        } ));
          console.log("DocSnap data: ", studentData);
          setStudentDetails(studentData);
          console.log(studentDetails)
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        const workbook = read(content, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = utils.sheet_to_json(sheet);
        console.log("Parsed Data:", parsedData);

        setStudentData(parsedData);
        console.log("Student Data Context:", studentData);
      };

      reader.readAsBinaryString(file);
    }
  };

  function home() {
    navigate("/");
  }

  return (
    <div className="teacher-details-container">
      <h1 className="header"> All STUDENT DETAILS</h1>
      <label className="upload-button">
        Upload
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </label>
      <button className="exit-button" onClick={home}>
        Exit
      </button>
      <div id='excel-table'>
      {studentData.length > 0 ? (
        <table className="student-table">
          <thead>
            <tr>
              <th>USN</th>
              <th>IA1</th>
              <th>IA2</th>
              <th>IA3</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.usn}>
                <td>{student.usn}</td>
                <td>{student.ia1}</td>
                <td>{student.ia2}</td>
                <td>{student.ia3}</td>
                <td>{student.attendance}</td>
              </tr>
            ))}
          </tbody>
          <caption>Uploaded data</caption>
        </table>
      ) : (
        <h1 className="excel">UPLOAD THE EXCEL FILE {CourseID}</h1>
      )}
      </div>
      <div id="DB-table">
      {studentDetails!==null?(
        <table className="student-table">
          <tr>
            <th>USN</th>
            <th>IA1</th>
            <th>IA2</th>
            <th>IA3</th>
            <th>Attendance</th>
          </tr>
          {studentDetails.map(e => 
            (<tr>
              <td>{e["id"]}</td>
              <td>{e["Marks"][CourseID]["IA1"]}</td>
              <td>{e["Marks"][CourseID]["IA2"]}</td>
              <td>{e["Marks"][CourseID]["IA3"]}</td>
              <td>{e["Marks"][CourseID]["Attendance"]}</td>
            </tr>)
          )}
          <caption>Data since last update</caption>
        </table>
      ):(<p className="excel">NO DATA</p>)}
      </div>

    </div>
  );
}
