import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleBlockUser = (id) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status: user.status === "blocked" ? "active" : "blocked" } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Management</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage users, roles, and platform access.</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td className="font-semibold text-slate-900 dark:text-white">{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-600 block w-full p-2 transition-all"
                  >
                    <option value="student">Student</option>
                    <option value="club">Club</option>
                    <option value="admin">Admin</option>
                    <option value="guest">Guest</option>
                  </select>
                </Td>
                <Td>
                  <Badge variant={user.status === 'blocked' ? 'danger' : 'success'}>
                    {user.status || 'active'}
                  </Badge>
                </Td>
                <Td className="text-right">
                  <Button 
                    variant={user.status === 'blocked' ? 'primary' : 'danger'}
                    size="sm"
                    onClick={() => handleBlockUser(user.id)}
                  >
                    {user.status === 'blocked' ? 'Unblock' : 'Block User'}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {users.length === 0 && (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-medium">
            No users found.
          </div>
        )}
      </Card>
    </div>
  );
}
