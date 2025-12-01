import { useEffect } from 'react';

const useSubscriptionValidation = (formData, setErrors, isEdit) => {
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'title':
        if (typeof value !== 'string' || !value.trim()) {
          error = 'Title is required.';
        }
        break;

      case 'price':
        if (value === undefined || value === null || value === '') {
          error = 'Price is required.';
        } else if (isNaN(Number(value))) {
          error = 'Price must be a number.';
        }
        break;

      case 'eligibility':
        if (typeof value !== 'string' || !value.trim()) {
          error = 'Eligibility is required.';
        }
        break;

      case 'employeeRange.min':
        if (value === undefined || value === null || value === '') {
          error = 'Employee Range Minimum  is required.';
        } else if (isNaN(Number(value))) {
          error = 'Employee Range  must be a number.';
        }
        break;

      case 'employeeRange.max':
        if (value === undefined || value === null || value === '') {
          error = 'Employee Range Maximum is required.';
        } else if (isNaN(Number(value))) {
          error = 'Employee Range  must be a number.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Auto-remove error on change
  useEffect(() => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      Object.keys(updatedErrors).forEach((key) => {
        const value = key.includes('.')
          ? key.split('.').reduce((obj, k) => obj?.[k], formData)
          : formData[key];

        if (
          (key === 'title' && typeof value === 'string' && value.trim()) ||
          (key === 'price' &&
            value !== '' &&
            value !== null &&
            value !== undefined) ||
          (key === 'eligibility' &&
            typeof value === 'string' &&
            value.trim()) ||
          ((key === 'employeeRange.min' || key === 'employeeRange.max') &&
            typeof value === 'string' &&
            value.trim())
        ) {
          updatedErrors[key] = '';
        }
      });

      return updatedErrors;
    });
  }, [formData, setErrors, isEdit]);

  return { validateField };
};

export default useSubscriptionValidation;
