// import React, { useState } from 'react';
// import API from '../api';
// import UploadImage from './UploadImage';

// const EmployeeForm = () => {
//   const [formData, setFormData] = useState({
//     name: '', email: '', position: '', department: '', photo: ''
//   });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await API.post('/api/employees', formData);
// //     alert('Employee added');
// //   };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//    // await API.post('/api/employees', formData);
//       await API.post('/api/employees/create', formData); 
//     alert('Employee added');
//   } catch (error) {
//     console.error('Submission error:', error);
//     alert('Failed to add employee');
//   }
// };

//   return (
//     <form onSubmit={handleSubmit}>
//       <UploadImage setImageUrl={(url) => setFormData({ ...formData, photo: url })} />
//       <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
//       <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
//       <input placeholder="Position" onChange={e => setFormData({ ...formData, position: e.target.value })} />
//       <input placeholder="Department" onChange={e => setFormData({ ...formData, department: e.target.value })} />
//       <button type="submit">Add Employee</button>
//     </form>
//   );
// };

// export default EmployeeForm;
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
