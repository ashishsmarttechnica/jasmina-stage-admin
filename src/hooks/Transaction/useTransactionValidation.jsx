import { useEffect } from "react";

const useTransactionValidation = (formData, setErrors, isEdit) => {
  // Field Validation Function
  const validateField = (name, value, formData) => {
    let error = "";

    switch (name) {
      case "transaction_id":
        if (!value?.trim()) error = "Transaction ID is required";
        break;

      case "amount":
        if (!value) error = "Amount is required";
        else if (isNaN(value) || value <= 0) error = "Amount must be a positive number";
        break;

      case "transaction_type":
        if (!value?.trim()) error = "Transaction type is required";
        break;

      case "transaction_date":
        if (!value) error = "Transaction date is required";
        break;

      case "status":
        if (!value?.trim()) error = "Status is required";
        break;

      case "description":
        if (!value?.trim()) error = "Description is required";
        break;

      default:
        break;
    }

    return error;
  };

  // Auto Remove Error on Field Change (Only if corrected)
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

export default useTransactionValidation; 