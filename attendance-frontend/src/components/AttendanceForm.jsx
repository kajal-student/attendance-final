// import React, { useState, useEffect } from 'react';
// import API from '../api'; // make sure this points to your axios config

// const AttendanceForm = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeeId, setEmployeeId] = useState('');

//   // Load employee list on component mount
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

//   // Check-In Function
//   const handleCheckIn = async () => {
//     try {
//       await API.post('/api/attendance/checkin', {
//         employeeId,
//       });
//       alert('Check-in successful');
//     } catch (err) {
//       console.error('Check-in failed:', err.message);
//       alert('Error marking check-in');
//     }
//   };

//   // Check-Out Function
//   const handleCheckOut = async () => {
//     try {
//       await API.post('/api/attendance/checkout', {
//         employeeId,
//       });
//       alert('Check-out successful');
//     } catch (err) {
//       console.error('Check-out failed:', err.message);
//       alert('Error marking check-out');
//     }
//   };

//   return (
//     <div>
//       <h3>Mark Attendance</h3>

//       <select
//         value={employeeId}
//         onChange={(e) => setEmployeeId(e.target.value)}
//         required
//       >
//         <option value="">Select Employee</option>
//         {employees.map((emp) => (
//           <option key={emp._id} value={emp._id}>
//             {emp.name}
//           </option>
//         ))}
//       </select>

//       <div style={{ marginTop: '10px' }}>
//         <button onClick={handleCheckIn}>Check In</button>
//         <button onClick={handleCheckOut} style={{ marginLeft: '10px' }}>
//           Check Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AttendanceForm;
import React, { useState, useEffect } from 'react';
import API from '../api';

const AttendanceForm = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get('/api/employees');
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err.message);
      }
    };
    fetchEmployees();
  }, []);

  const handleCheckIn = async () => {
    if (!employeeId) return alert('⚠️ Please select an employee');
    setLoading(true);
    try {
      await API.post('/api/attendance/checkin', { employeeId });
      alert('✅ Check-in successful');
      setEmployeeId('');
    } catch (err) {
      console.error('Check-in failed:', err.message);
      alert('❌ Error marking check-in');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!employeeId) return alert('⚠️ Please select an employee');
    setLoading(true);
    try {
      await API.post('/api/attendance/checkout', { employeeId });
      alert('✅ Check-out successful');
      setEmployeeId('');
    } catch (err) {
      console.error('Check-out failed:', err.message);
      alert('❌ Error marking check-out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
        style={{ width: '100%', marginBottom: '15px' }}
      >
        <option value="">👤 Select Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name} - {emp.position}
          </option>
        ))}
      </select>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleCheckIn}
          disabled={loading}
          style={{ flex: 1, background: '#4caf50' }}
        >
          {loading ? '⏳ Processing...' : '🟢 Check In'}
        </button>
        <button
          onClick={handleCheckOut}
          disabled={loading}
          style={{ flex: 1, background: '#f44336' }}
        >
          {loading ? '⏳ Processing...' : '🔴 Check Out'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceForm;
