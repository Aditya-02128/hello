import "./TeacherDetails.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { read, utils } from "xlsx";
import { useStudentDataContext } from "./StudentDataContext";
import { useCourseIDContext } from "./CourseIDContext";
import { useCourseNameContext } from "./CourseNameContext";
import { doc, setDoc,collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

export default function TeacherDetails(props) {
  const navigate = useNavigate();
  const { studentData, setStudentData } = useStudentDataContext();
  const {CourseName}=useCourseNameContext();
  const {CourseID}=useCourseIDContext();
  //const [studentDetails, setStudentDetails] = useState(null);
  const [flag,setFlag]=useState(0);
  const [tempdata,settempdata]=useState(null);
  const [flag1,setFlag1]=useState(0);

  useEffect(()=>{
    const getsql = async () => {
      try {
          const response = await fetch("http://localhost:81/php_files/init.php?courseid=" + CourseID, { method: "GET" });
          const data = await response.json();
          settempdata(data);
          console.log(data);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }
    getsql();
  },[flag1])

  const finalizepage=()=>{
    var e=document.getElementById('excel-table');
    e.remove();
    var dbt=document.getElementById('DB-table');
    dbt.style.marginRight="25%";
    dbt.style.marginLeft="25%";
    setFlag1(flag1+1);
  }

  function printdata(){
    var toprint=document.getElementById("DB-table").innerHTML;
    var a=window.open();
    var styles=`.student-table {
        width: 80%;border-collapse: collapse;margin-top: 20px;}
      .student-table th,.student-table td {
        padding: 10px;border: 3px solid #ddd;}
      .student-table th {
        background-color: #f2f2f2;font-weight: bold;}
      .student-table td {
        text-align: center;}`
    a.document.write("<html><head><style>");
    a.document.write(styles);
    a.document.write("</style></head><body>");
    a.document.write(toprint);
    a.document.write("<script>var e=document.getElementById('print');e.remove();</script>");
    a.document.write("</body></html>");
    a.document.close();
    a.print();
  }

async function updatesql(){
  const payload={"SSID":"6A","coursecode":CourseID,"data":studentData}
    const res=await fetch("http://localhost:81/php_files/init.php",{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify(payload)})
      .then(response=>response.json());
    updateflag()
}

  function finalize(){
    studentData.map((student)=>{
        const setData=async()=>{
              const docRef = doc(db,"students",student['USN']);
              await setDoc(docRef, {"Marks":{ [CourseID] :{"IA1":student['IA1'],"IA2":student['IA2'],"IA3":student['IA3'],"courseName":CourseName,"Attendance":student['Attendance']}},"StudentName":student['Name']},{merge:true});
        }
        try{
            setData();
            setFlag1(flag1+1);
            console.log(flag);
        }catch(err){
            console.log("Firebase Insertion Error"+err);
        }
    });
    //finalizepage();    //enable to remove excel page after finalization

    updatesql();
    setFlag1(flag1+1);
    
  }

  function updateflag(){
    setFlag1(flag1+1);
  }


  /*useEffect(() => {
    const getStudentName = async () => {
      
      const studentsCollection = collection(db, "students");
      try {
        const querySnapshot = await getDocs(studentsCollection);
        console.log("fetched now")
        if (querySnapshot.size>0) {
          const studentData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        } ));
          setStudentDetails(studentData);
        } else {
          console.log("Document does not exist");
          setStudentDetails(null); // Clear student details
        }
      } catch (error) {
        console.log(error);
      }
    };  
      getStudentName();
  
  },[flag]);*/

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
        <>
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
                <tr key={student.USN}>
                  <td>{student.USN}</td>
                  <td>{student.IA1}</td>
                  <td>{student.IA2}</td>
                  <td>{student.IA3}</td>
                  <td>{student.Attendance}</td>
                </tr>
              ))}
            </tbody>
            <caption>Uploaded data</caption>
          </table>
          <button id="fin" className="finalize-button" onFocus={updateflag} onClick={finalize}>Finalize</button>
        </>
      ) : (
        <h1 className="excel">UPLOAD THE EXCEL FILE {CourseID}</h1>
      )}
      </div>
      <div id="DB-table">
      {/*{studentDetails!==null?(
        <>
        <table className="student-table">
          <tr>
            <th>USN</th>
            <th>IA1</th>
            <th>IA2</th>
            <th>IA3</th>
            <th>Attendance</th>
          </tr>
          {studentDetails.map(e => {
          if (e.Marks[CourseID]) {
            const marksForCourse = e.Marks[CourseID];
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{marksForCourse.IA1}</td>
                <td>{marksForCourse.IA2}</td>
                <td>{marksForCourse.IA3}</td>
                <td>{marksForCourse.Attendance}</td>
              </tr>
            );
          } else {
            return null;
          }
        })}
          <caption>Data since last update</caption>
        </table>
        <button id="print" className="Print-button" onClick={printdata}>
        Print
      </button></>
      ):(<p className="excel">NO DATA</p>)}*/}

      {tempdata!==null?(
        <>
        <table className="student-table">
          <tr>
            <th>USN</th>
            <th>IA1</th>
            <th>IA2</th>
            <th>IA3</th>
            <th>Attendance</th>
          </tr>
          {tempdata.map((row) => (
            <tr>
              <td>{row.USN}</td>
              <td>{row.IA1}</td>
              <td>{row.IA2}</td>
              <td>{row.IA3}</td>
              <td>{row.Attendance}</td>
            </tr>
          ))}
          <caption>Data since last update</caption>
        </table>
        <button id="print" className="Print-button" onClick={printdata}>
        Print
      </button></>
      ):(<p className="excel">NO DATA</p>)}

      </div>
    </div>
  );
}
