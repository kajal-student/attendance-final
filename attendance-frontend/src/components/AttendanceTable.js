
import React, { useEffect, useState } from 'react';
import API from '../api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
      const recordMonth = new Date(record.date).toISOString().slice(0, 7);
      return recordMonth === selected;
    });
    setFiltered(filteredData);
  };

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
    <div style={{ width: '100%', marginTop: '20px' }}>
      <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '15px' }}>
        📋 Attendance Records
      </h3>

      {/* Filter + Export Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '15px'
        }}
      >
        <label style={{ color: 'white', fontSize: '1rem' }}>
          Filter by Month:
        </label>

        <input
          type="month"
          value={month}
          onChange={handleMonthFilter}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '2px solid #ccc',
            fontSize: '1rem',
          }}
        />

        <button
          onClick={exportToExcel}
          style={{
            background: '#6a5acd',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            marginLeft: 'auto'
          }}
        >
          Export to Excel
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          background: 'white',
          padding: '10px',
          borderRadius: '12px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        }}
      >
        <table
          style={{
            width: '100%',
            minWidth: '650px',
            borderCollapse: 'collapse'
          }}
        >
          <thead style={{ background: '#667eea', color: 'white' }}>
            <tr>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Date</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Check-In</th>
              <th style={{ padding: '12px' }}>Check-Out</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{r.employeeId?.name}</td>
                <td style={{ padding: '10px' }}>{r.employeeId?.email}</td>
                <td style={{ padding: '10px' }}>{new Date(r.date).toLocaleDateString()}</td>
                <td style={{ padding: '10px' }}>{r.status}</td>
                <td style={{ padding: '10px' }}>
                  {r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : ''}
                </td>
                <td style={{ padding: '10px' }}>
                  {r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
