// FinalDataContext.js
"use client"
import React, { createContext, useState } from "react";

export const FinalDataContext = createContext();

export const FinalDataProvider = ({ children }) => {
  const [finalData, setFinalData] = useState(null);

  return (
    <FinalDataContext.Provider value={{ finalData, setFinalData }}>
      {children}
    </FinalDataContext.Provider>
  );
};
