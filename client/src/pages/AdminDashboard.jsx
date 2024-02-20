import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/auth/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
   // Filter users based on search term
   const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const deleteUser = async (userId) => {
    try {
      await fetch(`/api/auth/admin/delete/${userId}`, {
        method: 'DELETE',
      });
      
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const editUser = (userId) => {
    
    navigate(`/admin/edit-user/${userId}`);
  };

  return (
    
      <div className="overflow-x-auto">
        <h1 className='text-3xl text-center font-semibold my-7'>Admin Dashboard</h1>
      <div className="flex justify-between items-center">
      <div></div>
      <Link to="/admin/add-user" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5">
          Add User
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Profile Image</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <img src={user.profilePicture} alt={user.name} className="w-16 h-16 rounded-full" />
              </td>
              <td className="border px-4 py-2">
              <button onClick={() => deleteUser(user._id)}>Delete</button>
              <button onClick={() => editUser(user._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     
  );
}
