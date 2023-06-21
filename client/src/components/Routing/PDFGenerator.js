import React from 'react';
import { Line } from 'react-chartjs-2';
import html2pdf from 'html2pdf.js';

const Database1 = () => {
  const generatePDF = () => {
    const element = document.getElementById('content-to-download');
    const options = {
      filename: 'my-document.pdf',
      jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  };

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [100, 200, 150, 300, 250, 400, 350],
      },
    ],
  };

  const tableData = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
  ];

  return (
    <>
        {/* <Line data={chartData} /> */}
      <div className="graph-container" id="content-to-download">
        <h1>TABULAR DATA</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </>
  );
};

export default Database1;
