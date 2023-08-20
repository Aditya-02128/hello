import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const CourseIDContext = createContext();

export const CourseIDProvider = ({ children }) => {
  const [CourseID, setCourseID] = useState("");

  return (
    <CourseIDContext.Provider value={{ CourseID, setCourseID }}>
      {children}
    </CourseIDContext.Provider>
  );
};

// Prop type validation for the children prop
CourseIDProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCourseIDContext = () => {
  return useContext(CourseIDContext);
};