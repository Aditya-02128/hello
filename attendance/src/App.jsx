import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Student from "./Student";
import Teacher from "./Teacher";
import StudentDetails from "./StudentDetails";
import TeacherDetails from "./TeacherDetails";
import UploadMarks from "./UploadMarks";
import RetrieveMarks from "./RetrieveMarks";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Teacher" element={<Teacher />} />
        <Route path="/StudentDetails/:usn" element={<StudentDetails />} />
        <Route path="/TeacherDetails" element={<TeacherDetails />} />
        <Route path="/UploadMarks" element={<UploadMarks />}/>
        <Route path="/RetrieveMarks" element={<RetrieveMarks />}/>
      </Routes>
    </div>
  );
}

export default App;
