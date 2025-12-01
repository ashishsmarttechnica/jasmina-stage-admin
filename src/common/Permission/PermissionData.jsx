import UserActive from '../../pages/User/UserActive';

export const permissionData = [
  {
    id: 1,
    text: 'Dashboard',
    icon: 'MdDashboard',
    path: '/dashboard',
    subMenuExist: false,
    actions: {
      view: {
        title: 'View Dashboard',
        description: 'This permission allows you to view the dashboard.',
      },
    },
  },

  {
    id: 3,
    text: 'Role Management',
    icon: 'IoSettings',
    mainpath: '/role-management',
    subMenuExist: true,
    subMenu: [
      {
        id: 3.1,
        text: 'Role',
        path: '/role-management',
        actions: {
          update: {
            id: 313,
            title: 'update role',
            description: 'with this permission role can update other role.',
          },
          view: {
            id: 313,
            title: 'view role',
            description: 'with this permission user can see all user.',
          },
          add: {
         id: 313,
            title: 'Create role',
            description:
              "This permission allows role to create new role's in system.",
          },
          remove: {
              id: 313,
            description: 'with this permission role can removw other role.',
            title: 'delete role',
          },
        },
      },
      {
        id: 3.2,
        text: 'Admin Management',
        path: '/admin-management',
        actions: {
          view: {
            title: 'view Admin Management',
            description: 'with this permission user can see the roles',
          },
          add: {
            title: 'add Admin Management',
            description: 'with this permission user can add role',
          },
          update: {
            title: 'update Admin Management',
            description: 'with this permission user can update role',
          },
          remove: {
            description: 'with this permission user can remove role',
            title: 'remove Admin Management',
          },
        },
      },
    ],
  },

  {
    id: 4,
    text: 'User',
    icon: 'MdPerson',
    mainpath: '/user',
    subMenuExist: true,
    subMenu: [
      {
        id: 4.1,
        text: 'User Active',
        path: '/useractive',
        actions: {
          view: {
            title: 'view  User',
            description: 'with this permission user can see all user.',
          },
          add: {
            title: 'add User',
            description: 'with this permission user can add user.',
          },
          update: {
            title: 'update User',
            description: 'with this permission user can update user.',
          },
          remove: {
            title: 'remove User',
            description: 'with this permission user can remove user.',
          },
        },
      },
      {
        id: 4.2,
        text: 'User Pending',
        path: '/userpending',
        actions: {
          view: {
            title: 'view User',
            description: 'with this permission user can see all user.',
          },
          add: {
            title: 'add User',
            description: 'with this permission user can add user.',
          },
          update: {
            title: 'update User',
            description: 'with this permission user can update user.',
          },
          remove: {
            title: 'remove User',
            description: 'with this permission user can remove user.',
          },
        },
      },
      {
        id: 4.3,
        text: 'Reported User',
        path: '/reporteduser',
        actions: {
          view: {
            title: 'view Reported User',
            description: 'with this permission user can see all user.',
          },
          add: {
            title: 'add Reported User',
            description: 'with this permission user can add reported user.',
          },
        },
      },
      {
        id: 5.21,
        text: 'User Blocked',
        path: '/userblocked',
        actions: {
          view: {
            title: 'View Blocked User',
            description: 'with this permission user can see blocked companies.',
          },
          approve: {
            title: 'unblock User',
            description: 'with this permission user can unblock User.',
          },
        },
      },
    ],
  },
  {
    id: 5,
    text: 'Company',
    icon: 'IoPeopleSharp',
    mainpath: '/company',
    subMenuExist: true,
    subMenu: [
      {
        id: 5.1,
        text: 'Company Pending',
        path: '/companypending',
        actions: {
          view: {
            title: 'view Pending Company',
            description: 'with this permission user can see all user.',
          },
          approve: {
            title: 'approve Company',
            description: 'with this permission user can approve company.',
          },
          reject: {
            title: 'reject Company',
            description: 'with this permission user can reject company.',
          },
        },
      },
      {
        id: 5.2,
        text: 'Company Approve',
        path: '/companyApprove',
        actions: {
          view: {
            title: 'view Approve Company',
            description: 'with this permission user can see all user.',
          },
          reject: {
            title: 'reject Company',
            description: 'with this permission user can reject company.',
          },
        },
      },
      {
        id: 5.21,
        text: 'Company Blocked',
        path: '/companyblocked',
        actions: {
          view: {
            title: 'view Blocked Company',
            description: 'with this permission user can see blocked companies.',
          },
          approve: {
            title: 'unblock Company',
            description: 'with this permission user can unblock company.',
          },
        },
      },
      {
        id: 5.3,
        text: 'Company Rejected',
        path: '/companyrejected',
        actions: {
          view: {
            title: 'view  Company',
            description: 'with this permission user can see the roles',
          },
          approve: {
            title: 'approve Company',
            description: 'with this permission user can approve company.',
          },
          reject: {
            title: 'reject Company',
            description: 'with this permission user can reject company.',
          },
        },
      },
      {
        id: 5.4,
        text: 'Reported Company',
        path: '/reportedcompany',
        actions: {
          view: {
            title: 'view Reported Company',
            description: 'with this permission user can see all company.',
          },
          add: {
            title: 'add Reported Company',
            description: 'with this permission user can add reported company.',
          },
        },
      },
    ],
  },
  {
    id: 6,
    text: 'Post',
    icon: 'MdPostAdd',
    mainpath: '/post',
    subMenuExist: true,
    subMenu: [
      // {
      //   id: 6.1,
      //   text: 'Pending Post',
      //   path: '/postpending',
      //   actions: {
      //     view: {
      //       title: 'view Pending Post',
      //       description: 'with this permission user can see all user.',
      //     },
      //     approve: {
      //       title: 'approve Pending Post',
      //       description: 'with this permission user can approve post.',
      //     },
      //     reject: {
      //       title: 'reject Pending Post',
      //       description: 'with this permission user can reject post.',
      //     },
      //     remove: {
      //       title: 'remove Pending Post',
      //       description: 'with this permission user can remove post.',
      //     },
      //   },
      // },
      {
        id: 6.1,
        text: 'Approve Post',
        path: '/postapprove',
        actions: {
          view: {
            title: 'view Approve Post ',
            description: 'with this permission user can see all user.',
          },

          reject: {
            title: 'reject Post',
            description: 'with this permission user can reject post.',
          },
        },
      },
      {
        id: 6.2,
        text: 'Reject Post',
        path: '/postrejected',
        actions: {
          view: {
            title: 'view Rejected Post',
            description: 'with this permission user can see the roles',
          },
          approve: {
            title: 'approve Rejected Post',
            description: 'with this permission user can approve post.',
          },
          reject: {
            title: 'reject Rejected Post',
            description: 'with this permission user can reject post.',
          },
        },
      },
      {
        id: 6.3,
        text: 'Reported Post',
        path: '/postreported',
        actions: {
          view: {
            title: 'view Reported Post',
            description: 'with this permission user can see the roles',
          },
        },
      },
    ],
  },
  {
    id: 7,
    text: 'Job',
    icon: 'MdSettings',
    path: '/job',
    subMenuExist: false,
    actions: {
      view: {
        title: 'view job',
        description: 'with this permission user can see all user.',
      },
      add: {
        title: 'add job',
        description: 'with this permission user can add role',
      },
      update: {
        title: 'update job',
        description: 'with this permission user can update role',
      },
      remove: {
        description: 'with this permission user can remove role',
        title: 'remove job',
      },
    },
  },
  {
    id: 8,
    text: 'Subscription',
    icon: 'MdSettings',
    path: '/subscription',
    subMenuExist: false,
    actions: {
      view: {
        title: 'view subscription',
        description: 'with this permission user can see all user.',
      },
      add: {
        title: 'add subscription',
        description: 'with this permission user can add role',
      },
      update: {
        title: 'update subscription',
        description: 'with this permission user can update role',
      },
      remove: {
        description: 'with this permission user can remove role',
        title: 'remove subscription',
      },
    },
  },
  {
    id: 9,
    text: 'Countries',
    icon: 'MdReport',
    path: '/country',
    subMenuExist: false,
    actions: {
      view: {
        title: 'view Countrie',
        description: 'with this permission user can see all user.',
      },
      remove: {
        title: 'remove Countrie',
        description: 'with this permission user can remove Countrie.',
      },
      add: {
        title: 'add Countrie',
        description: 'with this permission user can add Countrie.',
      },
      update: {
        title: 'update Countrie',
        description: 'with this permission user can update Countrie.',
      },
    },
  },
  {
    id: 10,
    text: 'Pages',
    icon: 'MdReport',
    path: '/PageSection',
    subMenuExist: false,
    actions: {
      view: {
        title: 'view pages',
        description: 'with this permission user can see all user.',
      },
      remove: {
        title: 'remove pages',
        description: 'with this permission user can remove pages.',
      },
      add: {
        title: 'add pages',
        description: 'with this permission user can add pages.',
      },
      edit: {
        title: 'edit pages',
        description: 'with this permission user can edit pages.',
      },
    },
  },
  {
    id: 11,
    text: 'Transaction',
    icon: 'MdReport',
    path: '/transaction',
    subMenuExist: false,
    actions: {
      view: {
        title: 'view transaction',
        description: 'with this permission user can see all user.',
      },
      remove: {
        title: 'remove transaction',
        description: 'with this permission user can remove transaction.',
      },
      add: {
        title: 'add transaction',
        description: 'with this permission user can add transaction.',
      },
      update: {
        title: 'update transaction',
        description: 'with this permission user can update transaction.',
      },
    },
  },

  {
    id: 12,
    text: 'Plan Request',
    icon: 'MdReport',
    mainpath: '/planrequest',
    subMenuExist: true,
    subMenu: [
      {
        id: 12.1,
        text: 'Pending Requests',
        path: '/planrequest/pending',
        actions: {
          view: {
            title: 'View Pending Plan Requests',
            description: 'Permission to view pending plan change requests',
          },
          approve: {
            title: 'Approve Plan Requests',
            description: 'Permission to approve plan change requests',
          },
          reject: {
            title: 'Reject Plan Requests',
            description: 'Permission to reject plan change requests',
          },
        },
      },
      {
        id: 12.2,
        text: 'Approved Requests',
        path: '/planrequest/approved',
        actions: {
          view: {
            title: 'View Approved Plan Requests',
            description: 'Permission to view approved plan change requests',
          },
          // reject: {
          //   title: 'Reject Approved Requests',
          //   description: 'Permission to reject previously approved requests',
          // },
        },
      },
      {
        id: 12.3,
        text: 'Rejected Requests',
        path: '/planrequest/rejected',
        actions: {
          view: {
            title: 'View Rejected Plan Requests',
            description: 'Permission to view rejected plan change requests',
          },
          // approve: {
          //   title: 'Approve Rejected Requests',
          //   description: 'Permission to approve previously rejected requests',
          // },
          reject: {
            title: 'Reject Rejected Requests',
            description: 'Permission to reject previously rejected requests',
          },  
        },

      },
    ],
  },
  {
    id: 13,
    text: 'Settings',
    icon: 'MdSettings',
    path: '/settings',
    subMenuExist: false,
    actions: {
      view: {
        title: 'view settings',
        description: 'Permission to view global settings.',
      },
      update: {
        title: 'update settings',
        description: 'Permission to update global settings.',
      },
    },
  },
  {
    id: 14,
    text: 'Contact Us',
    icon: 'IoPeopleSharp',
    path: '/Contact',
    subMenuExist: false,
    actions: {
      view: {
        title: 'view Contact',
        description: 'Permission to view Contacts.',
      },
      remove: {
        title: 'remove Contact',
        description: 'with this permission user can remove Contacts.',
      },
    },
  },
  {
    id: 15,
    text: 'Testimonial',
    icon: 'MdPerson',
    path: '/testimonial',
    subMenuExist: false,
    actions: {
      view: {
        title: 'view Testimonial',
        description: 'with this permission user can view Testimonial.',
      },
      add: {
        title: 'add Testimonial',
        description: 'with this permission user can add Testimonial.',
      },
      update: {
        title: 'update Testimonial',
        description: 'with this permission user can update Testimonial.',
      },
      remove: {
        title: 'remove Testimonial',
        description: 'with this permission user can remove Testimonial.',
      },
    },
  }
];
//
export const pageIds = {
  dashboard: 1,
  RoleManagement: {
    id: 3,
    Role: 3.1,
    AdminManagement: 3.2,
  },
  User: {
    id: 4,
    UserActive: 4.1,
    Userpending: 4.2,
    ReportedUser: 4.3,
  },
  CompanyManagement: {
    id: 5,
    CompanyPending: 5.1,
    CompanyApprove: 5.2,
    CompanyBlocked: 5.21,
    CompanyRejected: 5.3,
    ReportedCompany: 5.4,
  },
  Post: {
    id: 6,
    // PostPending: 6.,
    PostApprove: 6.1,
    PostRejected: 6.2,
    PostReported: 6.3,
  },
  Job: 7,
  Subscription: 8,
  Country: 9,
  PageSection: 10,
  Transaction: 11,
  PlanRequestManagement: {
    id: 12,
    PlanRequestPending: 12.1,
    PlanRequestApprove: 12.2,
    PlanRequestRejected: 12.3,
  },
  Settings: 13,
  Contacts: 14,
  Testimonial: 15,
};
export const getCurrentPagePermission = (permission, pageId, childId) => {
  // console.log(childId, 'permission');

  const data = permission.find((item) => item.id === pageId);
  // console.log(data, 'data');
  // console.log(childId, '12354567578');

  if (data?.subMenuExist) {
    const subMenuItem = data.subMenu.find((item) => item.id === childId);
    // console.log(subMenuItem, 'subMenuItem');
    return subMenuItem?.actions || {}; // safe return
  } else {
    return data?.actions || {};
  }
};

// export const getCurrentPagePermission = (permission, pageId, childId) => {
//   console.log("Permissions received:", permission);
//   console.log("Page ID:", pageId, "Child ID:", childId);

//   if (!permission || !Array.isArray(permission) || permission.length === 0) {
//     console.warn("Permission data is missing or empty.");
//     return [];
//   }

//   const data = permission.find((item) => item.id === pageId);

//   if (!data) {
//     console.warn(`No permission found for pageId: ${pageId}`);
//     return [];
//   }

//   if (data?.subMenuExist) {
//     const subItem = data.subMenu?.find((item) => item.id === childId);
//     if (!subItem) {
//       console.warn(`No sub-permission found for childId: ${childId}`);
//       return [];
//     }
//     return subItem.actions || [];
//   } else {
//     return data.actions || [];
//   }
// };

// export const getCurrentPagePermission = (permission, pageId, childId) => {
//   console.log("Permissions received:", permission);
//   console.log("Page ID:", pageId, "Child ID:", childId);

//   if (!permission || !Array.isArray(permission) || permission.length === 0) {
//     console.warn("Permission data is missing or empty.");
//     return [];
//   }

//   const data = permission.find((item) => item.id === pageId);

//   if (!data) {
//     console.warn(`No permission found for pageId: ${pageId}`);
//     return [];
//   }

//   if (data?.subMenuExist) {
//     const subItem = data.subMenu?.find((item) => item.id === childId);
//     if (!subItem) {
//       console.warn(`No sub-permission found for childId: ${childId}`);
//       return [];
//     }
//     return subItem.actions || [];
//   } else {
//     return data.actions || [];
//   }
// };

function convertValuesToTrue(data) {
  function updateValues(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(updateValues); // If array, loop through each item
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => {
        if (key === 'value' && typeof obj[key] === 'boolean') {
          obj[key] = true;
        } else {
          updateValues(obj[key]);
        }
      });
    }
  }

  const clonedData = JSON.parse(JSON.stringify(data));
  updateValues(clonedData);

  return JSON.stringify(clonedData, null, 2);
}
