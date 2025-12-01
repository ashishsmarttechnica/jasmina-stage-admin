import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { SelectPicker } from "rsuite";

const DynamicDropdown = ({
  value,
  onChange,
  options = [],
  placeholder = "Select",
}) => {
  const themeMode = useSelector((state) => state?.themeMode?.colorMode); // Get the current theme mode

  // Determine if dark mode is enabled
  const isDarkMode = themeMode === "dark";

  return (
    <SelectPicker
      value={value}
      onChange={onChange}
      data={options}
      searchable={false}
      placeholder={placeholder}
      cleanable={false}
      className="w-full xsm:w-[150px] dark:focus:border-primary dark:!border-transparent  dark:bg-form-input"
    />
  );
};

export default DynamicDropdown;
