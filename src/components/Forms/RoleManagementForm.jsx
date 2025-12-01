import { Button } from "@mui/material";
import React from "react";
import { Input } from "rsuite";
import PermissionForm from "./PermissionForm";

const RoleManagementForm = ({
  permission,
  setPermission,
  formData,
  setFormData,
  onSubmit,
  isLoading,
  errors,
  setErrors,
}) => {
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
        <div className="col-span-5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Role Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Role Name "
              value={formData.role}
              onChange={(val) => setFormData({ ...formData, role: val })}
              className="w-full rounded py-3 px-5 dark:bg-boxdark dark:text-white"
            />
            {errors?.role && (
              <span className="text-red-500 ml-1 text-sm">{errors.role}</span>
            )}
          </div>
        </div>
      </div>
      <div className="p-3 px-5">
        <PermissionForm permission={permission} setPermission={setPermission} />
      </div>
      <div className="flex justify-center my-4.5">
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default RoleManagementForm;
