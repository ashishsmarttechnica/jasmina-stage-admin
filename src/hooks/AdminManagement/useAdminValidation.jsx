import { useEffect, useState } from "react";

const useAdminValidation = (formData, setErrors, isEdit) => {
  // ✅ Field Validation Function
  const validateField = (name, value, formData) => {
    let error = "";

    switch (name) {
      // case "name":
      //   if (!value?.trim()) error = "Name is required.";
      //   break;

      case "email":
        if (!value?.trim()) error = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format.";
        break;

      case "password":
        if (!isEdit && !value) {
          error = "Password is required."; // Create mode: Required field
        } else if (value && value.length < 4) {
          error = "Password must be at least 4 characters.";
        }
        break;

      case "confirmPassword":
        if (!isEdit && !value) {
          error = "Confirm Password is required."; // Create mode: Required field
        } else if (value && value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;

      case "role":
        if (!value?.trim()) error = "Role is required.";
        break;

      default:
        break;
    }

    return error;
  };

  // ✅ Auto Remove Error on Change
  useEffect(() => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      Object.keys(updatedErrors).forEach((key) => {
        if (updatedErrors[key]) {
          if (
            (typeof formData[key] === "string" && formData[key]?.trim()) || // Text fields
            (key === "password" &&
              (!isEdit || (isEdit && formData.password.length >= 4))) || // Password optional in edit
            (key === "confirmPassword" &&
              formData.confirmPassword === formData.password) || // Confirm Password match
            (key === "role" && formData.role?.trim()) // Role check
          ) {
            updatedErrors[key] = "";
          }
        }
      });

      return updatedErrors;
    });
  }, [formData, setErrors]);

  return { validateField };
};

export default useAdminValidation;
