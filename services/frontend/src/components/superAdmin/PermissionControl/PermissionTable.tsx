import "./PermissionTable.css";
import { useState } from "react";

type PermissionKey = "view" | "create" | "edit" | "delete";

type ModulePermission = {
  module: string;
  permissions: Record<PermissionKey, boolean>;
};

const initialData: ModulePermission[] = [
  {
    module: "Users",
    permissions: { view: true, create: false, edit: false, delete: false },
  },
  {
    module: "Courses",
    permissions: { view: true, create: false, edit: true, delete: true },
  },
  {
    module: "Payments",
    permissions: { view: true, create: false, edit: false, delete: false },
  },
  {
    module: "Reports",
    permissions: { view: true, create: true, edit: false, delete: false },
  },
  {
    module: "Support",
    permissions: { view: true, create: false, edit: false, delete: false },
  },
];

const permissionKeys: PermissionKey[] = ["view", "create", "edit", "delete"];

const PermissionsTable = () => {
  const [data, setData] = useState<ModulePermission[]>(initialData);

  const togglePermission = (index: number, key: PermissionKey) => {
    const updated = [...data];
    updated[index].permissions[key] = !updated[index].permissions[key];
    setData(updated);
  };

  const toggleAll = (index: number) => {
    const updated = [...data];
    const allEnabled = permissionKeys.every(
      (key) => updated[index].permissions[key]
    );

    permissionKeys.forEach((key) => {
      updated[index].permissions[key] = !allEnabled;
    });

    setData(updated);
  };

  return (
    <div className="permissions-table">
      {/* Header */}
      <div className="permissions-row header">
        <span className="module-col">MODULE</span>
        {permissionKeys.map((key) => (
          <span key={key}>{key.toUpperCase()}</span>
        ))}
        <span>ALL</span>
      </div>

      {/* Rows */}
      {data.map((item, index) => {
        const isAllChecked = permissionKeys.every(
          (key) => item.permissions[key]
        );

        return (
          <div key={item.module} className="permissions-row">
            <span className="module-col">{item.module}</span>

            {permissionKeys.map((key) => (
              <label key={key} className="custom-check">
                <input
                  type="checkbox"
                  checked={item.permissions[key]}
                  onChange={() => togglePermission(index, key)}
                />
                <span className="checkmark" />
              </label>
            ))}

            <label className="custom-check">
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={() => toggleAll(index)}
              />
              <span className="checkmark" />
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default PermissionsTable;