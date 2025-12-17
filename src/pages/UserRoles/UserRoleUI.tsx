import { useState } from "react";

interface Role {
  id: number;
  name: string;
}

interface UserRole {
  id: number;
  email: string;
  roleId: number;
}

const roles: Role[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Staff" },
  { id: 3, name: "Viewer" },
];


const UserRoleUI: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [roleId, setRoleId] = useState<number>(2);
  const [users, setUsers] = useState<UserRole[]>([]);

  const addUser = (): void => {
    if (!email) return;

    setUsers(prev => [
      ...prev,
      { id: Date.now(), email, roleId },
    ]);

    setEmail("");
    setRoleId(2);
  };

  const updateUserRole = (userId: number, newRoleId: number): void => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, roleId: newRoleId } : user
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Add User */}
      <div className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row gap-3">
        <input
          type="email"
          placeholder="user@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />

        <select
          value={roleId}
          onChange={e => setRoleId(Number(e.target.value))}
          className="border rounded-lg px-3 py-2"
        >
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        <button
          onClick={addUser}
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
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <select
                    value={user.roleId}
                    onChange={e =>
                      updateUserRole(user.id, Number(e.target.value))
                    }
                    className="border rounded-lg px-2 py-1"
                  >
                    {roles.map(role => (
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
};

export default UserRoleUI;
