import React, { useState, useEffect, useRef } from 'react';

const CustomMultiSelect = ({
  data,
  error,
  onSelectChange,
  selectedProductIds,
}) => {

  
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(selectedProductIds || []);

  useEffect(() => {
    if (data && data.data) {
      setOptions(
        data.data.map((product, index) => ({
          value: product._id,
          text: product.product_name,
          selected: selected.includes(product._id),
        })),
      );
    }
  }, [data, selected]);

  useEffect(() => {
    onSelectChange(selectedValues());
  }, [selected]);

  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const trigger = useRef(null);

  const open = () => {
    setShow(true);
  };

  const isOpen = () => {
    return show;
  };

  const select = (productId) => {
    const newSelected = [...selected];
    if (newSelected.includes(productId)) {
      newSelected.splice(newSelected.indexOf(productId), 1);
    } else {
      newSelected.push(productId);
    }
    setSelected(newSelected);
  };


  
  const selectedValues = () => {
    return selected.map((productId) => productId);
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownRef.current) return;
      if (
        !show ||
        dropdownRef.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setShow(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <div className="relative z-50">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        <div className="flex gap-4">
          {selected?.length > 0 ? (
            selected?.map((productId) => (
              <div
                key={productId}
                className={`my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30`}
              >
                <div className="max-w-full flex-initial">
                  {options.find((option) => option.value === productId)?.text}
                </div>
                <div className="flex flex-auto flex-row-reverse">
                  <div
                    onClick={() => select(productId)}
                    className="cursor-pointer pl-2 hover:text-danger"
                  >
                    <svg
                      className="fill-current"
                      role="button"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`my-1.5 flex items-center justify-center rounded border-[.5px] bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30 `}
            >
              <div className="max-w-full flex-initial">selected Product</div>
              <div className="flex flex-auto flex-row-reverse">
                <div
                  onClick={() => select(index)}
                  className="cursor-pointer pl-2 hover:text-danger"
                ></div>
              </div>
            </div>
          )}
        </div>
      </label>
      <div>
        <div className="flex flex-col items-center">
          <input name="values" type="hidden" defaultValue={selectedValues()} />
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div ref={trigger} onClick={open} className="w-full">
                <div
                  className={`mb-2 flex rounded border  py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    error ? 'border-red-500' : 'border-stroke'
                  }`}
                >
                  <div className="flex flex-auto flex-wrap gap-3">
                    {selected?.length === 0 && (
                      <div className="flex-1">
                        <input
                          placeholder="Select an option"
                          className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                          defaultValue={selectedValues()}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex w-8 items-center py-1 pl-1 pr-1">
                    <button
                      type="button"
                      onClick={open}
                      className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                    >
                      <svg
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
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div
                  className={`max-h-select absolute top-full left-0 z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ${
                    isOpen() ? '' : 'hidden'
                  }`}
                  ref={dropdownRef}
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                >
                  <div className="flex w-full flex-col">
                    {isOpen() &&
                      options.map((option, index) => (
                        <div key={option.value}>
                          <div
                            className={`w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark`}
                            onClick={() => select(option.value)}
                          >
                            <div
                              className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ${
                                option.selected ? 'border-primary' : ''
                              }`}
                            >
                              <div className="flex w-full items-center">
                                <div className="mx-2 leading-6">
                                  {option.text}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMultiSelect;
