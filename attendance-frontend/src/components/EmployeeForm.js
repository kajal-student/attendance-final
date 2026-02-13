import React, { useState } from 'react';
import API from '../api';
import UploadImage from './UploadImage';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    photo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/employees/create', formData);
      alert('Employee added successfully');
      setFormData({ name: '', email: '', position: '', department: '', photo: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to add employee');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '20px',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      {/* Upload Image Component */}
      <UploadImage
        setImageUrl={(url) => setFormData({ ...formData, photo: url })}
      />

      {/* Input Fields */}
      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        style={{
          padding: '12px',
          borderRadius: '10px',
          border: '2px solid #e0e0e0',
          fontSize: '1rem'
        }}
      />

      <input
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        style={{
          padding: '12px',
          borderRadius: '10px',
          border: '2px solid #e0e0e0',
          fontSize: '1rem'
        }}
      />

      <input
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        style={{
          padding: '12px',
          borderRadius: '10px',
          border: '2px solid #e0e0e0',
          fontSize: '1rem'
        }}
      />

      <input
        placeholder="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        style={{
          padding: '12px',
          borderRadius: '10px',
          border: '2px solid #e0e0e0',
          fontSize: '1rem'
        }}
      />

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          padding: '14px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: '0.2s'
        }}
      >
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
