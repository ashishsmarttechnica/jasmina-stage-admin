import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input, InputGroup, SelectPicker } from "rsuite";
import { getAllRoles } from "../../redux/actions/RoleAction";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AdminManagementForm = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  errors,
  isEdit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const roledata = useSelector((state) => state?.roleDetails.data);
  const roledataLoading = useSelector((state) => state?.roleDetails.loading);
  const dispatch = useDispatch();
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  useEffect(() => {
    dispatch(getAllRoles("", 0));
  }, []);

  useEffect(() => {
    if (formData.role && typeof formData.role === "string") {
      // Agar role ek string (_id) hai to pura object find karke set karo
      const selectedRole = roledata?.data?.find(
        ({ _id }) => _id === formData.role
      );
      if (selectedRole) {
        setFormData((prev) => ({
          ...prev,
          role: selectedRole._id,
          permissions: selectedRole?.permission,
        }));
      }
    }
  }, [roledata]);

  return (
    <form
      className="edit-user-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      noValidate
    >
      <div className="lg:grid grid-cols-12 gap-x-10 p-3 px-5">
        {/* Admin Name */}
        {/* <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Admin Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              className="w-full text-base rounded  dark:bg-boxdark dark:text-white"
            />
            {errors?.name && (
              <span className="text-red-500 ml-1 text-sm">{errors.name}</span>
            )}
          </div>
        </div> */}

        {/* Email */}
        <div className="col-span-6">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(val) => setFormData({ ...formData, email: val })}
              className="w-full text-base rounded  dark:bg-boxdark dark:text-white"
            />
            {errors?.email && (
              <span className="text-red-500 ml-1 text-sm">{errors.email}</span>
            )}
          </div>
        </div>

        {!isEdit && (
          <>
            {/* Password */}
            <div className="col-span-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Password <span className="text-red-500">*</span>
              </label>
              <InputGroup
                inside
                className="w-full text-base rounded  dark:bg-boxdark dark:text-white"
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(val) =>
                    setFormData({ ...formData, password: val })
                  }
                  className="w-full text-base"
                />
                <div
                  onClick={togglePassword}
                  className="flex cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 "
                >
                  {showPassword ? (
                    <FaEye size={22} />
                  ) : (
                    <FaEyeSlash size={22} />
                  )}
                </div>
              </InputGroup>
              {errors?.password && (
                <span className="text-red-500 ml-1 text-sm">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="col-span-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <InputGroup
                inside
                className="w-full text-base rounded  dark:bg-boxdark dark:text-white"
              >
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(val) =>
                    setFormData({ ...formData, confirmPassword: val })
                  }
                  className="w-full text-base"
                />
                <div
                  onClick={toggleConfirmPassword}
                  className="flex cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 "
                >
                  {showConfirmPassword ? (
                    <FaEye size={22} />
                  ) : (
                    <FaEyeSlash size={22} />
                  )}
                </div>
              </InputGroup>
              {errors?.confirmPassword && (
                <span className="text-red-500 ml-1 text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </>
        )}

        {/* Role Selector */}
        <div className={`col-span-6 ${!isEdit && "mt-4"} `}>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Role <span className="text-red-500">*</span>
            </label>
            {roledata?.data && (
              <SelectPicker
                data={roledata?.data?.map(({ role, _id }) => ({
                  label: role,
                  value: _id,
                }))}
                loading={roledataLoading}
                value={formData.role}
                onChange={(val) => {
                  const selectedRole = roledata?.data?.find(
                    ({ _id }) => _id === val
                  );
                  setFormData({
                    ...formData,
                    role: selectedRole._id,
                    permissions: selectedRole?.permission,
                  });
                }}
                cleanable={false}
                className="w-full text-base rounded  dark:bg-boxdark dark:text-white"
                placeholder="Select Role"
              />
            )}

            {errors?.role && (
              <span className="text-red-500 ml-1 text-sm">{errors.role}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center my-4.5">
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AdminManagementForm;
