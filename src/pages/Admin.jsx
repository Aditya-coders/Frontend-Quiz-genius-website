

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // CSS file for this page only

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/users/${id}/approve`);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isApproved: true } : user
        )
      );
    } catch (err) {
      console.error("Approval error", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="admin-container px-2 px-md-4 py-3">
      <div className="admin-card shadow-lg rounded-4 p-4">
        <h2 className="text-center admin-title mb-3">🎯 Admin Dashboard</h2>
        <p className="text-center text-muted">Manage registered and pending users</p>

        <div className="table-responsive mt-4">
          <table className="table admin-table table-hover align-middle table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Approved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.isApproved ? (
                      <span className="badge bg-success">✅ Approved</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Pending</span>
                    )}
                  </td>
                  <td>
                    {!u.isApproved && (
                      <button
                        className="btn btn-sm btn-outline-success me-2"
                        onClick={() => handleApprove(u._id)}
                      >
                        ✅ Accept
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Admin.css"; // CSS file for this page only

// const Admin = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role !== "admin") {
//       navigate("/login");
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("https://quiz-genius-website.onrender.com/api/auth/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(res.data);
//       } catch (err) {
//         console.error("Error fetching users", err);
//       }
//     };

//     fetchUsers();
//   }, [navigate]);

//   const handleApprove = async (id) => {
//     try {
//       await axios.put(`https://quiz-genius-website.onrender.com/api/auth/users/${id}/approve`);
//       setUsers((prev) =>
//         prev.map((user) =>
//           user._id === id ? { ...user, isApproved: true } : user
//         )
//       );
//     } catch (err) {
//       console.error("Approval error", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`https://quiz-genius-website.onrender.com/api/auth/users/${id}`);
//       setUsers((prev) => prev.filter((user) => user._id !== id));
//     } catch (err) {
//       console.error("Delete error", err);
//     }
//   };

//   return (
//     <div className="admin-container px-2 px-md-4 py-3">
//       <div className="admin-card shadow-lg rounded-4 p-4">
//         <h2 className="text-center admin-title mb-3">🎯 Admin Dashboard</h2>
//         <p className="text-center text-muted">Manage registered and pending users</p>

//         <div className="table-responsive mt-4">
//           <table className="table admin-table table-hover align-middle table-bordered">
//             <thead className="table-dark">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Approved</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u, index) => (
//                 <tr key={u._id}>
//                   <td>{index + 1}</td>
//                   <td>{u.name}</td>
//                   <td>{u.email}</td>
//                   <td>
//                     {u.isApproved ? (
//                       <span className="badge bg-success">✅ Approved</span>
//                     ) : (
//                       <span className="badge bg-warning text-dark">Pending</span>
//                     )}
//                   </td>
//                   <td>
//                     {!u.isApproved && (
//                       <button
//                         className="btn btn-sm btn-outline-success me-2"
//                         onClick={() => handleApprove(u._id)}
//                       >
//                         ✅ Accept
//                       </button>
//                     )}
//                     <button
//                       className="btn btn-sm btn-outline-danger"
//                       onClick={() => handleDelete(u._id)}
//                     >
//                       🗑️ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {users.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center text-muted">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;
