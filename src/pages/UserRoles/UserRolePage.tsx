import { useState } from "react";
import UserRoleUI, { type Role, type UserRole } from "./UserRoleUI";
import { useAuth } from "../../hooks/useAuth";

const roles: Role[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Manager" },
  { id: 3, name: "Staff" },
];

const UserRolePage = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState(roles[0].id);

  const { addAllowedUsers, error, loading } = useAuth();

 const addUser = async () => {
  if (!email.trim()) {
    alert("Email is required");
    return;
  }

  const newUser: UserRole = { id: Date.now(), email, roleId };

  // Optionally update UI immediately
  setUsers(prev => [...prev, newUser]);

  // Call backend
  const res = await addAllowedUsers({ email: email, roleId: roleId });
  if (!res) {
    alert("Failed to add user: " + error);
    // remove from UI if failed
    setUsers(prev => prev.filter(u => u.email !== email));
  }

  // Clear input fields
  setEmail("");
  setRoleId(roles[0].id);
};

  const updateUserRole = async (userId: number, newRoleId: number) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, roleId: newRoleId } : u))
    );

    // Optionally call backend to update role here
  };

  if (loading) return <div>Loading...</div>;
  return (
    <UserRoleUI
      users={users}
      roles={roles}
      email={email}
      roleId={roleId}
      onEmailChange={setEmail}
      onRoleChange={setRoleId}
      onAddUser={addUser}
      onUpdateUserRole={updateUserRole}
    />
  );
};

export default UserRolePage;