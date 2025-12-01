import React, { useEffect, useState } from 'react';

const   StarRating = ({ value, onChange }) => {
  const [rating, setRating] = useState();

  const handleClick = (newValue) => {
    setRating(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setRating(value);
  }, [value]);

  return (
    <div className="flex items-center ">
      {[1, 2, 3, 4, 5].map((index) => {
        const isFilled = index <= rating;
        const isHalfFilled = index - 0.5 === rating - 0.5 && !isFilled;

        return (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 cursor-pointer ${
              isFilled
                ? 'text-yellow-500'
                : isHalfFilled
                ? 'text-yellow-500'
                : 'text-gray-300'
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => handleClick(isHalfFilled ? index - 0.5 : index)}
          >
            <path
              fillRule="evenodd"
              d="M10 0l2.43 6.173 6.767.624a.5.5 0 0 1 .277.883l-5.343 4.411 1.595 6.893a.5.5 0 0 1-.747.556L10 16.131l-6.975 4.01a.5.5 0 0 1-.748-.557l1.595-6.893L.52 7.68a.5.5 0 0 1 .277-.883l6.767-.624L10 0z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
