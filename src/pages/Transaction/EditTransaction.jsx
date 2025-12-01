import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "rsuite";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../../utils/utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UpdateTransaction } from "../../redux/actions/TransactionAction";

const EditTransaction = () => {
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const data = location.state;
  const transactionId = data._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    transaction_title: data?.transaction_title || "",
    amount: data?.amount || "",
    transaction_type: data?.transaction_type || "credit",
    description: data?.description || "",
    status: data?.status || 0,
  });

  const validateForm = () => {
    const errors = {};
    const amountRegex = /^\d+(\.\d{1,2})?$/;

    if (!formData.transaction_title)
      errors.transaction_title = "Transaction Title is required.";
    if (!formData.amount) {
      errors.amount = "Amount is required.";
    } else if (!amountRegex.test(formData.amount)) {
      errors.amount = "Please enter a valid amount (e.g., 100.00)";
    }
    if (!formData.description)
      errors.description = "Description is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

        dispatch(UpdateTransaction(transactionId, formData)).then((res) => {
      if (res.success) {
        setLoader(false);
        toast.success("Transaction updated successfully!");
        navigate("/Transaction");
      } else {
        setLoader(false);
        toast.error(res.message);
      }
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Transaction" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow mb-2">
        <header className="flex justify-between items-center px-2">
          <h2 className="font-semibold text-slate-800 dark:text-white"></h2>
          <Button variant="contained" onClick={() => navigate("/Transaction")}>
            View All Transactions
          </Button>
        </header>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form
          action="#"
          className="edit-transaction-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="p-6.5">
            <div className="grid grid-cols-2 gap-10">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Transaction Title<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="transaction_title"
                  required
                  placeholder="Enter Transaction Title"
                  value={formData.transaction_title}
                  onChange={(val) =>
                    setFormData({ ...formData, transaction_title: val })
                  }
                  className="w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.transaction_title && (
                  <span className="text-red-500">
                    {errors.transaction_title}
                  </span>
                )}
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Amount<span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  id="amount"
                  required
                  placeholder="Enter Amount"
                  value={formData.amount}
                  onChange={(val) =>
                    setFormData({ ...formData, amount: val })
                  }
                  className="w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.amount && (
                  <span className="text-red-500">{errors.amount}</span>
                )}
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Transaction Type
              </label>
              <div className="flex gap-5">
                <label>
                  <input
                    type="radio"
                    name="transaction_type"
                    checked={formData.transaction_type === "credit"}
                    onChange={() =>
                      setFormData({ ...formData, transaction_type: "credit" })
                    }
                  />
                  <span className="ml-2 text-black dark:text-white">
                    Credit
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="transaction_type"
                    checked={formData.transaction_type === "debit"}
                    onChange={() =>
                      setFormData({ ...formData, transaction_type: "debit" })
                    }
                  />
                  <span className="ml-2 text-black dark:text-white">
                    Debit
                  </span>
                </label>
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
                    checked={formData.status === 0}
                    onChange={() =>
                      setFormData({ ...formData, status: 0 })
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
                    checked={formData.status === 1}
                    onChange={() =>
                      setFormData({ ...formData, status: 1 })
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
                    value={formData.description}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
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
                  Update
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditTransaction; 