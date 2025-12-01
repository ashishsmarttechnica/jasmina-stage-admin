import React, { useState } from 'react';
import { permissionData } from '../../common/Permission/PermissionData';

const PermissionForm = ({ permission, setPermission }) => {
  // console.log(permission, 'permission');
  
  const [activeTab, setActiveTab] = useState(1);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleCheck = (action, data, parentData) => {
    let currentData; // exists in array or not
    let hasParent = false; // parent data or not

    if (parentData) {
      currentData = permission.find((res) => res.id === parentData.id);
      hasParent = true;
    } else {
      currentData = permission.find((res) => res.id === data.id);
      hasParent = false;
    }
    if (hasParent) {
      if (currentData) {
        const childExist = currentData?.subMenu?.some(
          (res) => res.id === data.id,
        );  
        if (childExist) {
          // parent & child are exist in array
          const updatedArray = permission.map((val) => {
            if (val.id === parentData.id) {
              const updatedSubmenu = val?.subMenu?.map((res) => {
                if (res.id === data.id) {
                  const updatedActions = {
                    ...res?.actions,
                    [action]: {
                      ...data?.actions[action],
                      value: res?.actions[action]
                        ? !res?.actions[action].value
                        : !data?.actions[action].value,
                    },
                  };
                  const allFalse = Object.values(updatedActions).every(
                    (action) => action.value === false,
                  );
                  return allFalse ? null : { ...res, actions: updatedActions };
                }
                return res;
              });
              const finalUpdatedSubmenu = updatedSubmenu.filter(
                (res) => res !== null,
              );
              return finalUpdatedSubmenu.length !== 0
                ? { ...val, subMenu: finalUpdatedSubmenu }
                : null;
            }
            return val;
          });
          const finalUpdatedArray = updatedArray.filter((res) => res !== null);
          setPermission(finalUpdatedArray);
        } else {
          // parent is exist but child is not exist in array
          const currentData = parentData?.subMenu?.map((res) => {
            if (res?.id === data?.id) {
              const updatedAcction = {
                ...res?.actions,
                [action]: {
                  ...res?.actions[action],
                  value: !res?.actions[action].value,
                },
              };
              return { ...res, actions: updatedAcction };
            }
            return res;
          });
          const currentSubMenu = currentData?.find((res) => res?.id === data?.id);
          const updatedArray = permission?.map((val) => {
            if (val?.id === parentData?.id) {
              return { ...val, subMenu: [...val?.subMenu, currentSubMenu] };
            }
            return val;
          });
          setPermission(updatedArray);
        }
      } else {
        const currentData = parentData?.subMenu?.map((res) => {
          if (res?.id === data?.id) {
            const updatedAcction = {
              ...res?.actions,
              [action]: {
                ...res?.actions[action],
                value: !res?.actions[action].value,
              },
            };
            return { ...res, actions: updatedAcction };
          }
          return res;
        });
        const currentSubMenu = currentData?.find((res) => res?.id === data?.id);
        setPermission([
          ...permission,
          { ...parentData, subMenu: [currentSubMenu] },
        ]);
      }
    } else {
      if (currentData) {
        const updatedData = {
          ...currentData,
          actions: {
            ...currentData?.actions,
            [action]: {
              ...data?.actions[action],
              value: currentData?.actions[action]
                ? !currentData?.actions[action].value
                : false,
            },
          },
        };
        const allFalse = Object.values(updatedData.actions).every(
          (action) => action.value === false,
        );
        if (allFalse) {
          const updatedArray = permission?.filter((val) => val?.id !== data?.id);
          setPermission(updatedArray);
        } else {
          const updatedArray = permission.map((val) =>
            val?.id === data?.id ? updatedData : val,
          );
          setPermission(updatedArray);
        }
      } else {
        const updatedData = {
          ...data,
          actions: {
                ...data?.actions,
            [action]: {
              ...data?.actions[action],
              value: !data?.actions[action].value,
            },
          },
        };
        setPermission([...permission, updatedData]);
      }
    }
  };

  return (
    <>

    <label className="text-lg font-semibold mb-3">Role Permission</label>
<div className="flex md:flex-row flex-col gap-4 max-w-6xl mt-5">
  <ul className="min-w-[250px] h-96 overflow-y-auto bg-slate-100 dark:bg-neutral-900 py-5 px-3 rounded-lg shadow-md">
    {permissionData.map((res) =>
      res.subMenuExist ? (
        res.subMenu.map((val) => (
          <li key={val.id}>
            <button
              type="button"
              className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
                activeTab === val.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-neutral-700'
              }`}
              onClick={() => toggle(val.id)}
            >
              {val.text}
            </button>
          </li>
        ))
      ) : (
        <li key={res.id}>
          <button
            type="button"   
            className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
              activeTab === res.id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200 dark:hover:bg-neutral-700'
            }`}
            onClick={() => toggle(res.id)}
          >
            {res.text}
          </button>
        </li>
      ),
    )}
  </ul>

  <div className="md:w-2/3 h-96 overflow-y-auto border border-slate-200 dark:border-neutral-700 shadow-sm rounded-lg p-5 bg-white dark:bg-neutral-800">
    {permissionData.map((res) =>
      res.subMenuExist
        ? res.subMenu.map(
            (val) =>
              activeTab === val.id && (
                <div key={val.id}>
                  {Object.keys(val.actions).map((key) => {
                    const isChecked =
                      permission
                        ?.find((p) => p.id === res.id)
                        ?.subMenu?.find((s) => s.id === val.id)
                        ?.actions[key]?.value || false;

                    return (
                      <div
                        key={key}
                        className={`flex items-center gap-3 mb-3 p-3 rounded-md transition-all ${
                          isChecked
                            ? 'bg-blue-50 ring-2 ring-blue-400'
                            : 'bg-gray-50 dark:bg-neutral-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          id={val.actions[key].title}
                          className="w-4 h-4 accent-blue-500"
                          checked={isChecked}
                          onChange={() => handleCheck(key, val, res)}
                        />
                        <label
                          htmlFor={val.actions[key].title}
                          className="text-sm font-medium text-gray-700 dark:text-white"
                        >
                          {val.actions[key].title}
                        </label>
                      </div>
                    );
                  })}
                </div>
              ),
          )
        : activeTab === res.id && (
            <div key={res.id}>
              {Object.keys(res.actions).map((key) => {
                const isChecked =
                  permission?.find((p) => p.id === res.id)?.actions[key]
                    ?.value || false;

                return (
                  <div
                    key={key}
                    className={`flex items-center gap-3 mb-3 p-3 rounded-md transition-all ${
                      isChecked
                        ? 'bg-blue-50 ring-2 ring-blue-400'
                        : 'bg-gray-50 dark:bg-neutral-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={res.actions[key].title}
                      className="w-4 h-4 accent-blue-500"
                      checked={isChecked}
                      onChange={() => handleCheck(key, res)}
                    />
                    <label
                      htmlFor={res.actions[key].title}
                      className="text-sm font-medium text-gray-700 dark:text-white"
                    >
                      {res.actions[key].title}
                    </label>
                  </div>
                );
              })}
            </div>
          ),
    )}
  </div>
</div>

    </>
  );
};

export default PermissionForm;
