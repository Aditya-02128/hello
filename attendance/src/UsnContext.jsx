import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const UsnContext = createContext();

export const UsnProvider = ({ children }) => {
  const [usn, setUsn] = useState("");

  return (
    <UsnContext.Provider value={{ usn, setUsn }}>
      {children}
    </UsnContext.Provider>
  );
};

// Prop type validation for the children prop
UsnProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsnContext = () => {
  return useContext(UsnContext);
};
