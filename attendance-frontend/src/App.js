// import React from 'react';
// import EmployeeForm from './components/EmployeeForm';
// import EmployeeList from './components/EmployeeList';
// import AttendanceForm from './components/AttendanceForm';
// import AttendanceTable from './components/AttendanceTable';

// function App() {
//   return (
//     <div className="App" style={{ padding: '20px' }}>
//       <h1>🕒 Employee Attendance System</h1>
//       <EmployeeForm />
//       <EmployeeList />
//       <AttendanceForm />
//       <AttendanceTable />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import AttendanceForm from './components/AttendanceForm';
import AttendanceTable from './components/AttendanceTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🕒 Employee Attendance System</h1>
        <p>Manage your team's attendance efficiently</p>
      </header>
      
      <div className="container">
        <section className="section">
          <h2>➕ Add New Employee</h2>
          <EmployeeForm />
        </section>

        <section className="section">
          <EmployeeList />
        </section>

        <section className="section">
          <h2>✅ Mark Attendance</h2>
          <AttendanceForm />
        </section>

        <section className="section">
          <AttendanceTable />
        </section>
      </div>
    </div>
  );
}

export default App;
