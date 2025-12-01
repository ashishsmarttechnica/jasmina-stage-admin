import React, { useState, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "rsuite";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Capitalized, formats, modules } from "../../utils/utils";
import { updatePage } from "../../redux/actions/PageSectionAction";
// import { updatePage } from "../../redux/actions/pageAction";

const PageSectionForm = () => {
  const location = useLocation(); // Retrieve existing page data
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageRecord = location.state; // Expecting the page data passed via state

  const [pageData, setPageData] = useState({
    page_title: pageRecord.page_title,
    path: pageRecord.path,
    description: pageRecord.description,
    status: pageRecord.status,
    language: pageRecord.language || "en",
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const validateForm = () => {
    const errors = {};
    const pathRegex = /^[a-z0-9-]+$/; // Only allows lowercase letters, numbers, and dashes

    if (!pageData.page_title)
      errors.page_title = "Page Title is required.";
    if (!pageData.path) {
      errors.path = "Path is required.";
    } else if (!pathRegex.test(pageData.path)) {
      errors.path =
        "Path can only contain lowercase letters, numbers, and dashes (-).";
    }
    if (!pageData.description)
      errors.description = "Description is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

    const formattedName = Capitalized(pageData.page_title);
    const fdata = {
      ...pageData,
      formattedName,
    };
    dispatch(updatePage(pageRecord._id, fdata)).then((res) => {
      if (res.success) {
        setLoader(false);
        toast.success("Page updated successfully!");
        navigate("/PageSection");
      } else {
        setLoader(false);
        toast.error(res.message);
      }
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Page" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button variant="contained" onClick={() => navigate("/PageSection")}>
            View All Pages
          </Button>
        </header>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form
          action="#"
          className="edit-page-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="p-6.5">
            <div className="grid grid-cols-2 gap-10">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Page Title<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="page_title"
                  required
                  placeholder="Enter Page Title"
                  value={pageData.page_title}
                  onChange={(val) =>
                    setPageData({ ...pageData, page_title: val })
                  }
                  className="w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.page_title && (
                  <span className="text-red-500">
                    {errors.page_title}
                  </span>
                )}
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Path<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="path"
                  required
                  placeholder="Enter Path"
                  value={pageData.path}
                  onChange={(val) => {
                    const sanitizedValue = val.replace(/[^a-z0-9-]/g, "");
                    setPageData({ ...pageData, path: sanitizedValue });
                  }}
                  className="w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.path && (
                  <span className="text-red-500">{errors.path}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-10">
         
         <div className="mb-4.5">
             <label className="mb-2.5 block text-black dark:text-white">
               Language
             </label>
             <div className="relative z-20 bg-transparent dark:bg-form-input">
               <select
                 value={pageData.language}
                 onChange={(e) =>
                   setPageData({ ...pageData, language: e.target.value })
                 }
                 className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
               >
                 <option value="en">English</option>
                 <option value="de">German</option>
                 <option value="fr">French</option>
                 <option value="ar">Arabic</option>
               </select>
               <span className="absolute dark:text-white text-gray-200 top-1/2 right-4 z-30 -translate-y-1/2">
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
         </div>
        
            <div className="mb-4.5">
              <label
                htmlFor="status"
                className="mb-2.5 block text-black dark:text-white"
              >
                Status
              </label>
              <div className="flex gap-5">
                <label>
                  <input
                    type="radio"
                    name="status"
                    checked={pageData.status}
                    onChange={() =>
                      setPageData({ ...pageData, status: true })
                    }
                  />
                  <span className="ml-2 text-black dark:text-white">
                    Active
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    checked={!pageData.status}
                    onChange={() =>
                      setPageData({ ...pageData, status: false })
                    }
                  />
                  <span className="ml-2 text-black dark:text-white">
                    Inactive
                  </span>
                </label>
              </div>
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <div className="relative">
                <div className="mb-12 h-[160px]">
                  <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={pageData.description}
                    onChange={(value) =>
                      setPageData({
                        ...pageData,
                        description: value,
                      })
                    }
                    theme="snow"
                    className="dark:bg-boxdark dark:text-white h-full"
                  />
                </div>
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              {loader ? (
                <Button variant="contained" type="button" disabled>
                  Loading...
                </Button>
              ) : (
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default PageSectionForm;
