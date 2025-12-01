import { useEffect, useState } from "react";

const usePageSectionValidation = (formData, setErrors, isEdit) => {
  // ✅ Field Validation Function
  const validateField = (name, value, formData) => {
    let error = "";

    switch (name) {
      case "information_name":
        if (!value?.trim()) error = "Page Title is required";
        break;

      case "path":
        if (!value?.trim()) error = "Path is required.";
        else if (!/^[a-z0-9-]+$/.test(value)) error = "Invalid Path format.";
        break;

      case "information_Description":
        if (!value?.trim()) error = "Description is required";
        break;

      default:
        break;
    }

    return error;
  };

  // ✅ Auto Remove Error on Field Change (Only if corrected)
  useEffect(() => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      let hasChanges = false;

      Object.keys(prevErrors).forEach((key) => {
        const currentValue = formData[key];
        const currentError = prevErrors[key];

        // Re-validate only if there's an error already
        if (currentError) {
          const newError = validateField(key, currentValue, formData);
          if (!newError) {
            updatedErrors[key] = "";
            hasChanges = true;
          }
        }
      });

      // Return updated errors only if something changed
      return hasChanges ? updatedErrors : prevErrors;
    });
  }, [formData, setErrors]);

  return { validateField };
};

export default usePageSectionValidation;
