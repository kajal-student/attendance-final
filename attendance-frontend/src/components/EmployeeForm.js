<<<<<<< HEAD
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
=======
>>>>>>> 9bf6104a3d12376c762ad8e90cec1bd22b412159
import React, { useState } from 'react';
import API from '../api';
import UploadImage from './UploadImage';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', position: '', department: '', photo: ''
  });
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/api/employees/create', formData);
      alert('✅ Employee added successfully!');
      setFormData({ name: '', email: '', position: '', department: '', photo: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert('❌ Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      <UploadImage setImageUrl={(url) => setFormData({ ...formData, photo: url })} />
      
      <input
        placeholder="👤 Full Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <input
        type="email"
        placeholder="📧 Email Address"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />
      
      <input
        placeholder="💼 Position"
        value={formData.position}
        onChange={e => setFormData({ ...formData, position: e.target.value })}
        required
      />
      
      <input
        placeholder="🏢 Department"
        value={formData.department}
        onChange={e => setFormData({ ...formData, department: e.target.value })}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? '⏳ Adding...' : '➕ Add Employee'}
      </button>
=======

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.post('/api/employees', formData);
//     alert('Employee added');
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   // await API.post('/api/employees', formData);
      await API.post('/api/employees/create', formData); 
    alert('Employee added');
  } catch (error) {
    console.error('Submission error:', error);
    alert('Failed to add employee');
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <UploadImage setImageUrl={(url) => setFormData({ ...formData, photo: url })} />
      <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <input placeholder="Position" onChange={e => setFormData({ ...formData, position: e.target.value })} />
      <input placeholder="Department" onChange={e => setFormData({ ...formData, department: e.target.value })} />
      <button type="submit">Add Employee</button>
>>>>>>> 9bf6104a3d12376c762ad8e90cec1bd22b412159
    </form>
  );
};

export default EmployeeForm;
