<<<<<<< HEAD
// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';


// const AttendanceTable = () => {
//   const [records, setRecords] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [month, setMonth] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await API.get('/api/attendance');
//       setRecords(res.data);
//       setFiltered(res.data);
//     } catch (err) {
//       console.error('Error:', err.message);
//     }
//   };

//   const handleMonthFilter = (e) => {
//     const selected = e.target.value;
//     setMonth(selected);
//     if (!selected) return setFiltered(records);

//     const filteredData = records.filter(record => {
//       const recordMonth = new Date(record.date).toISOString().slice(0, 7); // YYYY-MM
//       return recordMonth === selected;
//     });
//     setFiltered(filteredData);
//   };

// //   const exportToCSV = () => {
// //     const headers = ['Name,Email,Date,Status,CheckIn,CheckOut'];
// //     const rows = filtered.map(r =>
// //       `${r.employeeId?.name},${r.employeeId?.email},${new Date(r.date).toLocaleDateString()},${r.status},${r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : ''},${r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : ''}`
// //     );
// //     const csv = [...headers, ...rows].join('\n');
// //     const blob = new Blob([csv], { type: 'text/csv' });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = 'attendance.csv';
// //     a.click();
// //   };
// const exportToExcel = () => {
//   const worksheetData = [
//     ['Name', 'Email', 'Date', 'Status', 'Check-In', 'Check-Out'],
//     ...filtered.map(r => {
//       const date = new Date(r.date);
//       const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
//       const checkIn = r.checkIn ? new Date(r.checkIn).toLocaleTimeString('en-GB') : '';
//       const checkOut = r.checkOut ? new Date(r.checkOut).toLocaleTimeString('en-GB') : '';

//       return [
//         r.employeeId?.name || '',
//         r.employeeId?.email || '',
//         formattedDate,
//         r.status,
//         checkIn,
//         checkOut
//       ];
//     })
//   ];

//   const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

//   // Auto column width
//   worksheet['!cols'] = worksheetData[0].map((_, i) => ({
//     wch: Math.max(...worksheetData.map(row => String(row[i] || '').length)) + 2
//   }));

//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

//   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//   const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//   saveAs(blob, 'attendance.xlsx');
// };

//   return (
//     <div>
//       <h3>📋 Attendance Records</h3>

//       <label>
//         Filter by Month:
//         <input
//           type="month"
//           value={month}
//           onChange={handleMonthFilter}
//           style={{ marginLeft: '10px' }}
//         />
//       </label>

//       {/* <button onClick={exportToCSV} style={{ marginLeft: '20px' }}>
//         Export to CSV
//       </button> */}
//       <button onClick={exportToExcel} style={{ marginLeft: '20px' }}>
//   Export to Excel
// </button>


//       <table border="1" cellPadding="6" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
//         <thead>
//           <tr>
//             <th>Name</th><th>Email</th><th>Date</th><th>Status</th><th>Check-In</th><th>Check-Out</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((r) => (
//             <tr key={r._id}>
//               <td>{r.employeeId?.name}</td>
//               <td>{r.employeeId?.email}</td>
//               <td>{new Date(r.date).toLocaleDateString()}</td>
//               <td>{r.status}</td>
//               <td>{r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : ''}</td>
//               <td>{r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : ''}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceTable;
=======
>>>>>>> 9bf6104a3d12376c762ad8e90cec1bd22b412159
import React, { useEffect, useState } from 'react';
import API from '../api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

<<<<<<< HEAD
=======

>>>>>>> 9bf6104a3d12376c762ad8e90cec1bd22b412159
const AttendanceTable = () => {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [month, setMonth] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get('/api/attendance');
      setRecords(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const handleMonthFilter = (e) => {
    const selected = e.target.value;
    setMonth(selected);
    if (!selected) return setFiltered(records);

    const filteredData = records.filter(record => {
<<<<<<< HEAD
      const recordMonth = new Date(record.date).toISOString().slice(0, 7);
=======
      const recordMonth = new Date(record.date).toISOString().slice(0, 7); // YYYY-MM
>>>>>>> 9bf6104a3d12376c762ad8e90cec1bd22b412159
      return recordMonth === selected;
    });
    setFiltered(filteredData);
  };

<<<<<<< HEAD
  const exportToExcel = () => {
    const worksheetData = [
      ['Name', 'Email', 'Date', 'Status', 'Check-In', 'Check-Out'],
      ...filtered.map(r => {
        const date = new Date(r.date);
        const formattedDate = date.toISOString().split('T')[0];
        const checkIn = r.checkIn ? new Date(r.checkIn).toLocaleTimeString('en-GB') : '';
        const checkOut = r.checkOut ? new Date(r.checkOut).toLocaleTimeString('en-GB') : '';

        return [
          r.employeeId?.name || '',
          r.employeeId?.email || '',
          formattedDate,
          r.status,
          checkIn,
          checkOut
        ];
      })
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet['!cols'] = worksheetData[0].map((_, i) => ({
      wch: Math.max(...worksheetData.map(row => String(row[i] || '').length)) + 2
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'attendance.xlsx');
  };

  return (
    <div>
      <h2>📋 Attendance Records</h2>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            📅 Filter by Month:
          </label>
          <input
            type="month"
            value={month}
            onChange={handleMonthFilter}
            style={{ width: '100%' }}
          />
        </div>

        <button onClick={exportToExcel} style={{ alignSelf: 'flex-end' }}>
          📥 Export to Excel
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>📅 Date</th>
              <th>📊 Status</th>
              <th>🕐 Check-In</th>
              <th>🕐 Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>
                  No records found
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r._id}>
                  <td>{r.employeeId?.name}</td>
                  <td>{r.employeeId?.email}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: r.status === 'Present' ? '#d4edda' : '#f8d7da',
                      color: r.status === 'Present' ? '#155724' : '#721c24',
                      fontWeight: '600'
                    }}>
                      {r.status}
                    </span>
                  </td>
                  <td>{r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : '-'}</td>
                  <td>{r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
=======
//   const exportToCSV = () => {
//     const headers = ['Name,Email,Date,Status,CheckIn,CheckOut'];
//     const rows = filtered.map(r =>
//       `${r.employeeId?.name},${r.employeeId?.email},${new Date(r.date).toLocaleDateString()},${r.status},${r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : ''},${r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : ''}`
//     );
//     const csv = [...headers, ...rows].join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'attendance.csv';
//     a.click();
//   };
const exportToExcel = () => {
  const worksheetData = [
    ['Name', 'Email', 'Date', 'Status', 'Check-In', 'Check-Out'],
    ...filtered.map(r => {
      const date = new Date(r.date);
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const checkIn = r.checkIn ? new Date(r.checkIn).toLocaleTimeString('en-GB') : '';
      const checkOut = r.checkOut ? new Date(r.checkOut).toLocaleTimeString('en-GB') : '';

      return [
        r.employeeId?.name || '',
        r.employeeId?.email || '',
        formattedDate,
        r.status,
        checkIn,
        checkOut
      ];
    })
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Auto column width
  worksheet['!cols'] = worksheetData[0].map((_, i) => ({
    wch: Math.max(...worksheetData.map(row => String(row[i] || '').length)) + 2
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'attendance.xlsx');
};

  return (
    <div>
      <h3>📋 Attendance Records</h3>

      <label>
        Filter by Month:
        <input
          type="month"
          value={month}
          onChange={handleMonthFilter}
          style={{ marginLeft: '10px' }}
        />
      </label>

      {/* <button onClick={exportToCSV} style={{ marginLeft: '20px' }}>
        Export to CSV
      </button> */}
      <button onClick={exportToExcel} style={{ marginLeft: '20px' }}>
  Export to Excel
</button>


      <table border="1" cellPadding="6" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Date</th><th>Status</th><th>Check-In</th><th>Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r._id}>
              <td>{r.employeeId?.name}</td>
              <td>{r.employeeId?.email}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.status}</td>
              <td>{r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : ''}</td>
              <td>{r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
>>>>>>> 9bf6104a3d12376c762ad8e90cec1bd22b412159
    </div>
  );
};

export default AttendanceTable;
