import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SelectGroupOne = ({
  valueOf,
  data,
  onSelectChange,
  selectedServiceId,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  // const { service } = useSelector((state) => state?.service);
  // const { category } = useSelector((state) => state?.category);





  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    // Pre-select the option if selectedServiceId is provided
    if (selectedServiceId) {
      setSelectedOption(selectedServiceId);
      changeTextColor();
    }
  }, [selectedServiceId]);



  useEffect(() => {
    // Call the onSelectChange callback with selected values whenever selection changes
    onSelectChange(selectedOption);
  }, [selectedOption, onSelectChange]);

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {' '}
        Subject{' '}
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select your subject
          </option>
          {data?.data?.map((item) => (
            <option
              key={item._id}
              value={item._id}
              className="text-body dark:text-bodydark"
            >
              {valueOf == 'service' ? item.service_name : item.category_name}
            </option>
          ))}
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroupOne;
