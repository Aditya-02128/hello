import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StudentDataContext = createContext();

export const StudentDataProvider = ({ children }) => {
  const [studentData, setStudentData] = useState([]);

  return (
    <StudentDataContext.Provider value={{ studentData, setStudentData }}>
      {children}
    </StudentDataContext.Provider>
  );
};

StudentDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStudentDataContext = () => {
  return useContext(StudentDataContext);
};