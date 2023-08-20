import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const CourseNameContext = createContext();

export const CourseNameProvider = ({ children }) => {
  const [CourseName, setCourseName] = useState("");

  return (
    <CourseNameContext.Provider value={{ CourseName, setCourseName }}>
      {children}
    </CourseNameContext.Provider>
  );
};

// Prop type validation for the children prop
CourseNameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCourseNameContext = () => {
  return useContext(CourseNameContext);
};