import React, { createContext, useState } from "react";

// ✅ Context created
const DefaultContext = createContext();

const DefaultProvider = ({ children }) => {
  // ✅ Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DefaultContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </DefaultContext.Provider>
  );
};

// ✅ Export both the context and the provider
export { DefaultProvider };
export default DefaultContext;
