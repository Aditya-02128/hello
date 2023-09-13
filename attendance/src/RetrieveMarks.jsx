import { Table } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RetrieveMarks.css"
import { useUsnContext } from "./UsnContext";
export default function RetrieveMarks(){
const [tempdata,settempdata]=useState(null);
const [name,setname]=useState(null);
const { usn, setUsn } = useUsnContext();

    const getsql = async () => {
        try {
            const response = await fetch(`http://localhost:81/php_files/new.php?usn=${usn}`, { method: "GET" });
            const data = await response.json();
            settempdata(data['Data']);
            setname(data['Name']);
            console.log(tempdata);
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        // Call getsql when the component mounts
        getsql();
      }, []);
    const navigate=useNavigate();

    function home() {
        navigate("/");
    }
    function printScreen(){
        window.print(); 
      };
    

    return(
        <div>
        
        <button className="exit-button1" onClick={home}>
        Exit
      </button>
      <button className="Print-button" onClick={printScreen}>
        Print
      </button>
            {tempdata!==null?(
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>IA1</th>
                            <th>IA2</th>
                            <th>IA3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tempdata.map((row)=>
                        <tr>
                            <td>{row.CourseId}</td>
                            <td>{row.IA1}</td>
                            <td>{row.IA2?(row.IA2):('not given')}</td>
                            <td>{row.IA3?(row.IA3):('not given')}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            ):(null)}

        </div>
    );
}