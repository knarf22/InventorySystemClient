import React from "react";

export interface Role {
  id: number;
  name: string;
}

export interface UserRole {
  id: number;
  email: string;
  roleId: number;
}

interface UserRoleUIProps {
  users: UserRole[];
  roles: Role[];
  email: string;
  roleId: number;
  onEmailChange: (email: string) => void;
  onRoleChange: (roleId: number) => void;
  onAddUser: () => void;
  onUpdateUserRole: (userId: number, newRoleId: number) => void;
}

const UserRoleUI: React.FC<UserRoleUIProps> = ({
  users,
  roles,
  email,
  roleId,
  onEmailChange,
  onRoleChange,
  onAddUser,
  onUpdateUserRole,
}) => (
  <div className="p-6 space-y-6">
    {/* Add User */}
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row gap-3">
      <input
        type="email"
        placeholder="user@email.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="border rounded-lg px-3 py-2 flex-1"
      />

      <select
        value={roleId}
        onChange={(e) => onRoleChange(Number(e.target.value))}
        className="border rounded-lg px-3 py-2"
      >
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      <button
        onClick={onAddUser}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Add User
      </button>
    </div>

    {/* Users Table */}
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <select
                  value={user.roleId}
                  onChange={(e) =>
                    onUpdateUserRole(user.id, Number(e.target.value))
                  }
                  className="border rounded-lg px-2 py-1"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserRoleUI;