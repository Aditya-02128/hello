import { useState } from "react";
import { read, utils } from "xlsx";
import "./UploadMarks.css";
import { useNavigate } from "react-router-dom";

export default function UploadMarks(){

    const navigate = useNavigate();

    async function senddata(){
        const payload={"IA":"IA1","data":StudentData};
        const response=await fetch("http://localhost:81/php_files/new.php",{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify(payload)})
        console.log(response);
    }

    function home() {
        navigate("/");
    }

    const [StudentData,setStudentData]= useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(event.target.files);
        if (file) {
          const reader = new FileReader();
          
          reader.onload = (e) => {
            
            const content = e.target.result;
            const workbook = read(content, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = utils.sheet_to_json(sheet);
            console.log("Parsed Data:", parsedData);
            setStudentData(parsedData);
            console.log(parsedData);
          };
          reader.readAsBinaryString(file);
        }
    };

    function nullify(){
        setStudentData(null);
    }

    return(
    <div>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}/>
        <p>hello</p>

        {StudentData!==null?(
        
        <table className="student-table">
            <thead>
                <tr key="header">
                    {Object.keys(StudentData[0]).map((head)=>
                        <td key={head.id}>{head}</td>
                    )}
                </tr>
            </thead>
        <tbody>
            {StudentData.map((row)=>
                <tr key={row.id}>
                    {Object.keys(StudentData[0]).map((head)=>
                        <td key={head}>{row[head]}</td>
                    )}
                </tr>)}
        </tbody>
        </table>
      ):(<p className="excel">NO DATA</p>)}
      <button onClick={senddata}>upload</button>
      <button onClick={nullify}>nullify</button>
      <button onClick={home}>home</button>
    </div>
    );
}