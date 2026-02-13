import React, { useEffect, useState } from 'react';
import API from '../api';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/api/employees');
        setEmployees(res.data.data);
      } catch (err) {
        console.error("Error fetching employees:", err.message);
      }
    };
    load();
  }, []);

  return (
    <div className="employee-list">
      <h3
        style={{
          fontSize: '1.8rem',
          color: 'white',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: '600',
        }}
      >
        👥 Employees
      </h3>

      <div className="card-container">
        {employees.map(emp => (
          <div className="employee-card" key={emp._id}>
            <img
              src={emp.photo || "https://via.placeholder.com/100"}
              alt={emp.name}
            />

            <h4>{emp.name}</h4>
            <p>{emp.email}</p>
            <p>
              {emp.position} — {emp.department}
            </p>
          </div>
        ))}
      </div>

      {/* If no employees */}
      {employees.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "20px",
            fontSize: "1rem",
            opacity: "0.8"
          }}
        >
          No employees found.
        </p>
      )}
    </div>
  );
};

export default EmployeeList;
