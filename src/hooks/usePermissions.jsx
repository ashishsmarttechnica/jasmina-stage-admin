import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentPagePermission,
  permissionData,
} from "../common/Permission/PermissionData";
import { SuperpermissionData } from "../common/Permission/SuperAdminPermissionData";

/**
 * Custom hook to handle permissions for a given page.
 */
const usePermissions = (pageId, childId) => {

  const [permissions, setPermissions] = useState({});
  // console.log(permissions, 'permissions7878878');
  
  const adminData = useSelector((state) => state.loginUser);
  // console.log(adminData, 'adminData');
  
  const role = adminData?.user?.role?.role;
  console.log(childId, 'role');
  

  // Adding a safe check for permissions
  useEffect(() => {
    if (role == "Superadmin") {
      // Use the static permissions for superadmin
      const updatedPermissions = getCurrentPagePermission(
        SuperpermissionData,
        pageId,
        childId
      );
      
      setPermissions(updatedPermissions || {});
      console.log(updatedPermissions, 'updatedPermissions');
    } else if (
      adminData?.user?.role?.permission &&
      Array.isArray(adminData?.user?.role?.permission)
    ) {
      // Use the admin's permissions if role is not superadmin
      const updatedPermissions = getCurrentPagePermission(
        adminData.user.role.permission,
        pageId,
        childId
      );

      setPermissions(updatedPermissions || {});
    } else {
      // Fallback: Set permissions to an empty object if no permissions are found
      setPermissions({});
    }
  }, [adminData, role, pageId,childId]);

  return permissions;
};

export default usePermissions;
