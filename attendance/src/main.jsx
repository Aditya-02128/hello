import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { UsnProvider } from "./UsnContext";
import { CourseIDProvider } from "./CourseIDContext.jsx";
import { CourseNameProvider } from "./CourseNameContext.jsx";
import { StudentDataProvider } from "./StudentDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsnProvider>
        <CourseIDProvider>
          <CourseNameProvider>
            <StudentDataProvider>
              <App />
            </StudentDataProvider>
          </CourseNameProvider>
        </CourseIDProvider>
      </UsnProvider>
    </BrowserRouter>
  </React.StrictMode>
);
