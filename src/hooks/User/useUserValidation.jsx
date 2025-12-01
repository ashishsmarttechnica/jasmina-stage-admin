import { useEffect, useState } from "react";

const useUserValidation = (formData, setErrors, isEdit) => {
  // ✅ Field Validation Function
  const validateField = (name, value, formData) => {
    let error = "";




    switch (name) {
      case "first_name":
        if (!value?.trim()) {
          error = "First name is required.";
        } else if (value.trim().length < 2) {
          error = "First name must be at least 2 characters.";
        }
        break;

      case "last_name":
        if (!value?.trim()) {
          error = "Last name is required.";
        } else if (value.trim().length < 2) {
          error = "Last name must be at least 2 characters.";
        }
        break;

      case "email":
        if (!value?.trim()) {
          error = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format.";
        }
        break;

        case "notes":
        if (formData.isBlocked && !value?.trim()) {
          error = "Notes is required.";
        }
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
            // Field is updated with a non-empty string value
            (typeof formData[key] === "string" && formData[key]?.trim()) ||
            // Email format validation
            (key === "email" && formData[key]?.trim() && /\S+@\S+\.\S+/.test(formData[key])) ||
            // Check if first_name and last_name are non-empty
            ((key === "first_name" || key === "last_name") && formData[key]?.trim())
          ) {
            updatedErrors[key] = ""; // Clear error if valid
          }
        }
      });

      return updatedErrors;
    });
  }, [formData, setErrors]);

  return { validateField };
};

export default useUserValidation;
