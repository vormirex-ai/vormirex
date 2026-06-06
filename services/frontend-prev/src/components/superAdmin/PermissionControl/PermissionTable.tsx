import "./PermissionTable.css";

export type PermissionKey = "view" | "create" | "edit" | "delete";

export type ModulePermission = {
  module: string;
  permissions: Record<PermissionKey, boolean>;
};

interface PermissionsTableProps {
  data: ModulePermission[];
  disabled: boolean;
  onToggle: (index: number, key: PermissionKey) => void;
  onToggleAll: (index: number) => void;
}

const permissionKeys: PermissionKey[] = ["view", "create", "edit", "delete"];

const PermissionsTable = ({ data, disabled, onToggle, onToggleAll }: PermissionsTableProps) => {

  if (!data || data.length === 0) return null;

  return (
    <div className={`permissions-table ${disabled ? "disabled-table" : ""}`}>
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
              <label key={key} className={`custom-check ${disabled ? "disabled" : ""}`}>
                <input
                  type="checkbox"
                  checked={item.permissions[key]}
                  onChange={() => { if (!disabled) onToggle(index, key) }}
                  disabled={disabled}
                />
                <span className="checkmark" />
              </label>
            ))}

            <label className={`custom-check ${disabled ? "disabled" : ""}`}>
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={() => { if (!disabled) onToggleAll(index) }}
                disabled={disabled}
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