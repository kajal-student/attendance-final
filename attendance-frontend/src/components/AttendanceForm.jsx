
// import React, { useState, useEffect } from 'react';
// import API from '../api';

// const AttendanceForm = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeeId, setEmployeeId] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await API.get('/api/employees');
//         setEmployees(res.data);
//       } catch (err) {
//         console.error('Error fetching employees:', err.message);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   const handleCheckIn = async () => {
//     if (!employeeId) return alert('⚠️ Please select an employee');
//     setLoading(true);
//     try {
//       await API.post('/api/attendance/checkin', { employeeId });
//       alert('✅ Check-in successful');
//       setEmployeeId('');
//     } catch (err) {
//       console.error('Check-in failed:', err.message);
//       alert('❌ Error marking check-in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCheckOut = async () => {
//     if (!employeeId) return alert('⚠️ Please select an employee');
//     setLoading(true);
//     try {
//       await API.post('/api/attendance/checkout', { employeeId });
//       alert('✅ Check-out successful');
//       setEmployeeId('');
//     } catch (err) {
//       console.error('Check-out failed:', err.message);
//       alert('❌ Error marking check-out');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: '600px',
//         width: '100%',
//         margin: '0 auto',
//         padding: '20px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '15px'
//       }}
//     >
//       {/* Employee Dropdown */}
//       <select
//         value={employeeId}
//         onChange={(e) => setEmployeeId(e.target.value)}
//         required
//         style={{
//           width: '100%',
//           padding: '12px',
//           borderRadius: '10px',
//           border: '2px solid #e0e0e0',
//           fontSize: '1rem',
//           background: 'white',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//         }}
//       >
//         <option value="">👤 Select Employee</option>
//         {employees.map((emp) => (
//           <option key={emp._id} value={emp._id}>
//             {emp.name} — {emp.position}
//           </option>
//         ))}
//       </select>

//       {/* Buttons */}
//       <div
//         style={{
//           display: 'flex',
//           gap: '10px',
//           flexWrap: 'wrap',
//         }}
//       >
//         <button
//           onClick={handleCheckIn}
//           disabled={loading}
//           style={{
//             flex: 1,
//             padding: '14px 20px',
//             background: '#4caf50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '10px',
//             fontSize: '1rem',
//             fontWeight: '600',
//             cursor: 'pointer',
//             minWidth: '150px',
//           }}
//         >
//           {loading ? '⏳ Processing...' : '🟢 Check In'}
//         </button>

//         <button
//           onClick={handleCheckOut}
//           disabled={loading}
//           style={{
//             flex: 1,
//             padding: '14px 20px',
//             background: '#f44336',
//             color: 'white',
//             border: 'none',
//             borderRadius: '10px',
//             fontSize: '1rem',
//             fontWeight: '600',
//             cursor: 'pointer',
//             minWidth: '150px',
//           }}
//         >
//           {loading ? '⏳ Processing...' : '🔴 Check Out'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AttendanceForm;
import React, { useState, useEffect } from "react";
import API from "../api";

const AttendanceForm = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/api/employees");

        // Handle both structured & non-structured response
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        } else if (res.data?.data) {
          setEmployees(res.data.data);
        } else {
          setEmployees([]);
        }
      } catch (err) {
        // Silent fail (no scary error)
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  const handleCheckIn = async () => {
    if (!employeeId) {
      alert("Please select an employee");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/api/attendance/checkin", { employeeId });

      alert(res.data?.message || "Check-in successful");
      setEmployeeId("");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to complete check-in"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!employeeId) {
      alert("Please select an employee");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/api/attendance/checkout", { employeeId });

      alert(res.data?.message || "Check-out successful");
      setEmployeeId("");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to complete check-out"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Attendance</h2>

        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} — {emp.position}
            </option>
          ))}
        </select>

        <div style={styles.buttonGroup}>
          <button
            onClick={handleCheckIn}
            disabled={loading}
            style={{ ...styles.button, background: "#2e7d32" }}
          >
            {loading ? "Processing..." : "Check In"}
          </button>

          <button
            onClick={handleCheckOut}
            disabled={loading}
            style={{ ...styles.button, background: "#c62828" }}
          >
            {loading ? "Processing..." : "Check Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px"
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  button: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default AttendanceForm;
