import { useEffect } from 'react';

const useCountryValidation = (formData, setErrors, isEdit) => {
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'country':
        if (typeof value !== 'string' || !value.trim()) {
          error = 'Country name is required.';
        }
        break;

      case 'isLGBTQ':
        if (typeof value !== 'boolean') {
          error = 'LGBTQ status must be a boolean value.';
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
        const value = formData[key];

        if (
          (key === 'country' && typeof value === 'string' && value.trim()) ||
          (key === 'isLGBTQ' && typeof value === 'boolean')
        ) {
          updatedErrors[key] = '';
        }
      });

      return updatedErrors;
    });
  }, [formData, setErrors, isEdit]);

  return { validateField };
};

export default useCountryValidation;
